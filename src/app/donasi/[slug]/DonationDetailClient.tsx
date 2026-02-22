"use client";

import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";
import { useState } from "react";
import { DonationMobileHeader } from "@/components/donation/DonationMobileHeader";
import { DonationTabs, TabType } from "@/components/donation/DonationTabs";
import { DonationStory, DonationList } from "@/components/donation/DonationContent";
import { DonationGallery } from "@/components/donation/DonationGallery";
import { DonationSidebar } from "@/components/donation/DonationSidebar";
import { CampaignUpdates } from "@/components/donation/CampaignUpdates";

export default function DonationDetailClient({ data }: { data: any }) {
    const [activeTab, setActiveTab] = useState<TabType>("donasi");
    const percentage = data.targetAmount
        ? Math.min((data.currentAmount / data.targetAmount) * 100, 100)
        : 0;

    const updates = data.updates ?? [];
    const images = data.images?.length > 0
        ? data.images
        : data.imageSrc
            ? [{ image: null, name: data.title, fallbackSrc: data.imageSrc }]
            : [];

    return (
        <div className="min-h-screen md:px-20 pb-24 md:pb-12 relative animate-in fade-in duration-500">

            {/* Mobile floating back / home buttons */}
            <div className="md:hidden fixed top-0 left-0 right-0 z-40 p-4 flex items-center justify-between pointer-events-none">
                <Link
                    href="/donasi"
                    className="pointer-events-auto bg-black/30 backdrop-blur-sm p-2 rounded-full text-white hover:bg-black/50 transition-colors"
                >
                    <ArrowLeft className="h-5 w-5" />
                </Link>
                <Link
                    href="/"
                    className="pointer-events-auto bg-black/30 backdrop-blur-sm p-2 rounded-full text-white hover:bg-black/50 transition-colors"
                >
                    <Home className="h-5 w-5" />
                </Link>
            </div>

            {/* Desktop breadcrumb */}
            <div className="hidden md:block container mx-auto px-4 py-6">
                <Link
                    href="/donasi"
                    className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Kembali ke Donasi
                </Link>
            </div>

            <div className="container mx-auto px-0 md:px-4 lg:px-6 max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* ── LEFT: Main Content ── */}
                    <div className="md:col-span-2 space-y-6">
                        {/* Hero gallery */}
                        <DonationGallery images={images} />

                        {/* Mobile header (progress, stats) */}
                        <DonationMobileHeader
                            title={data.title}
                            organizer={data.organizer}
                            verified={data.verified}
                            currentAmount={data.currentAmount}
                            daysLeft={data.daysLeft}
                            percentage={percentage}
                        />

                        {/* Tabs — show update badge count */}
                        <DonationTabs
                            activeTab={activeTab}
                            onTabChange={setActiveTab}
                            updateCount={updates.length}
                        />

                        {/* Tab content */}
                        <div className="bg-white dark:bg-card px-4 py-6 md:rounded-2xl md:p-8 md:shadow-sm min-h-[400px]">
                            {activeTab === "donasi" && (
                                <DonationStory data={data} donors={data.donors || []} />
                            )}
                            {activeTab === "kabar" && (
                                <DonationList donors={data.donors || []} />
                            )}
                            {activeTab === "galeri" && (
                                <div className="space-y-4 animate-in fade-in duration-300">
                                    <h3 className="font-bold text-xl">Galeri</h3>
                                    {images.length > 0 ? (
                                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                                            {images.map((img: any, i: number) => {
                                                const src = img.fallbackSrc ?? img.image?.asset?.url;
                                                if (!src) return null;
                                                return (
                                                    // eslint-disable-next-line @next/next/no-img-element
                                                    <div key={i} className="aspect-square rounded-xl overflow-hidden border border-border bg-muted">
                                                        <img
                                                            src={src}
                                                            alt={img.name ?? `Foto ${i + 1}`}
                                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                                        />
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-muted-foreground text-center py-10">
                                            Belum ada foto galeri.
                                        </p>
                                    )}
                                </div>
                            )}
                            {activeTab === "updates" && (
                                <CampaignUpdates updates={updates} />
                            )}
                        </div>
                    </div>

                    {/* ── RIGHT: Sidebar ── */}
                    <DonationSidebar data={data} percentage={percentage} />
                </div>

                {/* Mobile sticky bottom CTA */}
                <div className="fixed bottom-0 left-0 right-0 p-4 border-t border-border bg-background/80 backdrop-blur-xl z-50 md:hidden pb-safe">
                    <Link
                        href={`/donasi/${data.slug}/payment`}
                        className="block w-full text-center rounded-2xl bg-primary py-4 text-lg font-bold text-primary-foreground shadow-xl shadow-primary/30 active:scale-95 transition-transform"
                    >
                        Donasi Sekarang
                    </Link>
                </div>
            </div>
        </div>
    );
}
