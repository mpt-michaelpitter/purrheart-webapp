"use client";

import Link from "next/link";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import { use } from "react";

export default function DonationSuccess({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
            <div className="bg-card text-card-foreground p-8 rounded-3xl shadow-lg border border-border max-w-md w-full text-center space-y-6 animate-in zoom-in-95 duration-300">
                <div className="h-20 w-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-2">
                    <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-500" />
                </div>

                <div className="space-y-2">
                    <h1 className="text-2xl font-bold">Terima Kasih!</h1>
                    <p className="text-muted-foreground">
                        Donasi Anda telah kami terima. Semoga menjadi amal jariyah yang tak terputus.
                    </p>
                </div>

                <div className="pt-4">
                    <Link
                        href={`/donasi/${slug}`}
                        className="block w-full bg-primary text-primary-foreground font-bold py-3.5 rounded-xl hover:bg-primary/90 transition-colors"
                    >
                        Kembali ke Donasi
                    </Link>
                </div>
            </div>
        </div>
    );
}
