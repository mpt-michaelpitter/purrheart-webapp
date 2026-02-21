"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, AlertCircle, CheckCircle2, Copy, Loader2, PartyPopper } from "lucide-react";
import { cn } from "@/lib/utils";

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

    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [showCancelModal, setShowCancelModal] = useState(false);

    // After user opens Saweria popup
    const [saweriaOpened, setSaweriaOpened] = useState(false);
    const [paymentDetected, setPaymentDetected] = useState(false);
    const [detectedDonation, setDetectedDonation] = useState<{ donorName: string; amount: number } | null>(null);
    const [pendingDonationId, setPendingDonationId] = useState<string | null>(null);
    const [creatingPending, setCreatingPending] = useState(false);
    const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);

    const composedMessage = `${message.trim() || "Semangat!"} #${slug}`;
    const displayName = isAnonymous ? "Anonim" : (name.trim() || "-");

    const handleOpenSaweria = async () => {
        if (creatingPending) return;
        setCreatingPending(true);
        try {
            // 1. Create pending donation in Sanity
            const res = await fetch('/api/payment/pending', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    donorName: isAnonymous ? 'Anonim' : name.trim(),
                    campaignSlug: slug,
                    message: composedMessage,
                    isAnonymous,
                }),
            });
            const json = await res.json();
            if (json._id) {
                setPendingDonationId(json._id);
            }
        } catch (e) {
            console.error('[PaymentPage] Could not create pending donation:', e);
        } finally {
            setCreatingPending(false);
        }

        // 2. Open Saweria popup
        setSaweriaOpened(true);
        const width = 480, height = 720;
        const left = (window.screen.width - width) / 2;
        const top = (window.screen.height - height) / 2;
        window.open(
            `https://saweria.co/${username}`,
            'SaweriaPayment',
            `width=${width},height=${height},top=${top},left=${left},scrollbars=yes,resizable=yes`
        );
    };

    // Poll for payment status change: pending → success
    useEffect(() => {
        if (!saweriaOpened || paymentDetected) return;

        const checkPayment = async () => {
            try {
                // If we have a specific pending donation _id, poll that
                const url = pendingDonationId
                    ? `/api/payment/check?id=${pendingDonationId}`
                    : `/api/payment/check?slug=${slug}&after=${encodeURIComponent(new Date(Date.now() - 5 * 60 * 1000).toISOString())}`;

                const res = await fetch(url);
                const data = await res.json();

                if (data.found && data.donation) {
                    setDetectedDonation(data.donation);
                    setPaymentDetected(true);
                    if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
                }
            } catch (e) {
                // Silent — keep polling
            }
        };

        // Start polling after 5 seconds (give user time to pay)
        const timeout = setTimeout(() => {
            pollIntervalRef.current = setInterval(checkPayment, 5000);
        }, 5000);

        return () => {
            clearTimeout(timeout);
            if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
        };
    }, [saweriaOpened, paymentDetected, slug, pendingDonationId]);

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

    // ── Waiting for Payment View (after Saweria opened) ──
    if (saweriaOpened) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8 text-center">
                <div className="w-20 h-20 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center mb-6">
                    <Loader2 className="h-9 w-9 text-yellow-600 animate-spin" />
                </div>
                <h2 className="text-xl font-bold text-foreground mb-2">Menunggu Pembayaran...</h2>
                <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
                    Selesaikan pembayaran di jendela Saweria. Pastikan Anda menyertakan pesan:
                </p>
                <div className="mt-4 bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-900/50 rounded-xl px-5 py-3 font-mono font-bold text-yellow-900 dark:text-yellow-300 text-sm">
                    {composedMessage}
                </div>
                <p className="text-xs text-muted-foreground mt-4 max-w-xs">
                    Halaman ini akan otomatis mendeteksi pembayaran setelah konfirmasi dari Saweria.
                </p>

                <div className="flex flex-col gap-3 mt-8 w-full max-w-sm">
                    <button
                        onClick={handleOpenSaweria}
                        className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3.5 rounded-2xl transition-all"
                    >
                        🔄 Buka Saweria Lagi
                    </button>
                    <button
                        onClick={() => router.push(`/donasi/${slug}`)}
                        className="w-full py-3.5 rounded-2xl font-semibold border border-border hover:bg-muted transition-colors text-muted-foreground text-sm"
                    >
                        Kembali ke Campaign
                    </button>
                </div>
            </div>
        );
    }

    // ── Main Payment Form ──
    return (
        <div className="min-h-screen bg-background pb-32">
            {/* Header */}
            <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
                <div className="container mx-auto max-w-lg md:max-w-2xl px-4 h-16 flex items-center gap-4">
                    <button
                        onClick={() => setShowCancelModal(true)}
                        className="p-2 -ml-2 hover:bg-accent hover:text-accent-foreground rounded-full transition-colors"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </button>
                    <h1 className="font-bold text-lg truncate flex-1 text-foreground">{data.title}</h1>
                </div>
            </div>

            <div className="container mx-auto max-w-lg md:max-w-2xl px-4 pt-24 space-y-6">

                {/* Saweria Info Banner */}
                <div className="bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-900/50 rounded-2xl p-5 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-yellow-400 flex items-center justify-center text-black font-black text-xs shrink-0">SW</div>
                    <div>
                        <p className="font-bold text-yellow-900 dark:text-yellow-300">Donasi via Saweria</p>
                        <p className="text-sm text-yellow-800/80 dark:text-yellow-400/80 mt-0.5">
                            ke akun <span className="font-mono font-bold">@{username}</span>. GoPay, OVO, Dana, LinkAja, QRIS, Transfer Bank.
                        </p>
                    </div>
                </div>

                {/* Helper Fields */}
                <div className="bg-card text-card-foreground p-6 rounded-2xl shadow-sm border border-border space-y-5">
                    <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-primary" />
                        <h3 className="font-bold text-foreground">Isi Data Donasi</h3>
                    </div>
                    <p className="text-sm text-muted-foreground -mt-2">
                        Isi di sini terlebih dahulu, lalu salin ke jendela Saweria.
                    </p>

                    <div className="space-y-3">
                        <div>
                            <label className="text-xs font-semibold text-muted-foreground mb-1 block">Nama Pengirim</label>
                            <input
                                type="text"
                                value={isAnonymous ? "Anonim" : name}
                                onChange={(e) => { if (!isAnonymous) setName(e.target.value); }}
                                disabled={isAnonymous}
                                placeholder="Nama Anda"
                                className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-primary outline-none transition-all disabled:opacity-50"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-semibold text-muted-foreground mb-1 block">Pesan Dukungan</label>
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Semangat!"
                                className="w-full h-20 px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-primary outline-none transition-all resize-none"
                            />
                        </div>
                    </div>

                    <div className="border-t border-border pt-4 space-y-2">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Salin ke Saweria:</p>
                        <CopyField label="Nama Pengirim" value={displayName} />
                        <CopyField label="Pesan (harus disalin)" value={composedMessage} highlight />
                    </div>

                    <div className="bg-primary/5 border border-primary/20 rounded-xl p-3 flex gap-2 items-start text-sm text-primary">
                        <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                        <span>
                            Pastikan pesan berisi <span className="font-mono font-bold">#{slug}</span> agar donasi otomatis tercatat ke campaign ini.
                        </span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-border">
                        <span className="text-sm text-muted-foreground">Donasi Anonim</span>
                        <button
                            onClick={() => setIsAnonymous(!isAnonymous)}
                            className="w-12 h-6 rounded-full transition-colors relative"
                            style={{ backgroundColor: isAnonymous ? "var(--primary)" : "var(--muted)" }}
                        >
                            <div className={cn(
                                "absolute top-1 left-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform",
                                isAnonymous ? "translate-x-6" : "translate-x-0"
                            )} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom CTA */}
            <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur border-t border-border p-4 z-[100]">
                <div className="container mx-auto max-w-lg md:max-w-2xl">
                    <button
                        onClick={handleOpenSaweria}
                        className="w-full bg-yellow-400 hover:bg-yellow-500 active:scale-95 text-black font-bold py-4 rounded-2xl shadow-lg transition-all text-base"
                    >
                        🎗️ Buka Saweria — Donasi Sekarang
                    </button>
                </div>
            </div>

            {/* Cancel Modal */}
            {showCancelModal && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-card w-full max-w-sm p-6 rounded-2xl shadow-xl border border-border">
                        <h3 className="text-lg font-bold text-foreground mb-2">Batalkan Donasi?</h3>
                        <p className="text-sm text-muted-foreground mb-6">Apakah Anda yakin ingin membatalkan proses donasi ini?</p>
                        <div className="flex gap-3">
                            <button onClick={() => setShowCancelModal(false)} className="flex-1 py-2.5 rounded-xl font-semibold border border-border hover:bg-muted transition-colors text-foreground">Tidak</button>
                            <button onClick={() => router.back()} className="flex-1 py-2.5 rounded-xl font-semibold bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors">Ya, Batalkan</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

/* ─── CopyField Helper ─── */
function CopyField({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    return (
        <div className={cn(
            "flex items-center justify-between p-3 rounded-lg border transition-colors",
            highlight ? "bg-primary/5 border-primary/30" : "bg-muted/50 border-border hover:border-primary/30"
        )}>
            <div className="overflow-hidden mr-3">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold mb-0.5">{label}</p>
                <p className={cn("text-sm font-semibold truncate font-mono select-all", highlight ? "text-primary" : "text-foreground")}>{value}</p>
            </div>
            <button onClick={handleCopy} className="shrink-0 p-2 hover:bg-background rounded-lg transition-colors text-primary flex items-center gap-1.5">
                {copied ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                <span className="text-xs font-semibold">{copied ? "✓" : "Salin"}</span>
            </button>
        </div>
    );
}

/* ─── COMMENTED OUT: Midtrans / QRIS / Bank Transfer ───
 * Tidak dipakai — saat ini hanya Saweria yang aktif.
 * ─── END COMMENTED OUT ───
 */
