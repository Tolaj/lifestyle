// components/Footers/indexFooter.js
import React from "react";

export default function IndexFooter() {
    return (
        <>
            <style>{`
				.lf-footer {
					padding: 28px 56px;
					border-top: 1px solid #efefef;
					display: flex;
					justify-content: space-between;
					align-items: center;
				}
				.lf-footer-l {
					font-size: 13px;
					color: #ccc;
				}
				.lf-footer-links {
					display: flex;
					gap: 24px;
				}
				.lf-footer-links a {
					font-size: 13px;
					color: #ccc;
					text-decoration: none;
					cursor: pointer;
				}
				.lf-footer-links a:hover { color: #777; }

				@media (max-width: 768px) {
					.lf-footer {
						padding: 24px 20px;
						flex-direction: column;
						gap: 16px;
						text-align: center;
					}
					.lf-footer-links {
						gap: 16px;
						flex-wrap: wrap;
						justify-content: center;
					}
				}
			`}</style>

            <footer className="lf-footer">
                <div className="lf-footer-l">© 2026 Lifestyle · Made by Swapnil</div>
                <div className="lf-footer-links">
                    {[
                        { label: "Privacy", href: "#" },
                        { label: "Terms", href: "#" },
                        { label: "Instagram", href: "https://www.instagram.com/lastlords/" },
                        { label: "swapniljadhav.com", href: "https://swapniljadhav.com" },
                    ].map(link => (
                        /* eslint-disable react/jsx-no-target-blank */
                        <a key={link.label} href={link.href}>{link.label}</a>
                    ))}
                </div>
            </footer>
        </>
    );
}