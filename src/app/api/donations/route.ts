import { NextResponse } from "next/server";
import { getDonations, getDonationBySlug, addDonation } from "@/lib/store";

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
        const { slug, amount, name, message, email } = body;

        if (!slug || !amount) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const updatedDonation = addDonation(slug, (current) => ({
            name: name || "Anonim",
            amount: Number(amount),
            time: "Baru saja",
            avatar: null,
            email: email || null,
            message: message || null
        } as any)); // Using 'any' to bypass strict Donor interface if it doesn't have email/message yet, or we should update Donor interface

        if (updatedDonation) {
            return NextResponse.json({ success: true, donation: updatedDonation });
        } else {
            return NextResponse.json({ error: "Donation not found" }, { status: 404 });
        }
    } catch (e) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
