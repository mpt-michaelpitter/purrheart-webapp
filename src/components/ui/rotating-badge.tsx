"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface RotatingBadgeProps {
    text: string;
    icon?: React.ReactNode;
    className?: string;
    size?: number;
    duration?: number;
}

export function RotatingBadge({
    text,
    icon,
    className,
    size = 120,
    duration = 10,
}: RotatingBadgeProps) {
    const characters = text.split("");
    const radius = size / 2.5; // Adjust radius for text placement

    return (
        <div
            className={cn("relative flex items-center justify-center", className)}
            style={{ width: size, height: size }}
        >
            {/* Rotating Text Ring */}
            <motion.div
                className="absolute inset-0 w-full h-full"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: duration, ease: "linear" }}
            >
                {characters.map((char, i) => (
                    <span
                        key={i}
                        className="absolute left-1/2 top-0 origin-[0_60px] text-xs font-bold uppercase tracking-widest text-accent"
                        style={{
                            transform: `translateX(-50%) rotate(${i * (360 / characters.length)}deg)`,
                            height: `${size / 2}px`,
                            transformOrigin: `center ${size / 2}px`,
                        }}
                    >
                        {char}
                    </span>
                ))}
            </motion.div>

            {/* Central Icon/Content */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="bg-accent text-primary rounded-full p-2 w-1/2 h-1/2 flex items-center justify-center shadow-lg z-10">
                    {icon}
                </div>
            </div>
        </div>
    );
}
