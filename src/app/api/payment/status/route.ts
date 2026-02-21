// import { NextResponse } from "next/server";
// import { core } from "@/lib/midtrans";
// import { createClient } from "next-sanity";
// import { apiVersion, dataset, projectId } from "@/sanity/env";

// ─── DINONAKTIFKAN: Payment Status Check via Midtrans ───
// Route ini digunakan untuk mengecek status pembayaran Midtrans (QRIS / Bank Transfer).
// Saat ini tidak digunakan karena hanya memakai Saweria via Webhook.
// Untuk mengaktifkan kembali, uncomment seluruh file ini.

// export async function GET(request: Request) {
//     const { searchParams } = new URL(request.url);
//     const orderId = searchParams.get("order_id");
//
//     if (!orderId) {
//         return NextResponse.json({ error: "Missing order_id" }, { status: 400 });
//     }
//
//     try {
//         const writeClient = createClient({ projectId, dataset, apiVersion, useCdn: false, token: process.env.SANITY_API_TOKEN });
//         const statusResponse = await core.transaction.status(orderId);
//         const status = statusResponse.transaction_status;
//
//         if (status === 'settlement' || status === 'capture') {
//             const donation = await writeClient.fetch(
//                 `*[_type == "donation" && orderId == $orderId][0]._id`,
//                 { orderId }
//             );
//             if (donation) {
//                 await writeClient.patch(donation).set({ status: 'success' }).commit();
//             }
//         }
//
//         return NextResponse.json(statusResponse);
//     } catch (e) {
//         console.error("Midtrans Status Check Error:", e);
//         return NextResponse.json({ error: "Failed to fetch status" }, { status: 500 });
//     }
// }

import { NextResponse } from "next/server";

// Placeholder — route ini nonaktif saat Saweria digunakan
export async function GET() {
    return NextResponse.json({ message: "Payment status check disabled. Using Saweria webhook instead." }, { status: 200 });
}
