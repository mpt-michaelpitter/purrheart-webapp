import { NextResponse } from "next/server";
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";
import { core } from "@/lib/midtrans";

// Create a client with the Write Token
const writeClient = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false, // We need fresh data for writes
    token: process.env.SANITY_API_TOKEN, // Protected by server-side env
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { slug, amount, name, message, email, payment_type } = body;

        if (!slug || !amount || !payment_type) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // 1. Fetch Campaign ID from Slug
        const campaign = await writeClient.fetch(
            `*[_type == "campaign" && slug.current == $slug][0]._id`,
            { slug }
        );

        if (!campaign) {
            return NextResponse.json({ error: "Campaign not found" }, { status: 404 });
        }

        // 2. Generate Order ID
        const orderId = `DONASI-${slug}-${Date.now()}`;

        // 3. Prepare Midtrans Request
        let parameter: any = {
            payment_type: payment_type,
            transaction_details: {
                order_id: orderId,
                gross_amount: Number(amount),
            },
            customer_details: {
                first_name: name || "Anonim",
                email: email || "donor@example.com",
            },
            item_details: [{
                id: slug,
                price: Number(amount),
                quantity: 1,
                name: `Donasi - ${slug}`
            }]
        };

        if (payment_type === 'bank_transfer') {
            parameter = { ...parameter, bank_transfer: { bank: "bca" } }
        } else if (payment_type === 'qris') {
            parameter = { ...parameter, qris: { acquirer: "gopay" } }
        }

        // 4. Call Midtrans
        const chargeResponse = await core.charge(parameter);

        // 5. Save to Sanity
        await writeClient.create({
            _type: 'donation',
            donorName: name || "Anonim",
            amount: Number(amount),
            email: email,
            message: message,
            campaign: { _type: 'reference', _ref: campaign },
            status: 'pending',
            orderId: orderId,
            paymentType: payment_type,
            createdAt: new Date().toISOString()
        });

        return NextResponse.json({
            success: true,
            data: chargeResponse
        });

    } catch (e) {
        console.error("Donation Error:", e);
        return NextResponse.json({ error: "Internal Server Error", details: e instanceof Error ? e.message : String(e) }, { status: 500 });
    }
}
