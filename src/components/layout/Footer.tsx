"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Heart, Mail, Phone, MapPin, Instagram, Facebook, Twitter, Youtube, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const SocialLink = ({ href, icon: Icon }: { href: string; icon: any }) => (
    <Link
        href={href}
        className="h-10 w-10 flex items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-primary hover:text-white transition-all duration-300"
    >
        <Icon className="h-5 w-5" />
    </Link>
);

const FooterSection = ({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={cn("border-b border-border md:border-none", className)}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full py-4 md:py-0 md:mb-4 group"
            >
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{title}</h3>
                <ChevronDown className={cn("h-5 w-5 text-muted-foreground transition-transform md:hidden", isOpen ? "rotate-180" : "")} />
            </button>
            <div className={cn(
                "overflow-hidden transition-all duration-300 ease-in-out md:h-auto md:opacity-100",
                isOpen ? "max-h-96 opacity-100 pb-4" : "max-h-0 opacity-0 md:max-h-none"
            )}>
                {children}
            </div>
        </div>
    );
};

export function Footer() {
    return (
        <footer className="bg-background pt-16 pb-24 md:pb-8 border-t border-border transition-colors duration-300">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 md:gap-8 mb-8 md:mb-12">
                    {/* Brand Section (Always Visible) */}
                    <div className="space-y-6 mb-8 md:mb-0">
                        <div className="flex items-center gap-2 text-foreground">
                            <div className="h-10 w-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                <Heart className="h-6 w-6 fill-primary" />
                            </div>
                            <span className="text-xl font-bold tracking-tight">purrhearth</span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                            Platform donasi terpercaya yang menghubungkan kebaikanmu dengan mereka yang membutuhkan.
                            <br /><span className="font-medium text-foreground">Transparan, Aman, dan Amanah.</span>
                        </p>
                        <div className="flex gap-3">
                            <SocialLink href="#" icon={Instagram} />
                            <SocialLink href="#" icon={Facebook} />
                            <SocialLink href="#" icon={Twitter} />
                            <SocialLink href="#" icon={Youtube} />
                        </div>
                    </div>

                    {/* Collapsible Sections on Mobile */}
                    <FooterSection title="Tentang Kami">
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-primary transition-colors">Tentang purrhearth</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Syarat & Ketentuan</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Kebijakan Privasi</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Laporan Keuangan</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">FAQ</Link></li>
                        </ul>
                    </FooterSection>

                    <FooterSection title="Program">
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-primary transition-colors">Donasi Kesehatan</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Bencana Alam</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Pendidikan</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Zakat & Infak</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Galang Dana</Link></li>
                        </ul>
                    </FooterSection>

                    <FooterSection title="Hubungi Kami" className="border-b-0">
                        <ul className="space-y-4 text-sm text-muted-foreground">
                            <li className="flex items-start gap-3">
                                <Mail className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                <span className="hover:text-primary cursor-pointer transition-colors">support@purrhearth.com</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                <span className="hover:text-primary cursor-pointer transition-colors">+62 21 1234 5678</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                <span>Jl. Kebaikan No. 1, Jakarta Selatan, Indonesia</span>
                            </li>
                        </ul>

                        <div className="mt-6 pt-6 border-t border-border md:border-0 md:pt-4">
                            <p className="text-xs font-semibold mb-3 text-foreground uppercase tracking-wider">Download Aplikasi</p>
                            <div className="flex flex-wrap gap-2">
                                <div className="h-10 px-4 bg-foreground text-background rounded-lg flex items-center justify-center gap-2 text-xs font-medium cursor-pointer hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors w-[140px]">
                                    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" /></svg>
                                    Google Play
                                </div>
                                <div className="h-10 px-4 bg-foreground text-background rounded-lg flex items-center justify-center gap-2 text-xs font-medium cursor-pointer hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors w-[140px]">
                                    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.89,2C16,3.42 15.22,4.63 14.29,5.33C13.55,6.14 12.27,6.85 11.38,6.83C11.12,5.23 11.97,3.95 13,3.5Z" /></svg>
                                    App Store
                                </div>
                            </div>
                        </div>
                    </FooterSection>
                </div>

                <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
                    &copy; {new Date().getFullYear()} purrhearth Foundation. All rights reserved.
                    <p className="text-xs text-slate-400 mt-2">
                        Made with <Heart className="h-3 w-3 inline text-red-500 fill-red-500 mx-0.5" /> for Humanity
                    </p>
                </div>
            </div>
        </footer>
    );
}
