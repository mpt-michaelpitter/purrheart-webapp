"use client";

import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";

import { urlFor } from "@/sanity/lib/image";

interface Banner {
    _id: string;
    title: string;
    imageUrl: any;
    redirectUrl: string;
}

interface HeroBannerProps {
    banners?: Banner[];
}

export function HeroBanner({ banners = [] }: HeroBannerProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
        Autoplay({ delay: 5000 }),
    ]);

    // Default banners fallback
    const defaultBanners = [
        {
            _id: "1",
            imageUrl: null, // Will be handled to show static path
            imageSrc: "/images/banner/1.webp",
            redirectUrl: "/donasi/bantu-pendidikan",
            title: "Bantu Pendidikan Anak Bangsa"
        },
        {
            _id: "2",
            imageUrl: null,
            imageSrc: "/images/banner/2.webp",
            redirectUrl: "/donasi/bencana-alam",
            title: "Tanggap Bencana Alam"
        },
        {
            _id: "3",
            imageUrl: null,
            imageSrc: "/images/banner/3.webp",
            redirectUrl: "/donasi/kesehatan-masyarakat",
            title: "Kesehatan untuk Semua"
        },
    ];

    const displayBanners = banners.length > 0 ? banners : defaultBanners;


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
                        {displayBanners.map((banner: any) => {
                            // Handle image source: Sanity or Static Fallback
                            const imageSrc = banner.imageUrl
                                ? urlFor(banner.imageUrl).width(1200).url()
                                : (banner.imageSrc || "/images/banner/1.webp");

                            return (
                                <div
                                    key={banner._id}
                                    className="relative flex-none w-full min-w-0"
                                >
                                    <Link href={banner.redirectUrl || "#"} className="block relative w-full aspect-[21/9] md:aspect-[24/9]">
                                        <Image
                                            src={imageSrc}
                                            alt={banner.title || "Banner"}
                                            fill
                                            className="object-cover"
                                            priority={true}
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
                                        />
                                    </Link>
                                </div>
                            )
                        })}
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
