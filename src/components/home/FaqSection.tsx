"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
    fadeLeft, fadeRight, fadeUp, rowStagger,
    hoverLift, tapPress, viewport,
} from "@/lib/animations";

// ── FAQ data ──────────────────────────────────────────────────────────────────

const faqs = [
    {
        q: "Kenapa harus ada proses screening adopsi?",
        a: "Karena kesejahteraan kucing adalah prioritas utama kami. Screening memastikan setiap kucing pergi ke tangan yang benar-benar siap dan berkomitmen — bukan hanya impulsif. Kucing yang sudah trauma butuh lingkungan yang stabil dan penuh kasih.",
    },
    {
        q: "Apakah bisa adopsi dari luar kota Medan?",
        a: "Bisa, dengan pertimbangan dan prosedur tertentu. Kami akan mendiskusikan proses pengiriman, kondisi kandang perjalanan, dan komunikasi berkala untuk memastikan kucing tiba dengan selamat dan baik-baik saja.",
    },
    {
        q: "Apakah bisa mengunjungi shelter sebelum adopsi?",
        a: "Tentu! Kunjungan sangat kami anjurkan agar kamu bisa berkenalan langsung dengan kucing pilihanmu. Hubungi kami terlebih dahulu via WhatsApp untuk menjadwalkan kunjungan ke Purrheart Shelter.",
    },
    {
        q: "Apa itu program Orang Tua Asuh (OTA)?",
        a: "OTA adalah program di mana kamu mendukung kebutuhan seekor kucing yang tinggal di shelter setiap bulannya — tanpa perlu membawanya pulang. Cocok untuk yang ingin berkontribusi nyata tapi belum siap adopsi penuh.",
    },
    {
        q: "Seberapa sering harus memberikan update setelah adopsi?",
        a: "Kami meminta update kondisi kucing secara berkala — minimal satu bulan sekali di awal. Ini bukan untuk menghakimi, tapi untuk memastikan kucing beradaptasi dengan baik dan kamu merasa nyaman dengan perjalanan adopsi ini.",
    },
    {
        q: "Apakah ada biaya adopsi?",
        a: "Tidak ada biaya adopsi. Namun kami mungkin meminta kontribusi sukarela untuk biaya kesehatan atau vaksinasi yang sudah dilakukan sebelum kucing diserahkan. Detail ini akan didiskusikan dalam proses screening.",
    },
];

// ── FaqItem ───────────────────────────────────────────────────────────────────

function FaqItem({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
    return (
        <motion.div variants={fadeUp} className="mb-3">
            <motion.button
                onClick={onToggle}
                whileHover={{ scale: 1.01 }}
                whileTap={tapPress}
                className={cn(
                    "flex items-center justify-between gap-4 w-full rounded-full px-6 py-4 text-left transition-all duration-300",
                    isOpen
                        ? "bg-[#562c72] text-white shadow-lg shadow-[#562c72]/30"
                        : "bg-transparent border-2 border-[#562c72]/30 text-foreground hover:border-[#562c72]/60"
                )}
            >
                <span className="font-black text-sm md:text-base uppercase tracking-wide leading-snug">{q}</span>
                <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className={cn(
                        "shrink-0 h-9 w-9 rounded-full flex items-center justify-center border-2 transition-colors duration-200",
                        isOpen
                            ? "border-white/30 bg-white/10 text-white"
                            : "border-[#562c72]/40 bg-transparent text-[#562c72]"
                    )}
                >
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                </motion.span>
            </motion.button>

            {/* Animated answer with AnimatePresence */}
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                    >
                        <p className="px-6 pt-4 pb-2 text-sm md:text-base text-muted-foreground leading-relaxed">
                            {a}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

// ── FaqSection ────────────────────────────────────────────────────────────────

export function FaqSection() {
    const [openIdx, setOpenIdx] = useState<number | null>(0);

    return (
        <section id="faq" className="py-20 bg-[#fdf8ff] dark:bg-background">
            <div className="container mx-auto px-4 md:px-6 max-w-6xl">
                <div className="grid md:grid-cols-5 gap-12 md:gap-16 items-start">

                    {/* ── Left: Title (slides in from left) ── */}
                    <motion.div
                        variants={fadeLeft}
                        initial="hidden"
                        whileInView="show"
                        viewport={viewport}
                        className="md:col-span-2 md:sticky md:top-24"
                    >
                        <div className="inline-flex items-center gap-2 rounded-full bg-[#562c72]/10 px-4 py-1.5 text-xs font-bold text-[#562c72] dark:text-purple-400 mb-6">
                            🐾 FAQs
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-foreground leading-tight">
                            PERTANYAAN
                            <br />
                            <span className="text-[#562c72]">YANG SERING</span>
                            <br />
                            DITANYAKAN!
                        </h2>
                        <p className="mt-5 text-sm text-muted-foreground leading-relaxed max-w-xs">
                            Masih ada yang ingin ditanyakan? Hubungi langsung Ci Mimi via WhatsApp — kami senang membantu!
                        </p>
                        <motion.a
                            href="https://wa.me/6281216007070?text=Halo%20Purrheart!%20Saya%20ingin%20bertanya%20tentang%20adopsi."
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={hoverLift}
                            whileTap={tapPress}
                            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#562c72] px-6 py-3 text-sm font-bold text-white hover:bg-[#3d1f52] transition-colors shadow-lg shadow-[#562c72]/20"
                        >
                            Tanya via WhatsApp
                        </motion.a>
                    </motion.div>

                    {/* ── Right: Accordion (slides in from right, staggered) ── */}
                    <motion.div
                        variants={rowStagger}
                        initial="hidden"
                        whileInView="show"
                        viewport={viewport}
                        className="md:col-span-3"
                    >
                        {faqs.map((faq, i) => (
                            <FaqItem
                                key={i}
                                q={faq.q}
                                a={faq.a}
                                isOpen={openIdx === i}
                                onToggle={() => setOpenIdx(openIdx === i ? null : i)}
                            />
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
