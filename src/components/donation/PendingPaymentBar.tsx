"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AlertCircle, X } from "lucide-react";
import { usePathname } from "next/navigation";

interface PendingPayment {
    slug: string;
    amount: number;
    expiryTime: string;
}

export function PendingPaymentBar() {
    const [pendingPayment, setPendingPayment] = useState<PendingPayment | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        // Check for pending payment in localStorage on mount
        const stored = localStorage.getItem("pending_payment");
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                // Check expiry (e.g. 24 hours)
                const expiry = new Date(parsed.expiryTime);
                if (expiry > new Date()) {
                    setTimeout(() => {
                        setPendingPayment(parsed);
                        setIsVisible(true);
                    }, 0);
                } else {
                    localStorage.removeItem("pending_payment");
                }
            } catch (e) {
                console.error("Failed to parse pending payment", e);
                localStorage.removeItem("pending_payment");
            }
        }

        // Listen for storage events (if multiple tabs) or custom event
        const handleStorageChange = () => {
            const updated = localStorage.getItem("pending_payment");
            if (updated) {
                setIsVisible(true);
                setPendingPayment(JSON.parse(updated));
            } else {
                setIsVisible(false);
                setPendingPayment(null);
            }
        };

        // Listen to custom event for immediate updates within same tab
        window.addEventListener("pending_payment_updated", handleStorageChange);

        return () => {
            window.removeEventListener("pending_payment_updated", handleStorageChange);
        }
    }, []);

    // Don't show on the payment page itself to avoid duplication
    if (!isVisible || !pendingPayment) return null;

    // If we are already on the payment page for THIS slug, hide it
    if (pathname.includes(`/donasi/${pendingPayment.slug}/payment`)) return null;

    return (
        <div className="fixed bottom-[70px] md:bottom-4 left-4 right-4 z-90 animate-in slide-in-from-bottom-5 duration-300">
            <div className="bg-orange-600 text-white p-4 rounded-xl shadow-xl flex items-center justify-between gap-4 max-w-xl mx-auto backdrop-blur-md bg-opacity-95">
                <div className="flex items-center gap-3 overflow-hidden">
                    <div className="bg-white/20 p-2 rounded-full shrink-0 animate-pulse">
                        <AlertCircle className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-orange-100 truncate">Menunggu Pembayaran</p>
                        <p className="text-sm font-bold truncate">Rp {pendingPayment.amount.toLocaleString("id-ID")}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                    <Link
                        href={`/donasi/${pendingPayment.slug}/payment`}
                        className="bg-white text-orange-600 text-xs font-bold px-4 py-2 rounded-lg hover:bg-orange-50 transition-colors shadow-sm"
                    >
                        Bayar
                    </Link>
                    <button
                        onClick={() => {
                            setIsVisible(false);
                            // Optional warning: "Are you sure you want to cancel checking this payment?"
                            // For now just hide UI, keep storage until expiry or explicit cancel
                        }}
                        className="p-1 hover:bg-white/20 rounded-full transition-colors"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
