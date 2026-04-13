"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Heart, Phone, MapPin, Instagram, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

// ── Sub-components ─────────────────────────────────────────────────────────────

const FooterSection = ({
    title,
    children,
    className,
}: {
    title: string;
    children: React.ReactNode;
    className?: string;
}) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className={cn("border-b border-border md:border-none", className)}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full py-4 md:py-0 md:mb-4 group"
            >
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{title}</h3>
                <ChevronDown
                    className={cn("h-5 w-5 text-muted-foreground transition-transform md:hidden", isOpen && "rotate-180")}
                />
            </button>
            <div
                className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out md:h-auto md:opacity-100",
                    isOpen ? "max-h-96 opacity-100 pb-4" : "max-h-0 opacity-0 md:max-h-none"
                )}
            >
                {children}
            </div>
        </div>
    );
};

// ── Footer ─────────────────────────────────────────────────────────────────────

export function Footer() {
    return (
        <footer className="bg-background border-t border-border pt-16 pb-24 md:pb-8 transition-colors duration-300">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 md:gap-8 mb-10 md:mb-12">

                    {/* ── Brand ── */}
                    <div className="space-y-5 mb-8 md:mb-0">
                        <Link href="/" className="flex items-center gap-2.5">
                            <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center">
                                <Heart className="h-5 w-5 fill-primary text-primary" />
                            </div>
                            <div>
                                <span className="text-lg font-black tracking-tight text-foreground block leading-none">purrheart</span>
                                <span className="text-[10px] text-muted-foreground font-medium">Shelter & Rescue</span>
                            </div>
                        </Link>

                        <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                            Rumah sementara bagi kucing-kucing yang pernah terluka, ditinggalkan, atau kehilangan tempat pulang.
                            <br /><span className="font-semibold text-foreground">Merawat dengan Hati.</span>
                        </p>

                        {/* Social links */}
                        <div className="flex gap-3">
                            <Link
                                href="https://instagram.com/pedulikucing71"
                                target="_blank"
                                aria-label="Instagram Purrheart"
                                className="h-9 w-9 flex items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-pink-500 hover:text-white transition-all duration-200"
                            >
                                <Instagram className="h-4 w-4" />
                            </Link>
                            {/* TikTok icon (SVG inline) */}
                            <Link
                                href="https://tiktok.com/@purrheart"
                                target="_blank"
                                aria-label="TikTok Purrheart"
                                className="h-9 w-9 flex items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-foreground hover:text-background transition-all duration-200"
                            >
                                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.3a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V9.41a8.16 8.16 0 0 0 4.77 1.52V7.47a4.85 4.85 0 0 1-1.01-.78z" />
                                </svg>
                            </Link>
                        </div>
                    </div>

                    {/* ── Links ── */}
                    <FooterSection title="Tentang Kami">
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="/about" className="hover:text-primary transition-colors">Tentang Purrheart</Link></li>
                            <li><Link href="/adopsi" className="hover:text-primary transition-colors">Adopsi Kucing</Link></li>
                            <li><Link href="#ota" className="hover:text-primary transition-colors">Orang Tua Asuh</Link></li>
                            <li><Link href="#bakkien" className="hover:text-primary transition-colors">Maskot Bakkien</Link></li>
                            <li><Link href="#faq" className="hover:text-primary transition-colors">FAQ</Link></li>
                        </ul>
                    </FooterSection>

                    <FooterSection title="Program">
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="/donasi" className="hover:text-primary transition-colors">Campaign Aktif</Link></li>
                            <li><Link href="/donasi" className="hover:text-primary transition-colors">Biaya Pengobatan</Link></li>
                            <li><Link href="/donasi" className="hover:text-primary transition-colors">Kebutuhan Makanan</Link></li>
                            <li><Link href="/donasi" className="hover:text-primary transition-colors">Program Sterilisasi</Link></li>
                            <li><Link href="/donasi" className="hover:text-primary transition-colors">Fasilitas Shelter</Link></li>
                        </ul>
                    </FooterSection>

                    <FooterSection title="Hubungi Kami" className="border-b-0">
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start gap-3 text-muted-foreground">
                                <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                                <span className="leading-relaxed text-xs">
                                    Jl. Tinta, Sei Putih Baru, Kec. Medan Petisah,
                                    Kota Medan, Sumatera Utara 20118
                                    <br />(Samping Grace Studio)
                                </span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Phone className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                                <Link
                                    href="https://wa.me/6281216007070"
                                    target="_blank"
                                    className="text-sm font-semibold text-green-600 dark:text-green-400 hover:underline"
                                >
                                    +62 812-1600-707
                                    <span className="text-muted-foreground font-normal ml-1 text-xs">(Ci Mimi)</span>
                                </Link>
                            </li>
                            <li className="flex items-start gap-3">
                                <Instagram className="h-4 w-4 text-pink-500 shrink-0 mt-0.5" />
                                <Link
                                    href="https://instagram.com/pedulikucing71"
                                    target="_blank"
                                    className="text-sm font-semibold text-pink-600 dark:text-pink-400 hover:underline"
                                >
                                    @pedulikucing71
                                </Link>
                            </li>
                        </ul>
                    </FooterSection>
                </div>

                {/* ── Bottom ── */}
                <div className="border-t border-border pt-8 text-center space-y-2">
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} Purrheart Shelter. Semua hak dilindungi.
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Terima kasih telah memilih untuk berbagi.{" "}
                        <Heart className="h-3 w-3 inline text-red-500 fill-red-500 mx-0.5" />{" "}
                        Mari bersama jaga kucing-kucing di shelter.
                    </p>
                    <p className="text-xs text-muted-foreground/60">
                        Dan jangan lupa, sayangi setiap makhluk bernyawa di sekitar kita.
                    </p>
                </div>
            </div>
        </footer>
    );
}
