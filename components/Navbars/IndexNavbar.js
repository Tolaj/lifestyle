// components/Navbars/indexNavbar.js
import React from "react";
import { useRouter } from "next/router";

export default function IndexNavbar({ onInstall, isInStandaloneMode }) {
	const router = useRouter();

	return (
		<>
			<style>{`
				.lf-nav {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 0 56px;
					height: 72px;
					border-bottom: 1px solid #efefef;
				}
				.lf-logo {
          font-size: 20px;
          font-weight: 700;
          letter-spacing: -0.5px;
          color: #111;
          cursor: pointer;
        }
				.lf-nav-center {
					display: flex;
					gap: 32px;
				}
				.lf-nav-center a {
					font-size: 14px;
					color: #888;
					text-decoration: none;
					cursor: pointer;
				}
				.lf-nav-center a:hover { color: #111; }
				.lf-nav-right {
					display: flex;
					gap: 10px;
					align-items: center;
				}
				.lf-btn-sm {
					font-size: 14px;
					padding: 9px 20px;
					border-radius: 9px;
					cursor: pointer;
					font-weight: 500;
					border: 1px solid #e5e5e5;
					background: #fff;
					color: #444;
				}
				.lf-btn-sm:hover { background: #f5f5f5; }
				.lf-btn-sm-dark {
					background: #111;
					color: #fff;
					border-color: #111;
				}
				.lf-btn-sm-dark:hover { background: #333; }

				/* Mobile nav */
				@media (max-width: 768px) {
					.lf-nav {
						padding: 0 20px;
						height: 60px;
					}
					.lf-nav-center {
						display: none;
					}
					.lf-btn-sm {
						font-size: 13px;
						padding: 8px 14px;
					}
				}

				
			`}</style>

			<nav className="lf-nav">
				<div className="lf-logo  flex items-center" onClick={() => router.push('/')}>
					<img src="/assets/images/logo.png" className="px-2  w-20     rounded-full " alt="" />

					Lifestyle
				</div>
				{/* <div className="lf-logo">Lifestyle</div> */}
				{/* <div className="lf-nav-center">
					{["Features", "Groups", "Docs"].map(item => (
						<a key={item}>{item}</a>
					))}
				</div> */}
				<div className="lf-nav-right">
					<button className="lf-btn-sm" onClick={() => router.push('/auth/login')}>Sign in</button>
					<button className="lf-btn-sm lf-btn-sm-dark" onClick={onInstall}>Get started</button>
				</div>
			</nav>
		</>
	);
}