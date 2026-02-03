
import { Heart, FileText, RefreshCcw } from "lucide-react";
import { cn } from "@/lib/utils";

export type TabType = 'donasi' | 'kabar';

interface DonationTabsProps {
    activeTab: TabType;
    onTabChange: (tab: TabType) => void;
}

export function DonationTabs({ activeTab, onTabChange }: DonationTabsProps) {
    return (
        <div className="sticky top-0 md:static z-30 bg-white dark:bg-card shadow-sm md:shadow-none border-b md:border-0 border-slate-100 dark:border-slate-800 md:rounded-2xl overflow-hidden">
            <div className="grid grid-cols-2 divide-x divide-slate-100 dark:divide-slate-800">
                <button
                    onClick={() => onTabChange('donasi')}
                    className={cn("py-4 flex flex-col items-center gap-1 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors", activeTab === 'donasi' ? "bg-purple-50/50 dark:bg-slate-800" : "")}
                >
                    <Heart className={cn("h-5 w-5", activeTab === 'donasi' ? "fill-purple-600 text-purple-600" : "text-slate-400")} />
                    <span className={cn("text-xs font-bold", activeTab === 'donasi' ? "text-purple-700" : "text-slate-500")}>Kisah</span>
                </button>
                <button
                    onClick={() => onTabChange('kabar')}
                    className={cn("py-4 flex flex-col items-center gap-1 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors", activeTab === 'kabar' ? "bg-purple-50/50 dark:bg-slate-800" : "")}
                >
                    <FileText className={cn("h-5 w-5", activeTab === 'kabar' ? "text-purple-600" : "text-slate-400")} />
                    <span className={cn("text-xs font-bold", activeTab === 'kabar' ? "text-purple-700" : "text-slate-500")}>Kabar</span>
                </button>
            </div>
        </div>
    );
}
