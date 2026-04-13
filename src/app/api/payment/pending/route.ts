import { NextRequest, NextResponse } from 'next/server';
import { writeClient } from '@/sanity/lib/writeClient';
import { client } from '@/sanity/lib/client';

// Creates a PENDING donation when user clicks "Buka Saweria"
// Will be updated to 'success' when webhook arrives
export async function POST(req: NextRequest) {
    try {
        const { donorName, campaignSlug, message, isAnonymous } = await req.json();

        if (!campaignSlug) {
            return NextResponse.json({ error: 'Missing campaignSlug' }, { status: 400 });
        }

        // Lookup campaign
        const campaignId = await client.fetch<string | null>(
            `*[_type == "campaign" && slug.current == $slug][0]._id`,
            { slug: campaignSlug }
        );

        if (!campaignId) {
            return NextResponse.json({ error: `Campaign not found: ${campaignSlug}` }, { status: 404 });
        }

        // Create pending donation
        const donation = await writeClient.create({
            _type: 'donation',
            donorName: isAnonymous ? 'Anonim' : (donorName?.trim() || 'Anonim'),
            amount: 0, // Will be filled by webhook
            wish: message?.trim() || '',
            status: 'pending',
            paymentType: 'saweria',
            createdAt: new Date().toISOString(),
            isAnonymous: isAnonymous || false,
            campaign: { _type: 'reference', _ref: campaignId },
        });

        console.log(`[Pending] Donation created: ${donation._id} for campaign: ${campaignSlug}`);

        return NextResponse.json({ success: true, _id: donation._id });
    } catch (error) {
        console.error('[Pending] Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
