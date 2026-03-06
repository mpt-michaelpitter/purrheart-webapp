"use client";

import { usePathname } from "next/navigation";
import { LiveDonationToast } from "@/components/donation/LiveDonationToast";

interface MainLayoutWrapperProps {
    children: React.ReactNode;
    navbar: React.ReactNode;
    footer: React.ReactNode;
    mobileNav: React.ReactNode;
    pendingBar: React.ReactNode;
}

export function MainLayoutWrapper({
    children,
    navbar,
    footer,
    mobileNav,
    pendingBar,
}: MainLayoutWrapperProps) {
    const pathname = usePathname();
    const isStudio = pathname?.startsWith("/studio");
    const isPaymentPage = pathname?.includes("/payment");
    const mainPages = ["/", "/donasi", "/adopsi", "/relawan", "/amalanku", "/sponsor"];
    const isMainPage = pathname ? mainPages.includes(pathname) : false;

    if (isStudio) {
        return <>{children}</>;
    }

    return (
        <>
            <div className="flex min-h-screen flex-col">
                {navbar}
                <main className="flex-1 bg-slate-50/50 dark:bg-background pb-20 md:pb-0">
                    {children}
                </main>
                {!isPaymentPage && footer}
                {pendingBar}
                <LiveDonationToast />
                {isMainPage && mobileNav}
            </div>
        </>
    );
}
