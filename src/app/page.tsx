import { HeroBanner } from "@/components/home/HeroBanner";
import { CategorySection } from "@/components/home/CategorySection";
import { donations, educationDonations } from "@/lib/data";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroBanner />

      <CategorySection
        title="Kebaikanmu Harapan untuk Korban Bencana"
        donations={donations}
        linkHref="#bencana"
        linkText="Lihat Semua"
      />

      <CategorySection
        title="Pendidikan untuk Masa Depan"
        donations={educationDonations}
        linkHref="#pendidikan"
        linkText="Lihat Semua"
      />

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
