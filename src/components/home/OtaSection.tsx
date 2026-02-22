"use client";

import Link from "next/link";
import { ArrowRight, Baby, Utensils, Pill, HeartPulse, Gamepad2 } from "lucide-react";

const contributions = [
    { icon: Utensils, label: "Makanan harian" },
    { icon: Pill, label: "Obat & vitamin" },
    { icon: HeartPulse, label: "Perawatan kesehatan" },
    { icon: Gamepad2, label: "Mainan dan kebutuhan lain" },
];

const formFields = [
    "Nama lengkap",
    "Kontak aktif",
    "Domisili",
    "Pilihan kucing",
    "Komitmen bulanan",
    "Durasi komitmen",
    "Alasan ingin menjadi Orang Tua Asuh",
];

export function OtaSection() {
    return (
        <section id="ota" className="py-20 bg-muted/30">
            <div className="container mx-auto px-4 md:px-6 max-w-6xl">
                {/* Header */}
                <div className="text-center mb-14">
                    <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 mb-4">
                        <Baby className="h-3 w-3" />
                        OTA — ORANG TUA ASUH
                    </div>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mb-4">
                        Jadi Orang Tua Asuh
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
                        Tidak semua kucing bisa langsung diadopsi. Sebagian membutuhkan perawatan jangka panjang
                        atau memang lebih aman tinggal di shelter.
                    </p>
                    <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base mt-3 leading-relaxed">
                        Melalui program OTA, kamu bisa membantu merawat kucing pilihanmu tanpa harus membawanya pulang.
                        <span className="font-semibold text-foreground"> Kucing tetap tinggal di Purrheart</span>,
                        dan kamu membantu memenuhi kebutuhannya setiap bulan.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                    {/* Kontribusi */}
                    <div className="rounded-3xl border border-border bg-card p-8 space-y-6">
                        <h3 className="text-xl font-bold text-foreground">Kontribusi OTA Meliputi</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {contributions.map(({ icon: Icon, label }) => (
                                <div key={label} className="flex items-center gap-3 rounded-2xl bg-muted/50 p-4">
                                    <div className="h-9 w-9 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
                                        <Icon className="h-5 w-5 text-amber-500" />
                                    </div>
                                    <span className="text-sm font-medium text-foreground">{label}</span>
                                </div>
                            ))}
                        </div>

                        {/* Visual emphasis */}
                        <div className="rounded-2xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 p-5">
                            <p className="text-sm text-foreground leading-relaxed">
                                🐾 Semua pengajuan OTA akan melalui proses screening agar komitmen berjalan
                                <span className="font-bold"> berkelanjutan</span>.
                            </p>
                        </div>
                    </div>

                    {/* Form Fields */}
                    <div className="rounded-3xl border border-amber-500/20 bg-amber-500/5 p-8 space-y-5">
                        <h3 className="text-xl font-bold text-foreground">Form Orang Tua Asuh</h3>
                        <ul className="space-y-2.5">
                            {formFields.map((f, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                                    <span className="h-5 w-5 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 text-[10px] font-bold flex items-center justify-center shrink-0">
                                        {i + 1}
                                    </span>
                                    {f}
                                </li>
                            ))}
                        </ul>

                        <div className="pt-4 space-y-3">
                            <Link
                                href="https://forms.gle/ota-purrheart"
                                target="_blank"
                                className="group flex items-center justify-center gap-2 w-full rounded-xl bg-amber-500 py-3.5 font-bold text-white shadow-lg shadow-amber-500/20 hover:bg-amber-600 hover:-translate-y-0.5 transition-all duration-200"
                            >
                                Jadi Orang Tua Asuh
                                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                href="/adopsi"
                                className="flex items-center justify-center gap-2 w-full rounded-xl border border-border py-3.5 font-semibold text-foreground hover:bg-muted transition-colors text-sm"
                            >
                                Dukung Kucing Pilihanmu
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
