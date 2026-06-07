// pages/auth/template.js
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Auth from 'layouts/Auth.js';
import FetchAPI from 'controllers/fetchAPI';
import PageChange from 'components/PreLoader';
import AuthNavbar from 'components/Navbars/AuthNavbar.js';
import AuthFooter from 'components/Footers/authFooter.js';

export default function TemplatePicker() {
    const router = useRouter();
    const [templates, setTemplates] = useState([]);
    const [selected, setSelected] = useState(null);
    const [loading, setLoading] = useState(true);
    const [applying, setApplying] = useState(false);

    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                const data = await FetchAPI(process.env.SERVER_API + '/api/templates', 'GET');
                setTemplates(data.filter(t => t.isSystem));
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        fetchTemplates();
    }, []);

    const handleApply = async () => {
        if (!selected) return;
        setApplying(true);
        try {
            const session = await FetchAPI(process.env.SERVER_API + '/api/session', 'GET');
            const groupId = session?.user?.groupId;

            if (selected.name === 'Blank / Custom') {
                router.push('/admin/dashboard');
                return;
            }

            const result = await FetchAPI(process.env.SERVER_API + '/api/applyTemplate', 'POST', {
                templateId: selected._id,
                groupId,
            });

            if (result.message === 'Template applied successfully') {
                router.push('/admin/dashboard');
            } else {
                alert('Failed to apply template');
            }
        } catch (e) {
            console.error(e);
            alert('Something went wrong');
        } finally {
            setApplying(false);
        }
    };

    if (applying) return <PageChange />;

    return (
        <>
            <style>{`
        .tp-outer {
          width: 100%;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 96px 20px 40px;
          font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif;
          background: #fff;
        }
        .tp-heading {
          font-size: 28px;
          font-weight: 700;
          letter-spacing: -0.8px;
          color: #111;
          margin-bottom: 8px;
          text-align: center;
        }
        .tp-sub {
          font-size: 15px;
          color: #888;
          margin-bottom: 40px;
          text-align: center;
        }
        .tp-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
          width: 100%;
          max-width: 680px;
          margin-bottom: 36px;
        }
        .tp-card {
          border: 1.5px solid #e5e5e5;
          border-radius: 14px;
          padding: 24px 16px;
          cursor: pointer;
          text-align: center;
          transition: border-color 0.15s, box-shadow 0.15s;
          background: #fff;
        }
        .tp-card:hover { border-color: #bbb; }
        .tp-card.selected {
          border-color: #111;
          box-shadow: 0 0 0 2px #111;
        }
        .tp-card-emoji { font-size: 32px; margin-bottom: 10px; }
        .tp-card-name { font-size: 13px; font-weight: 600; color: #111; margin-bottom: 4px; }
        .tp-card-desc { font-size: 11px; color: #aaa; line-height: 1.5; }
        .tp-btn {
          font-size: 15px;
          font-weight: 600;
          padding: 14px 48px;
          border-radius: 10px;
          background: #111;
          color: #fff;
          border: none;
          cursor: pointer;
          transition: background 0.15s;
        }
        .tp-btn:hover { background: #333; }
        .tp-btn:disabled { opacity: 0.3; cursor: not-allowed; }
        .tp-skip {
          margin-top: 16px;
          font-size: 13px;
          color: #aaa;
          cursor: pointer;
          text-decoration: none;
        }
        .tp-skip:hover { color: #111; }

        @media (max-width: 600px) {
  .tp-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    max-width: 100%;
  }
  .tp-heading { font-size: 22px; }
  .tp-card {
    padding: 18px 12px;
  }
  .tp-card-emoji { font-size: 26px; margin-bottom: 6px; }
  .tp-card-name { font-size: 12px; }
  .tp-card-desc { font-size: 10px; }
  .tp-btn {
    width: 100%;
    max-width: 320px;
    padding: 13px 24px;
  }
}
      `}</style>

            <AuthNavbar />

            <div className="tp-outer">
                <h1 className="tp-heading">Choose a starting template.</h1>
                <p className="tp-sub">We'll set up your categories and products. You can change this anytime.</p>

                {loading ? (
                    <p style={{ color: '#aaa' }}>Loading templates...</p>
                ) : (
                    <div className="tp-grid">
                        {templates.map(template => (
                            <div
                                key={template._id}
                                className={`tp-card ${selected?._id === template._id ? 'selected' : ''}`}
                                onClick={() => setSelected(template)}
                            >
                                <div className="tp-card-emoji">{template.emoji}</div>
                                <div className="tp-card-name">{template.name}</div>
                                <div className="tp-card-desc">{template.description}</div>
                            </div>
                        ))}
                    </div>
                )}

                <button className="tp-btn" onClick={handleApply} disabled={!selected}>
                    Get started
                </button>
                <a className="tp-skip" onClick={() => router.push('/admin/dashboard')}>
                    Skip for now
                </a>
            </div>

            <AuthFooter />
        </>
    );
}

TemplatePicker.layout = Auth;