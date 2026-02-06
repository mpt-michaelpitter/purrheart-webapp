
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

// ... (interfaces)

export function DonationStory({ data, donors }: DonationStoryProps) {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="prose prose-slate prose-lg dark:prose-invert max-w-none text-foreground/90">
                {Array.isArray(data.description) ? (
                    <PortableText value={data.description} />
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
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h3 className="font-bold text-xl text-foreground mb-4">Para Donatur ({donors.length})</h3>

            {donors && donors.length > 0 ? (
                <div className="space-y-6">
                    {donors.map((donor, idx) => (
                        <div key={idx} className="flex gap-4 p-4 rounded-xl bg-card border border-border">
                            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl shrink-0">😊</div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-bold text-foreground">{donor.name}</p>
                                        <p className="text-xs text-muted-foreground">{new Date(donor.time).toLocaleDateString("id-ID", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                    </div>
                                    <span className="font-bold text-primary">Rp {donor.amount.toLocaleString("id-ID")}</span>
                                </div>
                                {donor.message && (
                                    <div className="mt-3 text-sm text-foreground/80 bg-muted/50 p-3 rounded-lg italic border border-border/50">
                                        "{donor.message}"
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-10 text-muted-foreground">
                    <p>Belum ada donatur yang bergabung.</p>
                    <p className="text-sm mt-1">Jadilah orang baik pertama!</p>
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
