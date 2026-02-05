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
                    <div className="bg-white dark:bg-card p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 leading-snug">
                            {data.title}
                        </h1>

                        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
                            <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                                <Users className="h-5 w-5 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-500">Penggalang Dana</p>
                                <div className="flex items-center gap-1">
                                    <p className="text-sm font-bold text-slate-900 dark:text-white">{data.organizer}</p>
                                    <div className="bg-blue-500 rounded-full p-0.5"><div className="h-2 w-2 bg-white rounded-full"></div></div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between items-end">
                                <div className="text-3xl font-bold text-purple-600">
                                    Rp {data.currentAmount.toLocaleString("id-ID")}
                                </div>
                            </div>
                            <div className="flex justify-between text-xs text-slate-500">
                                <span>terkumpul dari <b>Rp {data.targetAmount.toLocaleString("id-ID")}</b></span>
                                <span>{percentage > 0 && percentage < 1 ? "< 1%" : `${percentage.toFixed(0)}%`}</span>
                            </div>
                            <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-purple-600 rounded-full" style={{ width: `${percentage}%` }} />
                            </div>
                            <div className="flex justify-between text-sm font-medium pt-2">
                                <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                                    <Users className="h-4 w-4" />
                                    <span>{data.donorCount} Donatur</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                                    <Clock className="h-4 w-4" />
                                    <span>{data.daysLeft} hari lagi</span>
                                </div>
                            </div>
                        </div>

                        <Link
                            href={`/donasi/${data.slug}/payment`}
                            className="block w-full text-center bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-purple-200 dark:shadow-none hover:-translate-y-1 transition-all duration-300 text-lg"
                        >
                            Donasi Sekarang
                        </Link>

                        <button
                            onClick={() => setIsShareOpen(true)}
                            className="w-full mt-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                        >
                            <Share2 className="h-4 w-4" />
                            Bagikan
                        </button>
                    </div>

                    {/* Top Donors Box */}
                    <div className="bg-white dark:bg-card p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                        <h3 className="font-bold text-slate-900 dark:text-white mb-4">Donatur Terbanyak</h3>
                        <div className="space-y-4">
                            {[...data.donors].sort((a: any, b: any) => b.amount - a.amount).slice(0, 5).map((d: any, i: number) => (
                                <div key={i} className="flex justify-between items-center text-sm">
                                    <span className="text-slate-600 dark:text-slate-400 truncate max-w-[120px]">{d.name}</span>
                                    <span className="font-bold text-purple-600">Rp {d.amount.toLocaleString("id-ID")}</span>
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
