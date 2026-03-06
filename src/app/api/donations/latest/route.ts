import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';

export const revalidate = 30; // Cache for 30 seconds to reduce Sanity API load

export async function GET() {
    try {
        // Fetch the 3 most recent successful donations
        const latestDonations = await client.fetch(`
            *[_type == "donation" && status == "success"] | order(createdAt desc)[0...3] {
                _id,
                donorName,
                amount,
                "campaignTitle": campaign->title,
                createdAt
            }
        `);

        return NextResponse.json({ success: true, data: latestDonations });
    } catch (error) {
        console.error('[LatestDonations API] Error fetching donations:', error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}
