// components/TabBody/profileTabBody/templateTab.js
import React, { useEffect, useState } from 'react';
import FetchAPI from 'controllers/fetchAPI';
import PageChange from 'components/PreLoader';

export default function TemplateTab({ _as }) {
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [applying, setApplying] = useState(false);
    const [conflict, setConflict] = useState(null);
    const [selected, setSelected] = useState(null);
    const [showCreate, setShowCreate] = useState(false);
    const [newTemplate, setNewTemplate] = useState({ name: '', emoji: '📦', description: '' });

    const groupId = typeof window !== 'undefined' ? localStorage.getItem('projectLifestyle_activeGroup') : '';

    useEffect(() => {
        fetchTemplates();
    }, []);

    const fetchTemplates = async () => {
        setLoading(true);
        try {
            const data = await FetchAPI(process.env.SERVER_API + '/api/templates', 'GET');
            setTemplates(data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const handleApply = async (template) => {
        if (template.name === 'Blank / Custom') {
            alert('Blank template clears everything — use with caution. Delete categories/products manually.');
            return;
        }
        setApplying(true);
        setConflict(null);
        try {
            const result = await FetchAPI(process.env.SERVER_API + '/api/applyTemplate', 'POST', {
                templateId: template._id,
                groupId,
            });
            if (result.message === 'Template applied successfully') {
                _as.setToast('Template applied!');
                _as.setReloadChild(Math.random());
            } else if (result.message === 'conflict') {
                setConflict(result.conflicts);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setApplying(false);
        }
    };

    const handleSaveCustom = async () => {
        if (!newTemplate.name) return alert('Give your template a name');
        setApplying(true);
        try {
            // Fetch current group's categories and products to save as template
            const group = _as.user.groups.find(g => g._id === groupId);
            const categories = await FetchAPI(process.env.SERVER_API + '/api/categories?groupId=' + groupId, 'GET');
            const products = await FetchAPI(process.env.SERVER_API + '/api/products?groupId=' + groupId, 'GET');

            const templateCategories = (categories || []).map(c => ({
                name: c.name, icon: c.icon, color: c.color
            }));
            const templateProducts = (products || []).map(p => ({
                name: p.name,
                category: p.category?.name || '',
                price: p.price,
                unit: p.unit,
                description: p.description,
            }));

            await FetchAPI(process.env.SERVER_API + '/api/templates', 'POST', {
                ...newTemplate,
                categories: templateCategories,
                products: templateProducts,
            });

            _as.setToast('Template saved!');
            setShowCreate(false);
            setNewTemplate({ name: '', emoji: '📦', description: '' });
            fetchTemplates();
        } catch (e) {
            console.error(e);
        } finally {
            setApplying(false);
        }
    };

    const handleDelete = async (templateId) => {
        if (!confirm('Delete this template?')) return;
        try {
            await FetchAPI(process.env.SERVER_API + '/api/templates?id=' + templateId, 'DELETE');
            fetchTemplates();
        } catch (e) {
            console.error(e);
        }
    };

    if (applying) return <PageChange />;

    const systemTemplates = templates.filter(t => t.isSystem);
    const customTemplates = templates.filter(t => !t.isSystem);

    return (
        <>
            <style>{`
        .tt-wrap { padding: 24px; max-width: 800px; font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif; }
        .tt-section-label { font-size: 11px; font-weight: 600; color: #aaa; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 16px; }
        .tt-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 32px; }
        .tt-card { border: 1.5px solid #e5e5e5; border-radius: 12px; padding: 20px 14px; text-align: center; background: #fff; }
        .tt-card-emoji { font-size: 28px; margin-bottom: 8px; }
        .tt-card-name { font-size: 13px; font-weight: 600; color: #111; margin-bottom: 4px; }
        .tt-card-desc { font-size: 11px; color: #aaa; line-height: 1.5; margin-bottom: 14px; }
        .tt-apply-btn { font-size: 12px; font-weight: 600; padding: 7px 16px; border-radius: 8px; background: #111; color: #fff; border: none; cursor: pointer; }
        .tt-apply-btn:hover { background: #333; }
        .tt-delete-btn { font-size: 12px; color: #aaa; border: none; background: none; cursor: pointer; margin-top: 6px; }
        .tt-delete-btn:hover { color: #e00; }
        .tt-conflict { background: #fff3f3; border: 1px solid #fca5a5; border-radius: 10px; padding: 16px; margin-bottom: 24px; }
        .tt-conflict-title { font-size: 13px; font-weight: 600; color: #b91c1c; margin-bottom: 8px; }
        .tt-conflict-list { font-size: 12px; color: #7f1d1d; }
        .tt-create-btn { font-size: 13px; font-weight: 600; padding: 10px 20px; border-radius: 9px; background: #fff; color: #111; border: 1.5px solid #e5e5e5; cursor: pointer; margin-bottom: 20px; }
        .tt-create-btn:hover { border-color: #111; }
        .tt-input { width: 100%; font-size: 14px; color: #111; background: #fafafa; border: 1px solid #e5e5e5; border-radius: 10px; padding: 10px 14px; outline: none; font-family: inherit; margin-bottom: 10px; }
        .tt-input:focus { border-color: #bbb; background: #fff; }
        .tt-save-btn { font-size: 14px; font-weight: 600; padding: 11px 28px; border-radius: 9px; background: #111; color: #fff; border: none; cursor: pointer; }
        .tt-save-btn:hover { background: #333; }
        @media (max-width: 600px) { .tt-grid { grid-template-columns: repeat(2, 1fr); } }
      `}</style>

            <div className="tt-wrap">

                {conflict && (
                    <div className="tt-conflict">
                        <div className="tt-conflict-title">⚠️ Cannot switch template — conflicts found</div>
                        <div className="tt-conflict-list">
                            These products are used in your orders, inventory or wishlists and don't exist in the new template:
                            <br /><br />
                            {conflict.join(', ')}
                            <br /><br />
                            Remove them from orders/inventory/wishlists first, or your template is now Custom.
                        </div>
                    </div>
                )}

                {loading ? (
                    <p style={{ color: '#aaa', fontSize: 14 }}>Loading templates...</p>
                ) : (
                    <>
                        <div className="tt-section-label">System Templates</div>
                        <div className="tt-grid">
                            {systemTemplates.map(t => (
                                <div key={t._id} className="tt-card">
                                    <div className="tt-card-emoji">{t.emoji}</div>
                                    <div className="tt-card-name">{t.name}</div>
                                    <div className="tt-card-desc">{t.description}</div>
                                    <button className="tt-apply-btn" onClick={() => handleApply(t)}>Apply</button>
                                </div>
                            ))}
                        </div>

                        <div className="tt-section-label">Your Templates</div>
                        {customTemplates.length === 0 && (
                            <p style={{ fontSize: 13, color: '#bbb', marginBottom: 20 }}>No custom templates yet.</p>
                        )}
                        {customTemplates.length > 0 && (
                            <div className="tt-grid">
                                {customTemplates.map(t => (
                                    <div key={t._id} className="tt-card">
                                        <div className="tt-card-emoji">{t.emoji}</div>
                                        <div className="tt-card-name">{t.name}</div>
                                        <div className="tt-card-desc">{t.description}</div>
                                        <button className="tt-apply-btn" onClick={() => handleApply(t)}>Apply</button>
                                        <br />
                                        <button className="tt-delete-btn" onClick={() => handleDelete(t._id)}>Delete</button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {!showCreate ? (
                            <button className="tt-create-btn" onClick={() => setShowCreate(true)}>
                                + Save current setup as template
                            </button>
                        ) : (
                            <div style={{ maxWidth: 360 }}>
                                <div className="tt-section-label" style={{ marginBottom: 12 }}>Save current as template</div>
                                <input
                                    className="tt-input"
                                    placeholder="Template name"
                                    value={newTemplate.name}
                                    onChange={e => setNewTemplate(p => ({ ...p, name: e.target.value }))}
                                />
                                <input
                                    className="tt-input"
                                    placeholder="Emoji (e.g. 🏠)"
                                    value={newTemplate.emoji}
                                    onChange={e => setNewTemplate(p => ({ ...p, emoji: e.target.value }))}
                                />
                                <input
                                    className="tt-input"
                                    placeholder="Short description"
                                    value={newTemplate.description}
                                    onChange={e => setNewTemplate(p => ({ ...p, description: e.target.value }))}
                                />
                                <div style={{ display: 'flex', gap: 10 }}>
                                    <button className="tt-save-btn" onClick={handleSaveCustom}>Save</button>
                                    <button className="tt-create-btn" style={{ marginBottom: 0 }} onClick={() => setShowCreate(false)}>Cancel</button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </>
    );
}