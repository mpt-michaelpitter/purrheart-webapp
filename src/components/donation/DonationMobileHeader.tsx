import { Users, Clock, CheckCircle2 } from "lucide-react";

interface DonationMobileHeaderProps {
    title: string;
    organizer: string;
    verified: boolean;
    currentAmount: number;
    targetAmount: number;
    donorCount: number;
    daysLeft: number;
    percentage: number;
}

export function DonationMobileHeader({
    title,
    organizer,
    verified,
    currentAmount,
    targetAmount,
    donorCount,
    daysLeft,
    percentage,
}: DonationMobileHeaderProps) {
    return (
        <div className="block md:hidden bg-card px-4 py-5 shadow-sm space-y-4">
            {/* Title */}
            <h1 className="text-lg font-bold text-foreground leading-tight">
                {title}
            </h1>

            {/* Organizer */}
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <span className="font-semibold text-primary">{organizer}</span>
                {verified && (
                    <CheckCircle2 className="h-3.5 w-3.5 text-blue-500 fill-blue-500" />
                )}
            </div>

            {/* Progress Section */}
            <div className="space-y-3">
                {/* Progress Bar */}
                <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-primary to-violet-400 rounded-full transition-all duration-700"
                        style={{ width: `${percentage}%`, minWidth: percentage > 0 ? "4px" : "0" }}
                    />
                </div>

                {/* Amount Row */}
                <div className="space-y-1">
                    <div className="flex items-baseline justify-between">
                        <span className="text-lg font-extrabold text-primary">
                            Rp {currentAmount.toLocaleString("id-ID")}
                        </span>
                        <span className="text-xs font-semibold text-primary/70">
                            {percentage < 1 && percentage > 0 ? "<1" : percentage.toFixed(0)}%
                        </span>
                    </div>
                    {targetAmount > 0 && (
                        <p className="text-xs text-muted-foreground">
                            terkumpul dari{" "}
                            <span className="font-semibold text-foreground">
                                Rp {targetAmount.toLocaleString("id-ID")}
                            </span>
                        </p>
                    )}
                </div>

                {/* Stats Row */}
                <div className="flex items-center gap-4 pt-1">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Users className="h-3.5 w-3.5" />
                        <span className="font-semibold">{donorCount.toLocaleString("id-ID")}</span>
                        <span>donatur</span>
                    </div>
                    {daysLeft > 0 && (
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Clock className="h-3.5 w-3.5" />
                            <span className="font-semibold">{daysLeft}</span>
                            <span>hari lagi</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
