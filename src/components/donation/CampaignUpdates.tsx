"use client";

import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { CalendarDays, Megaphone } from "lucide-react";
import { cn } from "@/lib/utils";

// ── Portable Text components ──────────────────────────────────────────────────

const ptComponents = {
    block: {
        normal: ({ children }: any) => (
            <p className="text-sm md:text-base text-foreground/85 leading-relaxed mb-3">{children}</p>
        ),
        h2: ({ children }: any) => (
            <h2 className="text-lg font-bold text-foreground mt-4 mb-2">{children}</h2>
        ),
        h3: ({ children }: any) => (
            <h3 className="text-base font-semibold text-foreground mt-3 mb-1">{children}</h3>
        ),
        blockquote: ({ children }: any) => (
            <blockquote className="border-l-4 border-primary/50 pl-4 italic text-muted-foreground my-3">{children}</blockquote>
        ),
    },
    marks: {
        strong: ({ children }: any) => <strong className="font-bold text-foreground">{children}</strong>,
        em: ({ children }: any) => <em className="italic">{children}</em>,
        link: ({ value, children }: any) => (
            <a href={value?.href} target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80 transition-colors">
                {children}
            </a>
        ),
    },
    types: {
        image: ({ value }: any) => (
            <div className="my-4 rounded-2xl overflow-hidden border border-border">
                <Image
                    src={value?.asset?.url ?? ""}
                    alt={value?.alt ?? ""}
                    width={800}
                    height={450}
                    className="w-full h-auto object-cover"
                />
                {value?.alt && (
                    <p className="text-xs text-center text-muted-foreground py-2 bg-muted/30">{value.alt}</p>
                )}
            </div>
        ),
    },
};

// ── Types ─────────────────────────────────────────────────────────────────────

interface CampaignUpdate {
    title: string;
    publishedAt: string | null;
    content: any[] | null;
}

interface CampaignUpdatesProps {
    updates: CampaignUpdate[];
}

// ── Component ─────────────────────────────────────────────────────────────────

export function CampaignUpdates({ updates }: CampaignUpdatesProps) {
    if (!updates || updates.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 gap-3 text-center animate-in fade-in duration-300">
                <div className="h-14 w-14 rounded-full bg-muted flex items-center justify-center">
                    <Megaphone className="h-7 w-7 text-muted-foreground" />
                </div>
                <p className="font-semibold text-foreground">Belum ada kabar terbaru</p>
                <p className="text-sm text-muted-foreground max-w-xs">
                    Penggalang dana belum membagikan pembaruan. Pantau terus!
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {/* Header */}
            <div className="flex items-center gap-2 mb-6">
                <h3 className="font-bold text-xl text-foreground">Kabar Terbaru</h3>
                <span className="inline-flex items-center justify-center min-w-[1.5rem] h-6 rounded-full bg-primary/10 text-primary text-xs font-bold px-2">
                    {updates.length}
                </span>
            </div>

            {/* Timeline */}
            <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-4 top-6 bottom-0 w-0.5 bg-border" />

                <div className="space-y-8">
                    {updates.map((update, idx) => {
                        const isLatest = idx === 0;
                        const date = update.publishedAt
                            ? new Date(update.publishedAt).toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            })
                            : null;

                        return (
                            <div key={idx} className="relative flex gap-5">
                                {/* Timeline dot */}
                                <div className={cn(
                                    "relative z-10 shrink-0 h-8 w-8 rounded-full flex items-center justify-center mt-1",
                                    isLatest
                                        ? "bg-primary shadow-md shadow-primary/30"
                                        : "bg-muted border-2 border-border"
                                )}>
                                    <Megaphone className={cn(
                                        "h-3.5 w-3.5",
                                        isLatest ? "text-primary-foreground" : "text-muted-foreground"
                                    )} />
                                    {isLatest && (
                                        <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-green-400 border-2 border-background animate-pulse" />
                                    )}
                                </div>

                                {/* Content card */}
                                <div className={cn(
                                    "flex-1 rounded-2xl border p-5 transition-all",
                                    isLatest
                                        ? "border-primary/30 bg-primary/5 shadow-sm"
                                        : "border-border bg-card"
                                )}>
                                    {/* Badge + Date row */}
                                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                                        {isLatest && (
                                            <span className="text-[10px] font-bold uppercase tracking-wider bg-primary text-primary-foreground rounded-full px-2 py-0.5">
                                                Terbaru
                                            </span>
                                        )}
                                        {date && (
                                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                <CalendarDays className="h-3 w-3" />
                                                {date}
                                            </div>
                                        )}
                                    </div>

                                    {/* Title */}
                                    <h4 className="font-bold text-base text-foreground mb-3 leading-snug">
                                        {update.title}
                                    </h4>

                                    {/* Body */}
                                    {update.content && update.content.length > 0 && (
                                        <div className="prose-sm">
                                            <PortableText value={update.content} components={ptComponents} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
