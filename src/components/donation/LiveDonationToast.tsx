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
    const campaignCache = useRef<Map<string, string>>(new Map());

    const getCampaignTitle = async (campaignRef: string) => {
        if (campaignCache.current.has(campaignRef)) {
            return campaignCache.current.get(campaignRef);
        }
        try {
            const title = await client.fetch(`*[_id == $ref][0].title`, { ref: campaignRef });
            if (title) campaignCache.current.set(campaignRef, title);
            return title || "Campaign";
        } catch {
            return "Campaign";
        }
    };

    useEffect(() => {
        // 1. Initial Fetch to populate seenIds
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

        // 2. Set up Real-time Listener with includeResult for Zero Delay
        const query = `*[_type == "donation" && status == "success"]`;
        const subscription = client.listen(query, {}, { includeResult: true }).subscribe(async (update: any) => {
            const doc = update.result;
            if (doc && !seenIds.current.has(doc._id)) {
                seenIds.current.add(doc._id);

                // Get campaign title (instantly from cache or one quick fetch if new)
                const campaignRef = doc.campaign?._ref;
                const campaignTitle = campaignRef ? await getCampaignTitle(campaignRef) : "Kebaikan";

                const newDonation: Donation = {
                    _id: doc._id,
                    donorName: doc.donorName,
                    amount: doc.amount,
                    campaignTitle: campaignTitle,
                    createdAt: doc._createdAt || new Date().toISOString()
                };

                setDonations(prev => [...prev, newDonation]);
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
                    className="fixed top-0 md:top-20 left-0 right-0 z-[100] w-full pointer-events-none"
                >
                    {/* Full-width Bar Design */}
                    <div className="h-10 md:h-12 bg-slate-950/95 md:bg-slate-950/90 backdrop-blur-md border-b border-white/10 flex items-center shadow-2xl overflow-hidden ring-1 ring-white/5">

                        {/* Live Status Label */}
                        <div className="absolute left-0 top-0 bottom-0 z-20 bg-gradient-to-r from-pink-600 to-purple-700 px-3 md:px-5 flex items-center gap-2 shadow-[8px_0_15px_rgba(0,0,0,0.4)]">
                            <div className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                            </div>

                        </div>

                        {/* Scrolling Content (Marquee) */}
                        <div className="relative flex-1 h-full overflow-hidden pointer-events-auto">
                            <div
                                className="absolute inset-0 flex items-center whitespace-nowrap animate-marquee hover:[animation-play-state:paused] cursor-help w-max"
                                onAnimationEnd={() => setCurrentToast(null)}
                            >
                                <div className="flex items-center gap-3">
                                    <Heart className="w-4 h-4 md:w-5 md:h-5 text-pink-400 fill-pink-400" />
                                    <span className="text-xs md:text-sm font-medium text-white/90 leading-none">
                                        <span className="font-bold text-pink-400 text-sm md:text-base">
                                            {currentToast.donorName?.trim() && currentToast.donorName !== "Anonymous"
                                                ? currentToast.donorName
                                                : "Orang Dermawan"}
                                        </span>
                                        <span className="mx-2 opacity-70">baru saja berdonasi</span>
                                        <span className="font-bold text-emerald-400 text-sm md:text-base bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20">
                                            Rp {currentToast.amount.toLocaleString("id-ID")}
                                        </span>
                                        <span className="mx-2 opacity-70">untuk</span>
                                        <span className="underline decoration-purple-400/50 underline-offset-4 font-semibold">
                                            {currentToast.campaignTitle}
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Fades for smooth transitions */}
                        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-950 via-slate-950/40 to-transparent z-10 pointer-events-none" />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
