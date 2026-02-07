"use client";

import { motion, useInView, HTMLMotionProps } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Available animation types for the ScrollReveal component.
 */
export type AnimationType =
    | "fade"
    | "slide-up"
    | "slide-down"
    | "slide-left"
    | "slide-right"
    | "zoom"
    | "none";

interface ScrollRevealProps extends HTMLMotionProps<"div"> {
    /** The content to be wrapped and animated. */
    children: React.ReactNode;
    /** The type of animation to perform. Default is "slide-up". */
    animation?: AnimationType;
    /** Duration of the animation in seconds. Default: 0.5 */
    duration?: number;
    /** Delay before the animation starts in seconds. Default: 0 */
    delay?: number;
    /** Distance in pixels for slide animations. Default: 30 */
    distance?: number;
    /** Viewport threshold (0 to 1) to trigger animation. Default: 0.1 */
    threshold?: number;
    /** Whether the animation should only run once. Default: true */
    once?: boolean;
    /** Additional CSS classes for the wrapper div. */
    className?: string;
    /** Whether to scale the element during animation (e.g. for slide-up-scale). If true, scale starts at 0.95. */
    enableScale?: boolean;
    /** Custom blur amount in pixels for fade animations. If provided, adds a blur effect. */
    blur?: string;
}

/**
 * A reusable component that triggers animations when it enters the viewport.
 * 
 * @example
 * // Simple Fade In
 * <ScrollReveal animation="fade">Content</ScrollReveal>
 * 
 * @example
 * // Slide Up with Scale
 * <ScrollReveal animation="slide-up" enableScale>Content</ScrollReveal>
 * 
 * @example
 * // Slide Right with Delay
 * <ScrollReveal animation="slide-right" delay={0.2}>Content</ScrollReveal>
 */
export function ScrollReveal({
    children,
    animation = "slide-up",
    duration = 0.5,
    delay = 0,
    distance = 30,
    threshold = 0.1,
    once = true,
    className,
    enableScale = false,
    blur,
    ...props
}: ScrollRevealProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, amount: threshold });

    // Define initial states based on animation type
    const getInitial = () => {
        const initial: any = { opacity: 0 };

        if (enableScale) initial.scale = 0.95;
        if (blur) initial.filter = `blur(${blur})`;

        switch (animation) {
            case "slide-up":
                initial.y = distance;
                break;
            case "slide-down":
                initial.y = -distance;
                break;
            case "slide-left":
                initial.x = distance; // Elements come from right to left, so initial x is positive
                break;
            case "slide-right":
                initial.x = -distance; // Elements come from left to right, so initial x is negative
                break;
            case "zoom":
                initial.scale = 0.8;
                break;
            case "fade":
            default:
                break;
        }

        if (animation === "none") return {};

        return initial;
    };

    // Define target state (animate to)
    const getAnimate = () => {
        if (animation === "none") return {};

        return {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            filter: "blur(0px)",
        };
    };

    return (
        <div ref={ref} className={cn("", className)}>
            <motion.div
                initial={getInitial()}
                animate={isInView ? getAnimate() : getInitial()}
                transition={{
                    duration: duration,
                    delay: delay,
                    ease: "easeOut",
                }}
                {...props}
            >
                {children}
            </motion.div>
        </div>
    );
}

// Export a simpler alias if preferred, or just default export
export default ScrollReveal;
