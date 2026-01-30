"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface DonationCardProps {
    id: string;
    slug: string;
    imageSrc: string;
    title: string;
    organizer: string;
    organizerAvatar?: string;
    currentAmount: number;
    donorCount: number;
    daysLeft: number;
    targetAmount?: number;
    className?: string;
}

export function DonationCard({
    id,
    slug,
    imageSrc,
    title,
    organizer,
    organizerAvatar,
    currentAmount,
    targetAmount,
    donorCount,
    daysLeft,
    className,
}: DonationCardProps) {
    const percentage = targetAmount
        ? Math.min((currentAmount / targetAmount) * 100, 100)
        : 0;

    return (
        <Link
            href={`/donasi/${slug}`}
            className={cn(
                "group flex flex-col overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-md transition-all hover:shadow-lg hover:-translate-y-1",
                className
            )}
        >
            <div className="relative aspect-[16/9] w-full overflow-hidden">
                <Image
                    src={imageSrc}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Chips/Badges could go here */}
            </div>

            <div className="flex flex-1 flex-col p-4">
                <h3 className="mb-2 line-clamp-2 text-base font-bold leading-tight text-foreground group-hover:text-primary transition-colors">
                    {title}
                </h3>

                <div className="mb-4 flex items-center gap-2 text-xs text-muted-foreground">
                    <div className="h-5 w-5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden relative">
                        {/* Fallback avatar */}
                        {organizerAvatar ? <Image src={organizerAvatar} alt={organizer} fill /> : null}
                    </div>
                    <span>{organizer}</span>
                </div>

                <div className="mt-auto space-y-3">
                    <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground">Dana terkumpul</span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                            <div
                                className="h-full bg-primary transition-all duration-500 rounded-full"
                                style={{ width: `${percentage}%` }}
                            />
                        </div>
                    </div>

                    <div className="flex items-end justify-between">
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-primary">
                                Rp {currentAmount.toLocaleString("id-ID")}
                            </span>
                            <span className="text-[10px] text-muted-foreground">
                                {donorCount} Donatur
                            </span>
                        </div>
                        <div className="text-[10px] font-medium text-destructive">
                            {daysLeft} hari lagi
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
