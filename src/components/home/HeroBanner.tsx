"use client";

import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";

const banners = [
    {
        id: 1,
        mobile: "/images/banner/1.webp",
        tablet: "/images/banner/1.webp",
        desktop: "/images/banner/1.webp",
        link: "/donasi/bantu-pendidikan",
        title: "Bantu Pendidikan Anak Bangsa"
    },
    {
        id: 2,
        mobile: "/images/banner/2.webp",
        tablet: "/images/banner/2.webp",
        desktop: "/images/banner/2.webp",
        link: "/donasi/bencana-alam",
        title: "Tanggap Bencana Alam"
    },
    {
        id: 3,
        mobile: "/images/banner/3.webp",
        tablet: "/images/banner/3.webp",
        desktop: "/images/banner/3.webp",
        link: "/donasi/kesehatan-masyarakat",
        title: "Kesehatan untuk Semua"
    },
];

export function HeroBanner() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
        Autoplay({ delay: 5000 }),
    ]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        setScrollSnaps(emblaApi.scrollSnapList());
        emblaApi.on("select", onSelect);
        return () => {
            emblaApi.off("select", onSelect);
        };
    }, [emblaApi, onSelect]);

    return (
        <section className="w-full pt-6 bg-grey-50 pb-2 md:pt-8 bg-background transition-colors">
            <div className="container mx-auto  px-4 md:px-6">
                <div
                    className="overflow-hidden rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 border border-slate-200 dark:border-slate-800 relative group"
                    ref={emblaRef}
                >
                    <div className="flex touch-pan-y">
                        {banners.map((banner) => (
                            <div
                                key={banner.id}
                                className="relative flex-none w-full min-w-0"
                            >
                                <Link href={banner.link} className="block relative w-full">
                                    {/* Mobile Image */}
                                    <div className="block sm:hidden relative w-full">
                                        <Image
                                            src={banner.mobile}
                                            alt={banner.title}
                                            width={0}
                                            height={0}
                                            sizes="100vw"
                                            className="w-full h-auto"
                                            priority={banner.id === 1}
                                        />
                                    </div>
                                    {/* Tablet Image */}
                                    <div className="hidden sm:block lg:hidden relative w-full">
                                        <Image
                                            src={banner.tablet}
                                            alt={banner.title}
                                            width={0}
                                            height={0}
                                            sizes="100vw"
                                            className="w-full h-auto"
                                            priority={banner.id === 1}
                                        />
                                    </div>
                                    {/* Desktop Image */}
                                    <div className="hidden lg:block relative w-full">
                                        <Image
                                            src={banner.desktop}
                                            alt={banner.title}
                                            width={0}
                                            height={0}
                                            sizes="100vw"
                                            className="w-full h-auto"
                                            priority={banner.id === 1}
                                        />
                                    </div>
                                    {/* No Text Overlay as requested */}
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Dots Pagination */}
                <div className="mt-6 flex justify-center gap-3">
                    {scrollSnaps.map((_, index) => (
                        <button
                            key={index}
                            className={cn(
                                "h-2 rounded-full transition-all duration-300 ease-out",
                                index === selectedIndex
                                    ? "w-8 bg-primary"
                                    : "w-2 bg-slate-300 hover:bg-slate-400 dark:bg-slate-700 dark:hover:bg-slate-600"
                            )}
                            onClick={() => emblaApi?.scrollTo(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
