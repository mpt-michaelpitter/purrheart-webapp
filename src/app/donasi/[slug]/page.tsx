import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { notFound } from "next/navigation";
import { computeDaysLeft } from "@/lib/formatters";
import { campaignDetailQuery } from "@/lib/queries";
import DonationDetailClient from "./DonationDetailClient";

// ── Data Fetching ─────────────────────────────────────────────────────────────

async function getCampaignDetail(slug: string) {
    return client.fetch(campaignDetailQuery, { slug }, { cache: "no-store" });
}

// ── Page Component ────────────────────────────────────────────────────────────

export default async function DonationDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const campaign = await getCampaignDetail(slug);

    if (!campaign) return notFound();

    const viewData = {
        ...campaign,
        id: campaign._id,
        imageSrc: campaign.imageSrc
            ? urlFor(campaign.imageSrc).width(1200).url()
            : "",
        images: campaign.images ?? [],
        daysLeft: computeDaysLeft(campaign.deadline),
    };

    return <DonationDetailClient data={viewData} />;
}
