"use client";

import Link from "next/link";
import { Users, Clock, Share2 } from "lucide-react";
import { useState } from "react";
import { ShareModal } from "@/components/donation/ShareModal";

interface SidebarProps {
    data: any; // Ideally define a proper type
    percentage: number;
}

export function DonationSidebar({ data, percentage }: SidebarProps) {
    const [isShareOpen, setIsShareOpen] = useState(false);

    // Construct URL logic (client-side only or pre-computed)
    // We can assume standard format
    const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/donasi/${data.slug}` : '';

    return (
        <>
            <div className="hidden md:block md:col-span-1">
                <div className="sticky top-24 space-y-6">
                    <div className="bg-card p-6 rounded-2xl shadow-sm border border-border">
                        <h1 className="text-2xl font-bold mb-4 leading-snug text-foreground">
                            {data.title}
                        </h1>

                        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-border">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <Users className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">Penggalang Dana</p>
                                <div className="flex items-center gap-1">
                                    <p className="text-sm font-bold text-foreground">{data.organizer}</p>
                                    <div className="bg-blue-500 rounded-full p-0.5"><div className="h-2 w-2 bg-white rounded-full"></div></div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between items-end">
                                <div className="text-3xl font-bold text-primary">
                                    Rp {data.currentAmount.toLocaleString("id-ID")}
                                </div>
                            </div>
                            <div className="flex justify-between text-xs text-muted-foreground">
                                <span>terkumpul dari <b>Rp {data.targetAmount.toLocaleString("id-ID")}</b></span>
                                <span>{percentage > 0 && percentage < 1 ? "< 1%" : `${percentage.toFixed(0)}%`}</span>
                            </div>
                            <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
                                <div className="h-full bg-primary rounded-full transition-all duration-1000 ease-out" style={{ width: `${percentage}%` }} />
                            </div>
                            <div className="flex justify-between text-sm font-medium pt-2 text-muted-foreground">
                                <div className="flex items-center gap-1.5">
                                    <Users className="h-4 w-4" />
                                    <span>{data.donorCount} Donatur</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Clock className="h-4 w-4" />
                                    <span>{data.daysLeft} hari lagi</span>
                                </div>
                            </div>
                        </div>

                        <Link
                            href={`/donasi/${data.slug}/payment`}
                            className="block w-full text-center bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-4 rounded-xl shadow-lg bg-purple-600   hover:-translate-y-1 transition-all duration-300 text-lg"
                        >
                            Donasi Sekarang
                        </Link>

                        <button
                            onClick={() => setIsShareOpen(true)}
                            className="w-full mt-3 bg-background border border-border hover:bg-muted text-muted-foreground font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                        >
                            <Share2 className="h-4 w-4" />
                            Bagikan
                        </button>
                    </div>

                    {/* Top Donors Box */}
                    <div className="bg-card p-6 rounded-2xl shadow-sm border border-border">
                        <h3 className="font-bold text-foreground mb-4">Donatur Terbanyak</h3>
                        <div className="space-y-4">
                            {[...data.donors].sort((a: any, b: any) => b.amount - a.amount).slice(0, 5).map((d: any, i: number) => (
                                <div key={i} className="flex justify-between items-center text-sm">
                                    <span className="text-muted-foreground truncate max-w-[120px]">{d.name}</span>
                                    <span className="font-bold text-primary">Rp {d.amount.toLocaleString("id-ID")}</span>
                                </div>
                            ))}
                        </div>
                    </div>
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
