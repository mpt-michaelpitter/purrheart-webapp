import { AboutSection } from "@/components/home/AboutSection";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Tentang Kami | Purrheart",
    description: "Kenal lebih dekat dengan Purrheart Shelter, rumah bagi 180+ kucing terlantar.",
};

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background  ">
            <AboutSection />
        </div>
    );
}
