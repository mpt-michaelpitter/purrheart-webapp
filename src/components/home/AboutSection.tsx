"use client";

import Link from "next/link";
import { ArrowRight, Heart, Home, Activity, Calendar } from "lucide-react";
import { Timeline } from "@/components/ui/timeline";
import { Button as MovingBorderButton } from "@/components/ui/moving-border";
import { RotatingBadge } from "@/components/ui/rotating-badge";
import { PawPattern } from "@/components/ui/paw-pattern";

export function AboutSection() {
    return (
        <section className="relative w-full overflow-hidden bg-background">
            {/* New Purple Header */}
            <div className="relative w-full bg-[#562c72] overflow-hidden py-24 px-4 md:px-8 rounded-b-[60px] pb-32">
                <PawPattern className="opacity-300 text-white" />

                <div className="container mx-auto relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8 text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-[#fdc65c] font-bold tracking-widest uppercase backdrop-blur-sm border border-white/10">
                            <Heart className="w-4 h-4 fill-current" />
                            EST. 2014
                        </div>

                        <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-[#fdc65c] leading-[0.9] trac drop-shadow-sm font-heading">
                            TENTANG<br />
                            <span className="text-white">PURRHEART.</span>
                        </h2>

                        <p className="text-purple-100/90 text-lg md:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
                            Lahir dari kepedulian sederhana, tumbuh menjadi tempat perlindungan bagi ratusan ekor kucing jalanan.
                        </p>

                        <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-4">
                            <Link href="/adopsi" className="group relative inline-flex items-center gap-3 px-8 py-4 bg-[#fdc65c] text-[#562c72] rounded-full font-black text-lg tracking-wide transition-transform hover:scale-105 active:scale-95 shadow-xl hover:shadow-[#fdc65c]/20">
                                KENALAN YUK!
                                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </div>

                    <div className="relative flex justify-center lg:justify-end">
                        <div className="relative">
                            <div className="absolute inset-0 bg-[#fdc65c] rounded-full blur-[80px] opacity-20 animate-pulse" />
                            <RotatingBadge
                                text="• EST. 2014 • PURRHEART • SHELTER •"
                                size={220}
                                icon={<Home className="w-10 h-10 text-[#562c72] fill-current" />}
                                duration={15}
                                className="bg-white/5 backdrop-blur-md rounded-full border border-white/10 shadow-2xl"
                            />
                        </div>
                    </div>
                </div>

                {/* Visual Divider to white section */}
               
            </div>

            {/* Timeline Section Container */}
            <div className="container mx-auto px-4 md:px-6 py-12">

                {/* Timeline Section */}
                <Timeline data={[
                    {
                        title: "2005",
                        content: (
                            <MovingBorderButton
                                borderRadius="2rem"
                                containerClassName="h-auto w-full bg-border p-[3px]"
                                className="bg-card text-card-foreground p-6 items-start justify-start text-left"
                                duration={3500}
                                borderColor="#ffd903ff"
                            >
                                <div className="w-full">
                                    <h4 className="text-xl font-bold mb-2 text-card-foreground">Awal Mula Rescue</h4>
                                    <p className="text-neutral-600 leading-relaxed">
                                        Rescue aktif dimulai. Perjalanan ini berawal dari kepedulian sederhana Ci Mimi yang menolong dan merawat kucing-kucing terlantar secara mandiri di rumah.
                                    </p>
                                </div>
                            </MovingBorderButton>
                        ),
                    },
                    {
                        title: "2014",
                        content: (
                            <MovingBorderButton
                                borderRadius="2rem"
                                containerClassName="h-auto w-full bg-border p-[3px]"
                                className="bg-card text-card-foreground p-6 items-start justify-start text-left"
                                duration={3000}
                                borderColor="#ffd903ff"
                            >
                                <div className="w-full">
                                    <h4 className="text-xl font-bold mb-2 text-card-foreground">Shelter Berdiri</h4>
                                    <p className="text-neutral-600 leading-relaxed">
                                        Purrheart Shelter resmi dibangun sebagai tempat yang lebih layak bagi mereka untuk bertahan dan pulih, tumbuh dari ruang kecil menjadi rumah bagi banyak nyawa.
                                    </p>
                                </div>
                            </MovingBorderButton>
                        ),
                    },
                    {
                        title: "Sekarang",
                        content: (
                            <MovingBorderButton
                                borderRadius="2rem"
                                containerClassName="h-auto w-full bg-border p-[3px]"
                                className="bg-card text-card-foreground p-6 items-start justify-start text-left"
                                duration={3200}
                                borderColor="#ffd903ff"
                            >
                                <div className="w-full">
                                    <h4 className="text-xl font-bold mb-2 text-card-foreground">+180 Kucing Dirawat</h4>
                                    <p className="text-neutral-600 leading-relaxed">
                                        Hari ini, sekitar 180 ekor kucing hidup di Purrheart Shelter. Masing-masing dengan kisahnya sendiri—terluka, sakit, atau ditinggalkan—kini mendapatkan perawatan, kasih sayang, dan rasa aman.
                                    </p>
                                </div>
                            </MovingBorderButton>
                        ),
                    },
                    {
                        title: "Misi",
                        content: (
                            <MovingBorderButton
                                borderRadius="2rem"
                                containerClassName="h-auto w-full bg-border p-[3px]"
                                className="bg-card text-card-foreground p-6 items-start justify-start text-left"
                                duration={3800}
                                borderColor="#ffd903ff"
                            >
                                <div className="w-full">
                                    <h4 className="text-xl font-bold mb-2 text-card-foreground">Active Care & Rehab</h4>
                                    <p className="text-neutral-600 leading-relaxed">
                                        Kami terus berkomitmen menyediakan perawatan harian, medis, dan rehabilitasi untuk setiap ekor yang membutuhkan, memastikan mereka pulih sepenuhnya.
                                    </p>
                                </div>
                            </MovingBorderButton>
                        ),
                    },
                ]} />

                {/* Bottom Story & CTA */}
                <div className="bg-gradient-to-r from-zinc-900 to-zinc-950 rounded-3xl p-8 md:p-12 text-center space-y-8 relative overflow-hidden border border-white/5">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

                    <div className="max-w-3xl mx-auto space-y-6 relative z-10">
                        <h3 className="text-3xl md:text-4xl font-bold text-white">
                            Hari ini, sekitar 180 ekor kucing hidup di Purrheart Shelter.
                        </h3>
                        <p className="text-zinc-400 text-lg leading-relaxed">
                            Masing-masing datang dengan cerita yang berbeda, ada yang terluka, sakit, ditinggalkan, atau kehilangan rasa aman. Di sini, mereka dirawat, diberi makan, dan dijaga kesehatannya setiap hari.
                        </p>

                        <div className="pt-4">
                            <Link href="/donasi" className="inline-flex h-12 items-center justify-center rounded-xl bg-white text-black px-8 text-sm font-bold transition-transform hover:scale-105 active:scale-95 hover:bg-zinc-100">
                                Lihat Kebutuhan Shelter
                            </Link>
                        </div>
                    </div>

                    {/* Background Noise/Texture */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
                </div>

            </div>
        </section>
    );
}

// Removing StatCard component since it's no longer used
