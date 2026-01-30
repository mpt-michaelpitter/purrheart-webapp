"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DonationCard } from "@/components/ui/DonationCard";

interface Donation {
    id: string;
    slug: string;
    imageSrc: string;
    title: string;
    organizer: string;
    currentAmount: number;
    targetAmount?: number;
    donorCount: number;
    daysLeft: number;
}

interface CategorySectionProps {
    title: string;
    linkText?: string;
    linkHref?: string;
    donations: Donation[];
}

export function CategorySection({ title, linkText = "Lihat Semua", linkHref = "#", donations }: CategorySectionProps) {
    return (
        <section className="py-12 border-b border-border/50 last:border-0">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold     md:text-3xl">
                        {title}
                    </h2>
                    <Link
                        href={linkHref}
                        className="group flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                    >
                        {linkText}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {donations.map((donation) => (
                        <DonationCard
                            key={donation.id}
                            {...donation}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
