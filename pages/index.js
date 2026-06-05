// pages/index.js
/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useState } from "react";
import useInstallPrompt from '../utils/useInstallPrompt';
import { useRouter } from "next/router";

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

			<div className="bg-white min-h-screen text-gray-900" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif" }}>

				{/* Nav */}
				<nav className="flex justify-between items-center px-12 h-16 border-b border-gray-100">
					<div className="text-[15px] font-semibold tracking-tight">Lifestyle</div>
					<div className="hidden md:flex gap-7">
						{["Features", "Groups", "Docs"].map(item => (
							<a key={item} className="text-[13px] text-gray-500 hover:text-gray-900 cursor-pointer no-underline transition-colors">{item}</a>
						))}
					</div>
					<div className="flex gap-2 items-center">
						<button
							onClick={() => router.push('/auth/login')}
							className="text-[13px] px-4 py-[7px] rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 font-medium cursor-pointer transition-colors"
						>Sign in</button>
						<button
							onClick={installAppOnDevice}
							className="text-[13px] px-4 py-[7px] rounded-lg bg-gray-900 text-white hover:bg-gray-700 font-medium cursor-pointer border-none transition-colors"
						>Install app</button>
					</div>
				</nav>

				{/* Hero */}
				<section className="px-12 pt-24 pb-20 text-center border-b border-gray-100">
					{/* Badge */}
					<div className="inline-flex items-center gap-[6px] text-[12px] text-gray-500 border border-gray-200 px-3 py-1 rounded-full mb-7 bg-gray-50">
						<span className="w-[6px] h-[6px] bg-green-500 rounded-full inline-block"></span>
						Free forever · No ads · Open
					</div>

					<h1 className="text-[60px] font-bold leading-[1.05] tracking-[-2px] text-gray-900 mb-5 max-w-2xl mx-auto">
						Your finances,<br />
						<span className="text-gray-300">finally organized.</span>
					</h1>
					<p className="text-[17px] text-gray-500 leading-relaxed max-w-md mx-auto mb-9">
						Track groceries, split bills, and manage budgets with your household — all in one minimal app.
					</p>

					<div className="flex gap-3 justify-center mb-14">
						<button
							onClick={() => router.push('/auth/login')}
							className="text-[14px] px-6 py-[11px] rounded-lg bg-gray-900 text-white hover:bg-gray-700 font-semibold border-none cursor-pointer transition-colors"
						>Get started free</button>
						<button
							onClick={installAppOnDevice}
							className={`text-[14px] px-6 py-[11px] rounded-lg bg-white text-gray-600 hover:bg-gray-50 font-medium border border-gray-200 cursor-pointer transition-colors ${isInStandaloneMode ? 'hidden' : ''}`}
						>Install app ↓</button>
					</div>

					{/* App Preview */}
					<div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 max-w-xl mx-auto text-left">
						{/* Window dots */}
						<div className="flex gap-[6px] mb-4">
							<div className="w-[10px] h-[10px] rounded-full bg-[#ff5f57]"></div>
							<div className="w-[10px] h-[10px] rounded-full bg-[#ffbd2e]"></div>
							<div className="w-[10px] h-[10px] rounded-full bg-[#28c840]"></div>
						</div>
						{/* Stat cards */}
						<div className="grid grid-cols-3 gap-[10px] mb-[10px]">
							{[
								{ label: "This month", val: "$842", sub: "↓ 12% vs last" },
								{ label: "Cart items", val: "14", sub: "3 groups active" },
								{ label: "You're owed", val: "$34.50", sub: "from 2 people" },
							].map(card => (
								<div key={card.label} className="bg-white border border-gray-200 rounded-lg p-[14px]">
									<div className="text-[11px] text-gray-400 mb-[6px]">{card.label}</div>
									<div className="text-[20px] font-semibold text-gray-900 tracking-tight">{card.val}</div>
									<div className="text-[11px] text-gray-300 mt-[2px]">{card.sub}</div>
								</div>
							))}
						</div>
						{/* Item rows */}
						<div className="flex flex-col gap-2">
							{[
								{ icon: "🥛", name: "Whole milk · 2L", meta: "Walmart · split 3 ways", amount: "$4.20" },
								{ icon: "🥦", name: "Broccoli · 500g", meta: "Costco · just you", amount: "$2.80" },
								{ icon: "🍞", name: "Sourdough bread", meta: "Trader Joe's · split 2 ways", amount: "$5.99" },
							].map(row => (
								<div key={row.name} className="bg-white border border-gray-200 rounded-lg px-[14px] py-[10px] flex justify-between items-center">
									<div className="flex items-center gap-[10px]">
										<div className="w-7 h-7 rounded-md bg-gray-50 flex items-center justify-center text-[13px]">{row.icon}</div>
										<div>
											<div className="text-[13px] font-medium text-gray-900">{row.name}</div>
											<div className="text-[11px] text-gray-400">{row.meta}</div>
										</div>
									</div>
									<div className="text-[13px] font-semibold text-gray-900">{row.amount}</div>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Features */}
				<section className="px-12 py-20 border-b border-gray-100">
					<div className="text-[11px] text-gray-400 tracking-widest uppercase mb-12">What's inside</div>
					<div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100 border border-gray-100 rounded-xl overflow-hidden">
						{[
							{ num: "01", title: "Smart cart", desc: "Build lists, track prices per item, and check out as a group in one seamless flow." },
							{ num: "02", title: "Group splitting", desc: "Even or custom splits. Decide who pays for what before you even hit the checkout." },
							{ num: "03", title: "Wish lists", desc: "Save recurring orders as templates. Reuse last week's grocery run in one tap." },
							{ num: "04", title: "Inventory tracking", desc: "Know what you have at home. Auto-updates every time you place an order." },
							{ num: "05", title: "Finance view", desc: "See monthly spend per category, per person, per group — at a glance." },
							{ num: "06", title: "Installs like an app", desc: "Add to home screen on iOS or Android. Works offline. No app store needed." },
						].map(f => (
							<div key={f.num} className="bg-white p-8">
								<div className="text-[11px] text-gray-300 font-medium mb-4 tracking-widest">{f.num}</div>
								<h3 className="text-[15px] font-semibold text-gray-900 mb-2">{f.title}</h3>
								<p className="text-[13px] text-gray-500 leading-relaxed">{f.desc}</p>
							</div>
						))}
					</div>
				</section>

				{/* Social proof */}
				<section className="px-12 py-20 border-b border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
					<div>
						<h2 className="text-[36px] font-bold tracking-tight leading-[1.15] text-gray-900 mb-4">
							Built for people<br />
							<span className="text-gray-300">who share space.</span>
						</h2>
						<p className="text-[14px] text-gray-500 leading-[1.7]">
							Invite friends, roommates, or family to a group. Each group has its own products, orders, and budget — completely isolated from everyone else's.
						</p>
					</div>
					<div className="flex flex-col gap-2">
						{[
							{ initials: "SW", name: "Ben added an order", action: "Weekly groceries · $112.40", pill: "Split ✓", pillClass: "bg-green-50 text-green-700" },
							{ initials: "KJ", name: "Max joined the group", action: "Home · 3 members now", pill: "New", pillClass: "bg-gray-100 text-gray-500" },
							{ initials: "AM", name: "Gwen paid for Costco run", action: "$88.20 · you owe $29.40", pill: "Tracked", pillClass: "bg-green-50 text-green-700" },
							{ initials: "RV", name: "Reorder from wish list", action: "Walmart weekly · 12 items", pill: "Pending", pillClass: "bg-gray-100 text-gray-500" },
						].map(card => (
							<div key={card.initials} className="border border-gray-200 rounded-xl px-4 py-[14px] flex items-center gap-3">
								<div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[12px] font-semibold text-gray-500 shrink-0">{card.initials}</div>
								<div className="flex-1 min-w-0">
									<div className="text-[13px] font-medium text-gray-900 truncate">{card.name}</div>
									<div className="text-[12px] text-gray-400">{card.action}</div>
								</div>
								<span className={`text-[11px] px-[10px] py-[3px] rounded-full font-medium shrink-0 ${card.pillClass}`}>{card.pill}</span>
							</div>
						))}
					</div>
				</section>

				{/* CTA */}
				<section className="px-12 py-20 text-center">
					<h2 className="text-[40px] font-bold tracking-[-1.5px] text-gray-900 mb-3">Start in 30 seconds.</h2>
					<p className="text-[15px] text-gray-500 mb-8">No credit card. No subscription. Just sign up and invite your people.</p>
					<button
						onClick={() => router.push('/auth/login')}
						className="text-[15px] px-8 py-[13px] rounded-lg bg-gray-900 text-white hover:bg-gray-700 font-semibold border-none cursor-pointer transition-colors"
					>Create your account</button>
				</section>

				{/* Footer */}
				<footer className="px-12 py-6 border-t border-gray-100 flex justify-between items-center">
					<a href="https://swapniljadhav.com" className="text-[12px] text-gray-400">© 2026 Lifestyle · Made by Swapnil</a>
					<div className="flex gap-5">
						{[
							{ label: "Privacy", href: "#" },
							{ label: "Terms", href: "#" },
							{ label: "Instagram", href: "https://www.instagram.com/lastlords/" },
							{ label: "swapniljadhav.com", href: "#" },
						].map(link => (
							<a key={link.label} href={link.href} className="text-[12px] text-gray-400 hover:text-gray-700 no-underline cursor-pointer transition-colors">{link.label}</a>
						))}
					</div>
				</footer>

			</div>
		</>
	);
}