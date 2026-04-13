import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

/**
 * GET /api/search?q=vaccine
 *
 * Returns up to 6 campaign suggestions matching the query string.
 * Used by the SearchBar component for real-time autocomplete.
 */
export async function GET(req: NextRequest) {
    const q = req.nextUrl.searchParams.get("q")?.trim();

    if (!q || q.length < 2) {
        return NextResponse.json({ results: [] });
    }

    const query = `
        *[_type == "campaign" && title match $pattern] | order(_createdAt desc)[0..5] {
            _id,
            title,
            "slug": slug.current,
            "imageSrc": mainImage,
            "category": category->name
        }
    `;

    const raw = await client.fetch(
        query,
        { pattern: `${q}*` },
        { cache: "no-store" }
    );

    const results = raw.map((c: any) => ({
        id: c._id,
        title: c.title,
        slug: c.slug,
        imageSrc: c.imageSrc ? urlFor(c.imageSrc).width(64).height(64).url() : null,
        category: c.category ?? null,
    }));

    return NextResponse.json({ results });
}
