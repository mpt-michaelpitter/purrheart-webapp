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

// ... imports

// ... writeClient setup

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const slug = searchParams.get("slug");
        const limit = searchParams.get("limit") ? Number(searchParams.get("limit")) : 20;

        let query = `*[_type == "donation" && status == "success"] | order(_createdAt desc)[0...${limit}] {
            _id,
            donorName,
            amount,
            message,
            createdAt,
            "campaign": campaign->title,
            "campaignSlug": campaign->slug.current
        }`;

        if (slug) {
            query = `*[_type == "donation" && status == "success" && campaign->slug.current == "${slug}"] | order(_createdAt desc)[0...${limit}] {
                _id,
                donorName,
                amount,
                message,
                createdAt
            }`;
        }

        const donations = await writeClient.fetch(query);

        return NextResponse.json({
            success: true,
            data: donations
        });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch donations" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        let { slug, amount, name, message, email, payment_type } = body;

        // --- SECURITY & VALIDATION START ---
        if (!slug || !amount || !payment_type) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Ensure amount is a number
        amount = Number(amount);

        // 1. Validate Amount (Must be number and positive)
        if (typeof amount !== 'number' || isNaN(amount) || amount <= 0) {
            return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
        }

        // 2. Sanitize Inputs (XSS Prevention)
        const { sanitizeInput, isValidEmail } = await import("@/lib/security");

        name = sanitizeInput(name || "Anonim");
        message = sanitizeInput(message || "");
        email = email ? sanitizeInput(email) : "donor@example.com";
        slug = sanitizeInput(slug); // Very important!

        // 3. Validate Email
        if (email !== "donor@example.com" && !isValidEmail(email)) {
            return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
        }

        // 4. Validate Payment Type (Injection Prevention)
        const validPaymentTypes = ["qris", "bank_transfer", "credit_card"];
        if (!validPaymentTypes.includes(payment_type)) {
            return NextResponse.json({ error: "Invalid payment type" }, { status: 400 });
        }
        // --- SECURITY & VALIDATION END ---

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
                gross_amount: amount,
            },
            customer_details: {
                first_name: name,
                email: email,
            },
            item_details: [{
                id: slug,
                price: amount,
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
            donorName: name,
            amount: amount,
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
        return NextResponse.json({ error: "Internal Server Error", details: process.env.NODE_ENV === 'development' ? (e instanceof Error ? e.message : String(e)) : undefined }, { status: 500 });
    }
}
