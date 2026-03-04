"use client";

import { Heart, User, Sun, Moon } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { SearchBar } from "@/components/ui/SearchBar";

export function Navbar() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => { setMounted(true); }, []);

    // Add scroll-based glassmorphism
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Donasi", href: "/donasi" },
        { name: "Adopsi", href: "/adopsi" },
        { name: "Tentang Kami", href: "/about" },
        { name: "Amalanku", href: "/amalanku" },
        { name: "Sponsor", href: "/sponsor" },
    ];

    const isDetailPage = pathname?.startsWith("/donasi/") && pathname !== "/donasi";

    return (
        <>
            {/* ── Desktop / Tablet Header ──────────────────────────────────── */}
            <header
                className={cn(
                    "sticky top-0 z-50 w-full hidden md:block transition-all duration-300",
                    scrolled
                        ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-sm"
                        : "bg-primary border-b border-primary/80 dark:bg-background dark:border-border"
                )}
            >
                <div className="w-full flex h-20 items-center justify-between px-4 md:px-8">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group shrink-0">
                        <div className="relative flex items-center justify-center">
                            <Heart className="h-8 w-8 fill-purple-600 text-purple-600 transition-transform group-hover:scale-110" />
                            <Heart className="absolute h-3.5 w-3.5 fill-white text-white top-[28%] left-[50%] translate-x-[-50%]" />
                        </div>
                        <div className="flex flex-col justify-center">
                            <span className={cn(
                                "text-2xl font-extrabold tracking-tight leading-none transition-colors",
                                scrolled ? "text-foreground" : "text-primary-foreground dark:text-foreground"
                            )}>
                                purrheart
                            </span>
                            <div className={cn(
                                "flex items-center gap-1 mt-0.5 transition-colors",
                                scrolled ? "text-muted-foreground" : "text-primary-foreground/60 dark:text-foreground/60"
                            )}>
                                <span className="text-[10px] font-medium">Previously</span>
                                <Heart className="h-2 w-2 fill-current" />
                                <span className="text-[10px] font-bold">WeCare.id</span>
                            </div>
                        </div>
                    </Link>

                    {/* Search */}
                    <div className="flex max-w-md flex-1 ml-10">
                        <SearchBar />
                    </div>

                    {/* Desktop Nav */}
                    <nav className="flex items-center gap-1 ml-auto pl-6">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={cn(
                                        "px-3 py-2 text-sm font-semibold rounded-lg transition-colors",
                                        isActive
                                            ? (scrolled ? "bg-primary/10 text-primary" : "bg-white/20 text-white font-bold")
                                            : scrolled
                                                ? "text-foreground/70 hover:text-foreground hover:bg-muted dark:text-foreground"
                                                : "text-primary-foreground/80 hover:text-primary-foreground hover:bg-white/10 dark:text-foreground"
                                    )}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}

                        <div className="flex items-center ml-3 pl-3 border-l border-border/50">
                            {mounted && (
                                <button
                                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                    className="p-2 rounded-full hover:bg-muted/60 transition-colors text-muted-foreground hover:text-foreground dark:text-foreground"
                                    aria-label="Toggle theme"
                                >
                                    {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                                </button>
                            )}

                            {/* Masuk & Daftar — hidden for now
                            <Link href="/login" className="rounded-full px-6 py-2.5 text-sm font-bold border border-input hover:bg-muted transition-colors ml-4">Masuk</Link>
                            <Link href="/register" className="rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground shadow-md shadow-primary/20 hover:bg-primary/90 ml-2">Daftar</Link>
                            */}
                        </div>
                    </nav>
                </div>
            </header>

            {/* ── Mobile Header ────────────────────────────────────────────── */}
            {!isDetailPage && (
                <header className={cn(
                    "sticky top-0 z-50 w-full md:hidden transition-all duration-300",
                    scrolled
                        ? "bg-background/95 backdrop-blur-xl shadow-md border-b border-border"
                        : "bg-background border-b border-border/50"
                )}>
                    {/* Top Row: Logo & Utility */}
                    <div className="flex items-center justify-between px-4 h-14">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="relative flex items-center justify-center">
                                <Heart className="h-6 w-6 fill-primary text-primary transition-transform group-hover:scale-110" />
                                <Heart className="absolute h-2.5 w-2.5 fill-white text-white top-[28%]" />
                            </div>
                            <span className="text-xl font-black tracking-tighter text-foreground">
                                purrheart
                            </span>
                        </Link>

                        <div className="flex items-center gap-2">
                            {mounted && (
                                <button
                                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                    className="h-9 w-9 rounded-full bg-muted/60 flex items-center justify-center text-muted-foreground transition-colors active:scale-95"
                                    aria-label="Toggle theme"
                                >
                                    {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                                </button>
                            )}
                            <Link href="/akun">
                                <div className="h-9 w-9 bg-primary/10 border border-primary/20 rounded-full flex items-center justify-center text-primary transition-transform active:scale-95">
                                    <User className="h-4 w-4" strokeWidth={2.5} />
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* Bottom Row: Search */}
                    <div className="px-4 pb-3 pt-1">
                        <SearchBar
                            placeholder="Cari donasi atau pahlawan..."
                            inputClassName="bg-muted/50 border-none h-10 text-xs"
                        />
                    </div>
                </header>
            )}
        </>
    );
}
