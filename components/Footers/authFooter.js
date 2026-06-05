// components/Footers/authFooter.js
import React from "react";

export default function AuthFooter() {
    return (
        <>
            <style>{`
        .af-footer {
          padding: 16px 36px;
          border-top: 1px solid #efefef;
          text-align: center;
        }
        .af-footer span {
          font-size: 12px;
          color: #ccc;
          font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif;
        }

        @media (max-width: 768px) {
          .af-footer {
            padding: 14px 20px;
          }
        }
      `}</style>

            <footer className="af-footer">
                <span>© 2026 Lifestyle · Made by Swapnil</span>
            </footer>
        </>
    );
}