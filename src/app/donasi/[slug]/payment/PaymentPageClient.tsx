"use client";

import { useState, use, useEffect } from "react";

import { useRouter } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import { ArrowLeft, Wallet, UserCircle, MessageSquare, CheckCircle2, Timer, Copy, ChevronDown, ChevronUp, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const PRESET_AMOUNTS = [10000, 20000, 50000, 100000];

declare global {
    interface Window {
        snap: any;
    }
}

interface PaymentPageClientProps {
    data: {
        title: string;
        slug: string;
    }
}

export default function PaymentPageClient({ data }: PaymentPageClientProps) {
    const router = useRouter();
    const slug = data.slug;

    const [amount, setAmount] = useState<number>(0);
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [name, setName] = useState("");
    const [contact, setContact] = useState("");
    const [message, setMessage] = useState("");
    const [paymentMethod, setPaymentMethod] = useState<"qris" | "bank_transfer">("qris");
    const [loading, setLoading] = useState(false);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [paymentResponse, setPaymentResponse] = useState<any>(null);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Remove non-numeric characters
        const val = e.target.value.replace(/\D/g, "");
        setAmount(val ? parseInt(val) : 0);
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        if (amount > 100000000) {
            newErrors.amount = "Maksimal donasi Rp 100.000.000";
        }


        if (amount < 10000) {
            newErrors.amount = "Minimal donasi Rp 10.000";
        }


        if (!isAnonymous && !name.trim()) {
            newErrors.name = "Nama wajib diisi";
        }

        if (!isAnonymous && !contact.trim()) {
            newErrors.contact = "Kontak wajib diisi";
        }
        if (!isAnonymous && !message.trim()) {
            newErrors.message = "Pesan wajib diisi";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            // Scroll to top or first error
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
        }

        setLoading(true);
        setPaymentResponse(null);

        try {
            const res = await fetch('/api/donations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    slug: data.slug,
                    amount: amount,
                    name: isAnonymous ? "Anonim" : name,
                    email: contact,
                    message: message,
                    payment_type: paymentMethod
                })
            });

            const result = await res.json();

            if (res.ok && result.success) {
                setPaymentResponse(result.data);

                // Save to localStorage for persistence
                const expiryTime = new Date();
                expiryTime.setHours(expiryTime.getHours() + 24);

                const pendingData = {
                    slug: data.slug,
                    amount: amount,
                    order_id: result.data.order_id,
                    payment_type: result.data.payment_type,
                    expiryTime: expiryTime.toISOString(),
                    paymentResponseData: result.data // Store full data to restore view
                };

                localStorage.setItem("pending_payment", JSON.stringify(pendingData));
                window.dispatchEvent(new Event("pending_payment_updated"));

            } else {
                alert("Gagal membuat transaksi: " + (result.error || "Unknown error"));
            }
        } catch (error) {
            console.error("Failed to save donation locally", error);
            alert("Terjadi kesalahan jaringan.");
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (paymentResponse && paymentResponse.order_id) {
            interval = setInterval(async () => {
                try {
                    const res = await fetch(`/api/payment/status?order_id=${paymentResponse.order_id}`);
                    const statusData = await res.json();

                    if (statusData.transaction_status === 'settlement' || statusData.transaction_status === 'capture') {
                        localStorage.removeItem("pending_payment");
                        window.dispatchEvent(new Event("pending_payment_updated"));
                        router.push(`/donasi/${slug}/success`);
                    }
                } catch (error) {
                    console.error("Error checking status:", error);
                }
            }, 5000); // Check every 5 seconds
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [paymentResponse, slug, router]);


    useEffect(() => {
        if (!paymentResponse) {
            const stored = localStorage.getItem("pending_payment");
            if (stored) {
                try {
                    const parsed = JSON.parse(stored);
                    debugger;
                    // Only restore if it matches current slug and not expired
                    if (parsed.slug === slug && new Date(parsed.expiryTime) > new Date()) {
                        if (parsed.paymentResponseData) {
                            setAmount(parsed.amount);
                            setPaymentResponse(parsed.paymentResponseData);
                        }
                    }
                } catch (e) {
                    console.error("Failed to restore payment session", e);
                }
            }
        }
    }, [slug, paymentResponse]);

    // If payment response exists, show the Instruction View
    if (paymentResponse) {
        return <WaitingPaymentView
            amount={amount}
            paymentResponse={paymentResponse}
            slug={slug}
            onBack={() => router.push('/')}
        />
    }

    return (
        <div className="min-h-screen bg-background pb-32">
            {/* Header */}
            <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
                <div className="container mx-auto max-w-lg md:max-w-2xl px-4 h-16 flex items-center gap-4">
                    <button onClick={() => setShowCancelModal(true)} className="p-2 -ml-2 hover:bg-accent hover:text-accent-foreground rounded-full transition-colors">
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
                            className={cn(
                                "w-full pl-12 pr-4 py-4 text-3xl font-bold text-foreground bg-background rounded-xl border-none focus:ring-2 focus:ring-primary placeholder:text-muted-foreground transition-all",
                                errors.amount ? "focus:ring-destructive" : ""
                            )}
                        />
                    </div>
                    {errors.amount && <p className="text-xs text-destructive font-medium flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.amount}</p>}

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

                {/* Payment Method Selection */}
                <div className="bg-card text-card-foreground p-6 rounded-2xl shadow-sm border border-border space-y-4">
                    <h3 className="font-bold text-foreground flex items-center gap-2">
                        <Wallet className="h-5 w-5 text-primary" />
                        Pilih Metode Pembayaran
                    </h3>
                    <div className="space-y-3">
                        <div
                            onClick={() => setPaymentMethod("qris")}
                            className={cn(
                                "flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all",
                                paymentMethod === "qris"
                                    ? "border-primary bg-primary/5 ring-1 ring-primary"
                                    : "border-border hover:border-primary/50"
                            )}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center text-[10px] font-bold">QRIS</div>
                                <span className="font-semibold text-sm">QRIS (GoPay, OVO, Dana)</span>
                            </div>
                            {paymentMethod === "qris" && <CheckCircle2 className="h-5 w-5 text-primary" />}
                        </div>

                        <div
                            onClick={() => setPaymentMethod("bank_transfer")}
                            className={cn(
                                "flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all",
                                paymentMethod === "bank_transfer"
                                    ? "border-primary bg-primary/5 ring-1 ring-primary"
                                    : "border-border hover:border-primary/50"
                            )}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-6 bg-blue-600 text-white rounded flex items-center justify-center text-[10px] font-bold">BCA</div>
                                <span className="font-semibold text-sm">Transfer Bank (BCA)</span>
                            </div>
                            {paymentMethod === "bank_transfer" && <CheckCircle2 className="h-5 w-5 text-primary" />}
                        </div>
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
                                    onChange={(e) => {
                                        setName(e.target.value);
                                        if (errors.name) setErrors({ ...errors, name: "" });
                                    }}
                                    placeholder="Nama Lengkap Anda"
                                    className={cn(
                                        "w-full px-4 py-3 rounded-lg border bg-background text-foreground focus:ring-2 focus:border-transparent outline-none transition-all",
                                        errors.name
                                            ? "border-destructive focus:ring-destructive"
                                            : "border-input focus:ring-primary"
                                    )}
                                />
                                {errors.name && <p className="text-xs text-destructive font-medium mt-1">{errors.name}</p>}
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-muted-foreground mb-1 block">Nomor Ponsel atau Email</label>
                                <input
                                    type="text"
                                    value={contact}
                                    onChange={(e) => {
                                        setContact(e.target.value);
                                        if (errors.contact) setErrors({ ...errors, contact: "" });
                                    }}
                                    placeholder="0812xxxx atau email@contoh.com"
                                    className={cn(
                                        "w-full px-4 py-3 rounded-lg border bg-background text-foreground focus:ring-2 focus:border-transparent outline-none transition-all",
                                        errors.contact
                                            ? "border-destructive focus:ring-destructive"
                                            : "border-input focus:ring-primary"
                                    )}
                                />
                                {errors.contact && <p className="text-xs text-destructive font-medium mt-1">{errors.contact}</p>}
                            </div>
                        </div>
                    )}

                    <div className="flex items-center justify-between pt-2 border-t border-border">
                        <span className="text-sm text-muted-foreground">Sembunyikan nama saya (Anonim)</span>
                        <button
                            onClick={() => setIsAnonymous(!isAnonymous)}
                            className={cn(
                                "w-12 h-6 rounded-full transition-colors relative",
                                "bg-muted has-[:checked]:bg-primary" // Use a better conditional class
                            )}
                            // Reverting to manual conditional class
                            style={{ backgroundColor: isAnonymous ? "var(--primary)" : "var(--muted)" }}
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
            <div className="fixed bottom-0 md:bottom-0 left-0 right-0 bg-background/95 backdrop-blur border-t border-border p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-[100]">
                <div className="container mx-auto max-w-lg md:max-w-2xl flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="w-full md:w-auto flex justify-between items-center md:block">
                        <div className="md:mb-0">
                            <p className="text-xs text-muted-foreground font-medium">Total Pembayaran</p>
                            <p className="text-xl font-bold text-primary">Rp {amount.toLocaleString("id-ID")}</p>
                        </div>
                    </div>
                    <div className="flex w-full md:w-auto items-center gap-3">

                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="flex-[2] md:flex-none md:w-64 bg-primary text-primary-foreground font-bold py-3.5 rounded-xl shadow-lg shadow-purple-200/20 dark:shadow-none hover:bg-primary/90 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
                        >
                            {loading ? "Memproses..." : `Lanjut Bayar`}
                        </button>
                    </div>
                </div>
            </div>

            {/* Cancel Confirmation Modal */}
            {showCancelModal && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-card w-full max-w-sm p-6 rounded-2xl shadow-xl scale-100 animate-in zoom-in-95 duration-200 border border-border">
                        <h3 className="text-lg font-bold text-foreground mb-2">Batalkan Donasi?</h3>
                        <p className="text-sm text-muted-foreground mb-6">
                            Apakah Anda yakin ingin membatalkan proses donasi ini? Data yang Anda isi tidak akan tersimpan.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowCancelModal(false)}
                                className="flex-1 py-2.5 rounded-xl font-semibold border border-border hover:bg-muted transition-colors text-foreground"
                            >
                                Tidak
                            </button>
                            <button
                                onClick={() => router.back()}
                                className="flex-1 py-2.5 rounded-xl font-semibold bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
                            >
                                Ya, Batalkan
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

function WaitingPaymentView({ amount, paymentResponse, slug, onBack }: {
    amount: number, paymentResponse: any, slug: string, onBack: () =>


        void
}) {
    const [copied, setCopied] = useState(false);

    const [openInstruction, setOpenInstruction] = useState<string | null>(null);
    const [showCancelModal, setShowCancelModal] = useState(false);

    // Expiry Time State (24 hours from first render)
    const [expiryTime] = useState(() => {
        const d = new Date();
        d.setHours(d.getHours() + 24);
        return d;
    });

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const toggleInstruction = (id: string) => {
        setOpenInstruction(openInstruction === id ? null : id);
    }

    return (
        <div className="min-h-screen bg-background pb-32">
            {/* Header */}
            <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
                <div className="container mx-auto max-w-lg md:max-w-2xl px-4 h-16 flex items-center gap-4">
                    <button onClick={onBack} className="p-2 -ml-2 hover:bg-accent hover:text-accent-foreground rounded-full transition-colors">
                        <ArrowLeft className="h-5 w-5" />
                    </button>
                    <h1 className="font-bold text-lg truncate flex-1 text-foreground">Selesaikan Pembayaran</h1>
                </div>
            </div>

            <div className="container mx-auto max-w-lg md:max-w-2xl px-4 pt-24 space-y-6">

                {/* Timer Banner */}
                <div className="bg-orange-50 dark:bg-orange-950/30 text-orange-700 dark:text-orange-400 p-4 rounded-xl flex items-center justify-between border border-orange-200 dark:border-orange-900/50">
                    <div className="flex items-center gap-3">
                        <Timer className="h-5 w-5" />
                        <div>
                            <p className="text-xs font-semibold opacity-80">Batas Akhir Pembayaran</p>
                            <CountdownDisplay targetDate={expiryTime} />
                        </div>
                    </div>
                </div>

                {/* Main Payment Card */}
                <div className="bg-card text-card-foreground rounded-2xl shadow-sm border border-border overflow-hidden">
                    <div className="p-6 border-b border-border flex justify-between items-start gap-4">
                        <div>
                            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-1">Total Tagihan</p>
                            <h2 className="text-xl md:text-2xl font-bold tracking-tight">Rp {amount.toLocaleString("id-ID")}</h2>
                        </div>
                        <div className="text-right min-w-0 flex-1">
                            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-1">Order ID</p>
                            <div className="flex justify-end">
                                <p className="text-xs font-mono font-medium text-foreground truncate max-w-[150px]" title={paymentResponse.order_id}>{paymentResponse.order_id || "-"}</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 flex flex-col items-center justify-center space-y-6 bg-card/50">
                        {paymentResponse.payment_type === 'qris' ? (
                            <>
                                <div className="text-center space-y-1">
                                    <h3 className="font-bold text-lg">Scan QRIS</h3>
                                    <p className="text-xs text-muted-foreground max-w-[250px] mx-auto leading-relaxed">
                                        Buka aplikasi e-wallet Anda dan scan QR di bawah ini.
                                    </p>
                                </div>
                                {paymentResponse.qr_string ? (
                                    <div className="bg-white p-4 rounded-xl border border-border shadow-sm relative group">
                                        <QRCodeSVG value={paymentResponse.qr_string} size={180} />
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl pointer-events-none">
                                            <p className="text-xs font-bold text-black bg-white/80 px-2 py-1 rounded">Scan Me</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="h-48 w-48 bg-muted flex items-center justify-center rounded-xl">
                                        <p className="text-xs text-muted-foreground">QR Code Error</p>
                                    </div>
                                )}
                                <div className="flex items-center gap-2 text-[10px] font-medium text-muted-foreground bg-accent/50 px-3 py-1.5 rounded-full">
                                    <AlertCircle className="h-3 w-3" />
                                    Otomatis mendeteksi pembayaran
                                </div>
                            </>
                        ) : paymentResponse.payment_type === 'bank_transfer' && paymentResponse.va_numbers ? (
                            <>
                                <div className="text-center space-y-2">
                                    <h3 className="font-bold text-lg">Transfer Virtual Account</h3>
                                    <p className="text-sm text-muted-foreground">Lakukan transfer ke nomor Virtual Account berikut.</p>
                                </div>
                                <div className="w-full space-y-4">
                                    {paymentResponse.va_numbers.map((va: any) => (
                                        <div key={va.bank} className="bg-background p-4 rounded-xl border border-border mt-2 shadow-sm">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-2">
                                                    <div className="text-xs font-bold uppercase bg-primary/10 text-primary px-2 py-0.5 rounded">{va.bank}</div>
                                                    <span className="text-xs text-muted-foreground">Virtual Account</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between gap-4">
                                                <p className="text-lg md:text-xl font-mono font-bold tracking-wider text-foreground break-all">{va.va_number}</p>
                                                <button
                                                    onClick={() => handleCopy(va.va_number)}
                                                    className="shrink-0 p-2 hover:bg-accent rounded-lg transition-colors text-primary flex items-center gap-2 group"
                                                >
                                                    {copied ? <CheckCircle2 className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                                                    <span className="text-xs font-semibold group-hover:underline">{copied ? "Disalin" : "Salin"}</span>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : null}
                    </div>
                </div>

                {/* Instructions Accordion */}
                <div className="bg-card text-card-foreground rounded-2xl shadow-sm border border-border overflow-hidden">
                    <div className="p-4 bg-muted/30 border-b border-border">
                        <h3 className="font-semibold text-foreground">Cara Pembayaran</h3>
                    </div>
                    {paymentResponse.payment_type === 'bank_transfer' ? (
                        <div className="divide-y divide-border">
                            <InstructionItem
                                title="ATM BCA"
                                isOpen={openInstruction === 'atm'}
                                onClick={() => toggleInstruction('atm')}
                            >
                                <ol className="list-decimal pl-4 space-y-1 text-sm text-muted-foreground">
                                    <li>Masukkan Kartu ATM BCA & PIN</li>
                                    <li>Pilih menu Transaksi Lainnya {'>'} Transfer {'>'} ke Rekening BCA Virtual Account</li>
                                    <li>Masukkan nomor Virtual Account yang tertera di atas</li>
                                    <li>Di halaman konfirmasi, pastikan detil pembayaran sudah sesuai seperti No VA, Nama, Perus/Produk dan Total Tagihan</li>
                                    <li>Ikuti instruksi untuk menyelesaikan transaksi</li>
                                </ol>
                            </InstructionItem>
                            <InstructionItem
                                title="m-BCA (BCA Mobile)"
                                isOpen={openInstruction === 'mbca'}
                                onClick={() => toggleInstruction('mbca')}
                            >
                                <ol className="list-decimal pl-4 space-y-1 text-sm text-muted-foreground">
                                    <li>Lakukan log in pada aplikasi BCA Mobile</li>
                                    <li>Pilih menu m-BCA, kemudian masukkan kode akses m-BCA</li>
                                    <li>Pilih m-Transfer {'>'} BCA Virtual Account</li>
                                    <li>Pilih dari Daftar Transfer, atau masukkan nomor Virtual Account tujuan</li>
                                    <li>Masukkan pin m-BCA</li>
                                    <li>Pembayaran selesai. Simpan notifikasi yang muncul sebagai bukti pembayaran</li>
                                </ol>
                            </InstructionItem>
                            <InstructionItem
                                title="Internet Banking BCA"
                                isOpen={openInstruction === 'ibca'}
                                onClick={() => toggleInstruction('ibca')}
                            >
                                <ol className="list-decimal pl-4 space-y-1 text-sm text-muted-foreground">
                                    <li>Login ke KlikBCA Individual</li>
                                    <li>Pilih Transfer Dana {'>'} Transfer ke BCA Virtual Account</li>
                                    <li>Masukkan nomor Virtual Account tujuan</li>
                                    <li>Masukkan respon KeyBCA Appli 1</li>
                                    <li>Kirim dan transaksi selesai</li>
                                </ol>
                            </InstructionItem>
                        </div>
                    ) : (
                        <div className="divide-y divide-border">
                            <InstructionItem
                                title="Cara Scan QRIS"
                                isOpen={openInstruction === 'qris'}
                                onClick={() => toggleInstruction('qris')}
                            >
                                <ol className="list-decimal pl-4 space-y-1 text-sm text-muted-foreground">
                                    <li>Buka aplikasi e-wallet apa saja (GoPay, OVO, Dana, ShopeePay, LinkAja, dll) atau Mobile Banking yang mendukung QRIS</li>
                                    <li>Pilih menu "Scan" atau "Bayar"</li>
                                    <li>Arahkan kamera ke kode QR yang tampil di layar</li>
                                    <li>Periksa kembali nama merchant dan nominal pembayaran</li>
                                    <li>Masukkan PIN Anda untuk konfirmasi</li>
                                    <li>Pembayaran berhasil! Halaman ini akan otomatis diperbarui</li>
                                </ol>
                            </InstructionItem>
                        </div>
                    )}
                </div>

                <div className="flex flex-col items-center gap-2 pt-8 opacity-60">
                    <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                        <span className="loading loading-spinner text-primary h-3 w-3"></span>
                        Menunggu konfirmasi pembayaran otomatis...
                    </div>
                </div>

            </div>
            {/* Bottom Bar for Cancel */}
            <div className="fixed bottom-[60px] md:bottom-0 left-0 right-0 bg-background/95 backdrop-blur border-t border-border p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-[100]">
                <div className="container mx-auto max-w-lg md:max-w-2xl flex justify-center md:justify-end">
                    <button
                        onClick={() => setShowCancelModal(true)}
                        className="w-full md:w-auto px-8 py-3.5 rounded-xl font-bold text-destructive bg-destructive/10 hover:bg-destructive/20 transition-all"
                    >
                        Batalkan Pembayaran
                    </button>
                </div>
            </div>

            {/* Cancel Confirmation Modal */}
            {showCancelModal && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-card w-full max-w-sm p-6 rounded-2xl shadow-xl scale-100 animate-in zoom-in-95 duration-200 border border-border">
                        <h3 className="text-lg font-bold text-foreground mb-2">Batalkan Pembayaran?</h3>
                        <p className="text-sm text-muted-foreground mb-6">
                            Apakah Anda yakin ingin membatalkan transaksi ini? Kode pembayaran tidak akan berlaku lagi.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowCancelModal(false)}
                                className="flex-1 py-2.5 rounded-xl font-semibold border border-border hover:bg-muted transition-colors text-foreground"
                            >
                                Kembali
                            </button>
                            <button
                                onClick={() => {
                                    localStorage.removeItem("pending_payment");
                                    window.dispatchEvent(new Event("pending_payment_updated"));
                                    onBack();
                                }}
                                className="flex-1 py-2.5 rounded-xl font-semibold bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors"
                            >
                                Ya, Batalkan
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

function InstructionItem({ title, children, isOpen, onClick }: { title: string, children: React.ReactNode, isOpen: boolean, onClick: () => void }) {
    return (
        <div>
            <button
                onClick={onClick}
                className="w-full flex items-center justify-between p-4 bg-card hover:bg-accent/50 transition-colors text-left"
            >
                <span className="font-medium text-sm">{title}</span>
                {isOpen ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
            </button>
            <div className={cn("overflow-hidden transition-all duration-300 ease-in-out", isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0")}>
                <div className="p-4 pt-0 bg-card border-t border-dashed border-border/50">
                    {children}
                </div>
            </div>
        </div>
    )
}

function CountdownDisplay({ targetDate }: { targetDate: Date }) {
    const [timeLeft, setTimeLeft] = useState<{ h: number, m: number, s: number }>({ h: 24, m: 0, s: 0 });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            const difference = targetDate.getTime() - now.getTime();

            if (difference > 0) {
                const h = Math.floor((difference / (1000 * 60 * 60)));
                const m = Math.floor((difference / 1000 / 60) % 60);
                const s = Math.floor((difference / 1000) % 60);
                setTimeLeft({ h, m, s });
            } else {
                setTimeLeft({ h: 0, m: 0, s: 0 });
            }
        };

        calculateTimeLeft(); // Initial call
        const interval = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);

    return (
        <p className="font-bold font-mono tracking-widest text-lg">
            {String(timeLeft.h).padStart(2, '0')}:{String(timeLeft.m).padStart(2, '0')}:{String(timeLeft.s).padStart(2, '0')}
        </p>
    )
}
