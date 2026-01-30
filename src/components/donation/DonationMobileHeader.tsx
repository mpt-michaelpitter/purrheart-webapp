
interface DonationMobileHeaderProps {
    title: string;
    organizer: string;
    verified: boolean;
    currentAmount: number;
    daysLeft: number;
    percentage: number;
}

export function DonationMobileHeader({ title, organizer, verified, currentAmount, daysLeft, percentage }: DonationMobileHeaderProps) {
    return (
        <div className="block md:hidden bg-white dark:bg-card px-4 py-6 md:rounded-2xl shadow-sm space-y-4">
            <h1 className="text-xl font-bold text-foreground leading-tight">
                {title}
            </h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="font-semibold text-purple-600">{organizer}</span>
                {verified && <span className="text-blue-500">✓</span>}
            </div>

            {/* Progress Bar Mobile */}
            <div className="space-y-2">
                <div className="h-2 w-full bg-purple-100 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-600 rounded-full" style={{ width: `${percentage}%`, minWidth: percentage > 0 ? "4px" : "0" }} />
                </div>
                <div className="flex justify-between text-sm font-medium">
                    <span className="text-purple-700">Rp {currentAmount.toLocaleString("id-ID")}</span>
                    <span className="text-slate-500">{daysLeft} hari lagi</span>
                </div>
            </div>
        </div>
    );
}
