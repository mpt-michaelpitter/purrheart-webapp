"use client";

import { Home, Heart, User, LayoutGrid, Gift } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Donasi", href: "/donasi", icon: Heart },
    { name: "Adopsi", href: "/adopsi", icon: Gift },
    { name: "Explore", href: "/about", icon: LayoutGrid },
    { name: "Akun", href: "/akun", icon: User },
];

export function MobileBottomNav() {
    const pathname = usePathname();

    return (
        <nav className={cn(
            "fixed bottom-0 left-0 right-0 z-50 md:hidden",
            "bg-background/90 backdrop-blur-xl",
            "border-t border-border",
            "shadow-[0_-8px_30px_rgba(0,0,0,0.08)]",
            "px-2 pb-safe-bottom"  // handle notch
        )}>
            <div className="flex items-center justify-around py-1">
                {navItems.map((item) => {
                    const isActive =
                        item.href === "/"
                            ? pathname === "/"
                            : pathname?.startsWith(item.href);

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="flex flex-col items-center justify-center gap-0.5 min-w-[56px] py-2"
                        >
                            <span className={cn(
                                "flex items-center justify-center h-8 w-8 rounded-xl transition-all duration-200",
                                isActive
                                    ? "bg-primary/15 scale-110"
                                    : "hover:bg-muted"
                            )}>
                                <item.icon
                                    className={cn(
                                        "h-5 w-5 transition-colors",
                                        isActive ? "text-primary" : "text-muted-foreground"
                                    )}
                                    strokeWidth={isActive ? 2.5 : 2}
                                />
                            </span>
                            <span className={cn(
                                "text-[9px] font-semibold transition-colors",
                                isActive ? "text-primary" : "text-muted-foreground"
                            )}>
                                {item.name}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
