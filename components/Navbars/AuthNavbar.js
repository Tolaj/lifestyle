// components/authNavbar.js
import React from "react";
import { useRouter } from "next/router";

export default function AuthNavbar() {
  const router = useRouter();
  const isLogin = router.route === "/auth/login";

  return (
    <>
      <style>{`
        .an-nav {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 30;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 56px;
          height: 72px;
          border-bottom: 1px solid #efefef;
          background: #fff;
        }
        .an-logo {
          font-size: 20px;
          font-weight: 700;
          letter-spacing: -0.5px;
          color: #111;
          cursor: pointer;
        }
        .an-btn {
          font-size: 14px;
          padding: 9px 20px;
          border-radius: 9px;
          cursor: pointer;
          font-weight: 500;
          border: 1px solid #e5e5e5;
          background: #fff;
          color: #444;
          font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif;
          transition: background 0.15s, color 0.15s;
        }
        .an-btn:hover {
          background: #111;
          color: #fff;
          border-color: #111;
        }

        @media (max-width: 768px) {
          .an-nav {
            padding: 0 20px;
            height: 60px;
          }
          .an-btn {
            font-size: 13px;
            padding: 8px 14px;
          }
        }
      `}</style>

      <nav className="an-nav">
        <div className="an-logo flex items-center" onClick={() => router.push('/')}>
          <img src="/assets/images/logo.png" className="px-2  w-20     rounded-full " alt="" />

          Lifestyle
        </div>
        <button
          className="an-btn"
          onClick={() => router.push(isLogin ? '/auth/register' : '/auth/login')}
        >
          {isLogin ? 'Sign up' : 'Sign in'}
        </button>
      </nav>
    </>
  );
}