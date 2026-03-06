"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Loader2, PartyPopper, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface PaymentPageClientProps {
    data: {
        title: string;
        slug: string;
        saweriaUsername?: string;
    }
}

export default function PaymentPageClient({ data }: PaymentPageClientProps) {
    const router = useRouter();
    const slug = data.slug;
    const username = data.saweriaUsername || 'halopeduli';
    const composedMessage = `Semangat! #${slug}`;

    const [paymentDetected, setPaymentDetected] = useState(false);
    const [detectedDonation, setDetectedDonation] = useState<{ donorName: string; amount: number } | null>(null);
    const [pendingDonationId, setPendingDonationId] = useState<string | null>(null);
    const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const hasOpened = useRef(false);

    // Open Saweria popup
    const openSaweria = useCallback(() => {
        const width = 480, height = 720;
        const left = (window.screen.width - width) / 2;
        const top = (window.screen.height - height) / 2;
        window.open(
            `https://saweria.co/${username}`,
            'SaweriaPayment',
            `width=${width},height=${height},top=${top},left=${left},scrollbars=yes,resizable=yes`
        );
    }, [username]);

    // Auto-open Saweria + create pending donation on mount
    useEffect(() => {
        if (hasOpened.current) return;
        hasOpened.current = true;

        // Create pending donation
        (async () => {
            try {
                const res = await fetch('/api/payment/pending', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        donorName: '',
                        campaignSlug: slug,
                        message: composedMessage,
                        isAnonymous: false,
                    }),
                });
                const json = await res.json();
                if (json._id) setPendingDonationId(json._id);
            } catch (e) {
                console.error('[PaymentPage] Could not create pending donation:', e);
            }
        })();

        // Open Saweria immediately
        openSaweria();
    }, [slug, composedMessage, openSaweria]);

    // Poll for payment detection
    useEffect(() => {
        if (paymentDetected) return;

        const checkPayment = async () => {
            try {
                const url = pendingDonationId
                    ? `/api/payment/check?id=${pendingDonationId}`
                    : `/api/payment/check?slug=${slug}&after=${encodeURIComponent(new Date(Date.now() - 5 * 60 * 1000).toISOString())}`;

                const res = await fetch(url);
                const result = await res.json();

                if (result.found && result.donation) {
                    setDetectedDonation(result.donation);
                    setPaymentDetected(true);
                    if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
                }
            } catch {
                // Silent — keep polling
            }
        };

        const timeout = setTimeout(() => {
            pollIntervalRef.current = setInterval(checkPayment, 5000);
        }, 5000);

        return () => {
            clearTimeout(timeout);
            if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
        };
    }, [paymentDetected, slug, pendingDonationId]);

    // ── Payment Detected View ──
    if (paymentDetected && detectedDonation) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8 text-center">
                <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-6 animate-in zoom-in duration-500">
                    <PartyPopper className="h-9 w-9 text-green-600" />
                </div>
                <h1 className="text-2xl font-bold text-foreground mb-2">Donasi Masuk! 🎉</h1>
                <p className="text-muted-foreground mb-1">Terima kasih atas donasi Anda</p>
                <div className="mt-4 bg-card border border-border rounded-2xl p-6 w-full max-w-sm space-y-3 text-left">
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Donatur</span>
                        <span className="font-semibold text-foreground">{detectedDonation.donorName}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Jumlah</span>
                        <span className="font-bold text-primary text-base">
                            Rp {detectedDonation.amount.toLocaleString('id-ID')}
                        </span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Campaign</span>
                        <span className="font-semibold text-foreground">{data.title}</span>
                    </div>
                </div>
                <button
                    onClick={() => router.push(`/donasi/${slug}`)}
                    className="mt-6 w-full max-w-sm bg-primary text-primary-foreground font-bold py-4 rounded-2xl hover:bg-primary/90 active:scale-95 transition-all"
                >
                    Lihat Campaign
                </button>
            </div>
        );
    }

    // ── Waiting for Payment View (default) ──
    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8 text-center">
            <div className="w-20 h-20 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center mb-6">
                <Loader2 className="h-9 w-9 text-yellow-600 animate-spin" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">Menunggu Pembayaran...</h2>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
                Selesaikan pembayaran di jendela Saweria. Halaman ini akan otomatis mendeteksi pembayaran setelah konfirmasi.
            </p>
            <div className="flex flex-col gap-3 mt-8 w-full max-w-sm">
                <button
                    onClick={openSaweria}
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3.5 rounded-2xl transition-all active:scale-95"
                >
                    🔄 Buka Saweria Lagi
                </button>
                <Link
                    href={`/donasi/${slug}`}
                    className="w-full py-3.5 rounded-2xl font-semibold border border-border hover:bg-muted transition-colors text-muted-foreground text-sm text-center"
                >
                    Kembali ke Campaign
                </Link>
            </div>
        </div>
    );
}

