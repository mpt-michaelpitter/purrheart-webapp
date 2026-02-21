import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';

// Poll a specific donation by _id to check if it changed from pending → success
// Used by PaymentPageClient after creating a pending donation
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');         // Specific donation _id (primary)
    const slug = searchParams.get('slug');     // Fallback: campaign slug
    const after = searchParams.get('after');   // Fallback: ISO timestamp

    if (!id && !slug) {
        return NextResponse.json({ error: 'Missing id or slug' }, { status: 400 });
    }

    try {
        // ── Primary: check a specific pending donation by _id ──
        if (id) {
            const donation = await client.fetch(
                `*[_type == "donation" && _id == $id][0] {
                    _id,
                    donorName,
                    amount,
                    status,
                    createdAt
                }`,
                { id },
                { cache: 'no-store' }
            );

            if (!donation) {
                return NextResponse.json({ found: false, status: null });
            }

            return NextResponse.json({
                found: donation.status === 'success',
                status: donation.status,
                donation,
            });
        }

        // ── Fallback: look for any new success donation for campaign after timestamp ──
        const sinceDate = after
            ? new Date(after).toISOString()
            : new Date(Date.now() - 5 * 60 * 1000).toISOString();

        const donations = await client.fetch(
            `*[_type == "donation" && campaign->slug.current == $slug && status == "success" && createdAt > $since] | order(createdAt desc) [0..0] {
                _id, donorName, amount, createdAt
            }`,
            { slug, since: sinceDate },
            { cache: 'no-store' }
        );

        return NextResponse.json({
            found: donations.length > 0,
            status: donations.length > 0 ? 'success' : 'pending',
            donation: donations[0] ?? null,
        });

    } catch (error) {
        console.error('[payment-check] Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
