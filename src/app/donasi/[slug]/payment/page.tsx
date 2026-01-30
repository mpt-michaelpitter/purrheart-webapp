"use client";

import { useState, use } from "react";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { ArrowLeft, ChevronRight, Wallet, UserCircle, MessageSquare, CheckCircle2 } from "lucide-react";
import { allDonations } from "@/lib/data";
import { cn } from "@/lib/utils";

const PRESET_AMOUNTS = [10000, 20000, 50000, 100000];
const PLATFORM_FEE = 0; // Or standard fee logic

export default function PaymentPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const router = useRouter();
    const data = allDonations.find(d => d.slug === slug);

    const [amount, setAmount] = useState<number>(50000);
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [name, setName] = useState("");
    const [contact, setContact] = useState("");
    const [message, setMessage] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("qris");

    if (!data) {
        return notFound();
    }

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Remove non-numeric characters
        const val = e.target.value.replace(/\D/g, "");
        setAmount(val ? parseInt(val) : 0);
    };

    const handleSubmit = () => {
        // Here you would integrate with a payment gateway (Midtrans, Xendit, etc.)
        // For now, we simulate a success/redirect
        alert(`Memproses pembayaran sebesar Rp ${amount.toLocaleString("id-ID")} untuk ${data.title}`);
        // router.push(`/donasi/${slug}/success`); // Placeholder for future
    };

    return (
        <div className="min-h-screen bg-background pb-32">
            {/* Header */}
            <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
                <div className="container mx-auto max-w-lg md:max-w-2xl px-4 h-16 flex items-center gap-4">
                    <button onClick={() => router.back()} className="p-2 -ml-2 hover:bg-accent hover:text-accent-foreground rounded-full transition-colors">
                        <ArrowLeft className="h-5 w-5" />
                    </button>
                    <h1 className="font-bold text-lg truncate flex-1 text-foreground">{data.title}</h1>
                </div>
            </div>

            <div className="container mx-auto max-w-lg md:max-w-2xl px-4 pt-24 space-y-6">

                {/* Amount Input Section */}
                <div className="bg-card text-card-foreground p-6 rounded-2xl shadow-sm border border-border space-y-4">
                    <label className="text-sm font-semibold text-muted-foreground">Isi Nominal Donasi</label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold text-muted-foreground">Rp</span>
                        <input
                            type="text"
                            inputMode="numeric"
                            value={amount ? amount.toLocaleString("id-ID") : ""}
                            onChange={handleAmountChange}
                            placeholder="0"
                            className="w-full pl-12 pr-4 py-4 text-3xl font-bold text-foreground bg-background rounded-xl border-none focus:ring-2 focus:ring-primary placeholder:text-muted-foreground"
                        />
                    </div>
                    {amount < 10000 && amount > 0 && <p className="text-xs text-destructive">Minimal donasi Rp 10.000</p>}

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {PRESET_AMOUNTS.map((preset) => (
                            <button
                                key={preset}
                                onClick={() => setAmount(preset)}
                                className={cn(
                                    "py-3 px-2 rounded-xl text-sm font-semibold border transition-all",
                                    amount === preset
                                        ? "border-primary bg-primary/10 text-primary"
                                        : "border-border bg-background hover:border-primary/50 text-muted-foreground"
                                )}
                            >
                                {preset >= 1000 ? `${preset / 1000}k` : preset}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Payment Method Section (Simple Mock) */}
                <div className="bg-card text-card-foreground p-6 rounded-2xl shadow-sm border border-border space-y-4 cursor-pointer hover:bg-accent/50 transition-colors">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Wallet className="h-6 w-6 text-primary" />
                            <div>
                                <h3 className="font-bold text-foreground">Metode Pembayaran</h3>
                                <p className="text-sm text-muted-foreground">QRIS (GoPay, OVO, Dana, dll)</p>
                            </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                </div>

                {/* User Info Section */}
                <div className="bg-card text-card-foreground p-6 rounded-2xl shadow-sm border border-border space-y-6">
                    <h3 className="font-bold text-foreground flex items-center gap-2">
                        <UserCircle className="h-5 w-5 text-primary" />
                        Data Diri
                    </h3>

                    {!isAnonymous && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
                            <div>
                                <label className="text-xs font-semibold text-muted-foreground mb-1 block">Nama Lengkap</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Nama Lengkap Anda"
                                    className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-muted-foreground mb-1 block">Nomor Ponsel atau Email</label>
                                <input
                                    type="text"
                                    value={contact}
                                    onChange={(e) => setContact(e.target.value)}
                                    placeholder="0812xxxx atau email@contoh.com"
                                    className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                />
                            </div>
                        </div>
                    )}

                    <div className="flex items-center justify-between pt-2 border-t border-border">
                        <span className="text-sm text-muted-foreground">Sembunyikan nama saya (Anonim)</span>
                        <button
                            onClick={() => setIsAnonymous(!isAnonymous)}
                            className={cn(
                                "w-12 h-6 rounded-full transition-colors relative",
                                isAnonymous ? "bg-primary" : "bg-muted"
                            )}
                        >
                            <div className={cn(
                                "absolute top-1 left-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform",
                                isAnonymous ? "translate-x-6" : "translate-x-0"
                            )} />
                        </button>
                    </div>
                </div>

                {/* Message Section */}
                <div className="bg-card text-card-foreground p-6 rounded-2xl shadow-sm border border-border space-y-4">
                    <h3 className="font-bold text-foreground flex items-center gap-2">
                        <MessageSquare className="h-5 w-5 text-primary" />
                        Dukungan & Doa (Opsional)
                    </h3>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tulis doa atau dukungan untuk penggalang dana..."
                        className="w-full h-32 px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                    />
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur border-t border-border p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-40">
                <div className="container mx-auto max-w-lg md:max-w-2xl flex items-center justify-between gap-4">
                    <div className="hidden md:block">
                        <p className="text-xs text-muted-foreground font-medium">Total Pembayaran</p>
                        <p className="text-xl font-bold text-primary">Rp {amount.toLocaleString("id-ID")}</p>
                    </div>
                    <button
                        onClick={handleSubmit}
                        disabled={amount < 10000}
                        className="flex-1 md:flex-none md:w-64 bg-primary text-primary-foreground font-bold py-3.5 rounded-xl shadow-lg shadow-purple-200/20 dark:shadow-none hover:bg-primary/90 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Lanjut Pembayaran {amount > 0 && `• Rp ${amount.toLocaleString("id-ID")}`}
                    </button>
                </div>
            </div>
        </div>
    );
}
