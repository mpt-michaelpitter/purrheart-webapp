"use client";

import { Heart, Users, Megaphone } from "lucide-react";
import { cn } from "@/lib/utils";

export type TabType = "donasi" | "kabar" | "updates";

interface DonationTabsProps {
    activeTab: TabType;
    onTabChange: (tab: TabType) => void;
    updateCount?: number;
}

const tabs = [
    { id: "donasi", label: "Kisah", icon: Heart },
    { id: "kabar", label: "Donatur", icon: Users },
    { id: "updates", label: "Update", icon: Megaphone },
] as const;

export function DonationTabs({ activeTab, onTabChange, updateCount = 0 }: DonationTabsProps) {
    return (
        <div className="sticky top-0 md:static z-30 bg-card shadow-sm md:shadow-none border-b md:border border-border md:rounded-2xl overflow-hidden">
            <div className="grid grid-cols-3 divide-x divide-border">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    const showBadge = tab.id === "updates" && updateCount > 0;

                    return (
                        <button
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
                            className={cn(
                                "relative py-3.5 flex flex-col items-center gap-1 transition-colors",
                                isActive
                                    ? "bg-primary/5 dark:bg-primary/10"
                                    : "hover:bg-muted"
                            )}
                        >
                            <div className="relative">
                                <Icon
                                    className={cn(
                                        "h-4 w-4 transition-colors",
                                        isActive ? "text-primary" : "text-muted-foreground"
                                    )}
                                    fill={isActive && tab.id === "donasi" ? "currentColor" : "none"}
                                />
                                {showBadge && (
                                    <span className="absolute -top-1 -right-2 h-4 w-4 rounded-full bg-primary text-[9px] font-bold text-primary-foreground flex items-center justify-center">
                                        {updateCount}
                                    </span>
                                )}
                            </div>
                            <span className={cn(
                                "text-[10px] font-bold",
                                isActive ? "text-primary" : "text-muted-foreground"
                            )}>
                                {tab.label}
                            </span>

                            {/* Active underline indicator */}
                            {isActive && (
                                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full" />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
