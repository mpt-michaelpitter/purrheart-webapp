"use client";

import Link from "next/link";
import { ArrowRight, Heart, Repeat2, Home, Baby, Package } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp, cardStagger, fadeIn, hoverLift, tapPress, viewport } from "@/lib/animations";

const ways = [
    {
        title: "Tentang Kami",
        href: "/about",
        image: "https://plus.unsplash.com/premium_photo-1707353401897-da9ba223f807?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y2F0fGVufDB8fDB8fHww",
        color: "bg-emerald-500",
        pathColor: "fill-emerald-500"
    },
    {
        title: "Donasi",
        href: "/donasi",
        image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=800&auto=format&fit=crop",
        color: "bg-blue-500",
        pathColor: "fill-blue-500"
    },
    {
        title: "Adopsi",
        href: "/adopsi",
        image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=800&auto=format&fit=crop",
        color: "bg-rose-500",
        pathColor: "fill-rose-500"
    },
    {
        title: "Orang Tua Asuh",
        href: "/adopsi#ota",
        image: "https://images.unsplash.com/photo-1511044568932-338cba0ad803?q=80&w=800&auto=format&fit=crop",
        color: "bg-amber-500",
        pathColor: "fill-amber-500"
    },
    {
        title: "Donasi Barang",
        href: "https://wa.me/6281216007070",
        image: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?q=80&w=800&auto=format&fit=crop",
        color: "bg-violet-500",
        pathColor: "fill-violet-500"
    },
];

export function HowToHelpSection() {
    return (
        <section id="bantu" className="relative overflow-hidden bg-background py-20">
            {/* Ambient glow */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 h-64 w-1/2 bg-primary/5 blur-3xl rounded-full pointer-events-none" />

            <div className="w-full relative z-10">

                {/* Header */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={viewport}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center rounded-full bg-primary/10 px-4  text-xs font-bold uppercase tracking-widest text-primary mb-4">
                        <Heart className="h-3 w-3" />
                        CARA MEMBANTU
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-foreground mb-4 font-passion uppercase tracking-tight">
                        Pilih Cara yang <span className="text-primary">Paling Sesuai.</span>
                    </h2>
                    <p className="text-muted-foreground max-w-md mx-auto text-sm md:text-base">
                        Ada banyak cara untuk ikut peduli. Setiap bentuk kepedulian membuat perbedaan nyata bagi mereka.
                    </p>
                </motion.div>

                {/* Cards Grid — Seamless & Edge-to-Edge */}
                <motion.div
                    variants={cardStagger}
                    initial="hidden"
                    whileInView="show"
                    viewport={viewport}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 mb-16"
                >
                    {ways.map((way) => (
                        <motion.div key={way.title} variants={fadeUp} whileHover={{ zIndex: 20 }}>
                            <Link
                                href={way.href}
                                className="group relative block aspect-[4/5] overflow-hidden transition-all duration-500"
                            >
                                {/* Background Image */}
                                <img
                                    src={way.image}
                                    alt={way.title}
                                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 transition-opacity group-hover:opacity-40" />

                                {/* Organic Label at bottom */}
                                <div className="absolute inset-x-0 bottom-0">
                                    {/* Organic Top Edge (SVG) */}
                                    <svg
                                        viewBox="0 0 400 60"
                                        preserveAspectRatio="none"
                                        className={`absolute bottom-[calc(100%-1px)] left-0 w-full h-14 ${way.pathColor} transition-transform duration-300 group-hover:scale-y-110 origin-bottom`}
                                    >
                                        <path d="M0,60 C40,25 100,55 160,35 C220,15 280,45 340,30 C380,20 400,40 400,40 V60 H0 Z" />
                                    </svg>

                                    {/* Label Body */}
                                    <div className={`${way.color} py-6 px-6 text-center relative`}>
                                        <span className="text-white text-2xl font-black tracking-tight leading-none block drop-shadow-sm font-passion uppercase">
                                            {way.title}
                                        </span>
                                        <div className="mt-3 flex items-center justify-center gap-1.5 text-white/90 text-xs font-black uppercase tracking-widest translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                            Eksplorasi
                                            <ArrowRight className="h-3.5 w-3.5" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Main CTAs */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={viewport}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <motion.div whileHover={hoverLift} whileTap={tapPress}>
                        <Link
                            href="/donasi"
                            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-primary px-10 py-4 font-bold text-white shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-shadow duration-200"
                        >
                            Lihat Semua Kebutuhan
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                    <motion.div whileHover={hoverLift} whileTap={tapPress}>
                        <Link
                            href="/adopsi"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-border px-10 py-4 font-semibold text-foreground hover:bg-muted transition-colors duration-200 text-sm"
                        >
                            Adopsi Kucing
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
