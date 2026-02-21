"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { urlFor } from "@/sanity/lib/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, ImageOff } from "lucide-react";

interface GalleryImage {
    image: any;
    name?: string;
    fallbackSrc?: string; // Used when no Sanity image asset is available (e.g. mainImage URL)
}

export function DonationGallery({ images }: { images: GalleryImage[] }) {
    const [emblaRef, emblaApi] = useEmblaCarousel(
        { loop: true, align: "start", dragFree: false },
        [Autoplay({ delay: 4500, stopOnInteraction: true })]
    );
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
        setCanScrollPrev(emblaApi.canScrollPrev());
        setCanScrollNext(emblaApi.canScrollNext());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        setScrollSnaps(emblaApi.scrollSnapList());
        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", onSelect);
        return () => {
            emblaApi.off("select", onSelect);
            emblaApi.off("reInit", onSelect);
        };
    }, [emblaApi, onSelect]);

    if (!images || images.length === 0) {
        return (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <h3 className="font-bold text-xl text-foreground">Galeri Foto</h3>
                <div className="flex flex-col items-center justify-center py-16 text-muted-foreground bg-muted/30 rounded-2xl border border-dashed border-border gap-3">
                    <ImageOff className="h-10 w-10 opacity-40" />
                    <p className="font-medium">Belum ada foto untuk campaign ini.</p>
                    <p className="text-sm opacity-70">Foto akan ditampilkan di sini setelah diupload.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="animate-in fade-in duration-500">
            <div className="relative group">
                {/* Carousel Viewport */}
                <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
                    <div className="flex touch-pan-y">
                        {images.map((img, idx) => (
                            <div
                                key={idx}
                                className="flex-[0_0_100%] min-w-0"
                            >
                                <div className="relative aspect-[4/3] md:aspect-video w-full overflow-hidden md:rounded-2xl shadow-sm bg-black">
                                    {(img.image || img.fallbackSrc) ? (
                                        <Image
                                            src={img.image ? urlFor(img.image).width(900).url() : img.fallbackSrc!}
                                            alt={img.name || `Foto ${idx + 1}`}
                                            fill
                                            sizes="(max-width: 640px) 100vw, 50vw"
                                            className="object-contain"
                                            priority={idx === 0}
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                                            <ImageOff className="h-8 w-8 opacity-40" />
                                        </div>
                                    )}
                                    {img.name && (
                                        <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-gradient-to-t from-black/75 to-transparent">
                                            <p className="text-white text-sm font-medium leading-tight truncate">
                                                {img.name}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Prev / Next Buttons */}
                {images.length > 1 && (
                    <>
                        <button
                            onClick={() => emblaApi?.scrollPrev()}
                            className={cn(
                                "absolute left-2 top-1/2 -translate-y-1/2 z-10",
                                "h-9 w-9 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center",
                                "opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-black/70",
                                !canScrollPrev && "opacity-0 pointer-events-none"
                            )}
                            aria-label="Previous"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button
                            onClick={() => emblaApi?.scrollNext()}
                            className={cn(
                                "absolute right-2 top-1/2 -translate-y-1/2 z-10",
                                "h-9 w-9 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center",
                                "opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-black/70",
                                !canScrollNext && "opacity-0 pointer-events-none"
                            )}
                            aria-label="Next"
                        >
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    </>
                )}

                {/* Dot Indicators */}
                {scrollSnaps.length > 1 && (
                    <div className="flex justify-center gap-1.5 mt-3">
                        {scrollSnaps.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => emblaApi?.scrollTo(index)}
                                aria-label={`Foto ${index + 1}`}
                                className={cn(
                                    "rounded-full transition-all duration-300",
                                    index === selectedIndex
                                        ? "w-5 h-2 bg-purple-600"
                                        : "w-2 h-2 bg-slate-300 dark:bg-slate-600 hover:bg-purple-400"
                                )}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
