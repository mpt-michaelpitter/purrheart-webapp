import { NextResponse } from "next/server";
import { core } from "@/lib/midtrans";
import { verifyDonation } from "@/lib/store";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get("order_id");

    if (!orderId) {
        return NextResponse.json({ error: "Missing order_id" }, { status: 400 });
    }

    try {
        const statusResponse = await core.transaction.status(orderId);

        if (statusResponse.transaction_status === 'settlement' || statusResponse.transaction_status === 'capture') {
            verifyDonation(orderId);
        }

        return NextResponse.json(statusResponse);
    } catch (e) {
        // console.error("Midtrans Status Check Error:", e);
        return NextResponse.json({ error: "Failed to fetch status" }, { status: 500 });
    }
}
