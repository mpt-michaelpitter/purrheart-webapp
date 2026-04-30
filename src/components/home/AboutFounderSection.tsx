"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Heart, Instagram, Phone, ArrowRight, User, Calendar, Cat, ShieldCheck } from "lucide-react";
import { fadeLeft, fadeRight, fadeUp, scalePop, cardStagger, hoverLift, tapPress, viewport } from "@/lib/animations";
import { PawPattern } from "@/components/ui/paw-pattern";
import { handleDonationClick } from "@/lib/saweria";

// ── Team / founder data ───────────────────────────────────────────────────────

const roles = [
    { label: "Pendiri & Perawat Utama", value: "Ci Mimi", icon: User },
    { label: "Tahun Beroperasi", value: "20+ Tahun", icon: Calendar },
    { label: "Kucing Dalam Perawatan", value: "+180 Ekor", icon: Cat },
    { label: "Program Aktif", value: "Adopsi & OTA", icon: ShieldCheck },
];

const links = [
    {
        icon: Phone,
        label: "WhatsApp Ci Mimi",
        href: "https://wa.me/6281216007070",
        color: "bg-green-500/10 text-green-600 dark:text-green-400",
        hoverColor: "hover:bg-green-500/20",
    },
    {
        icon: Instagram,
        label: "@pedulikucing71",
        href: "https://instagram.com/pedulikucing71",
        color: "bg-pink-500/10 text-pink-600 dark:text-pink-400",
        hoverColor: "hover:bg-pink-500/20",
    },
];

// ── Component ─────────────────────────────────────────────────────────────────

export function AboutFounderSection() {
    return (
        <section className="relative py-24 bg-[#562c72] overflow-hidden">
            <PawPattern className="text-white opacity-10" />

            {/* Glow orbs */}
            <div className="absolute top-0 right-0 h-[300px] w-[300px] rounded-full bg-[#fdc65c]/10 blur-[80px]" />
            <div className="absolute bottom-0 left-0 h-[200px] w-[200px] rounded-full bg-purple-400/10 blur-[60px]" />

            <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10">

                {/* ── Section label ── */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={viewport}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#fdc65c] mb-4 border border-white/10 backdrop-blur-sm">
                        <Heart className="h-3 w-3 fill-current" />
                        Sosok di Balik Purrheart
                    </div>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
                        Dimulai dari{" "}
                        <span className="text-[#fdc65c]">Satu Orang</span>,<br />
                        Satu Tekad.
                    </h2>
                    <p className="text-purple-100/80 max-w-lg mx-auto text-sm md:text-base leading-relaxed">
                        Purrheart lahir dari hati satu orang yang tidak tahan melihat kucing-kucing
                        jalanan hidup tanpa harapan. Tidak ada backing besar. Hanya kepedulian yang tidak mau diam.
                    </p>
                </motion.div>

                {/* ── Main content: two-column ── */}
                <div className="grid lg:grid-cols-2 gap-12 items-start">

                    {/* Left: Founder card */}
                    <motion.div
                        variants={fadeLeft}
                        initial="hidden"
                        whileInView="show"
                        viewport={viewport}
                    >
                        <div className="relative rounded-3xl border border-[#562c72]/20 bg-card overflow-hidden shadow-xl">
                            {/* Top accent bar */}
                            <div className="h-2 w-full bg-linear-to-r from-[#562c72] via-purple-400 to-[#fdc65c]" />

                            <div className="p-8 space-y-6">
                                {/* Avatar area */}
                                <div className="flex items-center gap-4">
                                    <motion.div
                                        animate={{ rotate: [0, -3, 3, -2, 2, 0] }}
                                        transition={{ duration: 3, repeat: Infinity, repeatDelay: 5, ease: "easeInOut" }}
                                        className="relative h-20 w-20 shrink-0"
                                    >
                                        <div className="h-20 w-20 rounded-2xl bg-linear-to-br from-[#562c72] to-purple-400 overflow-hidden shadow-lg border-2 border-white dark:border-zinc-800">
                                            <Image
                                                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&h=200&auto=format&fit=crop"
                                                alt="Ci Mimi"
                                                fill
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full bg-white dark:bg-zinc-900 flex items-center justify-center shadow-md border-2 border-[#562c72]/20">
                                            <span className="text-sm">🐱</span>
                                        </div>
                                    </motion.div>
                                    <div>
                                        <p className="text-xl font-black text-foreground">Ci Mimi</p>
                                        <p className="text-sm text-[#562c72] font-semibold">Pendiri & Perawat Utama</p>
                                        <p className="text-xs text-muted-foreground mt-0.5">Purrheart Shelter · Medan</p>
                                    </div>
                                </div>

                                {/* Story */}
                                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                                    <p>
                                        Sejak 2005 — jauh sebelum Purrheart punya nama, punya bangunan, atau bahkan media sosial —
                                        Ci Mimi sudah merawat kucing-kucing jalanan secara mandiri, dari kantung sendiri.
                                    </p>
                                    <p>
                                        Bukan karena ada donasi besar. Bukan karena ada orang yang minta. Tapi karena
                                        <span className="font-semibold text-foreground"> tidak tahan melihat mereka kesakitan tanpa ada yang peduli</span>.
                                    </p>
                                    <p>
                                        Dari satu ekor. Lalu dua. Lalu puluhan. Hingga akhirnya di tahun 2014, Purrheart
                                        resmi berdiri sebagai shelter yang punya nama, tempat, dan komunitas.
                                    </p>
                                </div>

                                {/* Quote */}
                                <div className="rounded-2xl border-l-4 border-[#562c72] bg-[#562c72]/5 p-4">
                                    <p className="text-sm italic text-foreground leading-relaxed">
                                        &quot;Kalau bukan kita yang peduli, siapa lagi? Mereka tidak bisa
                                        meminta tolong dengan kata-kata.&quot;
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-2">— Ci Mimi</p>
                                </div>

                                {/* Contact links */}
                                <div className="flex flex-col sm:flex-row gap-2">
                                    {links.map(({ icon: Icon, label, href, color, hoverColor }) => (
                                        <motion.div key={label} whileHover={hoverLift} whileTap={tapPress} className="flex-1">
                                            <Link
                                                href={href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`flex items-center justify-center gap-2 w-full rounded-xl px-4 py-3 text-sm font-semibold transition-colors duration-200 ${color} ${hoverColor}`}
                                            >
                                                <Icon className="h-4 w-4" />
                                                {label}
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Key facts + join CTA */}
                    <motion.div
                        variants={fadeRight}
                        initial="hidden"
                        whileInView="show"
                        viewport={viewport}
                        className="space-y-6"
                    >
                        {/* Fact grid */}
                        <motion.div
                            variants={cardStagger}
                            initial="hidden"
                            whileInView="show"
                            viewport={viewport}
                            className="grid grid-cols-2 gap-3"
                        >
                            {roles.map((r) => (
                                <motion.div
                                    key={r.label}
                                    variants={scalePop}
                                    className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-5 text-center shadow-sm hover:shadow-md transition-shadow group/fact"
                                >
                                    <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center mx-auto mb-3 group-hover/fact:bg-white/20 transition-colors">
                                        <r.icon className="h-6 w-6 text-[#fdc65c]" />
                                    </div>
                                    <p className="font-black text-white text-base">{r.value}</p>
                                    <p className="text-[10px] text-purple-200/60 uppercase tracking-wide font-medium mt-0.5 leading-tight">{r.label}</p>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* What drives us */}
                        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-6 space-y-4">
                            <h3 className="font-extrabold text-lg text-white">Apa yang Menggerakkan Kami</h3>
                            <ul className="space-y-3">
                                {[
                                    "Melihat kucing yang tadinya sakit, akhirnya sehat dan bermain.",
                                    "Mendapat kabar baik dari adopter — bahwa kucing sudah nyaman di rumah baru.",
                                    "Donasi yang masuk di tengah situasi darurat, tepat saat dibutuhkan.",
                                    "Masyarakat yang mulai sadar bahwa mengadopsi itu lebih bermakna.",
                                ].map((item) => (
                                    <li key={item} className="flex items-start gap-3 text-sm text-purple-100/70">
                                        <span className="mt-0.5 shrink-0 h-5 w-5 rounded-full bg-white/10 flex items-center justify-center text-[#fdc65c] text-xs">✓</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Join CTA */}
                        <div className="rounded-3xl border border-white/15 bg-white/5 backdrop-blur-md p-6 text-center space-y-4">
                            <p className="text-2xl">🐾</p>
                            <h3 className="font-extrabold text-white text-xl">Jadi Bagian dari Cerita Ini</h3>
                            <p className="text-sm text-purple-100/60 leading-relaxed">
                                Setiap bentuk kepedulian — besar atau kecil — membuat perbedaan nyata bagi 180+ kucing di Purrheart.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-2">
                                <motion.div whileHover={hoverLift} whileTap={tapPress} className="flex-1">
                                    <button
                                        onClick={() => handleDonationClick()}
                                        className="group flex items-center justify-center gap-2 w-full rounded-xl bg-[#fdc65c] py-3.5 text-sm font-bold text-[#562c72] shadow-lg shadow-[#fdc65c]/20 hover:shadow-xl transition-shadow duration-200"
                                    >
                                        Donasi Sekarang
                                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </motion.div>
                                <motion.div whileHover={hoverLift} whileTap={tapPress} className="flex-1">
                                    <Link
                                        href="/adopsi"
                                        className="flex items-center justify-center gap-2 w-full rounded-xl border border-white/20 bg-white/5 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors duration-200"
                                    >
                                        Adopsi Kucing
                                    </Link>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
