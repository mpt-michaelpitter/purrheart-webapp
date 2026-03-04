"use client";

import Image from "next/image";
import Link from "next/link";
import { Users, Clock, ImageOff, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Campaign } from "@/types";

type DonationCardProps = Campaign & { className?: string };

export function DonationCard({
    slug,
    imageSrc,
    title,
    organizer,
    currentAmount,
    targetAmount,
    donorCount,
    daysLeft,
    verified,
    className,
}: DonationCardProps) {
    const percentage = targetAmount
        ? Math.min((currentAmount / targetAmount) * 100, 100)
        : 0;

    const urgent = daysLeft > 0 && daysLeft <= 7;

    return (
        <Link
            href={`/donasi/${slug}`}
            className={cn(
                // Base
                "group relative flex flex-col overflow-hidden rounded-2xl bg-card",
                // Border — subtle in light mode
                "border border-border/60 hover:border-primary/30",
                // Shadow — soft elevation
                "shadow-sm shadow-black/[0.04] hover:shadow-lg hover:shadow-primary/8",
                // Motion
                "transition-all duration-300 hover:-translate-y-1",
                className
            )}
        >
            {/* ── Image ──────────────────────────────────────────────────── */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                {imageSrc ? (
                    <>
                        <Image
                            src={imageSrc}
                            alt={title}
                            fill
                            className="object-cover object-top transition-transform duration-500 group-hover:scale-110"
                        />
                        {/* Dark gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                    </>
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-muted-foreground/50">
                        <ImageOff className="h-8 w-8" />
                        <span className="text-[10px]">Belum ada gambar</span>
                    </div>
                )}

                {/* Badges — overlaid on image */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    {verified && (
                        <span className="flex items-center gap-1 rounded-full bg-blue-500/90 backdrop-blur-sm px-2 py-0.5 text-[10px] font-bold text-white shadow">
                            <CheckCircle2 className="h-3 w-3" />
                            Terverifikasi
                        </span>
                    )}
                    {urgent && (
                        <span className="rounded-full bg-red-500/90 backdrop-blur-sm px-2 py-0.5 text-[10px] font-bold text-white shadow animate-pulse">
                            🔥 Segera Berakhir
                        </span>
                    )}
                </div>

                {/* Days left — bottom-right of image */}
                {daysLeft > 0 && (
                    <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-black/60 backdrop-blur-sm px-2.5 py-1 text-[10px] font-semibold text-white">
                        <Clock className="h-3 w-3" />
                        {daysLeft} hari lagi
                    </div>
                )}
            </div>

            {/* ── Content ────────────────────────────────────────────────── */}
            <div className="flex flex-1 flex-col p-4 gap-3">
                {/* Organizer */}
                <div className="flex items-center gap-2">
                    <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Users className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-[11px] text-muted-foreground font-medium truncate">
                        {organizer}
                    </span>
                </div>

                {/* Title */}
                <h3 className="text-sm font-bold leading-snug text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-200">
                    {title}
                </h3>

                {/* Progress */}
                <div className="mt-auto space-y-2">
                    {/* Amount */}
                    <div className="flex items-end justify-between">
                        <div>
                            <span className="text-base font-extrabold text-primary">
                                Rp {currentAmount.toLocaleString("id-ID")}
                            </span>
                            {targetAmount && (
                                <p className="text-[10px] text-muted-foreground">
                                    dari Rp {targetAmount.toLocaleString("id-ID")}
                                </p>
                            )}
                        </div>
                        <span className="text-xs font-semibold text-primary/80">
                            {percentage < 1 && percentage > 0 ? "<1" : percentage.toFixed(0)}%
                        </span>
                    </div>

                    {/* Progress bar with glow */}
                    <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted">
                        <div
                            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary to-purple-400 transition-all duration-700 ease-out"
                            style={{ width: `${percentage}%` }}
                        />
                    </div>

                    {/* Donor count */}
                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                        <Users className="h-3 w-3" />
                        <span>{donorCount.toLocaleString("id-ID")} donatur</span>
                    </div>
                </div>
            </div>

            {/* Hover gradient border effect */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-transparent group-hover:ring-primary/20 transition-all duration-300" />
        </Link>
    );
}
