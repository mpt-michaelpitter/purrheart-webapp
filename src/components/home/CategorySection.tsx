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

export function CategorySection({ title, linkText = "Lihat Semua", linkHref = "#", donations, categoryImage }: CategorySectionProps) {
    const scrollContainerRef = React.useRef<HTMLDivElement>(null);
    const [showLeft, setShowLeft] = React.useState(false);
    const [showRight, setShowRight] = React.useState(true);

    const checkScroll = () => {
        if (!scrollContainerRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        setShowLeft(scrollLeft > 0);
        setShowRight(scrollLeft < scrollWidth - clientWidth - 10);
    };

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 300;
            const newScrollLeft = direction === 'left'
                ? scrollContainerRef.current.scrollLeft - scrollAmount
                : scrollContainerRef.current.scrollLeft + scrollAmount;

            scrollContainerRef.current.scrollTo({
                left: newScrollLeft,
                behavior: 'smooth'
            });
        }
    };

    React.useEffect(() => {
        checkScroll();
        window.addEventListener('resize', checkScroll);
        return () => window.removeEventListener('resize', checkScroll);
    }, [donations]);

    return (
        <section className="py-12 border-b border-border/50 last:border-0">
            <div className="container mx-auto px-4 md:px-6">
                {/* Category Header */}
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold md:text-3xl">{title}</h2>
                    <Link
                        href={linkHref}
                        className="group flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                    >
                        {linkText}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                <div className="relative group/carousel">
                    {/* Left Button */}
                    {showLeft && (
                        <button
                            onClick={() => scroll('left')}
                            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-40 p-3 rounded-full bg-white dark:bg-slate-800 shadow-xl border border-slate-100 dark:border-slate-700 text-slate-700 dark:text-white hover:scale-110 transition-all duration-300 hidden md:flex items-center justify-center"
                            aria-label="Scroll Left"
                        >
                            <ChevronLeft className="h-6 w-6" />
                        </button>
                    )}

                    <div
                        ref={scrollContainerRef}
                        onScroll={checkScroll}
                        className="flex gap-4 md:gap-6 overflow-x-auto pb-4 snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide scroll-smooth"
                    >
                        {donations.map((donation) => (
                            <div key={donation.id} className="min-w-[280px] md:min-w-[320px] snap-center first:pl-0">
                                <DonationCard
                                    {...donation}
                                    className="h-full"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Right Button */}
                    {showRight && (
                        <button
                            onClick={() => scroll('right')}
                            className="absolute right-0 border border-purple-600 top-1/2 -translate-y-1/2 translate-x-4 z-40 p-3 rounded-full bg-white dark:bg-slate-800 shadow-xl border border-slate-100 dark:border-slate-700 text-slate-700 dark:text-white hover:scale-110 transition-all duration-300 hidden md:flex items-center justify-center"
                            aria-label="Scroll Right"
                        >
                            <ChevronRight className="h-6 w-6  text-purple-600   " />
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
}
