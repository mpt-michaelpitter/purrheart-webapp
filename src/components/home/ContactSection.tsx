"use client";

import Link from "next/link";
import { MapPin, Phone, Instagram, ArrowRight } from "lucide-react";

export function ContactSection() {
    return (
        <section id="kontak" className="py-20 bg-gradient-to-b from-muted/30 to-background">
            <div className="container mx-auto px-4 md:px-6 max-w-5xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">
                        Hubungi Kami
                    </h2>
                    <p className="text-muted-foreground max-w-lg mx-auto">
                        Ingin bertanya atau membantu lebih lanjut? Kami siap menyambut kamu.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Contact info */}
                    <div className="rounded-3xl border border-border bg-card p-8 space-y-5">
                        <h3 className="font-bold text-lg text-foreground">Info Kontak</h3>

                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                                    <MapPin className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Alamat</p>
                                    <p className="text-sm text-foreground leading-relaxed">
                                        Jl. Tinta, Sei Putih Baru, Kec. Medan Petisah,
                                        <br />Kota Medan, Sumatera Utara 20118
                                        <br /><span className="text-muted-foreground">(Samping Grace Studio)</span>
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="h-10 w-10 rounded-xl bg-green-500/10 flex items-center justify-center shrink-0">
                                    <Phone className="h-5 w-5 text-green-500" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">WhatsApp (Ci Mimi)</p>
                                    <Link
                                        href="https://wa.me/6281216007070"
                                        target="_blank"
                                        className="text-sm font-semibold text-green-600 dark:text-green-400 hover:underline"
                                    >
                                        +62 812-1600-707
                                    </Link>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="h-10 w-10 rounded-xl bg-pink-500/10 flex items-center justify-center shrink-0">
                                    <Instagram className="h-5 w-5 text-pink-500" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Sosial Media</p>
                                    <Link
                                        href="https://instagram.com/pedulikucing71"
                                        target="_blank"
                                        className="text-sm font-semibold text-pink-600 dark:text-pink-400 hover:underline block"
                                    >
                                        @pedulikucing71 (Instagram)
                                    </Link>
                                    <Link
                                        href="https://tiktok.com/@purrheart"
                                        target="_blank"
                                        className="text-sm font-semibold text-foreground hover:underline block mt-1"
                                    >
                                        @purrheart (TikTok)
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CTA visit + message */}
                    <div className="rounded-3xl border border-border bg-gradient-to-br from-[#562c72]/5 to-purple-400/5 p-8 flex flex-col justify-between gap-8">
                        <div>
                            <h3 className="font-bold text-lg text-foreground mb-3">Rencanakan Kunjungan</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Ingin melihat langsung kucing-kucing kami? Hubungi kami terlebih dahulu untuk konfirmasi
                                jadwal kunjungan ke shelter.
                            </p>
                        </div>

                        <div className="space-y-3">
                            <Link
                                href="https://wa.me/6281216007070?text=Halo%20Purrheart!%20Saya%20ingin%20bertanya%20tentang%20shelter."
                                target="_blank"
                                className="group flex items-center justify-center gap-2 w-full rounded-xl bg-green-500 py-3.5 font-bold text-white hover:bg-green-600 hover:-translate-y-0.5 shadow-lg shadow-green-500/20 transition-all duration-200"
                            >
                                Tanya Tim Purrheart
                                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                href="https://wa.me/6281216007070?text=Halo%20Purrheart!%20Saya%20ingin%20mengunjungi%20shelter."
                                target="_blank"
                                className="flex items-center justify-center gap-2 w-full rounded-xl border border-border py-3.5 font-semibold text-foreground hover:bg-muted transition-colors text-sm"
                            >
                                Rencanakan Kunjungan
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
