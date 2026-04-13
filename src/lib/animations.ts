/**
 * animations.ts
 * ─────────────
 * Centralised Framer Motion variants for the Purrheart platform.
 * Import only what you need — all variants are tree-shakeable.
 *
 * Usage:
 *   import { fadeUp, stagger, scaleIn } from "@/lib/animations";
 *   <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
 */

import type { Variants } from "framer-motion";

// ── Viewport defaults ─────────────────────────────────────────────────────────
/** Pass to `viewport` prop for consistent trigger behaviour across the site. */
export const viewport = { once: true, margin: "-80px" };

// ── Fade variants ─────────────────────────────────────────────────────────────

/** Fade in + slide up (most common section entry) */
export const fadeUp: Variants = {
    hidden: { opacity: 0, y: 32 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

/** Fade in + slide down */
export const fadeDown: Variants = {
    hidden: { opacity: 0, y: -24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

/** Fade in from left */
export const fadeLeft: Variants = {
    hidden: { opacity: 0, x: -40 },
    show: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

/** Fade in from right */
export const fadeRight: Variants = {
    hidden: { opacity: 0, x: 40 },
    show: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

/** Pure fade (no movement) */
export const fadeIn: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.6 } },
};

// ── Scale variants ────────────────────────────────────────────────────────────

/** Zoom in from a slightly smaller size */
export const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.88 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] } },
};

/** Zoom in with a slight spring bounce (cards, badges) */
export const scalePop: Variants = {
    hidden: { opacity: 0, scale: 0.75 },
    show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 18 } },
};

// ── Stagger container ─────────────────────────────────────────────────────────

/**
 * Stagger parent — wrap a list in this to cascade children animations.
 * Children should use any variant above (they'll inherit show/hidden state).
 *
 * @param delay   — initial delay before first child (default 0.1 s)
 * @param stagger — gap between each child (default 0.08 s)
 */
export const staggerContainer = (delay = 0.1, stagger = 0.08): Variants => ({
    hidden: {},
    show: {
        transition: {
            delayChildren: delay,
            staggerChildren: stagger,
        },
    },
});

/** Convenience preset — tight stagger for cards */
export const cardStagger: Variants = staggerContainer(0.1, 0.09);

/** Convenience preset — loose stagger for section rows */
export const rowStagger: Variants = staggerContainer(0.15, 0.12);

// ── Utility: delayed variant ──────────────────────────────────────────────────

/** Wraps any variant and adds an explicit delay to `show`. */
export const withDelay = (variant: Variants, delay: number): Variants => ({
    hidden: variant.hidden,
    show: {
        ...variant.show,
        transition: {
            ...(typeof variant.show === "object" && "transition" in variant.show
                ? (variant.show as Record<string, unknown>).transition as object
                : {}),
            delay,
        },
    },
});

// ── Hover / tap micro-interactions (use inline on motion elements) ─────────────

/** Subtle lift on hover — pass to `whileHover` */
export const hoverLift = { y: -4, transition: { duration: 0.2 } };

/** Gentle scale on hover */
export const hoverScale = { scale: 1.03, transition: { duration: 0.2 } };

/** Press-down tap feedback */
export const tapPress = { scale: 0.97 };

// ── Slide-in for list items ───────────────────────────────────────────────────

/** Slide + fade from left, for timeline/list items */
export const slideInLeft: Variants = {
    hidden: { opacity: 0, x: -30 },
    show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

/** Slide + fade from right, for alternating list items */
export const slideInRight: Variants = {
    hidden: { opacity: 0, x: 30 },
    show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

// ── Hero entrance (longer, grander) ──────────────────────────────────────────

/** Hero headline — strong entrance from below */
export const heroHeadline: Variants = {
    hidden: { opacity: 0, y: 48, filter: "blur(6px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};

/** Hero sub-text — slight delay, lighter movement */
export const heroSub: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 } },
};

/** Hero CTA button — pops in with spring after text */
export const heroCta: Variants = {
    hidden: { opacity: 0, scale: 0.85 },
    show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 250, damping: 18, delay: 0.4 } },
};

/** Stat counter card — slides up with stagger-friendly timing */
export const statCard: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.92 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};
