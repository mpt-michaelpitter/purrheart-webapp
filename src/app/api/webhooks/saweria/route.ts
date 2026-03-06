import { NextRequest, NextResponse } from 'next/server';
import { writeClient } from '@/sanity/lib/writeClient';
import { client } from '@/sanity/lib/client';

// ─── Saweria Webhook Handler ───────────────────────────────────────────────
//
// Flow:
// 1. User opens Saweria → frontend creates a PENDING donation via POST /api/payment/pending
// 2. User pays on Saweria
// 3. Saweria fires this webhook (POST /api/webhooks/saweria?campaign=slug)
// 4. We find the most recent PENDING donation for that campaign
// 5. We PATCH it to 'success' with real amount + donorName from Saweria
// 6. If no pending donation found, we CREATE a new success donation
//
// Register one webhook URL per Saweria account:
//   https://yourdomain.com/api/webhooks/saweria?campaign=adopsi-kitten
// ──────────────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { donator_name, amount_raw, donator_email, message, id, created_at, failure_code } = body;

        // Ignore failed donations
        if (failure_code) {
            console.log(`[Saweria] Ignoring failed donation: ${id} (failure_code: ${failure_code})`);
            return NextResponse.json({ success: false, reason: 'failed_donation' });
        }

        // ── 1. Determine campaign slug ──
        // Only trust ?campaign= query param for multi-wallet strategy
        const campaignSlug = req.nextUrl.searchParams.get('campaign');

        if (!campaignSlug) {
            console.warn(`[Saweria] Missing ?campaign= query param in webhook URL. Donation ${id} will be unlinked.`);
        } else {
            console.log(`[Saweria] Campaign slug from query param: ${campaignSlug}`);
        }

        // ── 2. Lookup campaign _id ──
        let campaignId: string | null = null;
        if (campaignSlug) {
            campaignId = await client.fetch<string | null>(
                `*[_type == "campaign" && slug.current == $slug][0]._id`,
                { slug: campaignSlug }
            );
            if (!campaignId) {
                console.warn(`[Saweria] No campaign found for slug: ${campaignSlug}`);
            }
        }

        // ── 3. Find the most recent PENDING donation for this campaign ──
        let donationId: string | null = null;

        if (campaignId) {
            const since = new Date(Date.now() - 60 * 60 * 1000).toISOString();
            const pendingDonation = await client.fetch<{ _id: string } | null>(
                `*[_type == "donation" && campaign._ref == $campaignId && status == "pending" && createdAt > $since] | order(createdAt desc) [0] { _id }`,
                { campaignId, since }
            );

            if (pendingDonation) {
                // ── 4a. PATCH existing pending donation → success ──
                await writeClient.patch(pendingDonation._id).set({
                    status: 'success',
                    donorName: donator_name || 'Anonim',
                    amount: amount_raw,
                    email: donator_email || '',
                    wish: message || '',
                    orderId: id,
                    paymentType: 'saweria',
                    isAnonymous: !donator_name || donator_name.trim() === '',
                }).commit();

                donationId = pendingDonation._id;
                console.log(`[Saweria] ✅ Patched pending → success: ${pendingDonation._id} (${campaignSlug}, Rp ${amount_raw})`);
            }
        }

        // ── 4b. No pending found → CREATE new success donation ──
        if (!donationId) {
            const donation = await writeClient.create({
                _type: 'donation',
                donorName: donator_name || 'Anonim',
                amount: amount_raw,
                email: donator_email || '',
                wish: message || '',
                paymentType: 'saweria',
                status: 'success',
                orderId: id,
                createdAt: created_at || new Date().toISOString(),
                isAnonymous: !donator_name || donator_name.trim() === '',
                ...(campaignId && { campaign: { _type: 'reference', _ref: campaignId } }),
            });

            donationId = donation._id;
            console.log(`[Saweria] ✅ Created new success donation: ${donationId} (${campaignSlug || 'no campaign'}, Rp ${amount_raw})`);
        }

        // ── 5. Create Ledger Entry & Atomic Increment ──
        if (campaignId && amount_raw > 0) {
            // Atomic update to campaign's currentBalance using inc
            await writeClient.patch(campaignId).inc({ currentBalance: amount_raw }).commit();

            // Create new ledger entry without needing to read the previous balance
            // We just record the amount added. The actual campaign doc holds the true aggregated value safely.
            const campaignData = await client.fetch<{ currentBalance: number }>(
                `*[_type == "campaign" && _id == $campaignId][0]{ currentBalance }`,
                { campaignId }
            );

            await writeClient.create({
                _type: 'campaignBalance',
                campaign: { _type: 'reference', _ref: campaignId },
                amount: amount_raw,
                balance: campaignData?.currentBalance || amount_raw, // This is just a snapshot for the ledger UI
                donation: { _type: 'reference', _ref: donationId },
                createdAt: new Date().toISOString(),
            });

            console.log(`[Saweria] 💰 Atomic Increment: +Rp ${amount_raw} applied to campaign ${campaignId}`);
        }

        return NextResponse.json({ success: true, donationId });

    } catch (error) {
        console.error('[Saweria] Webhook error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
