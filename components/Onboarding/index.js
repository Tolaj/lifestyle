// components/Onboarding/index.js
import React, { useState, useEffect } from "react";

const steps = [
    {
        id: 0,
        tag: "Welcome",
        icon: "✦",
        title: "Welcome to Lifestyle",
        subtitle: "Better than Splitwise.",
        desc: "Track expenses, split bills, manage groceries, and stay on top of your finances — all with the people you actually live with. Let's take a quick tour.",
        accent: "#4ade80",
        route: null,
    },
    {
        id: 1,
        tag: "01 — Groups",
        icon: "⬡",
        title: "Create or join a group",
        subtitle: "Your shared space.",
        desc: "A group is the core of Lifestyle. Create one for your household, flatmates, or friends. Everything — carts, expenses, inventory — lives inside a group.",
        accent: "#60a5fa",
        route: "/admin/profile",
        routeLabel: "Go to Profile → Groups",
    },
    {
        id: 2,
        tag: "02 — Cart",
        icon: "⬤",
        title: "Build a shared cart",
        subtitle: "Shop together, pay fairly.",
        desc: "Add items to a shared cart with your group. Assign who needs what, track quantities, and check out together. No more 'who bought what' confusion.",
        accent: "#f59e0b",
        route: "/admin/products",
        routeLabel: "Go to Products → Cart",
    },
    {
        id: 3,
        tag: "03 — Products & Categories",
        icon: "▣",
        title: "Organise your products",
        subtitle: "Find anything instantly.",
        desc: "Add products and sort them into categories — groceries, household, personal care. Your group shares the same product list so everyone stays in sync.",
        accent: "#a78bfa",
        route: "/admin/products",
        routeLabel: "Go to Products",
    },
    {
        id: 4,
        tag: "04 — Wish List",
        icon: "◈",
        title: "Save items for later",
        subtitle: "Never forget what you need.",
        desc: "Add products to your wish list and move them to the cart when you're ready. Great for recurring items you buy every week.",
        accent: "#f472b6",
        route: "/admin/products",
        routeLabel: "Go to Products → Wish List",
    },
    {
        id: 5,
        tag: "05 — Inventory",
        icon: "◧",
        title: "Track what you have",
        subtitle: "No more double buying.",
        desc: "Mark items as in-stock and track quantities at home. Lifestyle auto-suggests what to reorder based on what's running low.",
        accent: "#34d399",
        route: "/admin/products",
        routeLabel: "Go to Products → Inventory",
    },
    {
        id: 6,
        tag: "06 — Finance & Splitting",
        icon: "◎",
        title: "Split expenses fairly",
        subtitle: "Who owes who — always clear.",
        desc: "Log any shared expense and split it evenly or by custom amounts. See your monthly spend broken down by category, group, and person.",
        accent: "#fb923c",
        route: "/admin/finance",
        routeLabel: "Go to Finance",
    },
    {
        id: 7,
        tag: "07 — Profile & Friends",
        icon: "◉",
        title: "Connect with friends",
        subtitle: "Your people, your network.",
        desc: "Add friends, manage your profile, and invite people into your groups. Everything is tied to your account — switch between groups seamlessly.",
        accent: "#e879f9",
        route: "/admin/profile",
        routeLabel: "Go to Profile",
    },
];

export default function Onboarding({ onFinish }) {
    const [current, setCurrent] = useState(0);
    const [animating, setAnimating] = useState(false);
    const [direction, setDirection] = useState(1); // 1 = forward, -1 = back
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Slight delay so it fades in after mount
        const t = setTimeout(() => setVisible(true), 30);
        return () => clearTimeout(t);
    }, []);

    const goTo = (idx) => {
        if (animating || idx === current) return;
        setDirection(idx > current ? 1 : -1);
        setAnimating(true);
        setTimeout(() => {
            setCurrent(idx);
            setAnimating(false);
        }, 280);
    };

    const next = () => {
        if (current < steps.length - 1) goTo(current + 1);
    };

    const prev = () => {
        if (current > 0) goTo(current - 1);
    };

    const finish = () => {
        setVisible(false);
        setTimeout(onFinish, 400);
    };

    const step = steps[current];
    const isLast = current === steps.length - 1;
    const isFirst = current === 0;

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .ob-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(5, 5, 5, 0.88);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          transition: opacity 0.4s ease;
          padding: 16px;
        }

        .ob-overlay.hidden { opacity: 0; pointer-events: none; }
        .ob-overlay.shown  { opacity: 1; }

        .ob-shell {
          width: 100%;
          max-width: 780px;
          background: #0e0e0e;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 24px;
          overflow: hidden;
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 480px;
          position: relative;
        }

        /* Left panel */
        .ob-left {
          padding: 44px 40px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border-right: 1px solid rgba(255,255,255,0.06);
          position: relative;
          overflow: hidden;
        }

        .ob-left-bg {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 20% 80%, var(--accent-20) 0%, transparent 60%);
          pointer-events: none;
          transition: background 0.5s ease;
        }

        .ob-tag {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          color: rgba(255,255,255,0.3);
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 28px;
        }

        .ob-icon {
          font-size: 48px;
          color: var(--accent);
          line-height: 1;
          margin-bottom: 20px;
          transition: color 0.4s ease;
          font-family: monospace;
        }

        .ob-title {
          font-family: 'Syne', sans-serif;
          font-size: 32px;
          font-weight: 800;
          color: #f0ede8;
          line-height: 1.05;
          letter-spacing: -1px;
          margin-bottom: 8px;
        }

        .ob-subtitle {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          color: var(--accent);
          font-weight: 500;
          margin-bottom: 18px;
          transition: color 0.4s ease;
          letter-spacing: 0.2px;
        }

        .ob-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: rgba(240,237,232,0.45);
          line-height: 1.75;
          font-weight: 300;
          flex-grow: 1;
        }

        /* Right panel */
        .ob-right {
          padding: 44px 40px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        /* Steps list */
        .ob-steps-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
          flex-grow: 1;
        }

        .ob-step-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 14px;
          border-radius: 10px;
          cursor: pointer;
          transition: background 0.2s;
          border: 1px solid transparent;
        }

        .ob-step-item:hover {
          background: rgba(255,255,255,0.04);
        }

        .ob-step-item.active {
          background: rgba(255,255,255,0.06);
          border-color: rgba(255,255,255,0.08);
        }

        .ob-step-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: rgba(255,255,255,0.15);
          flex-shrink: 0;
          transition: background 0.3s, transform 0.3s;
        }

        .ob-step-item.active .ob-step-dot,
        .ob-step-item.done .ob-step-dot {
          background: var(--accent);
          transform: scale(1.2);
        }

        .ob-step-item.done .ob-step-dot {
          background: rgba(255,255,255,0.3);
          transform: scale(1);
        }

        .ob-step-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          color: rgba(255,255,255,0.25);
          transition: color 0.2s;
          font-weight: 400;
        }

        .ob-step-item.active .ob-step-label {
          color: #f0ede8;
          font-weight: 500;
        }

        .ob-step-item.done .ob-step-label {
          color: rgba(255,255,255,0.35);
          text-decoration: line-through;
          text-decoration-color: rgba(255,255,255,0.15);
        }

        /* Bottom controls */
        .ob-controls {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 28px;
          padding-top: 20px;
          border-top: 1px solid rgba(255,255,255,0.06);
        }

        .ob-btn {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          padding: 9px 20px;
          border-radius: 100px;
          cursor: pointer;
          transition: all 0.2s;
          border: none;
          outline: none;
        }

        .ob-btn-ghost {
          background: transparent;
          color: rgba(255,255,255,0.3);
          border: 1px solid rgba(255,255,255,0.1);
        }

        .ob-btn-ghost:hover {
          color: rgba(255,255,255,0.7);
          border-color: rgba(255,255,255,0.2);
        }

        .ob-btn-ghost:disabled {
          opacity: 0.2;
          cursor: not-allowed;
        }

        .ob-btn-primary {
          background: var(--accent);
          color: #0a0a0a;
          font-weight: 600;
          padding: 9px 24px;
        }

        .ob-btn-primary:hover { opacity: 0.85; }

        .ob-btn-finish {
          background: #f0ede8;
          color: #0a0a0a;
          font-weight: 600;
          padding: 9px 28px;
        }

        .ob-btn-finish:hover { background: #d4d0cb; }

        .ob-progress {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          color: rgba(255,255,255,0.2);
          letter-spacing: 1px;
        }

        /* Content animation */
        .ob-content {
          transition: opacity 0.28s ease, transform 0.28s ease;
        }

        .ob-content.exit {
          opacity: 0;
          transform: translateY(10px);
        }

        .ob-content.enter {
          opacity: 1;
          transform: translateY(0);
        }

        .ob-skip {
          position: absolute;
          top: 20px;
          right: 24px;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          color: rgba(255,255,255,0.2);
          cursor: pointer;
          background: none;
          border: none;
          transition: color 0.2s;
          padding: 4px 8px;
        }

        .ob-skip:hover { color: rgba(255,255,255,0.5); }

        @media (max-width: 600px) {
          .ob-shell {
            grid-template-columns: 1fr;
            min-height: unset;
            max-height: 90vh;
            overflow-y: auto;
          }
          .ob-left {
            border-right: none;
            border-bottom: 1px solid rgba(255,255,255,0.06);
            padding: 32px 24px;
          }
          .ob-right { padding: 28px 24px; }
          .ob-title { font-size: 26px; }
        }
      `}</style>

            <div
                className={`ob-overlay ${visible ? "shown" : "hidden"}`}
                style={{ "--accent": step.accent, "--accent-20": step.accent + "22" }}
            >
                <div className="ob-shell">
                    <button className="ob-skip" onClick={finish}>Skip tour</button>

                    {/* Left panel */}
                    <div className="ob-left">
                        <div className="ob-left-bg" />
                        <div className={`ob-content ${animating ? "exit" : "enter"}`}>
                            <div className="ob-tag">{step.tag}</div>
                            <div className="ob-icon">{step.icon}</div>
                            <div className="ob-title">{step.title}</div>
                            <div className="ob-subtitle">{step.subtitle}</div>
                            <div className="ob-desc">{step.desc}</div>
                        </div>
                    </div>

                    {/* Right panel */}
                    <div className="ob-right">
                        <div className="ob-steps-list">
                            {steps.map((s, i) => (
                                <div
                                    key={s.id}
                                    className={`ob-step-item ${i === current ? "active" : ""} ${i < current ? "done" : ""}`}
                                    onClick={() => goTo(i)}
                                >
                                    <div className="ob-step-dot" />
                                    <span className="ob-step-label">{s.title}</span>
                                </div>
                            ))}
                        </div>

                        <div className="ob-controls">
                            <button
                                className="ob-btn ob-btn-ghost"
                                onClick={prev}
                                disabled={isFirst}
                            >← Back</button>

                            <span className="ob-progress">{current + 1} / {steps.length}</span>

                            {isLast ? (
                                <button className="ob-btn ob-btn-finish" onClick={finish}>
                                    Let's go →
                                </button>
                            ) : (
                                <button className="ob-btn ob-btn-primary" onClick={next}>
                                    Next →
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}