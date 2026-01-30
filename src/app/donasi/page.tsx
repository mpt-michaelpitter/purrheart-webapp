"use client";

import { allDonations } from "@/lib/data";
import { DonationCard } from "@/components/ui/DonationCard";
import { HeroBanner } from "@/components/home/HeroBanner"; // Optional, or make a smaller header

export default function DonasiPage() {
    return (
        <div className="flex flex-col min-h-screen pb-20">
            {/* Page Header */}
            <div className="pt-24 pb-12 bg-slate-50 dark:bg-slate-900/50">
                <div className="container mx-auto px-4 md:px-6">
                    <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                        Bantu Mereka yang Membutuhkan
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
                        Pilih program donasi yang ingin Anda bantu. Kepedulian Anda adalah harapan bagi mereka.
                    </p>
                </div>
            </div>

            {/* Donation Grid */}
            <div className="container mx-auto px-4 md:px-6 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {allDonations.map((donation) => (
                        <DonationCard
                            key={donation.id}
                            {...donation}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
