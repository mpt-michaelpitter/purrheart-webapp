
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

export function DonationStory({ data, donors }: DonationStoryProps) {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="prose prose-slate prose-lg dark:prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{ __html: data.description }} />
            </div>
            <div className="border-t border-slate-100 dark:border-slate-800 pt-6">
                <h3 className="font-bold text-lg mb-4">Donatur Terbaru</h3>
                <div className="space-y-4">
                    {donors.slice(0, 3).map((donor, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full flex items-center justify-center text-lg">😊</div>
                            <div>
                                <p className="text-sm font-bold  ">{donor.name}</p>
                                <p className="text-xs text-slate-500">Berdonasi <span className="text-purple-600 font-semibold">Rp {donor.amount.toLocaleString("id-ID")}</span> • {donor.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export function DonationUpdates({ updates }: DonationUpdatesProps) {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {updates.map((update, idx) => (
                <div key={idx} className="border-l-4 border-purple-200 pl-4 py-1">
                    <div className="text-sm text-slate-500 mb-1">{update.date}</div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">{update.title}</h3>
                    <div className="text-sm text-slate-600 dark:text-slate-300">
                        {update.image && (
                            <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-3 mt-2">
                                <Image src={update.image} alt={update.title} fill className="object-cover" />
                            </div>
                        )}
                        {update.content}
                    </div>
                </div>
            ))}
        </div>
    );
}

export function DonationWithdrawals({ withdrawals }: DonationWithdrawalsProps) {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h3 className="font-bold text-xl text-slate-900 dark:text-white">Transparansi Dana</h3>
            <p className="text-slate-500">Laporan penggunaan dana donasi yang telah dicairkan oleh penggalang dana.</p>
            <div className="space-y-4">
                {withdrawals.map((item, idx) => (
                    <div key={idx} className=" dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                        <div className="flex justify-between items-start mb-2">
                            <span className="font-bold text-purple-700 text-lg">Rp {item.amount.toLocaleString("id-ID")}</span>
                            <span className={cn("text-xs px-2 py-1 rounded-full font-medium", item.status === 'Berhasil' ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700")}>{item.status}</span>
                        </div>
                        <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">{item.description}</p>
                        <div className="text-xs text-slate-400">{item.date}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
