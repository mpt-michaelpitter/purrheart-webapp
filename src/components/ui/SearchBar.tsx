"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Search, X, Tag } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

// ── Types ─────────────────────────────────────────────────────────────────────

interface SearchResult {
    id: string;
    title: string;
    slug: string;
    imageSrc: string | null;
    category: string | null;
}

interface SearchBarProps {
    placeholder?: string;
    className?: string;
    inputClassName?: string;
}

// ── Hook: debounced search ────────────────────────────────────────────────────

function useSearchSuggestions(query: string, delay = 300) {
    const [results, setResults] = useState<SearchResult[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (query.trim().length < 2) {
            setResults([]);
            return;
        }

        setLoading(true);
        const timer = setTimeout(async () => {
            try {
                const res = await fetch(
                    `/api/search?q=${encodeURIComponent(query)}`,
                    { cache: "no-store" }
                );
                const data = await res.json();
                setResults(data.results ?? []);
            } catch {
                setResults([]);
            } finally {
                setLoading(false);
            }
        }, delay);

        return () => clearTimeout(timer);
    }, [query, delay]);

    return { results, loading };
}

// ── Component ─────────────────────────────────────────────────────────────────

export function SearchBar({ placeholder = "Cari donasi, zakat, atau penggalangan...", className, inputClassName }: SearchBarProps) {
    const [query, setQuery] = useState("");
    const [open, setOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const { results, loading } = useSearchSuggestions(query);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    // Show dropdown when there are results or user is typing
    useEffect(() => {
        setOpen(query.trim().length >= 2);
    }, [query, results]);

    const handleSelect = useCallback((slug: string) => {
        setQuery("");
        setOpen(false);
        router.push(`/donasi/${slug}`);
    }, [router]);

    const handleSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;
        setOpen(false);
        router.push(`/donasi?q=${encodeURIComponent(query.trim())}`);
    }, [query, router]);

    const handleClear = useCallback(() => {
        setQuery("");
        setOpen(false);
        inputRef.current?.focus();
    }, []);

    return (
        <div ref={wrapperRef} className={cn("relative w-full", className)}>
            <form onSubmit={handleSubmit} className="relative w-full">
                {/* Search icon */}
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none z-10" />

                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => query.trim().length >= 2 && setOpen(true)}
                    placeholder={placeholder}
                    autoComplete="off"
                    className={cn(
                        "h-11 w-full rounded-full border border-input",
                        "bg-muted/50 px-11 py-1 text-sm outline-none transition-all",
                        "placeholder:text-muted-foreground",
                        "focus:border-primary focus:bg-background focus:ring-2 focus:ring-primary/20",
                        query && "pr-10",
                        inputClassName
                    )}
                />

                {/* Clear button */}
                {query && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Hapus pencarian"
                    >
                        <X className="h-4 w-4" />
                    </button>
                )}
            </form>

            {/* ── Suggestions Dropdown ── */}
            {open && (
                <div className="absolute top-[calc(100%+8px)] left-0 right-0 z-50 rounded-2xl border border-border bg-background shadow-xl shadow-black/10 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                    {/* Loading state */}
                    {loading && (
                        <div className="px-4 py-3 text-sm text-muted-foreground flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                            Mencari...
                        </div>
                    )}

                    {/* Results */}
                    {!loading && results.length > 0 && (
                        <ul role="listbox" className="max-h-72 overflow-y-auto py-1">
                            {results.map((r) => (
                                <li key={r.id}>
                                    <button
                                        type="button"
                                        onClick={() => handleSelect(r.slug)}
                                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/60 transition-colors text-left group"
                                        role="option"
                                    >
                                        {/* Thumbnail */}
                                        <div className="h-10 w-10 rounded-xl overflow-hidden bg-muted shrink-0">
                                            {r.imageSrc ? (
                                                <Image
                                                    src={r.imageSrc}
                                                    alt={r.title}
                                                    width={40}
                                                    height={40}
                                                    className="object-cover w-full h-full"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                                    <Search className="h-4 w-4" />
                                                </div>
                                            )}
                                        </div>

                                        {/* Text */}
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                                                {r.title}
                                            </p>
                                            {r.category && (
                                                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                                                    <Tag className="h-3 w-3" />
                                                    {r.category}
                                                </p>
                                            )}
                                        </div>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}

                    {/* Empty state */}
                    {!loading && results.length === 0 && query.trim().length >= 2 && (
                        <div className="px-4 py-6 text-center">
                            <p className="text-sm text-muted-foreground">
                                Tidak ada hasil untuk <span className="font-semibold text-foreground">"{query}"</span>
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">Coba kata kunci lain</p>
                        </div>
                    )}

                    {/* Footer hint */}
                    {results.length > 0 && (
                        <div className="border-t border-border px-4 py-2 flex items-center justify-between">
                            <p className="text-xs text-muted-foreground">{results.length} hasil ditemukan</p>
                            <button
                                type="button"
                                onClick={handleSubmit as any}
                                className="text-xs text-primary font-semibold hover:underline"
                            >
                                Lihat semua →
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
