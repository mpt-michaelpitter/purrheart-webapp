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
    client.fetch(latestCampaignsQuery(4), {}, { cache: "no-store" }),
    client.fetch(categoriesWithCampaignsQuery(8), {}, { cache: "no-store" }),
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

      {/* 1. Hero Banner (carousel from Sanity) */}
      <HeroBanner banners={banners} />

      {/* 2. Hero Section — Purrheart headline + CTA */}
      <HeroSection />

      {/* 3. About Purrheart — Timeline 2005 → 2014 → Sekarang */}
      
      {/* 4. Latest Campaigns */}
      <CategorySection
        title="Campaign Purrheart"
        donations={latest.map(formatCampaign)}
        linkHref="/donasi"
        linkText="Lihat Semua"
      />

      {/* 5. Per-category sections */}
      {categories.map((category: Category) => (
        <CategorySection
          key={category._id}
          title={category.name}
          donations={category.campaigns.map(formatCampaign)}
          linkHref={`/donasi?category=${category.slug}`}
          linkText={`Lihat ${category.name}`}
        />
      ))}

      {/* 6. How You Can Help */}
      <HowToHelpSection />

      {/* 7. Adoption */}
      <AdoptionSection />

      {/* 8. Orang Tua Asuh */}
      <OtaSection />

      {/* 9. Mascot — Bakkien's Story */}
      <MascotSection />

      {/* 10. FAQ */}
      <FaqSection />

      {/* 11. Contact */}
      <ContactSection />

    </div>
  );
}
