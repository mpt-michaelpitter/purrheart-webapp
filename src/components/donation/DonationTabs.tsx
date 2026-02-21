
import { Heart, FileText, RefreshCcw, Users, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type TabType = 'donasi' | 'kabar' | 'galeri';

interface DonationTabsProps {
    activeTab: TabType;
    onTabChange: (tab: TabType) => void;
}

export function DonationTabs({ activeTab, onTabChange }: DonationTabsProps) {
    return (
        <div className="sticky top-0 md:static z-30 bg-card shadow-sm md:shadow-none border-b md:border-0 border-border md:rounded-2xl overflow-hidden">
            <div className="grid grid-cols-3 divide-x divide-border">
                <button
                    onClick={() => onTabChange('donasi')}
                    className={cn("py-4 flex flex-col items-center gap-1 hover:bg-muted transition-colors", activeTab === 'donasi' ? "bg-primary/5 dark:bg-primary/10" : "")}
                >
                    <Heart className={cn("h-5 w-5", activeTab === 'donasi' ? "fill-primary text-primary" : "text-muted-foreground")} />
                    <span className={cn("text-xs font-bold", activeTab === 'donasi' ? "text-primary" : "text-muted-foreground")}>Kisah</span>
                </button>
                <button
                    onClick={() => onTabChange('kabar')}
                    className={cn("py-4 flex flex-col items-center gap-1 hover:bg-muted transition-colors", activeTab === 'kabar' ? "bg-primary/5 dark:bg-primary/10" : "")}
                >
                    <Users className={cn("h-5 w-5", activeTab === 'kabar' ? "text-primary" : "text-muted-foreground")} />
                    <span className={cn("text-xs font-bold", activeTab === 'kabar' ? "text-primary" : "text-muted-foreground")}>Donatur</span>
                </button>
                <button
                    onClick={() => onTabChange('galeri')}
                    className={cn("py-4 flex flex-col items-center gap-1 hover:bg-muted transition-colors", activeTab === 'galeri' ? "bg-primary/5 dark:bg-primary/10" : "")}
                >
                    <ImageIcon className={cn("h-5 w-5", activeTab === 'galeri' ? "text-primary" : "text-muted-foreground")} />
                    <span className={cn("text-xs font-bold", activeTab === 'galeri' ? "text-primary" : "text-muted-foreground")}>Galeri</span>
                </button>
            </div>
        </div>
    );
}
