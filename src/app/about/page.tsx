import { AboutSection } from "@/components/home/AboutSection";
import { AboutFounderSection } from "@/components/home/AboutFounderSection";
import { AboutValuesSection } from "@/components/home/AboutValuesSection";
import { MascotSection } from "@/components/home/MascotSection";
import { ContactSection } from "@/components/home/ContactSection";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Tentang Kami | Purrheart Shelter",
    description:
        "Kenal lebih dekat dengan Purrheart Shelter — shelter kucing di Medan yang berdiri sejak 2014, merawat 180+ kucing setiap hari dengan penuh kepedulian.",
    keywords: ["purrheart", "shelter kucing medan", "tentang purrheart", "adopsi kucing", "ci mimi"],
    openGraph: {
        title: "Tentang Purrheart Shelter",
        description: "Dari satu orang, satu tekad, menjadi rumah bagi ratusan kucing.",
        type: "website",
    },
};

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* 1. Hero + timeline + stats (existing) */}
            <AboutSection />

            {/* 2. Founder spotlight */}
            <AboutFounderSection />

            {/* 3. Values / What we do every day */}
            <AboutValuesSection />

            {/* 4. Bakkien mascot story */}
            <MascotSection />

            {/* 5. Contact info + visit CTA */}
            <ContactSection />
        </div>
    );
}
