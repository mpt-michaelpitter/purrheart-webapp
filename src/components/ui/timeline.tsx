"use client";
import {
    useScroll,
    useTransform,
    motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
    title: string;
    content: React.ReactNode;
}

import { ScrollReveal } from "@/components/ui/scroll-reveal";

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
    const ref = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            setHeight(rect.height);
        }
    }, [ref]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 10%", "end 50%"],
    });

    const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
    const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

    return (
        <div
            className="w-full bg-background font-sans md:px-10"
            ref={containerRef}
        >
            <div className="max-w-7xl mx-auto py-10 px-4 md:px-8 lg:px-10">
                <ScrollReveal animation="fade" duration={1.8}>
                    <h2 className="text-lg md:text-4xl mb-4 text-foreground font-heading max-w-4xl">
                        Perjalanan Kami
                    </h2>
                    <p className="text-foreground/80 text-sm md:text-base max-w-sm">
                        Dari aksi mandiri hingga menjadi rumah bagi ratusan nyawa.
                    </p>
                </ScrollReveal>
            </div>

            <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
                {data.map((item, index) => (
                    <div
                        key={index}
                        className="flex justify-start pt-10 md:pt-40 md:gap-10"
                    >
                        <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
                            <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-secondary/20 backdrop-blur-md flex items-center justify-center shadow-sm">
                                <div className="h-4 w-4 rounded-full bg-secondary border border-secondary p-2 shadow-inner" />
                            </div>
                            <ScrollReveal animation="slide-right" distance={20} delay={0.1}>
                                <h3 className="hidden md:block text-xl md:text-5xl font-bold text-foreground md:pl-20 font-heading tracking-wide">
                                    {item.title}
                                </h3>
                            </ScrollReveal>
                        </div>

                        <div className="relative pl-20 pr-4 md:pl-4 w-full">
                            <ScrollReveal animation="slide-up" distance={90} duration={0.6}>
                                <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-foreground/50 font-heading">
                                    {item.title}
                                </h3>
                                {item.content}
                            </ScrollReveal>
                        </div>
                    </div>
                ))}
                <div
                    style={{
                        height: height + "px",
                    }}
                    className="absolute md:left-8 left-8 top-0 overflow-hidden w-[40px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-0% via-secondary/20 to-transparent to-99%  mask-[linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
                >
                    <motion.div
                        style={{
                            height: heightTransform,
                            opacity: opacityTransform,
                        }}
                        className="absolute inset-x-0 top-0  w-[2px] bg-linear-to-t from-primary via-secondary to-transparent from-0% via-10% rounded-full"
                    />
                </div>
            </div>
        </div>
    );
};
