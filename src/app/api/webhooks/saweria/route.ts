import { NextRequest, NextResponse } from 'next/server';
import { writeClient } from '@/sanity/lib/writeClient';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // Saweria Webhook Payload Structure
        // {
        //   "version": "2023-11-01",
        //   "created_at": "2023-11-21T07:22:20.000Z",
        //   "id": "11111111-1111-1111-1111-111111111111",
        //   "type": "donation",
        //   "amount_raw": 69420,
        //   "cut": 3471,
        //   "donator_name": "Someguy",
        //   "donator_email": "someguy@example.com",
        //   "message": "Semangat bang!",
        //   "failure_code": null
        // }

        const {
            donator_name,
            amount_raw,
            donator_email,
            message
        } = body;

        // Verify secret if you set one in Saweria (Recommended)
        // const secret = req.nextUrl.searchParams.get('secret');
        // if (secret !== process.env.SAWERIA_WEBHOOK_SECRET) {
        //     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        // }

        // Create the donation record in Sanity
        await writeClient.create({
            _type: 'donation',
            donorName: donator_name || 'Anonim',
            amount: amount_raw,
            email: donator_email || '-',
            wish: message || '',
            paymentType: 'saweria',
            status: 'success', // Saweria webhooks are usually for successful payments
            orderId: body.id,
            createdAt: body.created_at || new Date().toISOString(),
            isAnonymous: false, // Defaulting to false as we get the name
        });

        console.log('Saweria donation recorded:', body.id);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error processing Saweria webhook:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
