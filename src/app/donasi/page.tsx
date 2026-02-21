import { client } from "@/sanity/lib/client";
import { formatCampaign } from "@/lib/formatters";
import {
    categoriesWithCampaignsQuery,
    campaignsByCategoryQuery,
    categoryInfoQuery,
} from "@/lib/queries";
import { CategorySection } from "@/components/home/CategorySection";
import { DonationCard } from "@/components/ui/DonationCard";
import type { Category, SanityCampaign } from "@/types";

// ── Data Fetching ─────────────────────────────────────────────────────────────

type PageMode =
    | { mode: "grouped"; categories: Category[] }
    | { mode: "filtered"; categoryInfo: { name: string; slug: string } | null; campaigns: SanityCampaign[] };

async function getDonasiData(categorySlug?: string): Promise<PageMode> {
    if (categorySlug) {
        const [categoryInfo, campaigns] = await Promise.all([
            client.fetch(categoryInfoQuery, { slug: categorySlug }, { cache: "no-store" }),
            client.fetch(campaignsByCategoryQuery, { slug: categorySlug }, { cache: "no-store" }),
        ]);
        return { mode: "filtered", categoryInfo, campaigns };
    }

    const categories = await client.fetch(
        categoriesWithCampaignsQuery(8),
        {},
        { cache: "no-store" }
    );
    return {
        mode: "grouped",
        categories: (categories as Category[]).filter(
            (c) => c.campaigns?.length > 0
        ),
    };
}

// ── Page Component ────────────────────────────────────────────────────────────

export default async function DonasiPage({
    searchParams,
}: {
    searchParams: { category?: string };
}) {
    const data = await getDonasiData(searchParams?.category);

    return (
        <div className="flex flex-col min-h-screen pb-20">
            {/* ── Page Header ── */}
            <div className="pt-24 pb-10 bg-muted/30 border-b border-border">
                <div className="container mx-auto px-4 md:px-6">
                    {data.mode === "filtered" && data.categoryInfo ? (
                        <>
                            <p className="text-sm text-primary font-semibold mb-1">Kategori</p>
                            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-3">
                                {data.categoryInfo.name}
                            </h1>
                            <a
                                href="/donasi"
                                className="text-sm text-muted-foreground hover:text-primary transition-colors"
                            >
                                ← Lihat semua kategori
                            </a>
                        </>
                    ) : (
                        <>
                            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-3">
                                Program Donasi
                            </h1>
                            <p className="text-lg text-muted-foreground max-w-2xl">
                                Pilih program donasi yang ingin Anda bantu.
                            </p>
                        </>
                    )}
                </div>
            </div>

            {/* ── Filtered View: grid of all campaigns in one category ── */}
            {data.mode === "filtered" && (
                <div className="container mx-auto px-4 md:px-6 py-12">
                    {data.campaigns.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {data.campaigns.map((c) => (
                                <DonationCard key={c._id} {...formatCampaign(c)} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-center py-20 text-muted-foreground">
                            Belum ada campaign di kategori ini.
                        </p>
                    )}
                </div>
            )}

            {/* ── Grouped View: one CategorySection per category ── */}
            {data.mode === "grouped" && (
                <>
                    {data.categories.length > 0 ? (
                        data.categories.map((cat: Category) => (
                            <CategorySection
                                key={cat._id}
                                title={cat.name}
                                donations={cat.campaigns.map(formatCampaign)}
                                linkHref={`/donasi?category=${cat.slug}`}
                                linkText={`Lihat Semua ${cat.name}`}
                            />
                        ))
                    ) : (
                        <div className="container mx-auto px-4 py-20 text-center text-muted-foreground">
                            <p>Belum ada kampanye donasi.</p>
                            <p className="text-xs mt-2">Tambahkan campaign di /studio.</p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
