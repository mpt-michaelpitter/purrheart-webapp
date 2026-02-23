"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
    ArrowRight, CheckCircle2, Heart, Star, Search,
    ClipboardList, Phone, PartyPopper, Shield, Home, Stethoscope
} from "lucide-react";
import { cn } from "@/lib/utils";

// ── Data ──────────────────────────────────────────────────────────────────────

const adoptionSteps = [
    {
        icon: Search,
        step: "01",
        title: "Pilih Kucing",
        desc: "Lihat profil kucing-kucing yang siap diadopsi. Hubungi kami via WhatsApp untuk berkenalan langsung atau jadwalkan kunjungan ke shelter.",
        color: "text-violet-500",
        bg: "bg-violet-50 dark:bg-violet-500/10",
    },
    {
        icon: ClipboardList,
        step: "02",
        title: "Isi Form Adopsi",
        desc: "Lengkapi form adopsi dengan data diri, kondisi hunian, pengalaman merawat hewan, dan alasan ingin mengadopsi.",
        color: "text-blue-500",
        bg: "bg-blue-50 dark:bg-blue-500/10",
    },
    {
        icon: Phone,
        step: "03",
        title: "Proses Screening",
        desc: "Tim Purrheart akan menghubungimu untuk proses screening singkat. Ini untuk memastikan kucing pergi ke lingkungan yang tepat dan nyaman.",
        color: "text-amber-500",
        bg: "bg-amber-50 dark:bg-amber-500/10",
    },
    {
        icon: PartyPopper,
        step: "04",
        title: "Kucing Pulang Bersamamu",
        desc: "Setelah disetujui, kamu bisa menjemput kucing dari shelter. Tim kami akan memberikan panduan perawatan dan kontak yang bisa dihubungi kapan saja.",
        color: "text-emerald-500",
        bg: "bg-emerald-50 dark:bg-emerald-500/10",
    },
];

const cats = [
    {
        name: "Mochi",
        age: "4 bulan",
        gender: "Jantan",
        color: "Oranye Tabby",
        health: "Sehat, belum steril",
        status: "Siap Diadopsi",
        tags: ["Aktif", "Manja", "Suka Diangkat"],
        bio: "Mochi adalah kucing kecil yang penuh energi. Ditemukan di jalanan ketika masih sangat kecil, kini sudah tumbuh menjadi kucing yang sehat dan ceria. Dia suka bermain dan tak akan membiarkanmu duduk tenang!",
        img: "https://images.unsplash.com/photo-1518791841217-8f162f1912da?w=500&h=500&fit=crop&auto=format",
        urgent: false,
    },
    {
        name: "Luna",
        age: "1 tahun 2 bulan",
        gender: "Betina",
        color: "Abu-abu & Putih",
        health: "Sehat, sudah steril",
        status: "Siap Diadopsi",
        tags: ["Kalem", "Lembut", "Cocok untuk Pemula"],
        bio: "Luna datang ke shelter dalam kondisi kurang gizi. Setelah beberapa bulan pemulihan, dia kini menjadi kucing yang tenang dan sangat penyayang. Cocok untuk rumah yang damai.",
        img: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=500&h=500&fit=crop&auto=format",
        urgent: false,
    },
    {
        name: "Kopi",
        age: "8 bulan",
        gender: "Jantan",
        color: "Cokelat Gelap",
        health: "Sehat, belum steril",
        status: "Siap Diadopsi",
        tags: ["Penasaran", "Cerdas", "Suka Eksplorasi"],
        bio: "Kopi adalah kucing penjelajah sejati. Setiap sudut ruangan adalah petualangan baginya. Dia cepat beradaptasi dan sangat bersahabat dengan manusia setelah beberapa menit perkenalan.",
        img: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=500&h=500&fit=crop&auto=format",
        urgent: false,
    },
    {
        name: "Susu",
        age: "2 tahun",
        gender: "Betina",
        color: "Putih Bersih",
        health: "Sehat, sudah steril",
        status: "Siap Diadopsi",
        tags: ["Tenang", "Sayang", "Kalem"],
        bio: "Susu adalah sosok yang tenang dan penuh kasih. Dia suka duduk di pangkuan dan dielus perlahan. Cocok untuk keluarga yang ingin teman setia yang tidak ribet.",
        img: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=500&h=500&fit=crop&auto=format",
        urgent: false,
    },
    {
        name: "Bintang",
        age: "6 bulan",
        gender: "Jantan",
        color: "Hitam Legam",
        health: "Dalam pemulihan ringan",
        status: "Perlu Perawatan Ekstra",
        tags: ["Pemalu", "Butuh Kesabaran", "Istimewa"],
        bio: "Bintang datang dengan riwayat trauma kecil. Dia masih pemalu tapi perlahan mulai percaya. Butuh adopter yang sabar dan berpengalaman — tapi ketika dia sudah percaya, kasihnya tak terhingga.",
        img: "https://images.unsplash.com/photo-1561948955-570b270e7c36?w=500&h=500&fit=crop&auto=format",
        urgent: true,
    },
    {
        name: "Putri",
        age: "3 tahun",
        gender: "Betina",
        color: "Calico (3 Warna)",
        health: "Sehat, sudah steril",
        status: "Siap Diadopsi",
        tags: ["Mandiri", "Berwibawa", "Setia"],
        bio: "Putri adalah kucing senior yang anggun. Tiga tahun di shelter membuat dia sangat rindu punya rumah sendiri. Dia tidak banyak tingkah — tinggal berikan dia kasih sayang dan tempat tidur yang nyaman.",
        img: "https://images.unsplash.com/photo-1511275539165-cc46b1ee89bf?w=500&h=500&fit=crop&auto=format",
        urgent: false,
    },
];

const requirements = [
    { icon: Home, text: "Kucing tinggal penuh di dalam rumah adopter, tidak dibiarkan keluar bebas" },
    { icon: Heart, text: "Bertanggung jawab atas makanan bergizi, kesehatan rutin, dan keamanan kucing" },
    { icon: Shield, text: "Berkomitmen menjaga kucing seumur hidupnya — bukan hanya saat awal saja" },
    { icon: Stethoscope, text: "Bersedia membawa kucing ke dokter hewan jika ada kondisi kesehatan yang perlu diperhatikan" },
    { icon: CheckCircle2, text: "Bersedia memberikan update kondisi kucing secara berkala kepada tim Purrheart" },
];

// ── Cat Card ─────────────────────────────────────────────────────────────────

function CatCard({ cat }: { cat: typeof cats[0] }) {
    const [expanded, setExpanded] = useState(false);
    return (
        <div className="group relative rounded-3xl overflow-hidden border border-border bg-card hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300 flex flex-col">
            {/* Photo */}
            <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <Image
                    src={cat.img}
                    alt={`Foto ${cat.name}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

                {/* Urgent badge */}
                {cat.urgent && (
                    <div className="absolute top-3 left-3">
                        <span className="inline-flex items-center gap-1 rounded-full bg-orange-500 px-2.5 py-1 text-[10px] font-bold text-white shadow">
                            ⚡ Butuh Perhatian
                        </span>
                    </div>
                )}

                {/* Status badge */}
                {!cat.urgent && (
                    <div className="absolute top-3 left-3">
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-500 px-2.5 py-1 text-[10px] font-bold text-white shadow">
                            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse inline-block" />
                            {cat.status}
                        </span>
                    </div>
                )}

                {/* Gender badge */}
                <div className="absolute top-3 right-3">
                    <span className="rounded-full bg-white/20 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 border border-white/20">
                        {cat.gender === "Jantan" ? "♂" : "♀"} {cat.gender}
                    </span>
                </div>

                {/* Name */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white font-black text-xl leading-none">{cat.name}</p>
                    <p className="text-white/70 text-xs mt-1">{cat.age} · {cat.color}</p>
                </div>
            </div>

            {/* Body */}
            <div className="p-5 flex flex-col gap-4 flex-1">
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                    {cat.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-primary/8 border border-primary/15 px-2.5 py-0.5 text-[10px] font-semibold text-primary">
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Health */}
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Stethoscope className={cn("h-3.5 w-3.5 shrink-0", cat.urgent ? "text-orange-500" : "text-emerald-500")} />
                    <span>{cat.health}</span>
                </div>

                {/* Bio */}
                <div>
                    <p className={cn("text-xs text-muted-foreground leading-relaxed transition-all", !expanded && "line-clamp-2")}>
                        {cat.bio}
                    </p>
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="mt-1 text-xs font-semibold text-primary hover:underline"
                    >
                        {expanded ? "Sembunyikan" : "Baca selengkapnya"}
                    </button>
                </div>

                {/* CTA */}
                <div className="mt-auto pt-2 space-y-2">
                    <Link
                        href={`https://wa.me/6281216007070?text=Halo%20Purrheart!%20Saya%20tertarik%20untuk%20mengadopsi%20${cat.name}.`}
                        target="_blank"
                        className="group/btn flex items-center justify-center gap-2 w-full rounded-xl bg-primary py-2.5 text-xs font-bold text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
                    >
                        <Heart className="h-3.5 w-3.5 fill-current" />
                        Adopsi {cat.name}
                        <ArrowRight className="h-3 w-3 group-hover/btn:translate-x-0.5 transition-transform" />
                    </Link>
                </div>
            </div>
        </div>
    );
}

// ── AdoptionSection ───────────────────────────────────────────────────────────

export function AdoptionSection() {
    return (
        <section id="adopsi" className="py-20 bg-background">
            <div className="container mx-auto px-4 md:px-6 max-w-6xl space-y-20">

                {/* ── Header ── */}
                <div className="text-center">
                    <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary mb-4">
                        <Heart className="h-3 w-3 fill-primary" />
                        Adopsi Kucing
                    </div>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mb-4">
                        Mereka Menunggu Rumahmu 🐾
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
                        Adopsi bukan sekadar membawa kucing pulang — adopsi adalah komitmen jangka panjang
                        untuk merawat dan melindungi satu nyawa yang mempercayaimu sepenuhnya.
                    </p>
                </div>

                {/* ── Process Steps ── */}
                <div>
                    <div className="text-center mb-10">
                        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Alur Adopsi</p>
                        <h3 className="text-2xl md:text-3xl font-extrabold text-foreground">Bagaimana Prosesnya?</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {adoptionSteps.map((s, i) => (
                            <div key={s.step} className="relative flex flex-col items-start gap-4 rounded-2xl border border-border bg-card p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                                {/* Step number connector */}
                                {i < adoptionSteps.length - 1 && (
                                    <div className="hidden lg:block absolute -right-2.5 top-1/2 -translate-y-1/2 z-10">
                                        <span className="text-muted-foreground/30 text-xl">→</span>
                                    </div>
                                )}
                                <div className={`h-12 w-12 rounded-2xl ${s.bg} flex items-center justify-center`}>
                                    <s.icon className={`h-6 w-6 ${s.color}`} />
                                </div>
                                <div>
                                    <span className="text-[10px] font-black text-muted-foreground/50 tracking-widest">{s.step}</span>
                                    <h4 className="font-bold text-foreground text-base mt-0.5">{s.title}</h4>
                                    <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{s.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Cat Grid ── */}
                <div>
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">Tersedia Sekarang</p>
                            <h3 className="text-2xl md:text-3xl font-extrabold text-foreground">Kenalan dengan Mereka</h3>
                        </div>
                        <Link
                            href="https://wa.me/6281216007070?text=Halo!%20Saya%20ingin%20melihat%20daftar%20lengkap%20kucing%20di%20Purrheart."
                            target="_blank"
                            className="inline-flex items-center gap-2 rounded-full border border-primary text-primary px-5 py-2 text-xs font-bold hover:bg-primary hover:text-primary-foreground transition-colors shrink-0"
                        >
                            Lihat Semua Kucing ↗
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {cats.map((cat) => <CatCard key={cat.name} cat={cat} />)}
                    </div>

                    {/* More cats banner */}
                    <div className="mt-8 rounded-3xl bg-gradient-to-br from-primary/8 to-primary/3 border border-primary/15 p-8 text-center">
                        <p className="text-xl font-black text-foreground mb-2">+170 Kucing Lainnya Menunggu 🐾</p>
                        <p className="text-sm text-muted-foreground mb-5 max-w-md mx-auto">
                            Yang ada di atas hanya sebagian kecil dari keluarga besar Purrheart.
                            Hubungi kami untuk kenalan dengan kucing yang mungkin jodohmu!
                        </p>
                        <Link
                            href="https://wa.me/6281216007070?text=Halo%20Purrheart!%20Saya%20ingin%20melihat%20daftar%20kucing%20yang%20siap%20diadopsi."
                            target="_blank"
                            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 font-bold text-primary-foreground shadow-lg shadow-primary/20 hover:-translate-y-0.5 hover:shadow-xl transition-all text-sm"
                        >
                            Hubungi Kami via WhatsApp
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>

                {/* ── Requirements + Form ── */}
                <div>
                    <div className="text-center mb-10">
                        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Siap Adopsi?</p>
                        <h3 className="text-2xl md:text-3xl font-extrabold text-foreground">Syarat & Form Adopsi</h3>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">

                        {/* Syarat */}
                        <div className="rounded-3xl border border-border bg-card p-8 space-y-5">
                            <h4 className="font-bold text-foreground flex items-center gap-2">
                                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                    <CheckCircle2 className="h-4 w-4 text-primary" />
                                </div>
                                Persyaratan Adopsi
                            </h4>
                            <ul className="space-y-4">
                                {requirements.map((req) => (
                                    <li key={req.text} className="flex items-start gap-3">
                                        <div className="h-8 w-8 rounded-lg bg-primary/8 flex items-center justify-center shrink-0 mt-0.5">
                                            <req.icon className="h-3.5 w-3.5 text-primary" />
                                        </div>
                                        <p className="text-sm text-muted-foreground leading-relaxed">{req.text}</p>
                                    </li>
                                ))}
                            </ul>
                            <div className="pt-4 border-t border-border">
                                <p className="text-xs text-muted-foreground italic leading-relaxed">
                                    💬 Kami tidak menyaring secara berlebihan — kami hanya ingin memastikan setiap kucing
                                    pergi ke rumah yang benar-benar siap dan sesuai.
                                </p>
                            </div>
                        </div>

                        {/* Form CTA */}
                        <div className="rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/5 to-primary/3 p-8 flex flex-col gap-6">
                            <div>
                                <h4 className="font-bold text-foreground flex items-center gap-2 mb-3">
                                    <div className="h-8 w-8 rounded-full bg-primary/15 flex items-center justify-center">
                                        <Heart className="h-4 w-4 text-primary fill-primary" />
                                    </div>
                                    Isi Form Adopsi
                                </h4>
                                <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                                    Form adopsi membantu kami mengenal kamu lebih baik — seberapa siap kamu, dan kucing mana yang paling cocok.
                                </p>
                                <div className="grid grid-cols-2 gap-y-2.5 gap-x-3">
                                    {[
                                        "Nama lengkap & usia",
                                        "Alamat & domisili",
                                        "Kontak aktif (WA)",
                                        "Pengalaman dengan kucing",
                                        "Jenis & kondisi hunian",
                                        "Ada hewan peliharaan lain?",
                                        "Alasan ingin mengadopsi",
                                        "Kesediaan update berkala",
                                    ].map((f) => (
                                        <div key={f} className="flex items-start gap-2 text-xs text-muted-foreground">
                                            <Star className="h-3 w-3 text-primary fill-primary shrink-0 mt-0.5" />
                                            {f}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-3 mt-auto">
                                <Link
                                    href="https://forms.gle/adopsi-purrheart"
                                    target="_blank"
                                    className="group flex items-center justify-center gap-2 w-full rounded-xl bg-primary py-4 font-bold text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 hover:-translate-y-0.5 transition-all"
                                >
                                    Isi Form Adopsi Sekarang
                                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link
                                    href="https://wa.me/6281216007070?text=Halo%20Purrheart!%20Saya%20ingin%20bertanya%20tentang%20adopsi."
                                    target="_blank"
                                    className="flex items-center justify-center gap-2 w-full rounded-xl border border-border bg-background py-3.5 font-semibold text-foreground hover:bg-muted transition-colors text-sm"
                                >
                                    Tanya Dulu via WhatsApp
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
