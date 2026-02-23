"use client";

import Link from "next/link";
import { MapPin, Phone, Instagram, ArrowRight, MessageCircle, Mail, Heart, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp, fadeLeft, fadeRight, hoverLift, tapPress, viewport } from "@/lib/animations";
import { PawPattern } from "@/components/ui/paw-pattern";

export function ContactSection() {
    return (
        <section id="kontak" className="relative py-20 bg-[#562c72] overflow-hidden">
            <PawPattern className="text-white opacity-5" />

            <div className="container mx-auto px-4 md:px-6 max-w-5xl relative z-10">

                {/* Header */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={viewport}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#fdc65c] mb-4 border border-white/10 backdrop-blur-sm">
                        <MessageCircle className="h-3 w-3" />
                        HUBUNGI KAMI
                    </div>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-white">
                        Punya Pertanyaan? <span className="text-[#fdc65c]">Kami Siap Membantu.</span>
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8 items-start">
                    {/* Contact Info */}
                    <motion.div
                        variants={fadeLeft}
                        initial="hidden"
                        whileInView="show"
                        viewport={viewport}
                        className="space-y-6"
                    >
                        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-8 shadow-xl">
                            <h3 className="text-xl font-bold text-white mb-6">Informasi Kontak</h3>
                            <div className="space-y-6">
                                {[
                                    {
                                        icon: MapPin,
                                        label: "Lokasi Shelter",
                                        value: "Medan, Sumatera Utara, Indonesia",
                                        color: "text-red-400",
                                    },
                                    {
                                        icon: Phone,
                                        label: "WhatsApp",
                                        value: "+62 812-1600-7070",
                                        color: "text-[#fdc65c]",
                                        href: "https://wa.me/6281216007070",
                                    },
                                    {
                                        icon: Mail,
                                        label: "Email",
                                        value: "halo@purrheart.id",
                                        color: "text-blue-400",
                                    },
                                ].map((item) => (
                                    <div key={item.label} className="flex gap-4 group">
                                        <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/20 transition-colors">
                                            <item.icon className={`h-6 w-6 ${item.color}`} />
                                        </div>
                                        <div>
                                            <p className="text-xs uppercase tracking-wider text-purple-200/50 font-bold mb-1">{item.label}</p>
                                            {item.href ? (
                                                <a href={item.href} className="text-white font-medium hover:text-[#fdc65c] transition-colors">
                                                    {item.value}
                                                </a>
                                            ) : (
                                                <p className="text-white font-medium">{item.value}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Social Link */}
                        <motion.div whileHover={hoverLift} whileTap={tapPress}>
                            <Link
                                href="https://instagram.com/pedulikucing71"
                                target="_blank"
                                className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white shadow-lg"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-xl bg-white/20 flex items-center justify-center">
                                        <Instagram className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <p className="font-bold">Ikuti Kami di Instagram</p>
                                        <p className="text-xs text-white/70">Update harian dari shelter @pedulikucing71</p>
                                    </div>
                                </div>
                                <ArrowRight className="h-5 w-5" />
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Simple Message Card */}
                    <motion.div
                        variants={fadeRight}
                        initial="hidden"
                        whileInView="show"
                        viewport={viewport}
                    >
                        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-8 shadow-xl relative overflow-hidden">
                            <div className="absolute -right-8 -bottom-8 h-32 w-32 rounded-full bg-[#fdc65c]/10 blur-2xl" />

                            <h3 className="text-xl font-bold text-white mb-4">Ingin Berkunjung atau Donasi Offline?</h3>
                            <p className="text-purple-100/70 text-sm leading-relaxed mb-6">
                                Pintu kami selalu terbuka untuk mereka yang ingin mengenal kucing-kucing kami lebih dekat.
                                Silakan hubungi kami via WhatsApp untuk membuat janji temu atau menanyakan detail prosedur donasi barang/pakan.
                            </p>

                            <motion.div whileHover={hoverLift} whileTap={tapPress}>
                                <Link
                                    href="https://wa.me/6281216007070"
                                    className="group flex items-center justify-center gap-3 w-full rounded-2xl bg-[#fdc65c] py-4 text-sm font-black text-[#562c72] shadow-lg shadow-[#fdc65c]/20 hover:shadow-xl transition-all"
                                >
                                    <MessageSquare className="h-5 w-5" />
                                    Hubungi Via WhatsApp
                                </Link>
                            </motion.div>

                            <p className="text-center text-[10px] text-purple-200/40 mt-4 uppercase tracking-widest font-medium">
                                Operasional: Senin - Minggu | 09:00 - 17:00 WIB
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
