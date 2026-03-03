"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Cat, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp, fadeLeft, fadeRight, scalePop, hoverLift, tapPress, viewport } from "@/lib/animations";
import { PawPattern } from "@/components/ui/paw-pattern";

export function MascotSection() {
    return (
        <section id="bakkien" className="relative py-20 bg-[#562c72] overflow-hidden">
            <PawPattern className="text-white opacity-5" />

            <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10">

                {/* Label */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={viewport}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#fdc65c] mb-4 border border-white/10 backdrop-blur-sm">
                        <Cat className="h-3 w-3" />
                        MEET OUR MASCOT
                    </div>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-white">
                        Bakkien 🐾
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-5 gap-10 items-center">
                    {/* Cat card — scales in with a spring pop */}
                    <motion.div
                        variants={fadeLeft}
                        initial="hidden"
                        whileInView="show"
                        viewport={viewport}
                        className="md:col-span-2 flex justify-center"
                    >
                        <motion.div
                            whileHover={{ y: -6, rotate: 1 }}
                            transition={{ type: "spring", stiffness: 250, damping: 18 }}
                            className="relative"
                        >
                            <div className="absolute inset-0 rounded-3xl bg-[#fdc65c] blur-3xl opacity-10 animate-pulse" />
                            <div className="relative rounded-3xl border border-white/15 bg-white/5 backdrop-blur-xl p-8 text-center space-y-4 shadow-2xl">
                                <motion.div
                                    animate={{ rotate: [0, -8, 8, -4, 4, 0] }}
                                    transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
                                    className="relative mx-auto w-40 h-40 rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-zinc-800"
                                >
                                    <Image
                                        src="https://images.unsplash.com/photo-1573865668131-974279df46b4?q=80&w=400&h=400&auto=format&fit=crop"
                                        alt="Bakkien Mascot"
                                        fill
                                        className="object-cover"
                                    />
                                </motion.div>
                                <div>
                                    <p className="text-2xl font-black text-white">Bakkien</p>
                                    <p className="text-xs text-purple-200/60 uppercase tracking-wider mt-1">Maskot Purrheart</p>
                                </div>

                                {/* Status chips */}
                                <div className="flex flex-wrap justify-center gap-2">
                                    {[
                                        { label: "✅ Sehat & Aktif", cls: "bg-green-500/10 text-green-600" },
                                        { label: "🍽️ Makanan Khusus", cls: "bg-amber-500/10 text-amber-600" },
                                        { label: "🏠 Purrheart Shelter", cls: "bg-blue-500/10 text-blue-600" },
                                    ].map(({ label, cls }) => (
                                        <motion.span
                                            key={label}
                                            variants={scalePop}
                                            className={`rounded-full text-xs font-semibold px-3 py-1 ${cls}`}
                                        >
                                            {label}
                                        </motion.span>
                                    ))}
                                </div>

                                <div className="pt-2 border-t border-border">
                                    <p className="text-xs text-muted-foreground italic">
                                        "Tumbuh bahagia di tempat yang menerima kondisinya apa adanya."
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Story — slides in from right */}
                    <motion.div
                        variants={fadeRight}
                        initial="hidden"
                        whileInView="show"
                        viewport={viewport}
                        className="md:col-span-3 space-y-5"
                    >
                        <p className="text-purple-100/70 leading-relaxed">
                            Bakkien pertama kali datang ke Purrheart bukan sendirian. Ia dibawa oleh seseorang yang hari ini
                            menjadi orang tua asuhnya — seseorang yang memilih untuk tidak pergi begitu saja.
                        </p>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={viewport}
                            transition={{ duration: 0.5, delay: 0.15 }}
                            className="rounded-2xl border-l-4 border-[#fdc65c] bg-white/5 backdrop-blur-md p-5"
                        >
                            <p className="text-sm text-white leading-relaxed">
                                Saat tiba di shelter, tubuhnya kecil dan kurus, kulitnya kemerahan karena gatal, dan ia menderita
                                <span className="font-bold text-[#fdc65c]"> penyakit lambung (gastric)</span> yang membuatnya sering buang air besar bercampur darah.
                            </p>
                        </motion.div>

                        <p className="text-purple-100/70 leading-relaxed">
                            Bakkien dirawat perlahan, dengan sabar. Hari demi hari, tubuhnya mulai menguat. Hari ini, Bakkien
                            tumbuh menjadi kucing yang <span className="font-bold text-white">sehat, aktif, dan bertubuh gempal</span> —
                            cerminan dari perawatan yang konsisten dan penuh perhatian.
                        </p>

                        <p className="text-muted-foreground leading-relaxed text-sm">
                            Kondisinya membuat Bakkien harus mengonsumsi makanan khusus (gastro). Jika salah makan, keluhannya bisa kambuh.
                            Di sinilah peran orang tua asuhnya menjadi sangat berarti — yang secara rutin membantu memenuhi kebutuhan khusus Bakkien.
                        </p>

                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={viewport}
                            transition={{ duration: 0.5, delay: 0.25 }}
                            className="rounded-2xl bg-white/5 backdrop-blur-md border border-white/15 p-5 space-y-2"
                        >
                            <div className="flex items-center gap-2">
                                <Heart className="h-5 w-5 text-[#fdc65c] fill-[#fdc65c]" />
                                <p className="font-bold text-white">Bakkien adalah buktinya</p>
                            </div>
                            <p className="text-sm text-purple-100/60 leading-relaxed">
                                Bahwa kepedulian yang berkelanjutan membuat perbedaan nyata. Setiap makhluk bernyawa,
                                dengan perhatian yang tepat, selalu punya kesempatan untuk hidup dengan lebih baik.
                            </p>
                        </motion.div>

                        <motion.div whileHover={hoverLift} whileTap={tapPress} className="inline-block">
                            <Link
                                href="/donasi"
                                className="group inline-flex items-center gap-2 rounded-full bg-[#fdc65c] px-7 py-4 font-bold text-[#562c72] shadow-lg shadow-[#fdc65c]/20 hover:shadow-xl transition-shadow duration-200"
                            >
                                Jadi Bagian dari Purrheart
                                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
