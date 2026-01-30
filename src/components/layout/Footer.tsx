import Link from "next/link";
import { Heart, Mail, Phone, MapPin, Instagram, Facebook, Twitter, Youtube } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-white text-slate-600 pt-16 pb-8 border-t border-border dark:bg-slate-950 dark:text-slate-400 transition-colors duration-300">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-slate-900 dark:text-white">
                            <Heart className="h-6 w-6 fill-primary text-primary" />
                            <span className="text-xl font-bold">purrhearth</span>
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                            Platform donasi terpercaya yang menghubungkan kebaikanmu dengan mereka yang membutuhkan. Transparan, Aman, dan Amanah.
                        </p>
                        <div className="flex gap-4 pt-2">
                            <Link href="#" className="hover:text-primary transition-colors"><Instagram className="h-5 w-5" /></Link>
                            <Link href="#" className="hover:text-primary transition-colors"><Facebook className="h-5 w-5" /></Link>
                            <Link href="#" className="hover:text-primary transition-colors"><Twitter className="h-5 w-5" /></Link>
                            <Link href="#" className="hover:text-primary transition-colors"><Youtube className="h-5 w-5" /></Link>
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="text-slate-900 font-semibold mb-4 dark:text-white">Tentang Kami</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="#" className="hover:text-primary dark:hover:text-white transition-colors">Tentang purrhearth</Link></li>
                            <li><Link href="#" className="hover:text-primary dark:hover:text-white transition-colors">Syarat & Ketentuan</Link></li>
                            <li><Link href="#" className="hover:text-primary dark:hover:text-white transition-colors">Kebijakan Privasi</Link></li>
                            <li><Link href="#" className="hover:text-primary dark:hover:text-white transition-colors">Laporan Keuangan</Link></li>
                            <li><Link href="#" className="hover:text-primary dark:hover:text-white transition-colors">FAQ</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-slate-900 font-semibold mb-4 dark:text-white">Program</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="#" className="hover:text-primary dark:hover:text-white transition-colors">Donasi Kesehatan</Link></li>
                            <li><Link href="#" className="hover:text-primary dark:hover:text-white transition-colors">Bencana Alam</Link></li>
                            <li><Link href="#" className="hover:text-primary dark:hover:text-white transition-colors">Pendidikan</Link></li>
                            <li><Link href="#" className="hover:text-primary dark:hover:text-white transition-colors">Zakat & Infak</Link></li>
                        </ul>
                    </div>

                    {/* Contact & Apps */}
                    <div className="space-y-4">
                        <h3 className="text-slate-900 font-semibold mb-4 dark:text-white">Hubungi Kami</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> support@purrhearth.com</li>
                            <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> +62 21 1234 5678</li>
                            <li className="flex items-start gap-2"><MapPin className="h-4 w-4 shrink-0" /> Jl. Kebaikan No. 1, Jakarta Selatan</li>
                        </ul>

                        <div className="pt-4">
                            <p className="text-xs mb-2">Download Aplikasi</p>
                            <div className="flex gap-2">
                                <div className="h-10 w-32 bg-slate-100 border border-slate-200 rounded flex items-center justify-center text-xs text-slate-600 hover:border-slate-400 cursor-pointer dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400 dark:hover:border-slate-500 transition-colors">
                                    Google Play
                                </div>
                                <div className="h-10 w-32 bg-slate-100 border border-slate-200 rounded flex items-center justify-center text-xs text-slate-600 hover:border-slate-400 cursor-pointer dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400 dark:hover:border-slate-500 transition-colors">
                                    App Store
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-200 dark:border-slate-800 pt-8 text-center text-sm text-slate-500">
                    &copy; {new Date().getFullYear()} purrhearth Foundation. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
