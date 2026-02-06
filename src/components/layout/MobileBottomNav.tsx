"use client";

import { Home, Heart, User, MessageSquare, PlusSquare } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function MobileBottomNav() {
    const pathname = usePathname();

    const navItems = [
        {
            name: "Donasi",
            href: "/donasi",
            icon: Heart,
        },
        {
            name: "Galang Dana",
            href: "/galang-dana",
            icon: PlusSquare,
        },
        {
            name: "Donasi ",
            href: "/donasi-saya",
            icon: Home,
        },
        {
            name: "Inbox",
            href: "/inbox",
            icon: MessageSquare,
        },
        {
            name: "Akun",
            href: "/akun",
            icon: User,
        },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background p-2 shadow-[0_-5px_10px_rgba(0,0,0,0.05)] md:hidden transition-colors duration-300">
            <nav className="flex items-center justify-around">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center justify-center gap-1 p-2 text-[10px] font-medium transition-colors",
                                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <item.icon className={cn("h-6 w-6", isActive ? "fill-current" : "")} strokeWidth={2} />
                            <span>{item.name}</span>
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}
