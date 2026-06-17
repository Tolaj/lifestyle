// pages/index.js
/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useState } from "react";
import useInstallPrompt from '../utils/useInstallPrompt';
import { useRouter } from "next/router";
import IndexNavbar from "components/Navbars/IndexNavbar.js"
import IndexFooter from "components/Footers/indexFooter.js";

export default function Index() {
	const { installApp, isIos, isInStandaloneMode } = useInstallPrompt();
	const [dialog, setDialog] = useState(false);
	const [browserName, setBrowserName] = useState('');
	const router = useRouter();

	useEffect(() => {
		const ua = navigator.userAgent;
		if (/CriOS/.test(ua)) setBrowserName("Chrome");
		else if (/FxiOS/.test(ua)) setBrowserName("Firefox");
		else if (/Safari/.test(ua)) setBrowserName("Safari");
		else if (/EdgiOS/.test(ua)) setBrowserName("Edge");
		else setBrowserName("Unknown");
	}, []);

	useEffect(() => {
		if (isInStandaloneMode) router.push('/auth/login');
	}, [isInStandaloneMode]);

	const installAppOnDevice = () => {
		if (isIos) {
			setDialog(true);
		} else {
			try { installApp(); } finally {
				alert("App successfully installed on your device, please check");
			}
			router.push('/auth/login');
		}
	};

	return (
		<>
			<style>{`
				* { margin: 0; padding: 0; box-sizing: border-box; }
				body {
					background: #fff;
					color: #111;
					font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif;
				}

				/* ── Hero ── */
				.lf-hero {
					padding: 120px 56px 96px;
					text-align: center;
					border-bottom: 1px solid #efefef;
				}
				.lf-badge {
					display: inline-flex;
					align-items: center;
					gap: 8px;
					font-size: 13px;
					color: #555;
					border: 1px solid #e5e5e5;
					padding: 6px 16px;
					border-radius: 100px;
					margin-bottom: 36px;
					background: #fafafa;
				}
				.lf-badge-dot {
					width: 7px;
					height: 7px;
					background: #22c55e;
					border-radius: 50%;
					display: inline-block;
				}
				.lf-hero h1 {
					font-size: 72px;
					font-weight: 700;
					line-height: 1.02;
					letter-spacing: -3px;
					color: #111;
					margin-bottom: 24px;
					max-width: 800px;
					margin-left: auto;
					margin-right: auto;
				}
				.lf-hero h1 span { color: #c8c8c8; }
				.lf-hero-sub {
					font-size: 19px;
					color: #777;
					line-height: 1.65;
					max-width: 480px;
					margin: 0 auto 44px;
				}
				.lf-hero-btns {
					display: flex;
					gap: 14px;
					justify-content: center;
					margin-bottom: 72px;
					flex-wrap: wrap;
				}
				.lf-btn-hero-dark {
					font-size: 15px;
					padding: 14px 32px;
					border-radius: 10px;
					cursor: pointer;
					font-weight: 600;
					background: #111;
					color: #fff;
					border: none;
				}
				.lf-btn-hero-dark:hover { background: #333; }
				.lf-btn-hero-light {
					font-size: 15px;
					padding: 14px 28px;
					border-radius: 10px;
					cursor: pointer;
					font-weight: 500;
					background: #fff;
					color: #555;
					border: 1px solid #e0e0e0;
				}
				.lf-btn-hero-light:hover { background: #f5f5f5; }

				/* ── App Preview ── */
				.lf-preview {
					background: #f6f6f6;
					border: 1px solid #e8e8e8;
					border-radius: 20px;
					padding: 28px;
					max-width: 680px;
					margin: 0 auto;
					text-align: left;
				}
				.lf-preview-bar { display: flex; gap: 7px; margin-bottom: 20px; }
				.lf-dot { width: 11px; height: 11px; border-radius: 50%; }
				.lf-preview-grid {
					display: grid;
					grid-template-columns: repeat(3, 1fr);
					gap: 12px;
					margin-bottom: 12px;
				}
				.lf-pc {
					background: #fff;
					border: 1px solid #e8e8e8;
					border-radius: 12px;
					padding: 18px;
				}
				.lf-pc-label { font-size: 12px; color: #aaa; margin-bottom: 8px; }
				.lf-pc-val { font-size: 26px; font-weight: 700; color: #111; letter-spacing: -0.8px; }
				.lf-pc-sub { font-size: 12px; color: #bbb; margin-top: 4px; }
				.lf-preview-list { display: flex; flex-direction: column; gap: 8px; }
				.lf-pr {
					background: #fff;
					border: 1px solid #e8e8e8;
					border-radius: 12px;
					padding: 14px 18px;
					display: flex;
					justify-content: space-between;
					align-items: center;
				}
				.lf-pr-left { display: flex; align-items: center; gap: 12px; }
				.lf-pr-icon {
					width: 36px;
					height: 36px;
					border-radius: 9px;
					background: #f3f3f3;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 16px;
					flex-shrink: 0;
				}
				.lf-pr-name { font-size: 14px; font-weight: 500; color: #111; }
				.lf-pr-meta { font-size: 12px; color: #bbb; margin-top: 1px; }
				.lf-pr-amt { font-size: 14px; font-weight: 600; color: #111; white-space: nowrap; }

				/* ── Features ── */
				.lf-features {
					padding: 96px 56px;
					border-bottom: 1px solid #efefef;
				}
				.lf-sec-label {
					font-size: 12px;
					color: #bbb;
					letter-spacing: 1.5px;
					text-transform: uppercase;
					margin-bottom: 56px;
				}
				.lf-features-grid {
					display: grid;
					grid-template-columns: repeat(3, 1fr);
					gap: 1px;
					background: #ececec;
					border: 1px solid #ececec;
					border-radius: 16px;
					overflow: hidden;
				}
				.lf-feat { background: #fff; padding: 40px 36px; }
				.lf-feat-num {
					font-size: 12px;
					color: #ccc;
					font-weight: 600;
					margin-bottom: 20px;
					letter-spacing: 1.5px;
				}
				.lf-feat h3 {
					font-size: 18px;
					font-weight: 600;
					color: #111;
					margin-bottom: 10px;
					letter-spacing: -0.3px;
				}
				.lf-feat p { font-size: 14px; color: #999; line-height: 1.65; }

				/* ── Social Proof ── */
				.lf-social {
					padding: 96px 56px;
					border-bottom: 1px solid #efefef;
					display: grid;
					grid-template-columns: 1fr 1fr;
					gap: 96px;
					align-items: center;
				}
				.lf-social-text h2 {
					font-size: 44px;
					font-weight: 700;
					letter-spacing: -1.5px;
					line-height: 1.1;
					color: #111;
					margin-bottom: 20px;
				}
				.lf-social-text h2 span { color: #ccc; }
				.lf-social-text p { font-size: 15px; color: #888; line-height: 1.75; }
				.lf-social-cards { display: flex; flex-direction: column; gap: 10px; }
				.lf-sc {
					border: 1px solid #ebebeb;
					border-radius: 14px;
					padding: 18px 20px;
					display: flex;
					align-items: center;
					gap: 14px;
				}
				.lf-av {
					width: 38px;
					height: 38px;
					border-radius: 50%;
					background: #f0f0f0;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 13px;
					font-weight: 600;
					color: #888;
					flex-shrink: 0;
				}
				.lf-sc-name { font-size: 14px; font-weight: 500; color: #111; }
				.lf-sc-action { font-size: 13px; color: #aaa; margin-top: 1px; }
				.lf-pill {
					margin-left: auto;
					font-size: 12px;
					padding: 4px 12px;
					border-radius: 100px;
					font-weight: 500;
					white-space: nowrap;
					flex-shrink: 0;
				}
				.lf-pill-g { background: #f0fdf4; color: #16a34a; }
				.lf-pill-n { background: #f5f5f5; color: #999; }

				/* ── CTA ── */
				.lf-cta { padding: 96px 56px; text-align: center; }
				.lf-cta h2 {
					font-size: 52px;
					font-weight: 700;
					letter-spacing: -2px;
					color: #111;
					margin-bottom: 14px;
				}
				.lf-cta p { font-size: 16px; color: #888; margin-bottom: 40px; }

				/* ════════════════════════════
				   MOBILE RESPONSIVE STYLES
				   ════════════════════════════ */

				@media (max-width: 768px) {

					/* Hero */
					.lf-hero {
						padding: 64px 20px 60px;
					}
					.lf-hero h1 {
						font-size: 40px;
						letter-spacing: -1.5px;
					}
					.lf-hero-sub {
						font-size: 16px;
					}
					.lf-hero-btns {
						gap: 10px;
						margin-bottom: 48px;
					}
					.lf-btn-hero-dark,
					.lf-btn-hero-light {
						font-size: 14px;
						padding: 13px 22px;
						width: 100%;
						max-width: 280px;
					}

					/* App Preview */
					.lf-preview {
						padding: 20px;
						border-radius: 16px;
					}
					.lf-preview-grid {
						grid-template-columns: 1fr 1fr;
						gap: 8px;
					}
					.lf-preview-grid .lf-pc:last-child {
						grid-column: span 2;
					}
					.lf-pc {
						padding: 14px;
					}
					.lf-pc-val {
						font-size: 20px;
					}
					.lf-pr {
						padding: 12px 14px;
					}
					.lf-pr-name {
						font-size: 13px;
					}

					/* Features */
					.lf-features {
						padding: 60px 20px;
					}
					.lf-features-grid {
						grid-template-columns: 1fr;
						border-radius: 14px;
					}
					.lf-feat {
						padding: 28px 24px;
					}

					/* Social proof */
					.lf-social {
						padding: 60px 20px;
						grid-template-columns: 1fr;
						gap: 40px;
					}
					.lf-social-text h2 {
						font-size: 32px;
						letter-spacing: -1px;
					}
					.lf-sc {
						padding: 14px 16px;
					}

					/* CTA */
					.lf-cta {
						padding: 60px 20px;
					}
					.lf-cta h2 {
						font-size: 36px;
						letter-spacing: -1.2px;
					}
					.lf-cta p {
						font-size: 15px;
					}
				}

				@media (max-width: 400px) {
					.lf-hero h1 {
						font-size: 34px;
						letter-spacing: -1px;
					}
					.lf-preview-grid {
						grid-template-columns: 1fr;
					}
					.lf-preview-grid .lf-pc:last-child {
						grid-column: span 1;
					}
				}
			`}</style>

			{/* iOS Install Dialog */}
			{dialog && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[200]">
					<div className="bg-white rounded-xl p-6 w-80 md:w-96 shadow-lg relative">
						<button
							onClick={() => setDialog(false)}
							className="absolute top-3 right-4 text-gray-400 hover:text-gray-600 focus:outline-none text-lg"
						>✕</button>
						<h2 className="text-base font-semibold mb-3 text-center text-gray-900">Install App</h2>
						<p className="text-sm text-gray-500 leading-relaxed">
							Tap the Share icon{" "}
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 inline-block bg-black text-white rounded p-[2px]">
								<path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
							</svg>{" "}
							then select <span className="font-semibold text-gray-900">'Add to Home Screen'</span> to install.
						</p>
						<div className="flex items-center justify-between mt-4">
							<div className="flex flex-col gap-1">
								{browserName === "Safari" ? (
									<span className="relative">
										<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-3 absolute text-black bottom-[4.7%] left-[45.5%] animate-ping">
											<path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
										</svg>
										<img src="/assets/images/install_safari.png" className="w-32" alt="Safari install step 1" />
									</span>
								) : (
									<span className="relative">
										<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-2 absolute text-black top-[6.7%] left-[88.3%] animate-ping">
											<path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
										</svg>
										<img src="/assets/images/install_chrome.png" className="w-32" alt="Chrome install step 1" />
									</span>
								)}
								<span className="text-xs text-white font-medium bg-black w-fit px-2 py-[3px] rounded-md">Step 1</span>
							</div>
							<div className="flex flex-col gap-1">
								<span className="relative">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-[6px] absolute text-black top-[67.6%] border-[0.2px] rounded-[1px] border-black left-[86.9%] animate-ping">
										<path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
									</svg>
									<img src="/assets/images/install_share.png" className="w-32" alt="Install step 2" />
								</span>
								<span className="text-xs text-white font-medium bg-black w-fit px-2 py-[3px] rounded-md">Step 2</span>
							</div>
						</div>
					</div>
				</div>
			)}

			<div style={{ background: '#fff', minHeight: '100vh' }}>

				{/* Navbar */}
				<IndexNavbar onInstall={installAppOnDevice} isInStandaloneMode={isInStandaloneMode} />

				{/* Hero */}
				<section className="lf-hero">
					<div className="lf-badge">
						<span className="lf-badge-dot"></span>
						Free forever · No ads
					</div>
					<h1>Your finances,<br /><span>finally organized.</span></h1>
					<p className="lf-hero-sub">Track groceries, split expenses, and manage budgets with your household — beautifully simple.</p>
					<div className="lf-hero-btns">
						<button className="lf-btn-hero-dark" onClick={() => router.push('/auth/login')}>Get started free</button>
						<button
							className="lf-btn-hero-light"
							onClick={installAppOnDevice}
							style={isInStandaloneMode ? { display: 'none' } : {}}
						>Install app ↓</button>
					</div>

					{/* App Preview */}
					<div className="lf-preview">
						<div className="lf-preview-bar">
							<div className="lf-dot" style={{ background: '#ff5f57' }}></div>
							<div className="lf-dot" style={{ background: '#ffbd2e' }}></div>
							<div className="lf-dot" style={{ background: '#28c840' }}></div>
						</div>
						<div className="lf-preview-grid">
							{[
								{ label: "This month", val: "$842", sub: "↓ 12% vs last month" },
								{ label: "Cart items", val: "14", sub: "3 groups active" },
								{ label: "You're owed", val: "$34.50", sub: "from 2 people" },
							].map(card => (
								<div key={card.label} className="lf-pc">
									<div className="lf-pc-label">{card.label}</div>
									<div className="lf-pc-val">{card.val}</div>
									<div className="lf-pc-sub">{card.sub}</div>
								</div>
							))}
						</div>
						<div className="lf-preview-list">
							{[
								{ icon: "🥛", name: "Whole milk · 2L", meta: "Walmart · split 3 ways", amount: "$4.20" },
								{ icon: "🥦", name: "Broccoli · 500g", meta: "Costco · just you", amount: "$2.80" },
								{ icon: "🍞", name: "Sourdough bread", meta: "Trader Joe's · split 2 ways", amount: "$5.99" },
							].map(row => (
								<div key={row.name} className="lf-pr">
									<div className="lf-pr-left">
										<div className="lf-pr-icon">{row.icon}</div>
										<div>
											<div className="lf-pr-name">{row.name}</div>
											<div className="lf-pr-meta">{row.meta}</div>
										</div>
									</div>
									<div className="lf-pr-amt">{row.amount}</div>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Features */}
				<section className="lf-features">
					<div className="lf-sec-label">What's inside</div>
					<div className="lf-features-grid">
						{[
							{ num: "01", title: "Smart cart", desc: "Build lists, track prices per item, and check out as a group in one seamless flow." },
							{ num: "02", title: "Group splitting", desc: "Even or custom splits. Decide who pays for what before you hit the checkout." },
							{ num: "03", title: "Wish lists", desc: "Save recurring orders as templates. Reuse last week's grocery run in one tap." },
							{ num: "04", title: "Inventory", desc: "Know what you have at home. Auto-updates every time you place an order." },
							{ num: "05", title: "Finance view", desc: "Monthly spend per category, per person, per group — at a glance." },
							{ num: "06", title: "Works offline", desc: "Install on iOS or Android. No app store. Works even without internet." },
						].map(f => (
							<div key={f.num} className="lf-feat">
								<div className="lf-feat-num">{f.num}</div>
								<h3>{f.title}</h3>
								<p>{f.desc}</p>
							</div>
						))}
					</div>
				</section>

				{/* Social proof */}
				<section className="lf-social">
					<div className="lf-social-text">
						<h2>Built for people<br /><span>who share space.</span></h2>
						<p>Invite friends, roommates, or family to a group. Each group has its own products, orders, and budget — completely isolated from everyone else's.</p>
					</div>
					<div className="lf-social-cards">
						{[
							{ initials: "SW", name: "Swapnil added an order", action: "Weekly groceries · $112.40", pill: "Split ✓", pillClass: "lf-pill-g" },
							{ initials: "KJ", name: "Rahul joined the group", action: "Home · 3 members now", pill: "New", pillClass: "lf-pill-n" },
							{ initials: "AM", name: "Arjun paid for Costco run", action: "$88.20 · you owe $29.40", pill: "Tracked", pillClass: "lf-pill-g" },
							{ initials: "RV", name: "Reorder from wish list", action: "Walmart weekly · 12 items", pill: "Pending", pillClass: "lf-pill-n" },
						].map(card => (
							<div key={card.initials} className="lf-sc">
								<div className="lf-av">{card.initials}</div>
								<div>
									<div className="lf-sc-name">{card.name}</div>
									<div className="lf-sc-action">{card.action}</div>
								</div>
								<span className={`lf-pill ${card.pillClass}`}>{card.pill}</span>
							</div>
						))}
					</div>
				</section>

				{/* CTA */}
				<section className="lf-cta">
					<h2>Start in 30 seconds.</h2>
					<p>No credit card. No subscription. Just sign up and invite your people.</p>
					<button
						className="lf-btn-hero-dark"
						style={{ fontSize: '16px', padding: '16px 40px' }}
						onClick={() => router.push('/auth/login')}
					>Create your account</button>
				</section>

				{/* Footer */}
				<IndexFooter />

			</div>
		</>
	);
}
