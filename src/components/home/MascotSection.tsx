"use client";

import Link from "next/link";
import { ArrowRight, Cat, Heart } from "lucide-react";

export function MascotSection() {
    return (
        <section id="bakkien" className="py-20 bg-gradient-to-br from-[#562c72]/5 via-background to-background overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 max-w-6xl">

                {/* Label */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 rounded-full bg-[#562c72]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#562c72] dark:text-purple-400 mb-4">
                        <Cat className="h-3 w-3" />
                        MEET OUR MASCOT
                    </div>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-foreground">
                        Bakkien 🐾
                    </h2>
                </div>

                <div className="grid md:grid-cols-5 gap-10 items-center">
                    {/* Decorative cat card */}
                    <div className="md:col-span-2 flex justify-center">
                        <div className="relative">
                            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#562c72] to-purple-400 blur-2xl opacity-20" />
                            <div className="relative rounded-3xl border border-[#562c72]/20 bg-card p-8 text-center space-y-4 shadow-xl">
                                <div className="text-8xl">🐱</div>
                                <div>
                                    <p className="text-2xl font-black text-foreground">Bakkien</p>
                                    <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Maskot Purrheart</p>
                                </div>

                                {/* Status chips */}
                                <div className="flex flex-wrap justify-center gap-2">
                                    <span className="rounded-full bg-green-500/10 text-green-600 text-xs font-semibold px-3 py-1">✅ Sehat & Aktif</span>
                                    <span className="rounded-full bg-amber-500/10 text-amber-600 text-xs font-semibold px-3 py-1">🍽️ Makanan Khusus</span>
                                    <span className="rounded-full bg-blue-500/10 text-blue-600 text-xs font-semibold px-3 py-1">🏠 Purrheart Shelter</span>
                                </div>

                                <div className="pt-2 border-t border-border">
                                    <p className="text-xs text-muted-foreground italic">
                                        "Tumbuh bahagia di tempat yang menerima kondisinya apa adanya."
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Story */}
                    <div className="md:col-span-3 space-y-5">
                        <p className="text-muted-foreground leading-relaxed">
                            Bakkien pertama kali datang ke Purrheart bukan sendirian. Ia dibawa oleh seseorang yang hari ini
                            menjadi orang tua asuhnya — seseorang yang memilih untuk tidak pergi begitu saja.
                        </p>

                        <div className="rounded-2xl border-l-4 border-[#562c72] bg-[#562c72]/5 p-5">
                            <p className="text-sm text-foreground leading-relaxed">
                                Saat tiba di shelter, tubuhnya kecil dan kurus, kulitnya kemerahan karena gatal, dan ia menderita
                                <span className="font-bold"> penyakit lambung (gastric)</span> yang membuatnya sering buang air besar bercampur darah.
                            </p>
                        </div>

                        <p className="text-muted-foreground leading-relaxed">
                            Bakkien dirawat perlahan, dengan sabar. Hari demi hari, tubuhnya mulai menguat. Hari ini, Bakkien
                            tumbuh menjadi kucing yang <span className="font-bold text-foreground">sehat, aktif, dan bertubuh gempal</span> —
                            cerminan dari perawatan yang konsisten dan penuh perhatian.
                        </p>

                        <p className="text-muted-foreground leading-relaxed text-sm">
                            Kondisinya membuat Bakkien harus mengonsumsi makanan khusus (gastro). Jika salah makan, keluhannya bisa kambuh.
                            Di sinilah peran orang tua asuhnya menjadi sangat berarti — yang secara rutin membantu memenuhi kebutuhan khusus Bakkien.
                        </p>

                        <div className="rounded-2xl bg-gradient-to-r from-[#562c72]/10 to-purple-400/10 border border-[#562c72]/20 p-5 space-y-2">
                            <div className="flex items-center gap-2">
                                <Heart className="h-5 w-5 text-[#562c72] fill-[#562c72]" />
                                <p className="font-bold text-foreground">Bakkien adalah buktinya</p>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Bahwa kepedulian yang berkelanjutan membuat perbedaan nyata. Setiap makhluk bernyawa,
                                dengan perhatian yang tepat, selalu punya kesempatan untuk hidup dengan lebih baik.
                            </p>
                        </div>

                        <Link
                            href="/donasi"
                            className="group inline-flex items-center gap-2 rounded-full bg-[#562c72] px-7 py-4 font-bold text-white shadow-lg shadow-[#562c72]/20 hover:-translate-y-0.5 hover:shadow-xl transition-all duration-200"
                        >
                            Jadi Bagian dari Purrheart
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
