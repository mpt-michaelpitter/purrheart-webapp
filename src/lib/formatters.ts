// ─── Data Formatters ──────────────────────────────────────────────────────────
// Pure functions that transform raw Sanity data into UI-ready shapes.
// Following DRY: define once, import everywhere — no repeated mapping logic.
// ──────────────────────────────────────────────────────────────────────────────

import { urlFor } from "@/sanity/lib/image";
import type { SanityCampaign, Campaign, Category, Banner } from "@/types";

// ── Campaign Formatting ───────────────────────────────────────────────────────

/**
 * Converts a raw Sanity campaign into a typed Campaign object ready for
 * DonationCard and CategorySection components.
 *
 * @param c - Raw campaign from GROQ projection using CAMPAIGN_CARD_FIELDS
 * @returns Formatted Campaign with resolved image URL and computed daysLeft
 */
export function formatCampaign(c: SanityCampaign): Campaign {
    return {
        id: c._id,
        slug: c.slug,
        imageSrc: c.imageSrc ? urlFor(c.imageSrc).width(800).url() : null,
        title: c.title,
        organizer: c.organizer ?? "Purrheart",
        currentAmount: c.currentAmount ?? 0,
        targetAmount: c.targetAmount ?? 10_000_000,
        donorCount: c.donorCount ?? 0,
        daysLeft: computeDaysLeft(c.deadline),
        verified: c.verified ?? false,
    };
}

// ── Category / Banner Formatting ─────────────────────────────────────────────

/**
 * Converts category images into HeroBanner-compatible slides.
 * Each category with a banner image becomes one carousel slide.
 */
export function categoryToBannerSlide(category: Category): Banner {
    return {
        _id: `cat-${category._id}`,
        title: category.name,
        imageUrl: category.image,
        redirectUrl: `/donasi?category=${category.slug}`,
    };
}

// ── Date Utilities ────────────────────────────────────────────────────────────

/**
 * Computes how many full days remain until a deadline.
 * Returns 0 if no deadline is set or if the deadline has passed.
 */
export function computeDaysLeft(deadline: string | null | undefined): number {
    if (!deadline) return 0;
    const msLeft = new Date(deadline).getTime() - Date.now();
    return Math.max(0, Math.ceil(msLeft / (1000 * 60 * 60 * 24)));
}

/**
 * Formats a number as Indonesian Rupiah.
 * Example: 75000 → "Rp 75.000"
 */
export function formatRupiah(amount: number): string {
    return `Rp ${amount.toLocaleString("id-ID")}`;
}
