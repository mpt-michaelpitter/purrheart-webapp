import { NextResponse } from "next/server";
import { getDonations, getDonationBySlug, addPendingDonation } from "@/lib/store";
import { core } from "@/lib/midtrans";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (slug) {
        const donation = getDonationBySlug(slug);
        return NextResponse.json(donation || { error: "Not found" }, { status: donation ? 200 : 404 });
    }

    return NextResponse.json(getDonations());
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { slug, amount, name, message, email, payment_type } = body;

        if (!slug || !amount || !payment_type) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Generate simplified random order ID for demo purposes
        // In real app: save to DB as pending -> get ID -> use ID here
        const orderId = `DONASI-${slug}-${Date.now()}`;

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
            parameter = {
                ...parameter,
                bank_transfer: {
                    bank: "bca" // Default to BCA for simplicity, can be dynamic
                }
            }
        } else if (payment_type === 'qris') {
            parameter = {
                ...parameter,
                qris: {
                    acquirer: "gopay"
                }
            }
        }

        const chargeResponse = await core.charge(parameter);

        // Optimistically update local store for demo (or can be done after payment success on frontend)
        // For now we keep the store update so the UI reflects "someone donated" locally, 
        // essentially treating the "intent to donate" as a donation in this mock DB.
        // Store in pending state
        const pendingDonor = {
            name: name || "Anonim",
            amount: Number(amount),
            time: "Baru saja",
            avatar: null,
            email: email || null,
            message: message || null
        };

        addPendingDonation(orderId, slug, pendingDonor);

        return NextResponse.json({
            success: true,
            data: chargeResponse
            // Removed 'donation' field as it is not confirmed yet
        });

    } catch (e) {
        console.error("Midtrans Error:", e);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
