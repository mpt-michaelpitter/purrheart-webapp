"use client";

import { Search, Heart, User, Sun, Moon } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function Navbar() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const pathname = usePathname();

    // Avoid hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    const navLinks = [
        { name: "Donasi", href: "/donasi" },
        { name: "Adopsi", href: "/adopsi" },
        { name: "Relawan", href: "/relawan" },
        { name: "Amalanku", href: "/amalanku" },
        { name: "Sponsor", href: "/sponsor" },
    ];

    // Hide mobile header on detail pages or when specialized headers are used
    const isDetailPage = pathname?.startsWith("/donasi/") && pathname !== "/donasi";

    return (
        <>
            {/* Desktop/Tablet Header */}
            <header className="sticky top-0 z-50 w-full bg-background border-b border-border transition-colors duration-300 hidden md:block">
                <div className="container mx-auto flex h-20 items-center justify-between px-4 ">
                    {/* Logo Section */}
                    <Link href="/" className="flex items-center gap-3 group">
                        {/* Logo Icon */}
                        <div className="relative flex items-center justify-center">
                            <Heart className="h-8 w-8 fill-purple-600 text-purple-600 transition-transform group-hover:scale-110" />
                            <Heart className="absolute h-3.5 w-3.5 fill-white text-white top-[28%] left-[50%] translate-x-[-50%]" />
                        </div>

                        {/* Brand Text */}
                        <div className="flex flex-col justify-center">
                            <span className="text-2xl font-extrabold tracking-tight  leading-none">purrheart</span>
                            <div className="flex items-center gap-1 mt-0.5">
                                <span className="text-[10px] text-muted-foreground font-medium">Previously</span>
                                <Heart className="h-2 w-2 fill-muted-foreground  " />
                                <span className="text-[10px] text-muted-foreground font-bold">WeCare.id</span>
                            </div>
                        </div>
                    </Link>

                    {/* Search Bar */}
                    <div className="flex max-w-md flex-1 ml-12 relative group">
                        <div className="relative w-full">
                            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                            <input
                                type="text"
                                placeholder="Cari donasi, zakat, atau penggalangan..."
                                className="h-11 w-full rounded-full border border-input bg-muted/50 px-11 py-1 text-sm outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:bg-background focus:ring-2 focus:ring-primary/20"
                            />
                        </div>
                    </div>

                    {/* Desktop Nav */}
                    <nav className="flex items-center gap-2 ml-auto">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="px-3 py-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors rounded-md hover:bg-muted"
                            >
                                {link.name}
                            </Link>
                        ))}

                        <div className="flex items-center ml-6 pl-6 border-l border-border">
                            {mounted && (
                                <button
                                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                    className="p-2 rounded-full hover:bg-muted hover:text-primary transition-colors"
                                >
                                    {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                                    <span className="sr-only">Toggle theme</span>
                                </button>
                            )}

                            <Link
                                href="/login"
                                className="rounded-full px-6 py-2.5 text-sm font-bold border border-input hover:bg-muted transition-colors ml-4"
                            >
                                Masuk
                            </Link>
                            <Link
                                href="/register"
                                className="rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground shadow-md shadow-primary/20 hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5 transition-all ml-2"
                            >
                                Daftar
                            </Link>
                        </div>
                    </nav>
                </div>
            </header>

            {/* Mobile Header */}
            {!isDetailPage && (
                <header className="sticky top-0 z-50 w-full bg-background md:hidden pb-4 pt-4 px-4 shadow-sm transition-colors duration-300">
                    <div className="flex items-center justify-between gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Ingin bantu siapa hari ini?"
                                className="h-11 w-full rounded-2xl border-none bg-muted/50 px-10 py-2 text-sm text-foreground shadow-sm outline-none placeholder:text-muted-foreground focus:ring-0"
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <Link href="/akun" className="flex-shrink-0">
                                <div className="h-10 w-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground shadow-md">
                                    <User className="h-6 w-6" />
                                </div>
                            </Link>
                            {mounted && (
                                <button
                                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                    className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-primary hover:bg-muted/80"
                                >
                                    {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                                </button>
                            )}
                        </div>
                    </div>
                </header>
            )}
        </>
    );
}
