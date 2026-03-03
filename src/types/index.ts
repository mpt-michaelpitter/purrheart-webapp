// ─── Domain Types ─────────────────────────────────────────────────────────────
// Centralised TypeScript interfaces for the Purrheart donation platform.
// All shared types live here to enforce consistency across the app.
// ──────────────────────────────────────────────────────────────────────────────

/** Raw campaign document from Sanity (after GROQ projection) */
export interface SanityCampaign {
    _id: string;
    title: string;
    slug: string;
    imageSrc: any | null;     // Sanity image asset reference
    organizer: string | null;
    currentAmount: number;
    donorCount: number;
    targetAmount: number;
    deadline: string | null;  // ISO date string
    verified: boolean;
}

/** Formatted campaign ready for UI components */
export interface Campaign {
    id: string;
    slug: string;
    imageSrc: string | null;  // Fully resolved URL or null
    title: string;
    organizer: string;
    currentAmount: number;
    targetAmount: number;
    donorCount: number;
    daysLeft: number;
    verified: boolean;
}

/** A single donor entry (formatted from Sanity donation doc) */
export interface Donor {
    name: string;
    amount: number;
    message: string | null;
    time: string;             // ISO date string
    avatar: string;
}

/** Full campaign detail page data */
export interface CampaignDetail extends Campaign {
    description: any;         // Portable Text blocks
    images: GalleryImage[];
    donors: Donor[];
    updates: any[];
}

/** Gallery image item */
export interface GalleryImage {
    image: any | null;        // Sanity image asset
    name?: string;
    fallbackSrc?: string;     // Direct URL (used when no Sanity asset)
}

/** Category with its campaigns */
export interface Category {
    _id: string;
    name: string;
    slug: string;
    image: any | null;        // Sanity image asset (from banner)
    campaigns: SanityCampaign[];
}

/** Banner slide for HeroBanner carousel */
export interface Banner {
    _id: string;
    title: string;
    imageUrl: any;            // Sanity image asset reference
    redirectUrl?: string;     // Optional manual URL (for mock data)
    categorySlug?: string;    // Automatic URL (from Sanity ref)
}

/** Saweria webhook payload */
export interface SaweriaWebhookPayload {
    id: string;
    type: string;
    amount_raw: number;
    cut?: number;
    donator_name: string;
    donator_email: string;
    message: string;
    created_at: string;
    failure_code: string | null;
}

/** Pending donation creation request body */
export interface CreatePendingDonationRequest {
    donorName: string;
    campaignSlug: string;
    message?: string;
    isAnonymous?: boolean;
}
