"use client";

import Link from "next/link";
import { Users, Clock, Share2, TrendingUp, Trophy } from "lucide-react";
import { useState } from "react";
import { ShareModal } from "@/components/donation/ShareModal";
import { handleDonationClick } from "@/lib/saweria";

interface SidebarProps {
    data: any;
    percentage: number;
}

export function DonationSidebar({ data, percentage }: SidebarProps) {
    const [isShareOpen, setIsShareOpen] = useState(false);
    const shareUrl = typeof window !== "undefined"
        ? `${window.location.origin}/donasi/${data.slug}`
        : "";

    const urgent = data.daysLeft > 0 && data.daysLeft <= 7;
    const clampedPct = Math.min(100, Math.max(0, percentage));

    return (
        <>
            <div className="hidden md:block md:col-span-1">
                <div className="sticky top-24 space-y-4">

                    {/* ── Main Donation Card ─────────────────────────────── */}
                    <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-xl shadow-black/5">
                        {/* Subtle top gradient bar */}
                        <div className="h-1 w-full bg-gradient-to-r from-primary via-purple-400 to-primary/60" />

                        <div className="p-6">
                            {/* Title */}
                            <h1 className="text-lg font-bold leading-snug text-foreground mb-5 line-clamp-3">
                                {data.title}
                            </h1>

                            {/* Amount */}
                            <div className="mb-1">
                                <span className="text-3xl font-extrabold tracking-tight text-primary">
                                    Rp {(data.currentAmount ?? 0).toLocaleString("id-ID")}
                                </span>
                            </div>
                            <p className="text-xs text-muted-foreground mb-4">
                                terkumpul dari{" "}
                                <span className="font-semibold text-foreground">
                                    Rp {(data.targetAmount ?? 0).toLocaleString("id-ID")}
                                </span>
                            </p>

                            {/* Progress bar */}
                            <div className="relative h-3 w-full rounded-full bg-muted overflow-hidden mb-1">
                                <div
                                    className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary to-purple-400 transition-all duration-1000 ease-out"
                                    style={{ width: `${clampedPct}%` }}
                                />
                            </div>
                            <div className="flex justify-between text-xs text-muted-foreground mb-5">
                                <span className="font-semibold text-primary">
                                    {clampedPct < 1 && clampedPct > 0 ? "<1" : clampedPct.toFixed(0)}% tercapai
                                </span>
                            </div>

                            {/* Stats row */}
                            <div className="flex items-center gap-4 pb-5 mb-5 border-b border-border">
                                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                    <Users className="h-4 w-4 text-primary" />
                                    <span className="font-semibold text-foreground">{(data.donorCount ?? 0).toLocaleString("id-ID")}</span>
                                    <span>donatur</span>
                                </div>
                                <div className={`flex items-center gap-1.5 text-sm ${urgent ? "text-red-500" : "text-muted-foreground"}`}>
                                    <Clock className="h-4 w-4" />
                                    <span className="font-semibold text-foreground">{data.daysLeft}</span>
                                    <span>hari lagi</span>
                                    {urgent && <span className="animate-pulse">🔥</span>}
                                </div>
                            </div>

                            {/* CTA Buttons */}
                            <button
                                onClick={() => handleDonationClick(data.slug, data.saweriaUsername)}
                                className="group relative block w-full overflow-hidden rounded-xl bg-primary py-4 text-center font-bold text-primary-foreground text-base
                                           shadow-lg shadow-primary/30
                                           hover:shadow-xl hover:shadow-primary/40
                                           hover:-translate-y-0.5
                                           transition-all duration-300"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    <TrendingUp className="h-5 w-5" />
                                    Donasi Sekarang
                                </span>
                                {/* Shimmer effect */}
                                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700" />
                            </button>

                            <button
                                onClick={() => setIsShareOpen(true)}
                                className="mt-3 w-full flex items-center justify-center gap-2 rounded-xl border border-border
                                           py-3 text-sm font-semibold text-muted-foreground
                                           hover:bg-muted hover:text-foreground hover:border-primary/40
                                           transition-colors duration-200"
                            >
                                <Share2 className="h-4 w-4" />
                                Bagikan Campaign
                            </button>
                        </div>
                    </div>

                    {/* ── Top Donors ────────────────────────────────────── */}
                    {data.donors?.length > 0 && (
                        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                            <div className="flex items-center gap-2 mb-4">
                                <Trophy className="h-4 w-4 text-amber-500" />
                                <h3 className="font-bold text-sm text-foreground">Donatur Terbanyak</h3>
                            </div>
                            <div className="space-y-3">
                                {[...data.donors]
                                    .sort((a: any, b: any) => b.amount - a.amount)
                                    .slice(0, 5)
                                    .map((d: any, i: number) => (
                                        <div key={i} className="flex items-center gap-3">
                                            {/* Rank badge */}
                                            <div className={`shrink-0 h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-extrabold
                                                ${i === 0 ? "bg-amber-400 text-amber-900" :
                                                    i === 1 ? "bg-slate-300 text-slate-800" :
                                                        i === 2 ? "bg-orange-400 text-orange-900" :
                                                            "bg-muted text-muted-foreground"}`}>
                                                {i + 1}
                                            </div>
                                            <span className="flex-1 text-sm text-foreground truncate">{d.name}</span>
                                            <span className="text-xs font-bold text-primary shrink-0">
                                                Rp {d.amount.toLocaleString("id-ID")}
                                            </span>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <ShareModal
                isOpen={isShareOpen}
                onClose={() => setIsShareOpen(false)}
                url={shareUrl}
                title={data.title}
            />
        </>
    );
}
