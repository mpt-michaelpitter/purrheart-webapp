import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { notFound } from "next/navigation";
import { computeDaysLeft, formatCampaign } from "@/lib/formatters";
import {
    campaignDetailQuery,
    categoryInfoQuery,
    campaignsByCategoryQuery
} from "@/lib/queries";
import DonationDetailClient from "./DonationDetailClient";
import { DonationCard } from "@/components/ui/DonationCard";
import type { SanityCampaign } from "@/types";

// ── Data Fetching ─────────────────────────────────────────────────────────────

async function getCategoryData(slug: string) {
    const [categoryInfo, campaigns] = await Promise.all([
        client.fetch(categoryInfoQuery, { slug }, { cache: "no-store" }),
        client.fetch(campaignsByCategoryQuery, { slug }, { cache: "no-store" }),
    ]);
    return categoryInfo ? { info: categoryInfo, campaigns } : null;
}

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

    // 1. Try fetching as category
    const categoryData = await getCategoryData(slug);

    if (categoryData) {
        return (
            <div className="flex flex-col min-h-screen pb-20">
                {/* ── Category Header ── */}
                <div className="pt-24 pb-10 bg-muted/30 border-b border-border">
                    <div className="container mx-auto px-4 md:px-6">
                        <p className="text-sm text-primary font-semibold mb-1">Kategori</p>
                        <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-3">
                            {categoryData.info.name}
                        </h1>
                        <a
                            href="/donasi"
                            className="text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                            ← Lihat semua kategori
                        </a>
                    </div>
                </div>

                {/* ── Category Campaigns ── */}
                <div className="container mx-auto px-4 md:px-6 py-12">
                    {categoryData.campaigns.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {categoryData.campaigns.map((c: SanityCampaign) => (
                                <DonationCard key={c._id} {...formatCampaign(c)} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-center py-20 text-muted-foreground">
                            Belum ada campaign di kategori ini.
                        </p>
                    )}
                </div>
            </div>
        );
    }

    // 2. Try fetching as campaign
    const campaign = await getCampaignDetail(slug);

    if (!campaign) return notFound();

    const imageSrc = campaign.imageSrc
        ? (typeof campaign.imageSrc === 'string' ? campaign.imageSrc : urlFor(campaign.imageSrc).width(1200).url())
        : "";

    const viewData = {
        ...campaign,
        id: campaign._id,
        imageSrc,
        images: campaign.images ?? [],
        daysLeft: computeDaysLeft(campaign.deadline),
    };

    return <DonationDetailClient data={viewData} />;
}
