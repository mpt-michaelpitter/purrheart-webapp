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
        console.log("[LiveDonation] System started polling for notifications...");

        const fetchLatestDonations = async () => {
            try {
                const res = await fetch("/api/donations/latest");
                if (!res.ok) {
                    console.error("[LiveDonation] API error:", res.status);
                    return;
                }

                const data = await res.json();
                if (data.success && data.data) {
                    const latest = data.data;
                    console.log(`[LiveDonation] API check: ${latest.length} donations found.`);

                    // First run: just mark existing ones as seen so we don't spam 
                    // a visitor with historic notifications.
                    if (isInitialFetch.current) {
                        console.log("[LiveDonation] Initial setup: IDs marked as seen.");
                        latest.forEach((d: Donation) => seenIds.current.add(d._id));
                        isInitialFetch.current = false;
                        return;
                    }

                    // Check for new donations
                    const newDonations = latest.filter((d: Donation) => !seenIds.current.has(d._id));

                    if (newDonations.length > 0) {
                        console.log(`[LiveDonation] Found ${newDonations.length} NEW donations! Showing them now.`);
                        newDonations.forEach((d: Donation) => seenIds.current.add(d._id));

                        // Add to queue
                        setDonations(prev => [...prev, ...newDonations]);
                    }
                }
            } catch (error) {
                console.error("[LiveDonation] Polling failed:", error);
            }
        };

        fetchLatestDonations();
        const interval = setInterval(fetchLatestDonations, 10000); // 10s for better responsiveness

        return () => clearInterval(interval);
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
                    className="fixed top-20 md:top-20 left-0 right-0 z-[40] w-full pointer-events-none"
                >
                    {/* Mobile adjustment: Navbar (56px) + Search (approx 48px) = 104px */}
                    <style jsx global>{`
                        @media (max-width: 768px) {
                            .fixed.top-20 { top: 104px !important; }
                        }
                    `}</style>
                    {/* Premium Marquee Bar */}
                    <div className="h-10 md:h-12 bg-slate-950/90 backdrop-blur-md border-b border-white/10 flex items-center shadow-2xl overflow-hidden">

                        {/* Static Label Label */}
                        <div className="absolute left-0 top-0 bottom-0 z-20 bg-gradient-to-r from-pink-600 to-purple-700 px-3 md:px-5 flex items-center gap-2 shadow-[8px_0_15px_rgba(0,0,0,0.4)]">
                            <div className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                            </div>
                            <span className="text-[9px] md:text-[10px] font-black text-white uppercase tracking-widest whitespace-nowrap">LIVE DONASI</span>
                        </div>

                        {/* Scrolling Content (Marquee) */}
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: "110vw" }}
                            transition={{
                                duration: 15,
                                ease: "linear",
                                repeat: 0
                            }}
                            onAnimationComplete={() => setCurrentToast(null)}
                            className="flex items-center gap-6 whitespace-nowrap pl-[140px] md:pl-[180px]"
                        >
                            <div className="flex items-center gap-3">
                                <Heart className="w-4 h-4 md:w-5 md:h-5 text-pink-400 fill-pink-400" />
                                <span className="text-xs md:text-sm font-medium text-white/90">
                                    <span className="font-bold text-pink-400">{currentToast.donorName}</span> baru saja berdonasi {" "}
                                    <span className="font-bold text-emerald-400 italic">Rp {currentToast.amount.toLocaleString("id-ID")}</span> {" "}
                                    untuk <span className="underline decoration-purple-400/50 underline-offset-4">{currentToast.campaignTitle}</span>.
                                </span>
                                <span className="text-[10px] md:text-xs font-bold text-emerald-400 ml-4 py-1 px-3 bg-emerald-500/10 rounded-full border border-emerald-500/20 italic">
                                    "Terimakasih atas donasinya! ❤️"
                                </span>
                            </div>
                        </motion.div>

                        {/* Right side fade for smoothness */}
                        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-950 via-slate-950/40 to-transparent z-10 pointer-events-none" />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
