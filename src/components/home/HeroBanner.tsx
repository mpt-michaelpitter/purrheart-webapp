"use client";

import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";

interface Banner {
    _id: string;
    title: string;
    imageUrl: Record<string, unknown> | null;
    redirectUrl: string;
}

interface HeroBannerProps {
    banners?: Banner[];
}

const defaultBanners = [
    { _id: "1", imageUrl: null, imageSrc: "/images/banner/1.webp", redirectUrl: "/donasi", title: "Bantu Mereka Hari Ini" },
    { _id: "2", imageUrl: null, imageSrc: "/images/banner/2.webp", redirectUrl: "/donasi", title: "Setiap Rupiah Berarti" },
    { _id: "3", imageUrl: null, imageSrc: "/images/banner/3.webp", redirectUrl: "/donasi", title: "Bersama Kita Bisa" },
];

export function HeroBanner({ banners = [] }: HeroBannerProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
        Autoplay({ delay: 5000, stopOnInteraction: false }),
    ]);

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

    const displayBanners = banners.length > 0 ? banners : defaultBanners;

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        setScrollSnaps(emblaApi.scrollSnapList());
        emblaApi.on("select", onSelect);
        return () => { emblaApi.off("select", onSelect); };
    }, [emblaApi, onSelect]);

    return (
        <section className="w-full pt-5 pb-3 md:pt-7 bg-background">
            <div className="container mx-auto  md:px-6">
                <div
                    className="relative overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl shadow-black/20 group"
                    ref={emblaRef}
                >
                    <div className="flex touch-pan-y">
                        {displayBanners.map((banner: Banner & { categorySlug?: string; imageSrc?: string }) => {
                            const imageSrc = banner.imageUrl
                                ? urlFor(banner.imageUrl).width(1400).url()
                                : (banner.imageSrc || "/images/banner/1.webp");

                            const bannerLink = banner.categorySlug
                                ? `/donasi/${banner.categorySlug}`
                                : (banner.redirectUrl || "/donasi");

                            return (
                                <div key={banner._id} className="relative flex-none w-full min-w-0">
                                    <Link href={bannerLink} className="block relative w-full aspect-4/5 md:aspect-24/9">
                                        <Image
                                            src={imageSrc}
                                            alt={banner.title || "Banner"}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                                            priority
                                            sizes="(max-width: 768px) 100vw, 1400px"
                                        />
                                        {/* Gradient overlay bottom */}
                                        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />

                                        {/* Title overlay */}
                                        {banner.title && (
                                            <div className="absolute bottom-5 left-6 right-16">
                                                <p className="text-white/80 text-xs font-medium mb-1 tracking-widest uppercase">Purrheart</p>
                                                <h2 className="text-white text-xl md:text-3xl font-extrabold leading-tight drop-shadow-lg line-clamp-2">
                                                    {banner.title}
                                                </h2>
                                            </div>
                                        )}
                                    </Link>
                                </div>
                            );
                        })}
                    </div>

                    {/* Prev / Next arrows */}
                    <button
                        onClick={() => emblaApi?.scrollPrev()}
                        className={cn(
                            "absolute left-3 top-1/2 -translate-y-1/2 z-20",
                            "h-9 w-9 rounded-full bg-black/40 backdrop-blur-sm text-white",
                            "flex items-center justify-center",
                            "hover:bg-black/60 transition-all duration-200",
                            "opacity-0 group-hover:opacity-100",
                        )}
                        aria-label="Slide sebelumnya"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                        onClick={() => emblaApi?.scrollNext()}
                        className={cn(
                            "absolute right-3 top-1/2 -translate-y-1/2 z-20",
                            "h-9 w-9 rounded-full bg-black/40 backdrop-blur-sm text-white",
                            "flex items-center justify-center",
                            "hover:bg-black/60 transition-all duration-200",
                            "opacity-0 group-hover:opacity-100",
                        )}
                        aria-label="Slide berikutnya"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </button>
                </div>

                {/* Dots pagination */}
                <div className="mt-4 flex justify-center gap-2">
                    {scrollSnaps.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => emblaApi?.scrollTo(index)}
                            aria-label={`Slide ${index + 1}`}
                            className={cn(
                                "rounded-full transition-all duration-300",
                                index === selectedIndex
                                    ? "w-7 h-2 bg-primary"
                                    : "w-2 h-2 bg-border hover:bg-muted-foreground"
                            )}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
