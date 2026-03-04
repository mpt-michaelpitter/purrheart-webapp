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
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

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
        const categoryImageUrl = categoryData.info.image
            ? urlFor(categoryData.info.image).width(1920).height(600).url()
            : null;

        return (
            <div className="flex flex-col min-h-screen pb-20">
                {/* ── Rich Category Header ── */}
                <div className="relative h-[40vh] md:h-[50vh] min-h-[350px] w-full flex items-center overflow-hidden">
                    {/* Background Image */}
                    {categoryImageUrl ? (
                        <Image
                            src={categoryImageUrl}
                            alt={categoryData.info.name}
                            fill
                            priority
                            className="object-cover"
                        />
                    ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-600/20" />
                    )}

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                    <div className="absolute inset-0 bg-black/20" />

                    {/* Content */}
                    <div className="container mx-auto px-4 md:px-8 relative z-10 pt-16">
                        <div className="max-w-3xl space-y-4">
                            <Link
                                href="/donasi"
                                className="inline-flex items-center text-sm font-semibold text-primary-foreground/90 hover:text-white transition-colors bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full"
                            >
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Semua Kategori
                            </Link>

                            <div className="space-y-2">
                                <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight drop-shadow-sm">
                                    {categoryData.info.name}
                                </h1>
                                {categoryData.info.description && (
                                    <p className="text-lg md:text-xl text-white/90 font-medium max-w-2xl leading-relaxed drop-shadow-sm">
                                        {categoryData.info.description}
                                    </p>
                                )}
                            </div>
                        </div>
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
