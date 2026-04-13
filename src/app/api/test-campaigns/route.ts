import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export async function GET() {
    try {
        const campaigns = await client.fetch(`*[_type == "campaign"]{ title, "slug": slug.current }`);
        return NextResponse.json({ campaigns });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
