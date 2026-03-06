"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

interface Donation {
    _id: string;
    donorName: string;
    amount: number;
    campaignTitle: string;
    createdAt: string;
}

export function LiveDonationToast() {
    const [donations, setDonations] = useState<Donation[]>([]);
    const [currentToast, setCurrentToast] = useState<Donation | null>(null);
    const seenIds = useRef<Set<string>>(new Set());
    const isInitialFetch = useRef(true);

    useEffect(() => {
        const fetchLatestDonations = async () => {
            // Only poll if the tab is active to save resources/API hits
            if (document.visibilityState !== 'visible') return;

            try {
                const res = await fetch("/api/donations/latest");
                if (!res.ok) return;

                const data = await res.json();
                if (data.success && data.data) {
                    const latest = data.data;

                    if (isInitialFetch.current) {
                        latest.forEach((d: Donation) => seenIds.current.add(d._id));
                        isInitialFetch.current = false;
                        return;
                    }

                    const newDonations = latest.filter((d: Donation) => !seenIds.current.has(d._id));
                    if (newDonations.length > 0) {
                        newDonations.forEach((d: Donation) => seenIds.current.add(d._id));
                        setDonations(prev => [...prev, ...newDonations]);
                    }
                }
            } catch (error) {
                // Silently handle polling errors, the next interval will retry
            }
        };

        fetchLatestDonations();
        const interval = setInterval(fetchLatestDonations, 45000); // 45s interval is safer for rate limits

        // Also fetch when user returns to the tab
        document.addEventListener('visibilitychange', fetchLatestDonations);

        return () => {
            clearInterval(interval);
            document.removeEventListener('visibilitychange', fetchLatestDonations);
        };
    }, []);

    // Effect to handle showing toasts one by one
    useEffect(() => {
        if (donations.length > 0 && !currentToast) {
            // Pop the first one off the queue
            const nextDonation = donations[0];
            setCurrentToast(nextDonation);
            setDonations(prev => prev.slice(1));
        }
    }, [donations, currentToast]);

    return (
        <AnimatePresence>
            {currentToast && (
                <motion.div
                    key={currentToast._id}
                    initial={{ y: -60, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -60, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 120, damping: 20 }}
                    className="fixed top-14 md:top-20 left-0 right-0 z-[100] w-full pointer-events-none"
                >
                    {/* Premium Marquee Bar */}
                    <div className="h-10 md:h-12 bg-slate-950/95 md:bg-slate-950/90 backdrop-blur-md border-b border-white/10 flex items-center shadow-2xl overflow-hidden ring-1 ring-white/5">

                        {/* Static Label Label */}
                        <div className="absolute left-0 top-0 bottom-0 z-20 bg-gradient-to-r from-pink-600 to-purple-700 px-3 md:px-5 flex items-center gap-2 shadow-[8px_0_15px_rgba(0,0,0,0.4)]">
                            <div className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                            </div>
                            <span className="text-[9px] md:text-[10px] font-black text-white uppercase tracking-widest whitespace-nowrap">LIVE DONASI</span>
                        </div>

                        {/* Scrolling Content (Marquee) */}
                        <div className="flex-1 overflow-hidden pointer-events-auto">
                            <div
                                className="flex items-center gap-6 whitespace-nowrap animate-marquee hover:[animation-play-state:paused] cursor-help w-max"
                                onAnimationEnd={() => setCurrentToast(null)}
                            >
                                <div className="flex items-center gap-3 pl-[140px] md:pl-[180px]">
                                    <Heart className="w-4 h-4 md:w-5 md:h-5 text-pink-400 fill-pink-400" />
                                    <span className="text-xs md:text-sm font-medium text-white/90">
                                        <span className="font-bold text-pink-400">
                                            {currentToast.donorName?.trim() && currentToast.donorName !== "Anonymous"
                                                ? currentToast.donorName
                                                : "Orang Dermawan"}
                                        </span> baru saja berdonasi {" "}
                                        <span className="font-bold text-emerald-400 italic">Rp {currentToast.amount.toLocaleString("id-ID")}</span> {" "}
                                        untuk <span className="underline decoration-purple-400/50 underline-offset-4">{currentToast.campaignTitle}</span>.
                                    </span>
                                </div>
                                {/* Duplicate for continuous feel if needed, but here we just want 1 pass */}
                            </div>
                        </div>

                        {/* Right side fade for smoothness */}
                        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-950 via-slate-950/40 to-transparent z-10 pointer-events-none" />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
