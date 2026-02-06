import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        let category = searchParams.get("category");
        let limitStr = searchParams.get("limit");

        // --- SECURITY ---
        const { sanitizeInput } = await import("@/lib/security");

        // 1. Sanitize Category (prevent query injection)
        if (category) {
            category = sanitizeInput(category);
            // Additional check: Ensure it only contains safe characters for a slug
            if (!/^[a-z0-9-]+$/.test(category)) {
                return NextResponse.json({ error: "Invalid category format" }, { status: 400 });
            }
        }

        // 2. Validate Limit (Must be number)
        let limit = 100;
        if (limitStr) {
            const parsedLimit = parseInt(limitStr);
            if (isNaN(parsedLimit) || parsedLimit <= 0 || parsedLimit > 100) {
                // Enforce max limit of 100 to prevent DoS
                limit = 100;
            } else {
                limit = parsedLimit;
            }
        }
        // --- SECURITY END ---

        let query = `*[_type == "campaign"] | order(_createdAt desc)[0...${limit}] {
            _id,
            title,
            "slug": slug.current,
            "imageSrc": mainImage,
            organizer,
            "currentAmount": coalesce(math::sum(*[_type == "donation" && references(^._id) && status == "success"].amount), 0),
            "donorCount": count(*[_type == "donation" && references(^._id) && status == "success"]),
            targetAmount,
            deadline,
            verified,
            "category": category->slug.current
        }`;

        // Simple client-side filtering (or adjust GROQ if category is provided)
        if (category) {
            query = `*[_type == "campaign" && category->slug.current == "${category}"] | order(_createdAt desc)[0...${limit}] {
                _id,
                title,
                "slug": slug.current,
                "imageSrc": mainImage,
                organizer,
                "currentAmount": coalesce(math::sum(*[_type == "donation" && references(^._id) && status == "success"].amount), 0),
                "donorCount": count(*[_type == "donation" && references(^._id) && status == "success"]),
                targetAmount,
                deadline,
                verified,
                "category": category->slug.current
            }`;
        }

        const campaigns = await client.fetch(query, {}, { cache: 'no-store' });

        return NextResponse.json({
            success: true,
            data: campaigns
        });

    } catch (error) {
        console.error("API Campaigns Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
