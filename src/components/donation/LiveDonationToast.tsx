"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { client } from "@/sanity/lib/client";

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

    const fetchSingleDonation = async (id: string) => {
        try {
            const query = `*[_type == "donation" && _id == $id][0] {
                _id,
                donorName,
                amount,
                "campaignTitle": campaign->title,
                createdAt
            }`;
            const data = await client.fetch(query, { id });
            if (data && !seenIds.current.has(data._id)) {
                seenIds.current.add(data._id);
                setDonations(prev => [...prev, data]);
            }
        } catch (error) {
            console.error("Error fetching single donation:", error);
        }
    };

    useEffect(() => {
        // 1. Initial Fetch to populate seenIds so we don't show old toasts
        const fetchInitial = async () => {
            try {
                const query = `*[_type == "donation" && status == "success"] | order(createdAt desc)[0...5] { _id }`;
                const latest = await client.fetch(query);
                latest.forEach((d: any) => seenIds.current.add(d._id));
                isInitialFetch.current = false;
            } catch (error) {
                console.error("Initial fetch error:", error);
            }
        };

        fetchInitial();

        // 2. Set up Real-time Listener
        const query = `*[_type == "donation" && status == "success"]`;
        const subscription = client.listen(query).subscribe((update: any) => {
            if (update.result) {
                // If it's a new document or a status change to success
                const newId = update.result._id;
                if (!seenIds.current.has(newId)) {
                    fetchSingleDonation(newId);
                }
            } else if (update.transition === 'appear' || (update.transition === 'update' && update.result)) {
                // Fallback for different listener event types
                const newId = update.documentId;
                if (newId && !seenIds.current.has(newId)) {
                    fetchSingleDonation(newId);
                }
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    // Effect to handle showing toasts one by one
    useEffect(() => {
        if (donations.length > 0 && !currentToast) {
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
                    <div className="h-10 md:h-12 bg-slate-950/95 md:bg-slate-950/90 backdrop-blur-md border-b border-white/10 flex items-center shadow-2xl overflow-hidden ring-1 ring-white/5">
                        <div className="absolute left-0 top-0 bottom-0 z-20 bg-gradient-to-r from-pink-600 to-purple-700 px-3 md:px-5 flex items-center gap-2 shadow-[8px_0_15px_rgba(0,0,0,0.4)]">
                            <div className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                            </div>
                            <span className="text-[9px] md:text-[10px] font-black text-white uppercase tracking-widest whitespace-nowrap">LIVE DONASI</span>
                        </div>

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
                            </div>
                        </div>

                        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-950 via-slate-950/40 to-transparent z-10 pointer-events-none" />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

