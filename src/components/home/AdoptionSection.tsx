"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Home, Heart } from "lucide-react";

const requirements = [
    "Kucing akan tinggal penuh di rumah adopter",
    "Bertanggung jawab atas makanan, kesehatan, dan keamanan kucing",
    "Bersedia menjaga kucing dengan penuh tanggung jawab",
    "Bersedia memberikan update kondisi kucing secara berkala",
];

const formFields = [
    "Nama lengkap & usia",
    "Alamat & domisili",
    "Kontak aktif",
    "Pekerjaan / aktivitas harian",
    "Pengalaman memelihara kucing",
    "Jenis tempat tinggal (rumah/kos/sewa)",
    "Apakah ada hewan lain di rumah",
    "Alasan ingin mengadopsi",
];

export function AdoptionSection() {
    return (
        <section id="adopsi" className="py-20 bg-background">
            <div className="container mx-auto px-4 md:px-6 max-w-6xl">
                {/* Header */}
                <div className="text-center mb-14">
                    <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary mb-4">
                        <Home className="h-3 w-3" />
                        ADOPSI KUCING
                    </div>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mb-4">
                        Adopsi dari Purrheart
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
                        Adopsi bukan sekadar membawa kucing pulang. Adopsi adalah komitmen jangka panjang untuk merawat dan
                        melindungi satu nyawa. Kami ingin setiap kucing mendapatkan rumah yang aman dan penuh kasih.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
                    {/* Syarat Umum */}
                    <div className="rounded-3xl border border-border bg-card p-8 space-y-5">
                        <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                <CheckCircle2 className="h-4 w-4 text-primary" />
                            </div>
                            Syarat Umum Adopsi
                        </h3>
                        <ul className="space-y-3">
                            {requirements.map((req, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                                    {req}
                                </li>
                            ))}
                        </ul>

                        <div className="pt-4 border-t border-border">
                            <p className="text-xs text-muted-foreground italic leading-relaxed">
                                Setiap pengajuan adopsi akan kami screening demi memastikan kucing berada di tangan yang tepat.
                            </p>
                        </div>
                    </div>

                    {/* Form Info */}
                    <div className="rounded-3xl border border-primary/20 bg-primary/5 p-8 space-y-5">
                        <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-primary/15 flex items-center justify-center">
                                <Heart className="h-4 w-4 text-primary fill-primary" />
                            </div>
                            Isi Form Adopsi
                        </h3>
                        <div className="grid grid-cols-2 gap-2">
                            {formFields.map((field, i) => (
                                <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                                    {field}
                                </div>
                            ))}
                        </div>

                        <div className="pt-4 space-y-3">
                            <Link
                                href="https://forms.gle/adopsi-purrheart"
                                target="_blank"
                                className="group flex items-center justify-center gap-2 w-full rounded-xl bg-primary py-3.5 font-bold text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 hover:-translate-y-0.5 transition-all duration-200"
                            >
                                Saya Siap Mengadopsi
                                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                href="/adopsi"
                                className="flex items-center justify-center gap-2 w-full rounded-xl border border-border py-3.5 font-semibold text-foreground hover:bg-muted transition-colors text-sm"
                            >
                                Lihat Kucing yang Siap Diadopsi
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
