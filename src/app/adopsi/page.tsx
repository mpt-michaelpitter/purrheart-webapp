import { AdoptionSection } from "@/components/home/AdoptionSection";
import { OtaSection } from "@/components/home/OtaSection";
import { MascotSection } from "@/components/home/MascotSection";
import { FaqSection } from "@/components/home/FaqSection";
import { ContactSection } from "@/components/home/ContactSection";
import { ArrowLeft, Heart, Users, Home, Baby } from "lucide-react";
import Link from "next/link";

export const metadata = {
    title: "Adopsi & Orang Tua Asuh – Purrheart Shelter",
    description:
        "Adopsi kucing langsung dari Purrheart Shelter Medan, atau jadilah Orang Tua Asuh bagi kucing yang tinggal di shelter. Setiap tindakan kecil membuat perbedaan nyata.",
};

// ── Quick stats ───────────────────────────────────────────────────────────────

const stats = [
    { icon: Heart, value: "+180", label: "Kucing di Shelter", color: "text-rose-500", bg: "bg-rose-50 dark:bg-rose-500/10" },
    { icon: Users, value: "+50", label: "Adopsi Berhasil", color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-500/10" },
    { icon: Baby, value: "+30", label: "Orang Tua Asuh", color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-500/10" },
    { icon: Home, value: "2014", label: "Berdiri Sejak", color: "text-violet-500", bg: "bg-violet-50 dark:bg-violet-500/10" },
];

export default function AdopsiPage() {
    return (
        <div className="min-h-screen bg-background">

            {/* ── Hero Header ─────────────────────────────────────────────── */}
            <div className="relative overflow-hidden bg-linear-to-br from-[#562c72] via-[#3d1f52] to-[#1e0d38] py-20 md:py-28 px-4">
                {/* Dot grid texture */}
                <div
                    className="absolute inset-0 opacity-[0.07]"
                    style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "28px 28px" }}
                />
                {/* Ambient glow */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-purple-500/20 blur-[120px] pointer-events-none" />

                <div className="container relative z-10 mx-auto max-w-3xl text-center">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-purple-300 hover:text-white text-sm mb-8 transition-colors group"
                    >
                        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
                        Kembali ke Beranda
                    </Link>

                    <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#fdc65c] backdrop-blur-md mb-6">
                        🐾 Purrheart Shelter · Medan
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black text-white mb-5 leading-tight">
                        Beri Mereka{" "}
                        <span className="text-[#fdc65c]">Rumah &amp; Perhatian</span>
                    </h1>

                    <p className="text-purple-200/80 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-3">
                        Ada dua cara untuk berkontribusi langsung:{" "}
                        <strong className="text-white">Adopsi</strong> — membawa mereka pulang ke
                        rumahmu, atau{" "}
                        <strong className="text-white">Orang Tua Asuh</strong> — mendukung kebutuhan
                        mereka dari jauh.
                    </p>
                    <p className="text-purple-300/60 text-sm max-w-lg mx-auto mb-10">
                        Tidak ada cara yang lebih besar atau lebih kecil. Keduanya sama-sama nyawa yang terselamatkan.
                    </p>

                    {/* Anchor nav */}
                    <div className="flex flex-wrap justify-center gap-3">
                        <a
                            href="#adopsi"
                            className="rounded-full border border-white/20 bg-white/10 px-6 py-2.5 text-sm font-semibold text-white backdrop-blur-md hover:bg-white/20 transition-colors"
                        >
                            Adopsi Kucing ↓
                        </a>
                        <a
                            href="#ota"
                            className="rounded-full bg-[#fdc65c]/90 px-6 py-2.5 text-sm font-bold text-[#3d1f52] hover:bg-[#fdc65c] transition-colors shadow-lg shadow-[#fdc65c]/20"
                        >
                            Orang Tua Asuh ↓
                        </a>
                        <a
                            href="#faq"
                            className="rounded-full border border-white/20 bg-white/10 px-6 py-2.5 text-sm font-semibold text-white backdrop-blur-md hover:bg-white/20 transition-colors"
                        >
                            FAQ ↓
                        </a>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-20 bg-linear-to-t from-background to-transparent" />
            </div>

            {/* ── Stats Strip ─────────────────────────────────────────────── */}
            <div className="container mx-auto px-4 md:px-6 max-w-5xl -mt-6 relative z-10 mb-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {stats.map(({ icon: Icon, value, label, color, bg }) => (
                        <div
                            key={label}
                            className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card shadow-sm p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                        >
                            <div className={`h-10 w-10 rounded-xl ${bg} flex items-center justify-center`}>
                                <Icon className={`h-5 w-5 ${color}`} />
                            </div>
                            <span className="text-2xl font-black text-foreground">{value}</span>
                            <span className="text-[10px] font-semibold text-muted-foreground text-center uppercase tracking-wide">{label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── What is Adopsi? Banner ───────────────────────────────────── */}
            <div className="container mx-auto px-4 md:px-6 max-w-5xl py-8">
                <div className="rounded-3xl bg-linear-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/10 border border-violet-100 dark:border-violet-800/30 p-8 md:p-12 grid md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-3">
                        <h2 className="text-2xl md:text-3xl font-extrabold text-foreground">Apa itu Adopsi?</h2>
                        <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                            Adopsi adalah komitmen jangka panjang — bukan sekadar membawa pulang seekor kucing,
                            tapi menjadi keluarganya. Kamu bertanggung jawab atas makanan, kesehatan,
                            keselamatan, dan kebahagiaan mereka setiap hari.
                        </p>
                        <p className="text-muted-foreground leading-relaxed text-sm">
                            Kucing-kucing di Purrheart bukan kucing biasa. Banyak yang datang dengan trauma,
                            luka, atau kondisi khusus. Mereka butuh rumah yang benar-benar siap menerima mereka apa adanya.
                        </p>
                    </div>
                    <div className="rounded-2xl bg-white dark:bg-card border border-border p-6 space-y-3 shadow-sm">
                        <p className="font-bold text-sm text-foreground uppercase tracking-wide">Fakta Adopsi Purrheart</p>
                        {[
                            "Semua kucing sudah divaksin & dicek kesehatan",
                            "Ada proses screening untuk memastikan kecocokan",
                            "Gratis tanpa biaya adopsi",
                            "Follow-up berkala setelah adopsi",
                            "Support dari tim Purrheart jika ada kesulitan",
                        ].map((f) => (
                            <div key={f} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                                <span className="text-violet-500 text-base mt-0.5">✓</span>
                                {f}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Cat Grid (AdoptionSection) ───────────────────────────────── */}
            <div id="adopsi">
                <AdoptionSection />
            </div>

            {/* Divider */}
            <div className="container mx-auto px-4">
                <div className="h-px bg-linear-to-r from-transparent via-border to-transparent my-4" />
            </div>

            {/* ── What is OTA Banner ───────────────────────────────────────── */}
            <div className="container mx-auto px-4 md:px-6 max-w-5xl py-8">
                <div className="rounded-3xl bg-linear-to-br from-amber-50 to-orange-50 dark:from-amber-900/15 dark:to-orange-900/10 border border-amber-100 dark:border-amber-800/30 p-8 md:p-12 grid md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-3">
                        <h2 className="text-2xl md:text-3xl font-extrabold text-foreground">
                            Belum Siap Adopsi? <span className="text-amber-600">Jadi OTA!</span>
                        </h2>
                        <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                            Orang Tua Asuh (OTA) adalah cara berkontribusi tanpa perlu membawa kucing pulang.
                            Kamu mendukung kebutuhan satu ekor kucing di shelter — makanan, obat,
                            mainan, atau perawatannya — setiap bulannya.
                        </p>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Meski dari jauh, dampakmu sangat nyata. Seekor kucing terjamin hidupnya karena ada kamu yang peduli.
                        </p>
                    </div>
                    <div className="rounded-2xl bg-white dark:bg-card border border-border p-6 space-y-3 shadow-sm">
                        <p className="font-bold text-sm text-foreground uppercase tracking-wide">Yang Bisa Kamu Bantu sebagai OTA</p>
                        {[
                            ["🍚", "Biaya Makanan Harian"],
                            ["💊", "Biaya Obat & Vitamin"],
                            ["🏥", "Biaya Perawatan Kesehatan"],
                            ["🧸", "Mainan & Enrichment"],
                            ["🛁", "Grooming & Kebersihan"],
                        ].map(([emoji, label]) => (
                            <div key={label} className="flex items-center gap-3 text-sm text-muted-foreground">
                                <span className="text-lg">{emoji}</span>
                                {label}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── OTA Section ──────────────────────────────────────────────── */}
            <div id="ota">
                <OtaSection />
            </div>

            {/* ── Mascot Bakkien ───────────────────────────────────────────── */}
            <MascotSection />

            {/* ── FAQ ──────────────────────────────────────────────────────── */}
            <div id="faq">
                <FaqSection />
            </div>

            {/* ── Contact ──────────────────────────────────────────────────── */}
            <ContactSection />
        </div>
    );
}
