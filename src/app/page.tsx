import { HeroBanner } from "@/components/home/HeroBanner";
import { CategorySection } from "@/components/home/CategorySection";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

async function getData() {
  // Campaign projection fields (reused to ensure consistency)
  const campaignFields = `
        _id,
        title,
        "slug": slug.current,
        "imageSrc": mainImage,
        organizer,
        "currentAmount": coalesce(math::sum(*[_type == "donation" && references(^._id) && status == "success"].amount), 0),
        "donorCount": count(*[_type == "donation" && references(^._id) && status == "success"]),
        targetAmount,
        deadline,
        verified
    `;

  // 1. Fetch Latest Campaigns (Global)
  const latestQuery = `*[_type == "campaign"] | order(_createdAt desc)[0..3] {
        ${campaignFields}
    }`;

  // 2. Fetch Categories and their specific campaigns
  const categoryQuery = `*[_type == "category"] {
        _id,
        title,
        "slug": slug.current,
        "campaigns": *[_type == "campaign" && references(^._id)] | order(_createdAt desc)[0..3] {
            ${campaignFields}
        }
    }`;

  const [latest, categories] = await Promise.all([
    client.fetch(latestQuery, {}, { cache: 'no-store' }),
    client.fetch(categoryQuery, {}, { cache: 'no-store' })
  ]);

  return {
    latest,
    categories: categories.filter((c: any) => c.campaigns && c.campaigns.length > 0)
  };
}

// Helper to format data for UI component
const formatCampaign = (c: any) => ({
  id: c._id,
  slug: c.slug,
  imageSrc: c.imageSrc ? urlFor(c.imageSrc).width(800).url() : "",
  title: c.title,
  organizer: c.organizer || "Bantu Warga",
  currentAmount: c.currentAmount || 0,
  targetAmount: c.targetAmount || 10000000,
  donorCount: c.donorCount || 0,
  daysLeft: c.deadline ? Math.ceil((new Date(c.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : 0,
  verified: c.verified
});

export default async function Home() {
  const { latest, categories } = await getData();
  const latestCampaigns = latest.map(formatCampaign);

  return (
    <div className="flex flex-col min-h-screen">
      <HeroBanner />

      {/* Always show Latest Campaigns first */}
      <CategorySection
        title="Program Donasi Terbaru"
        donations={latestCampaigns}
        linkHref="/donasi"
        linkText="Lihat Semua"
      />

      {/* Dynamically Render Each Category Section */}
      {categories.map((category: any) => (
        <CategorySection
          key={category._id}
          title={category.title}
          donations={category.campaigns.map(formatCampaign)}
          linkHref={`/donasi?category=${category.slug}`}
          linkText={`Lihat ${category.title}`}
        />
      ))}

      {/* Banner CTA App */}
      <section className="py-16   border-t border-b border-border">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 relative aspect-square md:aspect-video w-full max-h-[400px] rounded-2xl overflow-hidden shadow-2xl">
            {/* Using a reliable tech/app image */}
            <img
              src="https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1200&auto=format&fit=crop"
              alt="App Preview"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold leading-tight text-foreground">
              Berbuat baik setiap hari menjadi lebih mudah
            </h2>
            <p className="text-lg text-muted-foreground">
              Download aplikasi purrhearth sekarang untuk kemudahan berdonasi, memantau perkembangan program, dan mendapatkan laporan terkini langsung dari genggamanmu.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="h-12 px-6 rounded-lg bg-[#28292a8c]/80  text-white flex items-center gap-2 transition-all   ">
                <span className="font-bold">Google Play</span>
              </button>
              <button className="h-12 px-6 rounded-lg bg-[#28292a8c]/80  text-white flex items-center gap-2  transition-all    ">
                <span className="font-bold">App Store</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
