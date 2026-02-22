"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
    {
        q: "Kenapa harus screening adopsi & OTA?",
        a: "Karena kesejahteraan kucing adalah prioritas utama. Screening memastikan kucing berada di tangan yang tepat — adopter atau orang tua asuh yang benar-benar siap dan berkomitmen untuk merawat dengan penuh tanggung jawab.",
    },
    {
        q: "Apakah bisa adopsi dari luar kota?",
        a: "Bisa, dengan pertimbangan dan prosedur tertentu. Hubungi kami terlebih dahulu agar kami dapat mendiskusikan proses dan persyaratan adopsi jarak jauh secara langsung.",
    },
    {
        q: "Apakah bisa mengunjungi shelter?",
        a: "Bisa, dengan konfirmasi terlebih dahulu. Hubungi kami melalui WhatsApp atau Instagram untuk menjadwalkan kunjungan ke Purrheart Shelter di Medan.",
    },
    {
        q: "Apa itu program Orang Tua Asuh (OTA)?",
        a: "OTA adalah program di mana kamu mendukung kebutuhan hidup seekor kucing yang tinggal di shelter setiap bulannya — tanpa perlu membawanya pulang. Cocok untuk yang belum siap adopsi tapi ingin tetap berkontribusi nyata.",
    },
    {
        q: "Apakah donasi saya akan dilaporkan?",
        a: "Ya! Kami berkomitmen pada transparansi penuh. Setiap campaign dilengkapi dengan update perkembangan dan laporan penggunaan dana yang bisa kamu pantau langsung di website.",
    },
];

function FaqItem({ q, a }: { q: string; a: string }) {
    const [open, setOpen] = useState(false);
    return (
        <div
            className={cn(
                "rounded-2xl border border-border overflow-hidden transition-all duration-200",
                open && "border-primary/30 shadow-sm"
            )}
        >
            <button
                onClick={() => setOpen(!open)}
                className="flex items-start justify-between gap-4 w-full p-5 text-left"
            >
                <span className="font-semibold text-foreground text-sm md:text-base">{q}</span>
                <ChevronDown
                    className={cn(
                        "h-5 w-5 text-muted-foreground shrink-0 mt-0.5 transition-transform duration-200",
                        open && "rotate-180 text-primary"
                    )}
                />
            </button>
            <div className={cn("overflow-hidden transition-all duration-300", open ? "max-h-64" : "max-h-0")}>
                <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{a}</p>
            </div>
        </div>
    );
}

export function FaqSection() {
    return (
        <section id="faq" className="py-20 bg-background">
            <div className="container mx-auto px-4 md:px-6 max-w-3xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">
                        Pertanyaan Umum
                    </h2>
                    <p className="text-muted-foreground text-sm md:text-base">
                        Ada pertanyaan lain? Hubungi kami langsung!
                    </p>
                </div>

                <div className="space-y-3">
                    {faqs.map((faq, i) => (
                        <FaqItem key={i} q={faq.q} a={faq.a} />
                    ))}
                </div>
            </div>
        </section>
    );
}
