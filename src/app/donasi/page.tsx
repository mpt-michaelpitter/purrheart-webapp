import { client } from "@/sanity/lib/client";
import { formatCampaign } from "@/lib/formatters";
import { categoriesWithCampaignsQuery } from "@/lib/queries";
import { CategorySection } from "@/components/home/CategorySection";
import type { Category } from "@/types";

// ── Data Fetching ─────────────────────────────────────────────────────────────

async function getCategoriesData() {
    const categories = await client.fetch(
        categoriesWithCampaignsQuery(8),
        {},
        { cache: "no-store" }
    );
    return (categories as Category[]).filter(
        (c) => c.campaigns?.length > 0
    );
}

// ── Page Component ────────────────────────────────────────────────────────────

export default async function DonasiPage() {
    const categories = await getCategoriesData();

    return (
        <div className="flex flex-col min-h-screen pb-20">
            {/* ── Page Header ── */}
            <div className="pt-24 pb-10 bg-muted/30 border-b border-border">
                <div className="container mx-auto px-4 md:px-6">
                    <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-3">
                        Program Donasi
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl">
                        Pilih program donasi yang ingin Anda bantu.
                    </p>
                </div>
            </div>

            {/* ── Category Sections ── */}
            <div className="space-y-4">
                {categories.length > 0 ? (
                    categories.map((cat: Category) => (
                        <CategorySection
                            key={cat._id}
                            title={cat.name}
                            donations={cat.campaigns.map(formatCampaign)}
                            linkHref={`/donasi/${cat.slug}`}
                            linkText="Lihat Semua"
                        />
                    ))
                ) : (
                    <div className="container mx-auto px-4 py-20 text-center text-muted-foreground">
                        <p>Belum ada kampanye donasi.</p>
                        <p className="text-xs mt-2">Tambahkan campaign di /studio.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

