// pages/auth/register.js
import React from "react";
import { useRouter } from 'next/router';
import Auth from "layouts/Auth.js";
import FetchAPI from "controllers/fetchAPI";
import PageChange from "components/PreLoader";
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import AuthFooter from "components/Footers/authFooter.js";

export default function Register() {
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
      const result = await FetchAPI('/api/users', 'POST', tempData);
      setPreLoader(false);
      router.push('/auth/login');
    } catch (error) {
      console.log('_____Create Account Failed!_____');
      setPreLoader(false);
      console.log(error);
    }
  };

  if (preLoader) return <PageChange />;

  return (
    <>
      <style>{`
        .rg-outer {
          width: 100%;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 96px 16px 24px;
          font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif;
        }
        .rg-wrap {
          background: #fff;
          width: 100%;
          max-width: 460px;
          display: flex;
          flex-direction: column;
          border-radius: 16px;
          overflow: hidden;
        }
        .rg-body {
          padding: 40px 36px 32px;
        }
        .rg-body h1 {
          font-size: 26px;
          font-weight: 700;
          letter-spacing: -0.8px;
          color: #111;
          margin-bottom: 6px;
        }
        .rg-sub {
          font-size: 14px;
          color: #888;
          margin-bottom: 28px;
        }
        .rg-label {
          font-size: 11px;
          font-weight: 600;
          color: #aaa;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          margin-bottom: 6px;
          display: block;
        }
        .rg-input {
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
        .rg-input::placeholder { color: #ccc; }
        .rg-input:focus { border-color: #bbb; background: #fff; }
        .rg-btn {
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
          margin-top: 10px;
          transition: background 0.15s;
        }
        .rg-btn:hover { background: #333; }
        .rg-terms {
          margin-top: 16px;
          text-align: center;
          font-size: 12px;
          color: #bbb;
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .rg-outer {
            padding-top: 80px;
          }
          .rg-body {
            padding: 32px 24px 24px;
          }
          .rg-body h1 {
            font-size: 22px;
          }
        }
      `}</style>

      <AuthNavbar />

      <div className="rg-outer">
        <div className="rg-wrap">

          <div className="rg-body">
            <h1>Create an account.</h1>
            <p className="rg-sub">Join Lifestyle and start organizing your finances.</p>

            <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
              <label className="rg-label" htmlFor="name">Name</label>
              <input
                className="rg-input"
                type="text"
                placeholder="Your name"
                id="name"
                name="name"
                onChange={handleChange}
                required
              />

              <label className="rg-label" htmlFor="email">Email</label>
              <input
                className="rg-input"
                type="email"
                placeholder="you@example.com"
                id="email"
                name="email"
                onChange={handleChange}
                required
              />

              <label className="rg-label" htmlFor="password">Password</label>
              <input
                className="rg-input"
                type="password"
                placeholder="••••••••"
                id="password"
                name="password"
                onChange={handleChange}
                required
              />

              <button type="submit" className="rg-btn">Create account</button>
            </form>

            <p className="rg-terms">
              By signing up you agree to our{" "}
              <a href="#" style={{ color: '#aaa', textDecoration: 'none' }}>Terms</a>
              {" "}and{" "}
              <a href="#" style={{ color: '#aaa', textDecoration: 'none' }}>Privacy Policy</a>.
            </p>
          </div>

          <AuthFooter />

        </div>
      </div>
    </>
  );
}

Register.layout = Auth;