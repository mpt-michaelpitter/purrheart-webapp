import { NextResponse } from "next/server";
import { core } from "@/lib/midtrans";
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";

const writeClient = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
});

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get("order_id");

    if (!orderId) {
        return NextResponse.json({ error: "Missing order_id" }, { status: 400 });
    }

    try {
        const statusResponse = await core.transaction.status(orderId);
        const status = statusResponse.transaction_status;

        if (status === 'settlement' || status === 'capture') {
            // Find donation by orderId and update status
            // We use fetch to find the ID first because orderId is a field, not the document _id
            const donation = await writeClient.fetch(
                `*[_type == "donation" && orderId == $orderId][0]._id`,
                { orderId }
            );

            if (donation) {
                await writeClient.patch(donation)
                    .set({ status: 'success' })
                    .commit();
            }
        }

        return NextResponse.json(statusResponse);
    } catch (e) {
        console.error("Midtrans Status Check Error:", e);
        return NextResponse.json({ error: "Failed to fetch status" }, { status: 500 });
    }
}
