"use client";

import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";
import { useState } from "react";
import { DonationHero } from "@/components/donation/DonationHero";
import { DonationMobileHeader } from "@/components/donation/DonationMobileHeader";
import { DonationTabs, TabType } from "@/components/donation/DonationTabs";
import { DonationStory, DonationList } from "@/components/donation/DonationContent";
import { DonationSidebar } from "@/components/donation/DonationSidebar";

export default function DonationDetailClient({ data }: { data: any }) {
    const [activeTab, setActiveTab] = useState<TabType>('donasi');
    const percentage = Math.min((data.currentAmount / data.targetAmount) * 100, 100);

    return (
        <div className="min-h-screen md:px-20 pb-24 md:pb-12 relative animate-in fade-in duration-500">
            {/* Mobile Sticky Top Header */}
            <div className="md:hidden fixed top-0 left-0 right-0 z-40 p-4 flex items-center justify-between pointer-events-none">
                <Link href="/donasi" className="pointer-events-auto backdrop-blur-sm p-2 rounded-full text-white hover:bg-black/50 transition-colors">
                    <ArrowLeft className="h-5 w-5" />
                </Link>
                <Link href="/" className="pointer-events-auto bg-black/30 backdrop-blur-sm p-2 rounded-full text-white hover:bg-black/50 transition-colors">
                    <Home className="h-5 w-5" />
                </Link>
            </div>

            {/* Desktop Breadcrumb */}
            <div className="hidden md:block container mx-auto px-4 py-6">
                <Link href="/donasi" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-purple-600 transition-colors">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Kembali ke Donasi
                </Link>
            </div>

            <div className="container mx-auto px-0 md:px-4 lg:px-6 max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* LEFT COLUMN: Main Content */}
                    <div className="md:col-span-2 space-y-6">
                        <DonationHero imageSrc={data.imageSrc} title={data.title} />

                        <DonationMobileHeader
                            title={data.title}
                            organizer={data.organizer}
                            verified={data.verified}
                            currentAmount={data.currentAmount}
                            daysLeft={data.daysLeft}
                            percentage={percentage}
                        />

                        <DonationTabs activeTab={activeTab} onTabChange={setActiveTab} />

                        <div className="bg-white dark:bg-card px-4 py-6 md:rounded-2xl md:p-8 md:shadow-sm min-h-[400px]">
                            {activeTab === 'donasi' && <DonationStory data={data} donors={data.donors || []} />}
                            {activeTab === 'kabar' && <DonationList donors={data.donors || []} />}
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Sticky Sidebar */}
                    <DonationSidebar data={data} percentage={percentage} />
                </div>

                {/* Mobile Sticky Bottom CTA */}
                <div className="fixed bottom-0 left-0 right-0 p-4 border-t border-slate-100  bg-slate-800  dark:border-slate-800 z-50 md:hidden pb-safe">
                    <Link
                        href={`/donasi/${data.slug}/payment`}
                        className="block w-full text-center rounded-2xl bg-purple-600 py-4 text-lg font-bold text-white shadow-xl shadow-purple-200 dark:shadow-none active:scale-95 transition-transform"
                    >
                        Donasi Sekarang
                    </Link>
                </div>
            </div>
        </div>
    );
}
