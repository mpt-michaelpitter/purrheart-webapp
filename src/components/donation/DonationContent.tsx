
import Image from "next/image";
import { cn } from "@/lib/utils";

interface DonationStoryProps {
    data: any;
    donors: any[];
}

interface DonationUpdatesProps {
    updates: any[];
}

interface DonationWithdrawalsProps {
    withdrawals: any[];
}

import { PortableText } from '@portabletext/react';
import { urlFor } from '@/sanity/lib/image';

const myPortableTextComponents = {
    types: {
        image: ({ value }: any) => {
            return (
                <div className="relative w-full h-64 my-4 rounded-lg overflow-hidden">
                    <Image
                        src={urlFor(value).url()}
                        alt={value.alt || 'Campaign Image'}
                        fill
                        className="object-cover"
                    />
                </div>
            );
        },
        youtube: ({ value }: any) => {
            const { url } = value;
            const id = url.split('v=')[1];
            return (
                <div className="aspect-video w-full my-4 rounded-lg overflow-hidden">
                    <iframe
                        src={`https://www.youtube.com/embed/${id}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                    />
                </div>
            );
        },
        hr: ({ value }: any) => {
            if (value.style === 'space') {
                return <div className="my-8" />;
            }
            return <hr className="my-8 border-t border-border" />;
        },
    },
    block: {
        h1: ({ children }: any) => <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>,
        h2: ({ children }: any) => <h2 className="text-2xl font-bold mt-6 mb-3">{children}</h2>,
        h3: ({ children }: any) => <h3 className="text-xl font-bold mt-4 mb-2">{children}</h3>,
        h4: ({ children }: any) => <h4 className="text-lg font-bold mt-2 mb-1">{children}</h4>,
        blockquote: ({ children }: any) => <blockquote className="border-l-4 border-primary pl-4 italic my-4">{children}</blockquote>,
    },
    list: {
        bullet: ({ children }: any) => <ul className="list-disc pl-5 my-4 space-y-2">{children}</ul>,
        number: ({ children }: any) => <ol className="list-decimal pl-5 my-4 space-y-2">{children}</ol>,
    },
};

export function DonationStory({ data, donors }: DonationStoryProps) {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="prose prose-slate prose-lg dark:prose-invert max-w-none text-foreground/90">
                {Array.isArray(data.description) ? (
                    <PortableText value={data.description} components={myPortableTextComponents} />
                ) : (
                    <div dangerouslySetInnerHTML={{ __html: data.description }} />
                )}
            </div>
            <div className="border-t border-border pt-6">
                {/* Donatur Terbaru moved to separate tab */}
            </div>
        </div>
    );
}

interface DonationListProps {
    donors: any[];
}


export function DonationList({ donors }: DonationListProps) {
    return (
        <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex items-center gap-2 mb-2">
                <h3 className="font-bold text-xl text-foreground">Para Donatur</h3>
                <span className="inline-flex items-center justify-center min-w-[1.5rem] h-6 rounded-full bg-primary/10 text-primary text-xs font-bold px-2">
                    {donors.length}
                </span>
            </div>

            {donors && donors.length > 0 ? (
                <div className="space-y-3">
                    {donors.map((donor, idx) => {
                        const initials = donor.name
                            ? donor.name.split(" ").map((w: string) => w[0]).slice(0, 2).join("").toUpperCase()
                            : "?";
                        const gradients = [
                            "from-purple-500 to-indigo-500",
                            "from-pink-500 to-orange-400",
                            "from-teal-400 to-cyan-500",
                            "from-amber-400 to-orange-500",
                            "from-emerald-400 to-green-500",
                        ];
                        const grad = gradients[idx % gradients.length];

                        return (
                            <div
                                key={idx}
                                className="flex gap-4 p-4 rounded-2xl bg-card border border-border hover:border-primary/20 hover:shadow-md transition-all duration-200"
                            >
                                {/* Avatar */}
                                <div className={`h-11 w-11 rounded-full bg-gradient-to-br ${grad} flex items-center justify-center text-white text-sm font-extrabold shrink-0 shadow-sm`}>
                                    {initials}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2">
                                        <div>
                                            <p className="font-bold text-foreground text-sm">{donor.name}</p>
                                            <p className="text-[11px] text-muted-foreground mt-0.5">
                                                {new Date(donor.time).toLocaleDateString("id-ID", {
                                                    weekday: "short", year: "numeric", month: "short", day: "numeric"
                                                })}
                                            </p>
                                        </div>
                                        <span className="text-sm font-extrabold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent shrink-0">
                                            Rp {donor.amount.toLocaleString("id-ID")}
                                        </span>
                                    </div>

                                    {donor.message && (
                                        <div className="mt-2.5 text-sm text-foreground/80 bg-muted/40 rounded-xl px-3 py-2 border-l-4 border-primary/40 italic">
                                            "{donor.message}"
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-14 gap-3 text-center">
                    <div className="text-5xl">🐱</div>
                    <p className="font-semibold text-foreground">Belum ada donatur</p>
                    <p className="text-sm text-muted-foreground">Jadilah orang baik pertama yang berdonasi!</p>
                </div>
            )}
        </div>
    );
}


export function DonationWithdrawals({ withdrawals }: DonationWithdrawalsProps) {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h3 className="font-bold text-xl text-foreground">Transparansi Dana</h3>
            <p className="text-muted-foreground">Laporan penggunaan dana donasi yang telah dicairkan oleh penggalang dana.</p>
            <div className="space-y-4">
                {withdrawals.map((item, idx) => (
                    <div key={idx} className="bg-card p-4 rounded-xl border border-border">
                        <div className="flex justify-between items-start mb-2">
                            <span className="font-bold text-purple-700 dark:text-purple-400 text-lg">Rp {item.amount.toLocaleString("id-ID")}</span>
                            <span className={cn("text-xs px-2 py-1 rounded-full font-medium", item.status === 'Berhasil' ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400")}>{item.status}</span>
                        </div>
                        <p className="text-sm text-foreground mb-2">{item.description}</p>
                        <div className="text-xs text-muted-foreground">{item.date}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}


