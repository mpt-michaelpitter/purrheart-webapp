"use client";

import Link from "next/link";
import { ArrowRight, Heart, Repeat2, Home, Baby, Package } from "lucide-react";

const ways = [
    {
        icon: Heart,
        title: "Donasi Sekali",
        description: "Bantu langsung kebutuhan mendesak shelter sesuai kemampuanmu.",
        href: "/donasi",
        color: "text-red-500",
        bg: "bg-red-500/10",
    },
    {
        icon: Repeat2,
        title: "Donasi Rutin",
        description: "Komitmen bulanan yang memastikan shelter berjalan berkelanjutan.",
        href: "/donasi",
        color: "text-primary",
        bg: "bg-primary/10",
    },
    {
        icon: Home,
        title: "Adopsi",
        description: "Buka pintu rumahmu untuk satu nyawa yang membutuhkan.",
        href: "/adopsi",
        color: "text-green-500",
        bg: "bg-green-500/10",
    },
    {
        icon: Baby,
        title: "Orang Tua Asuh",
        description: "Rawat kucing pilihanmu dari jauh — tanpa perlu membawanya pulang.",
        href: "#ota",
        color: "text-amber-500",
        bg: "bg-amber-500/10",
    },
    {
        icon: Package,
        title: "Donasi Barang",
        description: "Makanan, vitamin, pasir kucing, atau perlengkapan shelter.",
        href: "https://wa.me/6281216007070",
        color: "text-blue-500",
        bg: "bg-blue-500/10",
    },
];

export function HowToHelpSection() {
    return (
        <section id="bantu" className="py-20 bg-muted/20">
            <div className="container mx-auto px-4 md:px-6 max-w-6xl">
                <div className="text-center mb-14">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mb-4">
                        Cara Kamu Bisa Membantu
                    </h2>
                    <p className="text-muted-foreground max-w-xl mx-auto text-base md:text-lg">
                        Ada banyak cara untuk ikut peduli. Pilih cara yang paling sesuai dengan kemampuanmu.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                    {ways.map((way) => (
                        <Link
                            key={way.title}
                            href={way.href}
                            className="group flex flex-col items-start gap-4 rounded-2xl border border-border bg-card p-6 hover:border-primary/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className={`h-11 w-11 rounded-2xl ${way.bg} flex items-center justify-center`}>
                                <way.icon className={`h-5 w-5 ${way.color}`} />
                            </div>
                            <div>
                                <h3 className="font-bold text-foreground text-sm group-hover:text-primary transition-colors">
                                    {way.title}
                                </h3>
                                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                                    {way.description}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="mt-10 text-center">
                    <Link
                        href="/donasi"
                        className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 font-bold text-primary-foreground shadow-lg shadow-primary/20 hover:-translate-y-0.5 hover:shadow-xl transition-all duration-200"
                    >
                        Lihat Kebutuhan Shelter
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
