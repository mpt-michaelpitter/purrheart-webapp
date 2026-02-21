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
        // Priority: ?campaign= query param → fallback: #hashtag from message
        let campaignSlug = req.nextUrl.searchParams.get('campaign');

        if (!campaignSlug) {
            const slugMatch = (message || '').match(/#([\w-]+)/g);
            if (slugMatch?.length) {
                campaignSlug = slugMatch[slugMatch.length - 1].replace('#', '');
                console.log(`[Saweria] Campaign slug from hashtag: #${campaignSlug}`);
            }
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
        //    Created in the last 60 minutes (generous window for slow payers)
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

        return NextResponse.json({ success: true, donationId });

    } catch (error) {
        console.error('[Saweria] Webhook error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
