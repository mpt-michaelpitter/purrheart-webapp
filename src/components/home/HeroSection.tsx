"use client";

import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";

export function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-[#562c72] via-[#3d1f52] to-[#1a0a2e] py-24 md:py-36 px-4">
            {/* Animated background circles */}
            <div className="absolute -top-32 -left-32 h-[600px] w-[600px] rounded-full bg-purple-500/10 blur-3xl animate-pulse" />
            <div className="absolute -bottom-24 -right-24 h-[400px] w-[400px] rounded-full bg-[#fdc65c]/10 blur-3xl animate-pulse delay-1000" />

            {/* Paw prints decoration */}
            <div className="pointer-events-none absolute inset-0 select-none opacity-[0.04]"
                style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Ccircle cx='20' cy='20' r='8' fill='white'/%3E%3Ccircle cx='35' cy='15' r='6' fill='white'/%3E%3Ccircle cx='10' cy='35' r='6' fill='white'/%3E%3Ccircle cx='40' cy='35' r='10' fill='white'/%3E%3C/svg%3E\")", backgroundSize: "120px 120px" }} />

            <div className="container relative z-10 mx-auto max-w-4xl text-center">
                {/* Tagline chip */}
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#fdc65c] backdrop-blur-sm">
                    <Heart className="h-3 w-3 fill-current" />
                    PURRHEART SHELTER
                </div>

                <h1 className="mb-6 text-4xl font-black leading-tight text-white md:text-6xl lg:text-7xl">
                    Merawat dengan Hati,{" "}
                    <span className="text-[#fdc65c]">Menjaga dengan Kepedulian</span>
                </h1>

                <p className="mx-auto mb-4 max-w-2xl text-base text-purple-200 md:text-lg leading-relaxed">
                    Purrheart Shelter adalah rumah sementara bagi kucing-kucing yang pernah terluka,
                    ditinggalkan, atau kehilangan tempat pulang.
                </p>
                <p className="mx-auto mb-10 max-w-2xl text-base text-purple-300/80 md:text-lg leading-relaxed">
                    Kami merawat, memulihkan, dan menjaga mereka — bersama orang-orang yang peduli.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4">
                    <Link
                        href="/donasi"
                        className="group inline-flex items-center gap-2 rounded-full bg-[#fdc65c] px-8 py-4 text-base font-bold text-[#562c72] shadow-lg shadow-[#fdc65c]/30 transition-all hover:scale-105 hover:shadow-xl active:scale-95"
                    >
                        Lihat Campaign
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                    <Link
                        href="#bantu"
                        className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
                    >
                        Cara Kamu Bisa Membantu
                    </Link>
                </div>

                {/* Quick stats row */}
                <div className="mt-16 flex flex-wrap items-center justify-center gap-8 border-t border-white/10 pt-10">
                    {[
                        { value: "+180", label: "Kucing Dirawat" },
                        { value: "2005", label: "Rescue Aktif Sejak" },
                        { value: "2014", label: "Shelter Berdiri" },
                    ].map((stat) => (
                        <div key={stat.label} className="text-center">
                            <p className="text-3xl font-black text-[#fdc65c]">{stat.value}</p>
                            <p className="text-xs font-medium text-purple-300 mt-1">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
