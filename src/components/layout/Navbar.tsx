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
            <header className="sticky top-0 z-50 w-full bg-background border-b  transition-colors duration-300 hidden md:block">
                <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
                    {/* Logo Section */}
                    <Link href="/" className="flex items-center gap-3 group">
                        {/* Logo Icon */}
                        <div className="relative flex items-center justify-center">
                            <Heart className="h-8 w-8 fill-purple-600 text-purple-600 transition-transform group-hover:scale-110" />
                            <Heart className="absolute h-3.5 w-3.5 fill-white text-white top-[28%] left-[50%] translate-x-[-50%]" />
                        </div>

                        {/* Brand Text */}
                        <div className="flex flex-col justify-center">
                            <span className="text-2xl font-extrabold tracking-tight  leading-none">purrhearth</span>
                            <div className="flex items-center gap-1 mt-0.5">
                                <span className="text-[10px] text-slate-500 font-medium">Previously</span>
                                <Heart className="h-2 w-2 fill-slate-500  " />
                                <span className="text-[10px] text-slate-500 font-bold">WeCare.id</span>
                            </div>
                        </div>
                    </Link>

                    {/* Search Bar */}
                    <div className="flex max-w-md flex-1 ml-12 relative group">
                        <div className="relative w-full">
                            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 group-focus-within:text-purple-600 transition-colors" />
                            <input
                                type="text"
                                placeholder="Cari donasi, zakat, atau penggalangan..."
                                className="h-11 w-full rounded-full border border-slate-200 bg-slate-50 px-11 py-1 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-purple-600 focus:bg-white focus:ring-2 focus:ring-purple-100 dark:border-slate-800 dark:bg-slate-900 dark:focus:bg-slate-950"
                            />
                        </div>
                    </div>

                    {/* Desktop Nav */}
                    <nav className="flex items-center gap-2 ml-auto">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="px-3 py-2 text-sm font-semibold text-slate-600 hover:text-purple-700 transition-colors rounded-md hover:bg-slate-50  "
                            >
                                {link.name}
                            </Link>
                        ))}

                        <div className="flex items-center   ml-6 pl-6 border-l border-slate-200 dark:border-slate-800">
                            {mounted && (
                                <button
                                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                    className="p-2 rounded-full   hover:bg-slate-100 hover:text-purple-700  dark:hover:bg-slate-800 transition-colors"
                                >
                                    {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                                    <span className="sr-only">Toggle theme</span>
                                </button>
                            )}

                            <Link
                                href="/login"
                                className="rounded-full px-6 py-2.5 text-sm font-bold  border border-purple-200 hover:bg-purple-50 transition-colors dark:border-slate-700  dark:hover:bg-slate-800"
                            >
                                Masuk
                            </Link>
                            <Link
                                href="/register"
                                className="rounded-full bg-purple-700 px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-purple-200 hover:bg-purple-800 hover:shadow-lg hover:-translate-y-0.5 transition-all dark:shadow-none"
                            >
                                Daftar
                            </Link>
                        </div>
                    </nav>
                </div>
            </header>

            {/* Mobile Header - Updated background to match Image 2 */}
            {!isDetailPage && (
                <header className="sticky top-0 z-50 w-full bg-background dark:bg-slate-950 md:hidden pb-4 pt-4 px-4 shadow-sm transition-colors duration-300">
                    {/* Top Status Bar Area would be here effectively handled by system but we give padding top */}
                    <div className="flex items-center justify-between gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Ingin bantu siapa hari ini?"
                                className="h-11 w-full rounded-2xl border-none bg-white px-10 py-2 text-sm text-slate-900 shadow-sm outline-none placeholder:text-slate-400 focus:ring-0"
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <Link href="/akun" className="flex-shrink-0">
                                <div className="h-10 w-10 bg-purple-600 rounded-full flex items-center justify-center text-white shadow-md">
                                    <User className="h-6 w-6" />
                                </div>
                            </Link>
                            {mounted && (
                                <button
                                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                    className="h-10 w-10 rounded-full bg-white/50 flex items-center justify-center text-purple-700 hover:bg-white/80 dark:bg-slate-800 dark:text-slate-400"
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
