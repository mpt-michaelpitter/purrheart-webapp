"use client";

import Link from "next/link";
import { ArrowRight, Heart, Users, Calendar, Cat } from "lucide-react";
import { motion } from "framer-motion";
import {
    heroHeadline, heroSub, heroCta,
    statCard, cardStagger, fadeDown, viewport,
} from "@/lib/animations";

const stats = [
    { value: "+180", label: "Kucing Dirawat", icon: Cat },
    { value: "2005", label: "Rescue Sejak", icon: Calendar },
    { value: "2014", label: "Shelter Berdiri", icon: Heart },
    { value: "+20K", label: "Donatur Baik", icon: Users },
];

export function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-[#562c72]">
            {/* ── Background layers ──────────────────────────────────────── */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#562c72] via-[#3d1f52] to-[#1e0d38]" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[700px] rounded-full bg-purple-500/20 blur-[120px]" />
            <div className="absolute -bottom-20 -right-20 h-[400px] w-[400px] rounded-full bg-[#fdc65c]/10 blur-[100px]" />
            <div
                className="absolute inset-0 opacity-[0.06]"
                style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "28px 28px" }}
            />

            {/* ── Content ──────────────────────────────────────────────────── */}
            <div className="w-full relative z-10 mx-auto px-4 py-20 md:py-32 md:px-8 text-center">

                {/* Pill badge */}
                <motion.div
                    variants={fadeDown}
                    initial="hidden"
                    animate="show"
                    viewport={viewport}
                    className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#fdc65c] backdrop-blur-md"
                >
                    <Heart className="h-3 w-3 fill-current" />
                    Purrheart Shelter · Medan
                </motion.div>

                {/* Headline */}
                <motion.h1
                    variants={heroHeadline}
                    initial="hidden"
                    animate="show"
                    className="mb-6 text-4xl font-black leading-[1.1] tracking-tight text-white md:text-6xl lg:text-7xl"
                >
                    Merawat dengan Hati,{" "}
                    <br className="hidden md:block" />
                    <span className="text-[#fdc65c]">Menjaga dengan Kepedulian</span>
                </motion.h1>

                {/* Sub */}
                <motion.p
                    variants={heroSub}
                    initial="hidden"
                    animate="show"
                    className="mx-auto mb-3 max-w-2xl text-base text-purple-200/90 md:text-lg leading-relaxed"
                >
                    Purrheart Shelter adalah rumah sementara bagi kucing-kucing yang pernah terluka,
                    ditinggalkan, atau kehilangan tempat pulang.
                </motion.p>
                <motion.p
                    variants={heroSub}
                    initial="hidden"
                    animate="show"
                    className="mx-auto mb-10 max-w-xl text-sm text-purple-300/70 leading-relaxed"
                >
                    Kami merawat, memulihkan, dan menjaga mereka — bersama orang-orang yang peduli.
                </motion.p>

                {/* CTAs */}
                <motion.div
                    variants={heroCta}
                    initial="hidden"
                    animate="show"
                    className="flex flex-wrap items-center justify-center gap-4"
                >
                    <Link
                        href="/donasi"
                        className="group relative overflow-hidden inline-flex items-center gap-2 rounded-full bg-[#fdc65c] px-8 py-4 text-sm font-bold text-[#3d1f52] shadow-2xl shadow-[#fdc65c]/30 transition-all hover:scale-105 hover:shadow-[#fdc65c]/50 active:scale-95"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            Lihat Campaign
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </span>
                        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700" />
                    </Link>

                    <Link
                        href="/adopsi"
                        className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/8 px-8 py-4 text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-white/15 hover:border-white/40"
                    >
                        Adopsi Kucing
                    </Link>
                </motion.div>

                {/* ── Stats bar ──────────────────────────────────────────────── */}
                <motion.div
                    variants={cardStagger}
                    initial="hidden"
                    animate="show"
                    viewport={viewport}
                    className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-white/10 bg-white/10"
                >
                    {stats.map(({ value, label, icon: Icon }) => (
                        <motion.div
                            key={label}
                            variants={statCard}
                            className="flex flex-col items-center justify-center gap-1 bg-white/5 backdrop-blur-sm py-7 px-4 hover:bg-white/10 transition-colors"
                        >
                            <Icon className="h-5 w-5 text-[#fdc65c] mb-1 opacity-80" />
                            <span className="text-2xl font-black text-white md:text-3xl">{value}</span>
                            <span className="text-[10px] font-medium text-purple-300 uppercase tracking-wider text-center">{label}</span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
        </section>
    );
}
