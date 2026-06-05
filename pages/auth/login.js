// pages/auth/login.js
import React from "react";
import { useRouter } from 'next/router';
import Auth from "layouts/Auth.js";
import FetchAPI from "controllers/fetchAPI";
import PageChange from "components/PreLoader";
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import AuthFooter from "components/Footers/authFooter.js";

export default function Login() {
  const router = useRouter();
  const [preLoader, setPreLoader] = React.useState(false);
  const [tempData, setTempData] = React.useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempData((prevState) => ({ ...prevState, [name]: value }));
    const file = e.target.files ? e.target.files[0] : null;
    if (file) setTempData((prevState) => ({ ...prevState, file }));
  };

  const handleSave = async () => {
    setPreLoader(true);
    try {
      const result = await FetchAPI('/api/login', 'POST', tempData);
      if (result.message === 'Login successful') {
        router.push('/admin/dashboard');
      } else {
        alert(result.message || 'Login failed');
      }
      setPreLoader(false);
    } catch (error) {
      console.log('_____login Account Failed!_____');
      setPreLoader(false);
      console.log(error);
    }
  };

  if (preLoader) return <PageChange />;

  return (
    <>
      <style>{`
        .lg-outer {
          width: 100%;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 96px 16px 24px; /* top padding accounts for absolute navbar height */
          font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif;
        }
        .lg-wrap {
          background: #fff;
          width: 100%;
          max-width: 460px;
          display: flex;
          flex-direction: column;
          border-radius: 16px;
          overflow: hidden;
        }
        .lg-body {
          padding: 40px 36px 32px;
        }
        .lg-body h1 {
          font-size: 26px;
          font-weight: 700;
          letter-spacing: -0.8px;
          color: #111;
          margin-bottom: 6px;
        }
        .lg-sub {
          font-size: 14px;
          color: #888;
          margin-bottom: 28px;
        }
        .lg-label {
          font-size: 11px;
          font-weight: 600;
          color: #aaa;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          margin-bottom: 6px;
          display: block;
        }
        .lg-input {
          width: 100%;
          font-size: 15px;
          color: #111;
          background: #fafafa;
          border: 1px solid #e5e5e5;
          border-radius: 10px;
          padding: 13px 16px;
          outline: none;
          font-family: inherit;
          margin-bottom: 14px;
          transition: border-color 0.15s, background 0.15s;
        }
        .lg-input::placeholder { color: #ccc; }
        .lg-input:focus { border-color: #bbb; background: #fff; }
        .lg-remember {
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 4px 0 24px;
          cursor: pointer;
        }
        .lg-remember input { width: 15px; height: 15px; accent-color: #111; cursor: pointer; }
        .lg-remember span { font-size: 13px; color: #888; }
        .lg-btn {
          width: 100%;
          font-size: 15px;
          font-weight: 600;
          padding: 13px;
          border-radius: 10px;
          background: #111;
          color: #fff;
          border: none;
          cursor: pointer;
          font-family: inherit;
          transition: background 0.15s;
        }
        .lg-btn:hover { background: #333; }
        .lg-forgot {
          margin-top: 18px;
          text-align: center;
        }
        .lg-forgot a {
          font-size: 13px;
          color: #aaa;
          text-decoration: none;
          transition: color 0.15s;
        }
        .lg-forgot a:hover { color: #111; }

        @media (max-width: 768px) {
          .lg-outer {
            padding-top: 80px;
          }
          .lg-body {
            padding: 32px 24px 24px;
          }
          .lg-body h1 {
            font-size: 22px;
          }
        }
      `}</style>

      {/* Absolute navbar sits above the centered card */}
      <AuthNavbar />

      <div className="lg-outer">
        <div className="lg-wrap">

          <div className="lg-body">
            <h1>Welcome back.</h1>
            <p className="lg-sub">Sign in to your account to continue.</p>

            <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
              <label className="lg-label" htmlFor="email">Email</label>
              <input
                className="lg-input"
                type="email"
                placeholder="you@example.com"
                id="email"
                name="email"
                onChange={handleChange}
                required
              />

              <label className="lg-label" htmlFor="password">Password</label>
              <input
                className="lg-input"
                type="password"
                placeholder="••••••••"
                id="password"
                name="password"
                onChange={handleChange}
                required
              />

              <label className="lg-remember">
                <input type="checkbox" id="customCheckLogin" />
                <span>Remember me</span>
              </label>

              <button type="submit" className="lg-btn">Sign in</button>
            </form>

            <div className="lg-forgot">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  alert("For security reasons we did not automate this process, to reset password please contact swapnilhgf@gmail.com");
                }}
              >
                Forgot password?
              </a>
            </div>
          </div>

          <AuthFooter />

        </div>
      </div>
    </>
  );
}

Login.layout = Auth;