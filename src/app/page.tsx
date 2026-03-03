import { HeroBanner } from "@/components/home/HeroBanner";
import { HeroSection } from "@/components/home/HeroSection";
import { AboutSection } from "@/components/home/AboutSection";
import { CategorySection } from "@/components/home/CategorySection";
import { AdoptionSection } from "@/components/home/AdoptionSection";
import { OtaSection } from "@/components/home/OtaSection";
import { MascotSection } from "@/components/home/MascotSection";
import { HowToHelpSection } from "@/components/home/HowToHelpSection";
import { FaqSection } from "@/components/home/FaqSection";
import { ContactSection } from "@/components/home/ContactSection";
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
    client.fetch(latestCampaignsQuery(6), {}, { cache: "no-store" }),
    client.fetch(categoriesWithCampaignsQuery(6), {}, { cache: "no-store" }),
    client.fetch(bannersQuery, {}, { cache: "no-store" }),
  ]);

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

      {/* ① Banner carousel from Sanity — only shown if banners exist */}
      {banners.length > 0 && <HeroBanner banners={banners} />}

      {/* ② Main hero — headline, stats, CTAs */}
      <HeroSection />

      {/* ④ Latest campaigns */}
      <CategorySection
        title="Campaign Aktif"
        donations={latest.map(formatCampaign)}
        linkHref="/donasi"
        linkText="Lihat Semua"
      />

      {/* ④ Per-category sections (max shown by categoriesWithCampaignsQuery) */}
      {categories.map((category: Category) => (
        <CategorySection
          key={category._id}
          title={category.name}
          donations={category.campaigns.map(formatCampaign)}
          linkHref={`/donasi/${category.slug}`}
          linkText={`Lihat ${category.name}`}
        />
      ))}

      {/* ⑤ How to help — compact, links out to detail pages */}
      <HowToHelpSection />





      {/* 9. Mascot — Bakkien's Story */}
      <MascotSection />

      {/* 10. FAQ */}
      <FaqSection />

      {/* 11. Contact */}

    </div>
  );
}
