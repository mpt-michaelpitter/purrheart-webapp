// ─── GROQ Queries ─────────────────────────────────────────────────────────────
// Centralised GROQ query fragments and full queries for the Purrheart platform.
// DRY principle: define once, reuse everywhere — no copy-pasted GROQ strings.
// ──────────────────────────────────────────────────────────────────────────────

// ── Shared Projections ────────────────────────────────────────────────────────

/**
 * Standard campaign card fields — used in list views, home, and donasi pages.
 * Computes aggregate `currentAmount` and `donorCount` from related donations.
 */
export const CAMPAIGN_CARD_FIELDS = `
    _id,
    title,
    "slug": slug.current,
    "imageSrc": mainImage,
    organizer,
    "currentAmount": coalesce(
        math::sum(*[_type == "donation" && references(^._id) && status == "success"].amount),
        0
    ),
    "donorCount": count(
        *[_type == "donation" && references(^._id) && status == "success"]
    ),
    targetAmount,
    deadline,
    verified
`;

// ── Campaign Queries ──────────────────────────────────────────────────────────

/** Latest N campaigns globally, newest first */
export const latestCampaignsQuery = (limit = 4) =>
    `*[_type == "campaign"] | order(_createdAt desc)[0..${limit - 1}] {
        ${CAMPAIGN_CARD_FIELDS}
    }`;

/** All categories with their top N campaigns + banner image */
export const categoriesWithCampaignsQuery = (campaignsPerCategory = 8) =>
    `*[_type == "category"] | order(_createdAt asc) {
        _id,
        "name": name,
        "slug": slug.current,
        "image": banner->imageUrl,
        "campaigns": *[_type == "campaign" && references(^._id)] | order(_createdAt desc)[0..${campaignsPerCategory - 1}] {
            ${CAMPAIGN_CARD_FIELDS}
        }
    }`;

/** All campaigns in a specific category by slug */
export const campaignsByCategoryQuery = `
    *[_type == "campaign" && category->slug.current == $slug] | order(_createdAt desc) {
        ${CAMPAIGN_CARD_FIELDS}
    }
`;

/** Minimal category info by slug (for page headers) */
export const categoryInfoQuery = `
    *[_type == "category" && slug.current == $slug][0] {
        "name": name,
        "slug": slug.current
    }
`;

/** All banner slides */
export const bannersQuery = `
    *[_type == "banner"] {
        _id,
        title,
        imageUrl,
        redirectUrl
    }
`;

/** Full campaign detail (for /donasi/[slug]) */
export const campaignDetailQuery = `
    *[_type == "campaign" && slug.current == $slug][0] {
        _id,
        title,
        "slug": slug.current,
        "imageSrc": mainImage,
        "images": galleryFotos[]-> {
            "image": image,
            "name": name
        },
        organizer,
        "currentAmount": coalesce(
            math::sum(*[_type == "donation" && campaign._ref == ^._id && status == "success"].amount),
            0
        ),
        targetAmount,
        deadline,
        verified,
        description,
        saweriaUsername,
        "updates": updates[] {
            "title": updateTitle,
            "publishedAt": publishedAt,
            "content": content
        },
        "donorCount": count(
            *[_type == "donation" && references(^._id) && status == "success"]
        ),
        "donors": *[_type == "donation" && references(^._id) && status == "success"] | order(_createdAt desc) {
            "name": donorName,
            amount,
            "message": wish,
            "time": coalesce(createdAt, _createdAt),
            "avatar": ""
        }
    }
`;

// ── Adopsi Kucing Queries ──────────────────────────────────────────────────────

/** Shared projection for adoptable cat card fields */
const CAT_CARD_PROJECTION = `
    _id,
    name,
    "slug": slug.current,
    gender,
    ageText,
    colorPattern,
    healthStatus,
    healthNote,
    isVaccinated,
    isSterilized,
    specialNeeds,
    personalityTags,
    adoptionStatus,
    isUrgent,
    publishedAt,
    "mainPhoto": mainPhoto {
        asset,
        hotspot,
        crop,
        alt
    }
`;

/**
 * All available cats (excludes adopted / unavailable).
 * Ordered: urgent first → newest first.
 */
export const adopsiCatsQuery = `
    *[_type == "adopsiKucing"
        && adoptionStatus != "diadopsi"
        && adoptionStatus != "tidak_tersedia"
    ] | order(isUrgent desc, publishedAt desc) {
        ${CAT_CARD_PROJECTION}
    }
`;

/**
 * Cats filtered by a specific adoption status.
 * @param status  'siap' | 'khusus' | 'proses'
 */
export const adopsiCatsByStatusQuery = (status: string) => `
    *[_type == "adopsiKucing" && adoptionStatus == "${status}"]
    | order(isUrgent desc, publishedAt desc) {
        ${CAT_CARD_PROJECTION}
    }
`;

/**
 * Single cat profile by slug — includes gallery + full bio.
 */
export const adopsiCatDetailQuery = `
    *[_type == "adopsiKucing" && slug.current == $slug][0] {
        ${CAT_CARD_PROJECTION},
        "gallery": gallery[] {
            asset,
            hotspot,
            crop,
            alt
        },
        bio
    }
`;
