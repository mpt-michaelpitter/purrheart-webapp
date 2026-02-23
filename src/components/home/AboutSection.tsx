"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { fadeUp, fadeDown, fadeLeft, fadeRight, scalePop, hoverLift, tapPress, viewport } from "@/lib/animations";
import { ArrowRight, Heart, Home, Cat, Sparkles, Shield, Activity } from "lucide-react";
import { Timeline } from "@/components/ui/timeline";
import { Button as MovingBorderButton } from "@/components/ui/moving-border";
import { RotatingBadge } from "@/components/ui/rotating-badge";
import { PawPattern } from "@/components/ui/paw-pattern";

// ── Impact stats ──────────────────────────────────────────────────────────────

const impacts = [
    { icon: Cat, value: "+180", label: "Kucing Dirawat Harian", color: "text-violet-400", bg: "bg-violet-500/10" },
    { icon: Activity, value: "2005", label: "Rescue Aktif Sejak", color: "text-emerald-400", bg: "bg-emerald-500/10" },
    { icon: Home, value: "2014", label: "Shelter Berdiri", color: "text-amber-400", bg: "bg-amber-500/10" },
    { icon: Shield, value: "24/7", label: "Perawatan & Medis", color: "text-blue-400", bg: "bg-blue-500/10" },
];

// ── Timeline data ─────────────────────────────────────────────────────────────

const timelineData = [
    {
        title: "2005",
        content: (
            <MovingBorderButton
                borderRadius="2rem"
                containerClassName="h-auto w-full bg-border p-[3px]"
                className="bg-card text-card-foreground p-6 items-start justify-start text-left"
                duration={3500}
                borderColor="#fdc65c"
            >
                <div className="w-full space-y-2">
                    <div className="flex items-center gap-2">
                        <span className="h-6 w-6 rounded-full bg-[#fdc65c]/20 flex items-center justify-center text-sm">🐾</span>
                        <h4 className="text-lg font-bold text-card-foreground">Awal Mula Rescue</h4>
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                        Perjalanan dimulai dari kepedulian sederhana Ci Mimi — menolong dan merawat
                        kucing-kucing terlantar secara mandiri di rumah. Dari satu kucing, ke kucing lainnya.
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
                borderColor="#fdc65c"
            >
                <div className="w-full space-y-2">
                    <div className="flex items-center gap-2">
                        <span className="h-6 w-6 rounded-full bg-[#fdc65c]/20 flex items-center justify-center text-sm">🏠</span>
                        <h4 className="text-lg font-bold text-card-foreground">Shelter Resmi Berdiri</h4>
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                        Purrheart Shelter dibangun sebagai tempat yang lebih layak — tumbuh dari ruang kecil
                        menjadi rumah pemulihan bagi puluhan nyawa.
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
                borderColor="#fdc65c"
            >
                <div className="w-full space-y-2">
                    <div className="flex items-center gap-2">
                        <span className="h-6 w-6 rounded-full bg-[#fdc65c]/20 flex items-center justify-center text-sm">💛</span>
                        <h4 className="text-lg font-bold text-card-foreground">+180 Kucing Dirawat</h4>
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                        Sekitar 180 ekor kucing dengan cerita masing-masing kini mendapatkan perawatan, kasih sayang,
                        dan rasa aman. Terluka, sakit, ditinggalkan — semua disambut di sini.
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
                borderColor="#fdc65c"
            >
                <div className="w-full space-y-2">
                    <div className="flex items-center gap-2">
                        <span className="h-6 w-6 rounded-full bg-[#fdc65c]/20 flex items-center justify-center text-sm">❤️</span>
                        <h4 className="text-lg font-bold text-card-foreground">Perawatan & Rehabilitasi</h4>
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                        Perawatan harian, medis, dan rehabilitasi — memastikan setiap ekor pulih sepenuhnya
                        dan siap untuk kehidupan yang lebih baik.
                    </p>
                </div>
            </MovingBorderButton>
        ),
    },
];

// ── Component ─────────────────────────────────────────────────────────────────

export function AboutSection() {
    return (
        <section className="relative w-full overflow-hidden bg-background">

            {/* ── Purple Header ────────────────────────────────────────────── */}
            <div className="relative w-full bg-[#562c72] overflow-hidden pb-32 pt-24 px-4 md:px-8 rounded-b-[60px]">
                <PawPattern className="text-white opacity-20" />

                {/* Glow orbs */}
                <div className="absolute top-0 right-0 h-[400px] w-[400px] rounded-full bg-[#fdc65c]/10 blur-[100px]" />
                <div className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-purple-400/10 blur-[80px]" />

                <div className="container mx-auto relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left: Text */}
                    <div className="space-y-7 text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-[#fdc65c] text-xs font-bold tracking-widest uppercase backdrop-blur-sm border border-white/10">
                            <Heart className="w-3.5 h-3.5 fill-current" />
                            EST. 2014 · MEDAN
                        </div>

                        <div className="relative">
                            <h2 className="text-5xl md:text-8xl font-black text-[#fdc65c] leading-[0.85] tracking-tighter drop-shadow-2xl">
                                TENTANG<br />
                                <span className="text-white">PURRHEART.</span>
                            </h2>
                        </div>

                        <p className="text-purple-100/90 text-base md:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0">
                            Purrheart lahir dari kepedulian sederhana — tidak tega melihat kucing-kucing
                            jalanan hidup tanpa perlindungan.
                        </p>

                        {/* Kenapa Purrheart? */}
                        <div className="rounded-2xl border border-white/15 bg-white/8 backdrop-blur-md p-5 space-y-3 text-left">
                            <div className="flex items-center gap-2">
                                <Sparkles className="h-4 w-4 text-[#fdc65c]" />
                                <span className="text-[#fdc65c] font-bold text-sm">Kenapa namanya Purrheart?</span>
                            </div>
                            <p className="text-purple-200/80 text-sm leading-relaxed">
                                <span className="font-semibold text-white">Purr</span> adalah suara dengkuran kucing saat mereka merasa aman dan nyaman.{" "}
                                <span className="font-semibold text-white">Heart</span> adalah alasan kami memulai semuanya.
                            </p>
                            <p className="text-purple-300/70 text-xs italic">
                                Purrheart — menciptakan rasa aman dengan hati, untuk setiap makhluk bernyawa.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-4">
                            <motion.div whileHover={hoverLift} whileTap={tapPress}>
                                <Link
                                    href="/adopsi"
                                    className="group inline-flex items-center gap-2 px-8 py-4 bg-[#fdc65c] text-[#562c72] rounded-2xl font-black text-sm tracking-wide transition-all shadow-[0_20px_50px_rgba(253,198,92,0.3)]"
                                >
                                    Kenal Kucing Kami
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </motion.div>
                            <motion.div whileHover={hoverLift} whileTap={tapPress}>
                                <Link
                                    href="/donasi"
                                    className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/20 text-white rounded-2xl font-bold text-sm hover:bg-white/10 transition-all backdrop-blur-sm"
                                >
                                    Lihat Kebutuhan
                                </Link>
                            </motion.div>
                        </div>
                    </div>

                    {/* Right: Rotating badge */}
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
            </div>

            {/* ── Impact Stats Strip ───────────────────────────────────────── */}
            <div className="container mx-auto px-4 md:px-6 -mt-8 relative z-10 mb-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {impacts.map(({ icon: Icon, value, label, color, bg }) => (
                        <motion.div
                            key={label}
                            variants={scalePop}
                            whileHover={hoverLift}
                            className="flex flex-col items-center gap-2 rounded-3xl border border-border bg-card/80 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] p-6 hover:shadow-xl transition-all duration-300"
                        >
                            <div className={`h-12 w-12 rounded-2xl ${bg} flex items-center justify-center mb-1 shadow-inner`}>
                                <Icon className={`h-6 w-6 ${color}`} />
                            </div>
                            <span className="text-3xl font-black text-foreground tracking-tight">{value}</span>
                            <span className="text-[10px] font-bold text-muted-foreground text-center uppercase tracking-widest leading-tight">{label}</span>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* ── Timeline ─────────────────────────────────────────────────── */}
            <div className="container mx-auto px-4 md:px-6 py-8">
                <div className="mb-10 text-center">
                    <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Perjalanan Kami</p>
                    <h3 className="text-2xl md:text-3xl font-extrabold text-foreground">Dari Satu Kucing, Menjadi Ratusan</h3>
                </div>
                <Timeline data={timelineData} />
            </div>

            {/* ── Bottom CTA ────────────────────────────────────────────────── */}
            <div className="container mx-auto px-4 md:px-6 pb-16">
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#2d1142] to-[#1a0a26] border border-white/5 p-10 md:p-14 text-center">
                    {/* Accent line */}
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#fdc65c]/60 to-transparent" />
                    {/* Glow */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="h-64 w-64 rounded-full bg-violet-600/10 blur-3xl" />
                    </div>

                    <div className="relative z-10 max-w-2xl mx-auto space-y-5">
                        <p className="text-4xl">🐾</p>
                        <h3 className="text-2xl md:text-4xl font-extrabold text-white leading-tight">
                            Hari ini, sekitar{" "}
                            <span className="text-[#fdc65c]">180 ekor</span>{" "}
                            kucing hidup di Purrheart Shelter.
                        </h3>
                        <p className="text-zinc-400 leading-relaxed">
                            Masing-masing datang dengan cerita yang berbeda. Di sini, mereka dirawat, diberi makan,
                            dan dijaga kesehatannya setiap hari.
                        </p>
                        <div className="flex flex-wrap justify-center gap-3 pt-2">
                            <Link
                                href="/donasi"
                                className="inline-flex items-center gap-2 rounded-full bg-[#fdc65c] px-8 py-3.5 text-sm font-bold text-[#3d1f52] hover:scale-105 transition-transform shadow-lg shadow-[#fdc65c]/20"
                            >
                                Lihat Kebutuhan Shelter
                            </Link>
                            <Link
                                href="/adopsi"
                                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
                            >
                                Adopsi Kucing
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
}