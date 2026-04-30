"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Stethoscope, Home, HandshakeIcon, Heart, BookOpen, Clock, ArrowRight, Utensils, Brush, Bath } from "lucide-react";
import { fadeUp, fadeLeft, scalePop, cardStagger, hoverLift, tapPress, viewport } from "@/lib/animations";
import { PawPattern } from "@/components/ui/paw-pattern";

// ── Values data ───────────────────────────────────────────────────────────────

const values = [
    {
        icon: Stethoscope,
        title: "Perawatan Medis",
        desc: "Setiap kucing yang datang mendapat pemeriksaan, vaksinasi, sterilisasi, dan perawatan luka atau penyakit. Kami tidak melepas kucing yang belum sembuh.",
        tag: "Kesehatan",
        accent: "#3b82f6",   // blue
        bg: "bg-blue-50 dark:bg-blue-950/30",
        border: "border-blue-200 dark:border-blue-800/50",
        tagCls: "bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300",
        iconCls: "bg-blue-500 text-white",
    },
    {
        icon: Home,
        title: "Shelter Aman",
        desc: "Ruang hidup yang bersih, ventilasi baik, dan dipisahkan per kebutuhan. Kucing sakit punya ruang isolasi, kitten punya nursery sendiri.",
        tag: "Lingkungan",
        accent: "#8b5cf6",
        bg: "bg-violet-50 dark:bg-violet-950/30",
        border: "border-violet-200 dark:border-violet-800/50",
        tagCls: "bg-violet-100 text-violet-700 dark:bg-violet-900/60 dark:text-violet-300",
        iconCls: "bg-violet-500 text-white",
    },
    {
        icon: HandshakeIcon,
        title: "Adopsi Bertanggung Jawab",
        desc: "Kami tidak sembarangan melepas kucing. Ada proses screening calon adopter untuk memastikan setiap kucing benar-benar pergi ke rumah yang tepat.",
        tag: "Adopsi",
        accent: "#10b981",
        bg: "bg-emerald-50 dark:bg-emerald-950/30",
        border: "border-emerald-200 dark:border-emerald-800/50",
        tagCls: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300",
        iconCls: "bg-emerald-500 text-white",
    },
    {
        icon: Heart,
        title: "Orang Tua Asuh",
        desc: "Program OTA memungkinkan siapa saja berkontribusi untuk seekor kucing tertentu — tanpa perlu membawanya pulang. Kucing tetap tinggal di shelter, tapi ada yang peduli secara khusus.",
        tag: "Komunitas",
        accent: "#f59e0b",
        bg: "bg-amber-50 dark:bg-amber-950/30",
        border: "border-amber-200 dark:border-amber-800/50",
        tagCls: "bg-amber-100 text-amber-700 dark:bg-amber-900/60 dark:text-amber-300",
        iconCls: "bg-amber-500 text-white",
    },
    {
        icon: BookOpen,
        title: "Edukasi & Kesadaran",
        desc: "Kami aktif berbagi cerita tentang kucing di shelter — membangun kesadaran bahwa adopsi dari shelter jauh lebih bermakna daripada membeli.",
        tag: "Edukasi",
        accent: "#ec4899",
        bg: "bg-pink-50 dark:bg-pink-950/30",
        border: "border-pink-200 dark:border-pink-800/50",
        tagCls: "bg-pink-100 text-pink-700 dark:bg-pink-900/60 dark:text-pink-300",
        iconCls: "bg-pink-500 text-white",
    },
    {
        icon: Clock,
        title: "Tanpa Batas Waktu",
        desc: "Selama kucing belum mendapat rumah yang tepat, kami terus merawatnya. Tidak ada deadline — setiap nyawa tetap berharga sampai kapanpun.",
        tag: "Komitmen",
        accent: "#14b8a6",
        bg: "bg-teal-50 dark:bg-teal-950/30",
        border: "border-teal-200 dark:border-teal-800/50",
        tagCls: "bg-teal-100 text-teal-700 dark:bg-teal-900/60 dark:text-teal-300",
        iconCls: "bg-teal-500 text-white",
    },
];

// ── Daily snapshot ────────────────────────────────────────────────────────────

const dailyFacts = [
    { label: "Porsi makan / hari", value: "360+", icon: Utensils },
    { label: "Litter box dibersihkan", value: "50+", icon: Brush },
    { label: "Kucing dimandikan / minggu", value: "30+", icon: Bath },
    { label: "Kunjungan dokter / bulan", value: "10+", icon: Stethoscope },
];

// ── Main component ─────────────────────────────────────────────────────────────

export function AboutValuesSection() {
    return (
        <section className="relative py-28 bg-[#562c72] overflow-hidden">
            <PawPattern className="text-white opacity-5" />

            {/* Glow orbs */}
            <div className="absolute top-0 right-0 h-[400px] w-[400px] rounded-full bg-[#fdc65c]/5 blur-[100px]" />
            <div className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-purple-400/5 blur-[80px]" />

            <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10">

                {/* ── Section header ── */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={viewport}
                    className="mb-16"
                >
                    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                        <div>
                            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#fdc65c] mb-4 border border-white/10 backdrop-blur-sm">
                                <Heart className="h-3 w-3 fill-current" />
                                Nilai-Nilai Kami
                            </span>
                            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
                                Yang Kami Lakukan<br />
                                <span className="text-[#fdc65c]">Setiap Hari.</span>
                            </h2>
                        </div>
                        <p className="text-purple-100/70 max-w-sm text-sm leading-relaxed lg:text-right">
                            Purrheart bukan sekadar tempat penampungan. Ada sistem,
                            tanggung jawab, dan nilai-nilai yang kami jaga untuk
                            memastikan setiap kucing mendapat yang terbaik.
                        </p>
                    </div>

                    {/* Divider */}
                    <div className="mt-8 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
                </motion.div>

                {/* ── Values grid ── */}
                <motion.div
                    variants={cardStagger}
                    initial="hidden"
                    whileInView="show"
                    viewport={viewport}
                    className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-24"
                >
                    {values.map((v, i) => (
                        <motion.div
                            key={v.title}
                            variants={fadeUp}
                            whileHover={{ y: -6, transition: { duration: 0.2 } }}
                            className={`group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 overflow-hidden transition-shadow hover:shadow-xl cursor-default`}
                        >
                            {/* Top-right number watermark */}
                            <span className="absolute top-4 right-5 text-7xl font-black opacity-[0.1] select-none leading-none" style={{ color: v.accent }}>
                                {String(i + 1).padStart(2, "0")}
                            </span>

                            {/* Icon + Tag row */}
                            <div className="flex items-start justify-between mb-5 relative z-10">
                                <div className={`h-11 w-11 rounded-xl ${v.iconCls} flex items-center justify-center shadow-md`}>
                                    <v.icon className="h-5 w-5" />
                                </div>
                                <span className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest ${v.tagCls}`}>
                                    {v.tag}
                                </span>
                            </div>

                            {/* Content */}
                            <div className="relative z-10">
                                <h3 className="font-extrabold text-white text-lg mb-2">{v.title}</h3>
                                <p className="text-sm text-purple-100/60 leading-relaxed">{v.desc}</p>
                            </div>

                            {/* Bottom accent line on hover */}
                            <div
                                className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                                style={{ backgroundColor: v.accent }}
                            />
                        </motion.div>
                    ))}
                </motion.div>

                {/* ── Daily life snapshot ── */}
                <div className="grid lg:grid-cols-2 gap-14 items-center mb-20">

                    {/* Left: copy */}
                    <motion.div
                        variants={fadeLeft}
                        initial="hidden"
                        whileInView="show"
                        viewport={viewport}
                        className="space-y-6"
                    >
                        <span className="inline-flex items-center gap-2 rounded-full bg-[#fdc65c]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#fdc65c] border border-[#fdc65c]/20">
                            📅 Sehari di Shelter
                        </span>

                        <h3 className="text-3xl md:text-4xl font-black text-white leading-tight">
                            Di balik setiap foto kucing,{" "}
                            <span className="text-[#fdc65c]">ada kerja keras tak terlihat.</span>
                        </h3>

                        <p className="text-purple-100/70 leading-relaxed">
                            Merawat 180+ kucing bukan pekerjaan kecil. Setiap hari ada rutinitas
                            yang tidak pernah berhenti — memberi makan, membersihkan, memantau
                            kesehatan, dan memberikan perhatian supaya mereka tidak merasa sendirian.
                        </p>
                        <p className="text-sm text-purple-100/50 leading-relaxed">
                            Itulah mengapa setiap donasi, sekecil apapun, benar-benar bermakna. Ia
                            langsung menjadi pakan, obat, dan kasih sayang yang nyata.
                        </p>

                        <motion.div whileHover={hoverLift} whileTap={tapPress} className="inline-block">
                            <Link
                                href="/donasi"
                                className="group inline-flex items-center gap-2 rounded-full bg-[#fdc65c] px-7 py-3.5 text-sm font-bold text-[#562c72] shadow-lg shadow-[#fdc65c]/20 hover:shadow-xl transition-shadow"
                            >
                                Bantu Kebutuhan Harian
                                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Right: daily fact cards */}
                    <motion.div
                        variants={cardStagger}
                        initial="hidden"
                        whileInView="show"
                        viewport={viewport}
                        className="grid grid-cols-2 gap-4"
                    >
                        {dailyFacts.map((f) => (
                            <motion.div
                                key={f.label}
                                variants={scalePop}
                                whileHover={hoverLift}
                                className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 text-center shadow-sm hover:shadow-lg transition-shadow group/fact"
                            >
                                <div className="h-14 w-14 rounded-2xl bg-white/10 flex items-center justify-center group-hover/fact:bg-white/20 transition-colors">
                                    <f.icon className="h-7 w-7 text-[#fdc65c]" />
                                </div>
                                <span className="text-3xl font-black text-white">{f.value}</span>
                                <span className="text-xs text-purple-200/60 uppercase tracking-wide font-medium leading-tight">{f.label}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* ── Quote banner ── */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={viewport}
                    className="relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-lg border border-white/10 px-10 py-14 text-center shadow-2xl"
                >
                    {/* Glows */}
                    <div className="absolute -top-16 -left-16 h-64 w-64 rounded-full bg-purple-400/10 blur-3xl" />
                    <div className="absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-[#fdc65c]/10 blur-3xl" />

                    <div className="relative z-10 max-w-2xl mx-auto space-y-5">
                        <p className="text-5xl">💬</p>
                        <blockquote className="text-xl md:text-3xl font-extrabold text-white leading-snug">
                            &quot;Kami tidak merawat ratusan kucing. Kami merawat{" "}
                            <span className="text-[#fdc65c]">satu kucing</span>,{" "}
                            ratusan kali — dengan kepedulian yang sama.&quot;
                        </blockquote>
                        <p className="text-purple-200/50 text-sm font-medium">— Ci Mimi, Pendiri Purrheart Shelter</p>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
