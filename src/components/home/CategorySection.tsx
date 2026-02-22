"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { DonationCard } from "@/components/ui/DonationCard";
import type { Campaign } from "@/types";

interface CategorySectionProps {
    title: string;
    linkText?: string;
    linkHref?: string;
    donations: Campaign[];
    categoryImage?: any;
}

export function CategorySection({
    title,
    linkText = "Lihat Semua",
    linkHref = "#",
    donations,
    categoryImage,
}: CategorySectionProps) {
    const scrollContainerRef = React.useRef<HTMLDivElement>(null);
    const [showLeft, setShowLeft] = React.useState(false);
    const [showRight, setShowRight] = React.useState(true);

    const checkScroll = () => {
        if (!scrollContainerRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        setShowLeft(scrollLeft > 0);
        setShowRight(scrollLeft < scrollWidth - clientWidth - 10);
    };

    const scroll = (direction: "left" | "right") => {
        scrollContainerRef.current?.scrollTo({
            left: scrollContainerRef.current.scrollLeft + (direction === "left" ? -320 : 320),
            behavior: "smooth",
        });
    };

    React.useEffect(() => {
        checkScroll();
        window.addEventListener("resize", checkScroll);
        return () => window.removeEventListener("resize", checkScroll);
    }, [donations]);

    return (
        <section className="py-14 border-b border-border/40 last:border-0">
            <div className="container mx-auto px-4 md:px-6">

                {/* ── Section Header ───────────────────────────────────── */}
                <div className="flex items-end justify-between mb-8 gap-4">
                    <div className="space-y-1">
                        {/* Decorative pip */}
                        <div className="flex items-center gap-2">
                            <span className="h-1 w-8 rounded-full bg-primary inline-block" />
                            <span className="h-1 w-3 rounded-full bg-primary/40 inline-block" />
                        </div>
                        <h2 className="text-2xl font-extrabold md:text-3xl tracking-tight text-foreground">
                            {title}
                        </h2>
                    </div>

                    <Link
                        href={linkHref}
                        className="group shrink-0 flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                    >
                        {linkText}
                        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                </div>

                {/* ── Carousel ─────────────────────────────────────────── */}
                <div className="relative group/carousel">
                    {/* Left fade + button */}
                    {showLeft && (
                        <>
                            <div className="absolute left-0 top-0 bottom-4 w-12 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none hidden md:block" />
                            <button
                                onClick={() => scroll("left")}
                                className="absolute -left-5 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full
                                           bg-white dark:bg-slate-800 shadow-lg border border-border
                                           flex items-center justify-center
                                           hover:scale-110 hover:border-primary/50 hover:shadow-primary/20 hover:shadow-xl
                                           transition-all duration-200 hidden md:flex"
                                aria-label="Scroll kiri"
                            >
                                <ChevronLeft className="h-5 w-5 text-foreground" />
                            </button>
                        </>
                    )}

                    {/* Scroll container */}
                    <div
                        ref={scrollContainerRef}
                        onScroll={checkScroll}
                        className="flex gap-4 md:gap-5 overflow-x-auto pb-3 snap-x snap-mandatory
                                   -mx-4 px-4 md:mx-0 md:px-0
                                   scrollbar-hide scroll-smooth"
                    >
                        {donations.map((donation) => (
                            <div
                                key={donation.id}
                                className="min-w-[260px] md:min-w-[300px] snap-start"
                            >
                                <DonationCard {...donation} className="h-full" />
                            </div>
                        ))}
                    </div>

                    {/* Right fade + button */}
                    {showRight && (
                        <>
                            <div className="absolute right-0 top-0 bottom-4 w-12 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none hidden md:block" />
                            <button
                                onClick={() => scroll("right")}
                                className="absolute -right-5 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full
                                           bg-white dark:bg-slate-800 shadow-lg border border-border
                                           flex items-center justify-center
                                           hover:scale-110 hover:border-primary/50 hover:shadow-primary/20 hover:shadow-xl
                                           transition-all duration-200 hidden md:flex"
                                aria-label="Scroll kanan"
                            >
                                <ChevronRight className="h-5 w-5 text-primary" />
                            </button>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}
