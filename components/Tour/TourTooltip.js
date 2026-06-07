// components/Tour/TourTooltip.js
// Drop-in replacement for the old Onboarding modal.
// Renders a spotlight overlay + anchored tooltip popover that walks the user
// through real UI elements step-by-step, just like Shepherd.js / Intro.js.
//
// USAGE in layouts/Admin.js:
//   import TourTooltip from "components/Tour/TourTooltip";
//   ...
//   {showTour && <TourTooltip onFinish={handleTourFinish} router={router} />}
//
// Each step has a `selector` (CSS selector) that must exist in the DOM at the
// time that step is shown. If the element is not found, the popover centres on
// screen (graceful fallback).
//
// Steps that require a page navigation carry a `route` prop; the tour waits for
// the route to settle (via a short delay) before highlighting the target element.

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/router";

// ─── Step definitions ────────────────────────────────────────────────────────
// `selector`  : CSS selector for the element to highlight
// `placement` : preferred popover side — 'top' | 'bottom' | 'left' | 'right'
// `route`     : if set, navigate here before showing this step
// `padding`   : extra spotlight padding around the target (default 8)


const STEPS = [
    {
        id: 0,
        title: "Welcome to Lifestyle 👋",
        body: "Let's take a 60-second tour so you know exactly where everything lives.",
        selector: null,
        placement: "center",
        route: "/admin/products",
    },
    {
        id: 1,
        title: "Sidebar navigation",
        body: "Move between Products, Finance, and Profile from here.",
        selector: ".sidebar, nav, aside",
        placement: "right",
    },
    {
        id: 2,
        title: "Products list",
        body: "Your group's shared product list. Everyone sees the same items.",
        selector: "[data-tour='products-list-tab']",
        placement: "bottom",
    },
    {
        id: 3,
        title: "Add a product",
        body: "Hit ADD to create a new product. Give it a name, category, and price — shared across your group.",
        selector: "[data-tour='add-btn']",
        placement: "bottom",
    },
    {
        id: 4,
        title: "Fill in the product details",
        body: "Name it, pick a category, set a price. Hit save and it appears for everyone in your group instantly.",
        selector: "[data-tour='modal-products']",
        placement: "left",
        triggerModal: "/admin/products",
    },
    {
        id: 5,
        title: "Shared cart",
        body: "Open the live group cart. Add items and track who needs what.",
        selector: "[data-tour='cart-btn']",
        placement: "bottom",
        closeModal: true,
    },
    {
        id: 6,
        title: "Place order in cart",
        body: "Give order a name, select date needed, choose who pays and place the order or add it to your wish list.",
        selector: "[data-tour='modal-cart']",
        placement: "left",
        triggerModal: "/admin/cart",
        closeModal: true,
    },
    {
        id: 7,
        title: "Wish List",
        body: "Save items for later. Move them to the cart when you're ready.",
        selector: "[data-tour='wish-list-tab']",
        placement: "bottom",
    },
    {
        id: 8,
        title: "Inventory tracker",
        body: "Track stock levels at home. Get reorder suggestions automatically.",
        selector: "[data-tour='inventory-tab']",
        placement: "bottom",
    },
    {
        id: 9,
        title: "Finance & splitting",
        body: "Log expenses and split them with your group. Always know who owes who.",
        selector: "[data-tour='finance-link']",
        placement: "right",
        // route: "/admin/finance",
    },
    {
        id: 10,
        title: "Profile & groups",
        body: "Add friends, manage your profile, and create groups.",
        selector: "[data-tour='profile-link']",
        placement: "right",
        // route: "/admin/profile",
    },
    {
        id: 11,
        title: "Switch group",
        body: "The GROUP button shows your active group and lets you switch between groups.",
        selector: "[data-tour='group-btn']",
        placement: "bottom",
    },
    {
        id: 12,
        title: "You're all set 🎉",
        body: "That's the full tour! Start by adding your first product.",
        selector: null,
        placement: "center",
    },
];

// ─── Utility: get element bounding rect relative to viewport ─────────────────
function getRect(selector) {
    if (!selector) return null;
    // Try multiple selectors separated by comma
    const selectors = selector.split(",").map((s) => s.trim());
    for (const sel of selectors) {
        try {
            const el = document.querySelector(sel);
            if (el) {
                const r = el.getBoundingClientRect();
                if (r.width > 0 && r.height > 0) return r;
            }
        } catch (_) { }
    }
    return null;
}

// ─── Compute popover position from target rect + placement ───────────────────
const POPOVER_W = 300;
const POPOVER_H = 180; // approx, real height varies
const GAP = 14;

function computePopoverPos(rect, placement, winW, winH) {
    if (!rect || placement === "center") {
        return {
            left: Math.max(16, winW / 2 - POPOVER_W / 2),
            top: Math.max(16, winH / 2 - POPOVER_H / 2),
            arrow: null,
        };
    }

    const center_x = rect.left + rect.width / 2;
    const center_y = rect.top + rect.height / 2;

    const positions = {
        bottom: {
            left: Math.min(Math.max(16, center_x - POPOVER_W / 2), winW - POPOVER_W - 16),
            top: rect.bottom + GAP,
            arrow: "top",
        },
        top: {
            left: Math.min(Math.max(16, center_x - POPOVER_W / 2), winW - POPOVER_W - 16),
            top: rect.top - POPOVER_H - GAP,
            arrow: "bottom",
        },
        right: {
            left: rect.right + GAP,
            top: Math.min(Math.max(16, center_y - POPOVER_H / 2), winH - POPOVER_H - 16),
            arrow: "left",
        },
        left: {
            left: rect.left - POPOVER_W - GAP,
            top: Math.min(Math.max(16, center_y - POPOVER_H / 2), winH - POPOVER_H - 16),
            arrow: "right",
        },
    };

    const pos = positions[placement] || positions.bottom;

    // Flip if off-screen
    if (placement === "bottom" && pos.top + POPOVER_H > winH - 16) {
        return { ...positions.top };
    }
    if (placement === "top" && pos.top < 16) {
        return { ...positions.bottom };
    }
    if (placement === "right" && pos.left + POPOVER_W > winW - 16) {
        return { ...positions.left };
    }
    if (placement === "left" && pos.left < 16) {
        return { ...positions.right };
    }

    return pos;
}

// ─── SVG spotlight mask ───────────────────────────────────────────────────────
function SpotlightOverlay({ targetRect, padding = 8 }) {
    const [dims, setDims] = useState({ w: window.innerWidth, h: window.innerHeight });

    useEffect(() => {
        const onResize = () => setDims({ w: window.innerWidth, h: window.innerHeight });
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    const { w, h } = dims;

    if (!targetRect) {
        // Solid dark overlay — no cutout
        return (
            <div
                style={{
                    position: "fixed",
                    inset: 0,
                    background: "rgba(10,10,10,0.72)",
                    zIndex: 9000,
                    pointerEvents: "none",
                }}
            />
        );
    }

    const rx = Math.max(0, targetRect.left - padding);
    const ry = Math.max(0, targetRect.top - padding);
    const rw = targetRect.width + padding * 2;
    const rh = targetRect.height + padding * 2;
    const cornerR = 8;

    // SVG mask: full dark rect minus a rounded cutout
    const cutout = `M ${rx + cornerR} ${ry}
    L ${rx + rw - cornerR} ${ry}
    Q ${rx + rw} ${ry} ${rx + rw} ${ry + cornerR}
    L ${rx + rw} ${ry + rh - cornerR}
    Q ${rx + rw} ${ry + rh} ${rx + rw - cornerR} ${ry + rh}
    L ${rx + cornerR} ${ry + rh}
    Q ${rx} ${ry + rh} ${rx} ${ry + rh - cornerR}
    L ${rx} ${ry + cornerR}
    Q ${rx} ${ry} ${rx + cornerR} ${ry}
    Z`;

    return (
        <svg
            style={{ position: "fixed", inset: 0, zIndex: 9000, pointerEvents: "none" }}
            width={w}
            height={h}
            viewBox={`0 0 ${w} ${h}`}
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <mask id="tour-mask">
                    <rect width={w} height={h} fill="white" />
                    <path d={cutout} fill="black" />
                </mask>
            </defs>
            <rect
                width={w}
                height={h}
                fill="rgba(10,10,10,0.72)"
                mask="url(#tour-mask)"
            />
            {/* Highlight ring around target */}
            <path
                d={cutout}
                fill="none"
                stroke="rgba(255,255,255,0.25)"
                strokeWidth="1.5"
            />
        </svg>
    );
}

// ─── Popover ──────────────────────────────────────────────────────────────────
function TourPopover({
    step,
    total,
    current,
    pos,
    isFirst,
    isLast,
    onNext,
    onPrev,
    onClose,
    transitioning,
}) {
    const arrowStyle = (side) => {
        const base = {
            position: "absolute",
            width: 0,
            height: 0,
            pointerEvents: "none",
        };
        const size = 7;
        if (side === "top")
            return {
                ...base,
                top: -size,
                left: "50%",
                transform: "translateX(-50%)",
                borderLeft: `${size}px solid transparent`,
                borderRight: `${size}px solid transparent`,
                borderBottom: `${size}px solid #1a1a1a`,
            };
        if (side === "bottom")
            return {
                ...base,
                bottom: -size,
                left: "50%",
                transform: "translateX(-50%)",
                borderLeft: `${size}px solid transparent`,
                borderRight: `${size}px solid transparent`,
                borderTop: `${size}px solid #1a1a1a`,
            };
        if (side === "left")
            return {
                ...base,
                left: -size,
                top: "50%",
                transform: "translateY(-50%)",
                borderTop: `${size}px solid transparent`,
                borderBottom: `${size}px solid transparent`,
                borderRight: `${size}px solid #1a1a1a`,
            };
        if (side === "right")
            return {
                ...base,
                right: -size,
                top: "50%",
                transform: "translateY(-50%)",
                borderTop: `${size}px solid transparent`,
                borderBottom: `${size}px solid transparent`,
                borderLeft: `${size}px solid #1a1a1a`,
            };
        return {};
    };

    return (
        <div
            style={{
                position: "fixed",
                left: pos.left,
                top: pos.top,
                width: POPOVER_W,
                zIndex: 9001,
                background: "#1a1a1a",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 14,
                padding: "20px 20px 16px",
                boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
                opacity: transitioning ? 0 : 1,
                transform: transitioning ? "translateY(8px) scale(0.97)" : "translateY(0) scale(1)",
                transition: "opacity 0.22s ease, transform 0.22s ease",
                fontFamily:
                    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', sans-serif",
            }}
        >
            {pos.arrow && <div style={arrowStyle(pos.arrow)} />}

            {/* Progress dots */}
            <div style={{ display: "flex", gap: 5, marginBottom: 14 }}>
                {Array.from({ length: total }).map((_, i) => (
                    <div
                        key={i}
                        style={{
                            width: i === current ? 16 : 6,
                            height: 6,
                            borderRadius: 3,
                            background:
                                i === current
                                    ? "#60a5fa"
                                    : i < current
                                        ? "rgba(255,255,255,0.35)"
                                        : "rgba(255,255,255,0.12)",
                            transition: "width 0.25s ease, background 0.25s ease",
                        }}
                    />
                ))}
            </div>

            {/* Step label */}
            <p
                style={{
                    margin: "0 0 4px",
                    fontSize: 10,
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    color: "#60a5fa",
                    fontWeight: 600,
                }}
            >
                Step {current + 1} of {total}
            </p>

            {/* Title */}
            <p
                style={{
                    margin: "0 0 8px",
                    fontSize: 15,
                    fontWeight: 700,
                    color: "#f0ede8",
                    lineHeight: 1.25,
                    letterSpacing: "-0.3px",
                }}
            >
                {step.title}
            </p>

            {/* Body */}
            <p
                style={{
                    margin: "0 0 18px",
                    fontSize: 13,
                    color: "rgba(240,237,232,0.55)",
                    lineHeight: 1.65,
                    fontWeight: 400,
                }}
            >
                {step.body}
            </p>

            {/* Controls */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: "1px solid rgba(255,255,255,0.07)",
                    paddingTop: 12,
                }}
            >
                <button
                    onClick={onClose}
                    style={{
                        background: "none",
                        border: "none",
                        color: "rgba(255,255,255,0.25)",
                        fontSize: 12,
                        cursor: "pointer",
                        padding: "4px 0",
                        fontFamily: "inherit",
                        transition: "color 0.15s",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "rgba(255,255,255,0.5)")}
                    onMouseLeave={(e) =>
                        (e.target.style.color = "rgba(255,255,255,0.25)")
                    }
                >
                    Skip tour
                </button>

                <div style={{ display: "flex", gap: 8 }}>
                    {!isFirst && (
                        <button
                            onClick={onPrev}
                            style={{
                                background: "rgba(255,255,255,0.06)",
                                border: "1px solid rgba(255,255,255,0.1)",
                                borderRadius: 100,
                                color: "rgba(255,255,255,0.55)",
                                fontSize: 12,
                                fontWeight: 600,
                                padding: "6px 14px",
                                cursor: "pointer",
                                fontFamily: "inherit",
                                transition: "all 0.15s",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                                e.currentTarget.style.color = "rgba(255,255,255,0.85)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                                e.currentTarget.style.color = "rgba(255,255,255,0.55)";
                            }}
                        >
                            ← Back
                        </button>
                    )}
                    <button
                        onClick={onNext}
                        style={{
                            background: isLast ? "#f0ede8" : "#3b82f6",
                            border: "none",
                            borderRadius: 100,
                            color: isLast ? "#111" : "#fff",
                            fontSize: 12,
                            fontWeight: 700,
                            padding: "6px 16px",
                            cursor: "pointer",
                            fontFamily: "inherit",
                            transition: "opacity 0.15s",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                    >
                        {isLast ? "Let's go 🎉" : "Next →"}
                    </button>
                </div>
            </div>
        </div>
    );
}

// ─── Main TourTooltip component ───────────────────────────────────────────────
export default function TourTooltip({ onFinish }) {
    const router = useRouter();
    const [current, setCurrent] = useState(0);
    const [targetRect, setTargetRect] = useState(null);
    const [popoverPos, setPopoverPos] = useState({ left: 0, top: 0, arrow: null });
    const [transitioning, setTransitioning] = useState(false);
    const [navigating, setNavigating] = useState(false);
    const rafRef = useRef(null);

    const step = STEPS[current];
    const total = STEPS.length;
    const isFirst = current === 0;
    const isLast = current === total - 1;

    // Measure target element + position popover
    const measure = useCallback(() => {
        const rect = step.selector ? getRect(step.selector) : null;
        setTargetRect(rect);

        const winW = window.innerWidth;
        const winH = window.innerHeight;
        const pos = computePopoverPos(rect, step.placement, winW, winH);
        setPopoverPos(pos);

        // Scroll element into view if needed
        if (rect) {
            const selectors = step.selector.split(",").map((s) => s.trim());
            for (const sel of selectors) {
                try {
                    const el = document.querySelector(sel);
                    if (el) {
                        el.scrollIntoView({ block: "nearest", behavior: "smooth" });
                        break;
                    }
                } catch (_) { }
            }
        }
    }, [step]);

    // Re-measure on step change, resize, scroll
    useEffect(() => {
        // Wait a tick for DOM to settle (especially after navigation)
        const delay = navigating ? 600 : 80;
        const t = setTimeout(() => {
            measure();
            setNavigating(false);
        }, delay);

        const onResize = () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            rafRef.current = requestAnimationFrame(measure);
        };

        window.addEventListener("resize", onResize);
        window.addEventListener("scroll", onResize, true);

        return () => {
            clearTimeout(t);
            window.removeEventListener("resize", onResize);
            window.removeEventListener("scroll", onResize, true);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [current, measure, navigating]);

    const goTo = useCallback(
        async (idx) => {
            if (idx < 0 || idx >= total) return;

            const currentStep = STEPS[current];
            const targetStep = STEPS[idx];

            setTransitioning(true);
            await new Promise((r) => setTimeout(r, 200));

            // Close modal if moving away from modal step
            if (currentStep.triggerModal && !targetStep.triggerModal) {
                // find setModalToggle via a custom event
                window.dispatchEvent(new CustomEvent('tour:closeModal'));
            }

            // Navigate if needed
            if (targetStep.route && router.pathname !== targetStep.route) {
                setNavigating(true);
                router.push(targetStep.route);
            }

            // Open modal if this step requires it
            if (targetStep.triggerModal) {
                window.dispatchEvent(
                    new CustomEvent('tour:openModal', { detail: targetStep.triggerModal })
                );
                await new Promise((r) => setTimeout(r, 400)); // wait for modal to render
            }

            setCurrent(idx);
            setTransitioning(false);
        },
        [router, total, current]
    );

    const next = useCallback(() => {
        if (isLast) {
            onFinish();
        } else {
            goTo(current + 1);
        }
    }, [isLast, current, goTo, onFinish]);

    const prev = useCallback(() => {
        if (!isFirst) goTo(current - 1);
    }, [isFirst, current, goTo]);

    // Block click-through on the highlighted element itself (we control nav)
    useEffect(() => {
        const handleClick = (e) => {
            // Allow clicks inside the popover
            const popover = document.getElementById("tour-popover-root");
            if (popover && popover.contains(e.target)) return;
            e.stopPropagation();
            e.preventDefault();
        };

        // Intercept clicks on the overlay
        document.addEventListener("click", handleClick, true);
        return () => document.removeEventListener("click", handleClick, true);
    }, []);

    return (
        <>
            <SpotlightOverlay targetRect={targetRect} padding={step.padding ?? 8} />

            <div id="tour-popover-root">
                <TourPopover
                    step={step}
                    total={total}
                    current={current}
                    pos={popoverPos}
                    isFirst={isFirst}
                    isLast={isLast}
                    onNext={next}
                    onPrev={prev}
                    onClose={onFinish}
                    transitioning={transitioning}
                />
            </div>
        </>
    );
}