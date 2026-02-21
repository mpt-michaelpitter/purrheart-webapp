import { HeroBanner } from "@/components/home/HeroBanner";
import { CategorySection } from "@/components/home/CategorySection";
import { client } from "@/sanity/lib/client";
import { formatCampaign, categoryToBannerSlide } from "@/lib/formatters";
import {
  latestCampaignsQuery,
  categoriesWithCampaignsQuery,
  bannersQuery,
} from "@/lib/queries";
import type { Category, Banner } from "@/types";

// ── Data Fetching ─────────────────────────────────────────────────────────────

async function getHomeData() {
  const [latest, categories, banners] = await Promise.all([
    client.fetch(latestCampaignsQuery(4), {}, { cache: "no-store" }),
    client.fetch(categoriesWithCampaignsQuery(8), {}, { cache: "no-store" }),
    client.fetch(bannersQuery, {}, { cache: "no-store" }),
  ]);

  // Category images also appear as HeroBanner slides (1 category = 1 slide)
  const categoryBannerSlides: Banner[] = (categories as Category[])
    .filter((c) => c.image)
    .map(categoryToBannerSlide);

  return {
    latest,
    categories: (categories as Category[]).filter(
      (c) => c.campaigns?.length > 0
    ),
    banners: [...banners, ...categoryBannerSlides],
  };
}

// ── Page Component ────────────────────────────────────────────────────────────

export default async function HomePage() {
  const { latest, categories, banners } = await getHomeData();

  return (
    <div className="flex flex-col min-h-screen">
      <HeroBanner banners={banners} />

      {/* Latest campaigns (cross-category) */}
      <CategorySection
        title="Program Donasi Terbaru"
        donations={latest.map(formatCampaign)}
        linkHref="/donasi"
        linkText="Lihat Semua"
      />

      {/* One section per category */}
      {categories.map((category: Category) => (
        <CategorySection
          key={category._id}
          title={category.name}
          donations={category.campaigns.map(formatCampaign)}
          linkHref={`/donasi?category=${category.slug}`}
          linkText={`Lihat ${category.name}`}
        />
      ))}
    </div>
  );
}
