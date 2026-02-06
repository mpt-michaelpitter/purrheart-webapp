"use client";

import { usePathname } from "next/navigation";

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
                {footer}
                {pendingBar}
                {isMainPage && mobileNav}
            </div>
        </>
    );
}
