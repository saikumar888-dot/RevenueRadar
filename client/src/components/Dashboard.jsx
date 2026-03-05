import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const stats = [
    { title: "Users", value: "1245", delta: "↑ 8.1%", icon: "👤" },
    { title: "Revenue", value: "$34,500", delta: "↑ 12.4%", icon: "💰" },
    { title: "Orders", value: "320", delta: "↑ 5.3%", icon: "📦" },
    { title: "Pending Tasks", value: "18", delta: "↓ 2", icon: "⏳" },
  ];

  const [departments, setDepartments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    budgetAllocated: "",
  });

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async (req, res) => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/me", {
        withCredentials: true,
      });
      setUser(res.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  //console.log(user?.organizationId);
  const organizationId = user?.organizationId;

  const fetchDepartments = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/departments/getalldepartment?organizationId=${organizationId}`
      );
      setDepartments(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const createDepartment = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/departments/createdepartment", {
        organizationId,
        name: formData.name,
        description: formData.description,
        budgetAllocated: Number(formData.budgetAllocated),
      });
      setShowForm(false);
      setFormData({ name: "", description: "", budgetAllocated: "" });
      fetchDepartments();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteDepartment = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/departments/${id}`);
      setDepartments(departments.filter((dept) => dept._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const logout = async (req, res) => {
    try {
      await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&family=DM+Sans:wght@200;300;400;500;600&family=DM+Mono:wght@300;400&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --gold: #BFA054;
          --gold-hi: #E2C47A;
          --gold-lo: #7A6030;
          --bg: #060810;
          --surface: #0C1018;
          --surface2: #111620;
          --surface3: #161c28;
          --border: rgba(191,160,84,0.12);
          --border-hi: rgba(191,160,84,0.3);
          --text: #E8E4DC;
          --muted: #6B7385;
          --green: #3DBA7E;
          --red: #E05252;
          --blue: #5B8BF5;
        }

        .db-root {
          font-family: 'DM Sans', sans-serif;
          display: flex;
          height: 100vh;
          background: var(--bg);
          color: var(--text);
          overflow: hidden;
          position: relative;
        }

        /* Background effects */
        .db-root::before {
          content: '';
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background:
            radial-gradient(ellipse 70% 60% at 75% 20%, rgba(191,160,84,0.07) 0%, transparent 60%),
            radial-gradient(ellipse 45% 65% at 5% 90%, rgba(191,160,84,0.04) 0%, transparent 50%);
        }
        .db-root::after {
          content: '';
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background-image:
            linear-gradient(rgba(191,160,84,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(191,160,84,0.02) 1px, transparent 1px);
          background-size: 72px 72px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%);
        }

        /* ── SIDEBAR ── */
        .db-sidebar {
          width: 240px;
          flex-shrink: 0;
          background: rgba(12,16,24,0.85);
          border-right: 1px solid var(--border);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          display: flex;
          flex-direction: column;
          padding: 0;
          position: relative;
          z-index: 10;
        }

        .db-sidebar-logo {
          padding: 22px 22px 18px;
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .db-brand-mark {
          width: 30px; height: 30px;
          border: 1.5px solid var(--gold);
          border-radius: 7px;
          display: flex; align-items: center; justify-content: center;
          font-size: 13px; font-weight: 700; color: var(--gold);
          background: rgba(191,160,84,0.08);
          flex-shrink: 0;
        }

        .db-brand-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 17px; font-weight: 600; letter-spacing: 0.08em;
          color: var(--gold);
        }

        .db-nav-label {
          font-size: 9px; letter-spacing: 0.18em; text-transform: uppercase;
          color: var(--muted); padding: 20px 22px 8px;
          font-weight: 500;
        }

        .db-menu {
          list-style: none;
          padding: 0 12px;
          flex: 1;
        }

        .db-menu li {
          padding: 10px 12px;
          margin-bottom: 3px;
          cursor: pointer;
          border-radius: 7px;
          font-size: 12px;
          font-weight: 400;
          letter-spacing: 0.05em;
          color: var(--muted);
          display: flex;
          align-items: center;
          gap: 10px;
          transition: all 0.18s ease;
          border: 1px solid transparent;
        }

        .db-menu li:hover {
          background: rgba(191,160,84,0.07);
          border-color: var(--border);
          color: var(--text);
        }

        .db-menu li.active {
          background: rgba(191,160,84,0.1);
          border-color: rgba(191,160,84,0.22);
          color: var(--gold);
        }

        .db-menu-icon {
          font-size: 13px; width: 18px; text-align: center;
        }

        .db-sidebar-footer {
          padding: 16px 12px;
          border-top: 1px solid var(--border);
        }

        .db-logout-btn {
          width: 100%;
          padding: 10px 14px;
          border: 1px solid rgba(224,82,82,0.25);
          border-radius: 7px;
          background: rgba(224,82,82,0.07);
          color: #E05252;
          font-family: 'DM Sans', sans-serif;
          font-size: 11px; font-weight: 500;
          letter-spacing: 0.08em; text-transform: uppercase;
          cursor: pointer;
          transition: all 0.2s;
        }
        .db-logout-btn:hover {
          background: rgba(224,82,82,0.14);
          border-color: rgba(224,82,82,0.5);
        }

        /* ── MAIN ── */
        .db-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          position: relative;
          z-index: 5;
        }

        /* ── TOPBAR ── */
        .db-topbar {
          background: rgba(12,16,24,0.75);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border);
          padding: 0 28px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-shrink: 0;
        }

        .db-topbar-left h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px; font-weight: 300;
          color: var(--text); letter-spacing: 0.02em;
        }

        .db-topbar-sub {
          font-size: 10px; color: var(--muted); letter-spacing: 0.06em;
          margin-top: 1px;
          font-family: 'DM Mono', monospace;
        }

        .db-topbar-right {
          display: flex; gap: 9px; align-items: center;
        }

        .db-btn {
          padding: 8px 18px;
          border-radius: 7px;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-size: 11px; font-weight: 500;
          letter-spacing: 0.07em; text-transform: uppercase;
          transition: all 0.2s; border: 1px solid transparent;
        }

        .db-btn-ghost {
          background: rgba(191,160,84,0.06);
          border-color: var(--border-hi);
          color: var(--gold);
        }
        .db-btn-ghost:hover {
          background: rgba(191,160,84,0.12);
          border-color: var(--gold);
        }

        .db-btn-solid {
          background: linear-gradient(135deg, #C9A84C 0%, #8B6914 100%);
          border-color: var(--gold);
          color: #06080E;
          font-weight: 600;
          box-shadow: 0 4px 14px rgba(191,160,84,0.18);
        }
        .db-btn-solid:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 22px rgba(191,160,84,0.28);
        }

        /* ── SCROLL AREA ── */
        .db-scroll {
          flex: 1;
          overflow-y: auto;
          padding: 24px 28px;
          scrollbar-width: thin;
          scrollbar-color: rgba(191,160,84,0.15) transparent;
        }
        .db-scroll::-webkit-scrollbar { width: 4px; }
        .db-scroll::-webkit-scrollbar-track { background: transparent; }
        .db-scroll::-webkit-scrollbar-thumb { background: rgba(191,160,84,0.18); border-radius: 4px; }

        /* ── SECTION LABEL ── */
        .db-section-label {
          font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--muted); margin-bottom: 14px; font-weight: 500;
          display: flex; align-items: center; gap: 10px;
        }
        .db-section-label::after {
          content: ''; flex: 1; height: 1px;
          background: linear-gradient(90deg, var(--border), transparent);
        }

        /* ── STAT CARDS ── */
        .db-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
          margin-bottom: 28px;
        }

        .db-stat-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 18px 20px;
          position: relative;
          overflow: hidden;
          transition: border-color 0.2s, transform 0.2s;
        }
        .db-stat-card:hover {
          border-color: var(--border-hi);
          transform: translateY(-2px);
        }
        .db-stat-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, var(--gold), transparent);
          opacity: 0.6;
        }

        .db-stat-icon {
          font-size: 16px; margin-bottom: 10px; opacity: 0.7;
        }

        .db-stat-label {
          font-size: 9px; letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--muted); margin-bottom: 6px;
        }

        .db-stat-value {
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px; font-weight: 600; color: var(--text);
          line-height: 1; margin-bottom: 6px;
        }

        .db-stat-delta {
          font-size: 10px; color: var(--green); font-weight: 500;
        }

        /* ── DEPARTMENTS ── */
        .db-dept-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 14px;
          margin-bottom: 28px;
        }

        .db-dept-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 18px 20px;
          position: relative;
          overflow: hidden;
          transition: border-color 0.2s, transform 0.2s;
        }
        .db-dept-card:hover {
          border-color: var(--border-hi);
          transform: translateY(-2px);
        }
        .db-dept-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 1.5px;
          background: linear-gradient(90deg, var(--blue), transparent);
          opacity: 0.5;
        }

        .db-dept-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 17px; font-weight: 600; color: var(--text);
          margin-bottom: 6px; padding-right: 36px;
        }

        .db-dept-desc {
          font-size: 11px; color: var(--muted); line-height: 1.6;
          margin-bottom: 12px;
        }

        .db-dept-budget {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 4px 10px; border-radius: 5px;
          background: rgba(191,160,84,0.08);
          border: 1px solid rgba(191,160,84,0.18);
          font-size: 10px; font-weight: 500;
          font-family: 'DM Mono', monospace;
          color: var(--gold);
        }

        .db-dept-delete {
          position: absolute; top: 14px; right: 14px;
          width: 26px; height: 26px;
          background: rgba(224,82,82,0.1);
          border: 1px solid rgba(224,82,82,0.2);
          border-radius: 5px;
          display: flex; align-items: center; justify-content: center;
          color: var(--red); font-size: 11px;
          cursor: pointer; transition: all 0.18s;
        }
        .db-dept-delete:hover {
          background: rgba(224,82,82,0.22);
          border-color: rgba(224,82,82,0.5);
        }

        /* ── ACTIVITY ── */
        .db-activity {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 20px;
          margin-bottom: 28px;
        }

        .db-activity-list {
          list-style: none;
        }

        .db-activity-item {
          padding: 11px 0;
          border-bottom: 1px solid var(--border);
          display: flex; align-items: center; gap: 10px;
          font-size: 12px; color: var(--muted);
          transition: color 0.15s;
        }
        .db-activity-item:last-child { border-bottom: none; }
        .db-activity-item:hover { color: var(--text); }
        .db-activity-item::before {
          content: '';
          width: 5px; height: 5px; border-radius: 50%;
          background: var(--gold); flex-shrink: 0; opacity: 0.6;
        }

        /* ── MODAL ── */
        .db-modal-overlay {
          position: fixed; inset: 0; z-index: 1000;
          background: rgba(6,8,16,0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          display: flex; align-items: center; justify-content: center;
        }

        .db-modal {
          background: var(--surface);
          border: 1px solid var(--border-hi);
          border-radius: 14px;
          padding: 32px;
          width: 380px;
          box-shadow: 0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(191,160,84,0.06);
          position: relative;
        }

        .db-modal::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
          border-radius: 14px 14px 0 0;
          background: linear-gradient(90deg, var(--gold), var(--gold-lo), transparent);
        }

        .db-modal h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px; font-weight: 600; color: var(--text);
          margin-bottom: 22px; letter-spacing: 0.02em;
        }

        .db-field-label {
          font-size: 9px; letter-spacing: 0.16em; text-transform: uppercase;
          color: var(--muted); margin-bottom: 6px; display: block;
        }

        .db-modal input,
        .db-modal textarea {
          width: 100%;
          background: var(--surface2);
          border: 1px solid var(--border);
          border-radius: 7px;
          padding: 10px 13px;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px; color: var(--text);
          margin-bottom: 16px;
          transition: border-color 0.18s;
          outline: none;
          resize: none;
        }
        .db-modal input:focus,
        .db-modal textarea:focus {
          border-color: rgba(191,160,84,0.45);
        }
        .db-modal input::placeholder,
        .db-modal textarea::placeholder {
          color: var(--muted);
        }

        .db-modal-actions {
          display: flex; gap: 9px; margin-top: 6px;
        }

        .db-modal-cancel {
          flex: 1;
          padding: 11px;
          background: transparent;
          border: 1px solid var(--border);
          border-radius: 7px;
          color: var(--muted);
          font-family: 'DM Sans', sans-serif;
          font-size: 11px; font-weight: 500;
          letter-spacing: 0.07em; text-transform: uppercase;
          cursor: pointer; transition: all 0.18s;
        }
        .db-modal-cancel:hover {
          border-color: var(--border-hi); color: var(--text);
        }

        .db-modal-submit {
          flex: 2;
          padding: 11px;
          background: linear-gradient(135deg, #C9A84C 0%, #8B6914 100%);
          border: 1px solid var(--gold);
          border-radius: 7px;
          color: #06080E;
          font-family: 'DM Sans', sans-serif;
          font-size: 11px; font-weight: 600;
          letter-spacing: 0.07em; text-transform: uppercase;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(191,160,84,0.18);
          transition: all 0.18s;
        }
        .db-modal-submit:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 22px rgba(191,160,84,0.28);
        }

        /* ── LIVE DOT ── */
        .db-live {
          display: flex; align-items: center; gap: 6px;
          font-size: 9px; color: var(--muted); letter-spacing: 0.1em;
        }
        .db-live-dot {
          width: 6px; height: 6px; border-radius: 50%; background: var(--green);
          box-shadow: 0 0 0 0 rgba(61,186,126,0.4);
          animation: lp2 2s ease-in-out infinite;
        }
        @keyframes lp2 {
          0% { box-shadow: 0 0 0 0 rgba(61,186,126,0.4); }
          70% { box-shadow: 0 0 0 7px rgba(61,186,126,0); }
          100% { box-shadow: 0 0 0 0 rgba(61,186,126,0); }
        }

        @media (max-width: 1024px) {
          .db-stats { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .db-sidebar { display: none; }
          .db-stats { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .db-stats { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="db-root">
        {/* SIDEBAR */}
        <div className="db-sidebar">
          <div className="db-sidebar-logo">
            <div className="db-brand-mark">R</div>
            <span className="db-brand-name">RevenueRadar</span>
          </div>

          <div className="db-nav-label">Navigation</div>

          <ul className="db-menu">
            <li className="active">
              <span className="db-menu-icon">⬡</span> Dashboard
            </li>
            <li onClick={fetchDepartments}>
              <span className="db-menu-icon">🏢</span> Departments
            </li>
            <li>
              <span className="db-menu-icon">📈</span> Analytics
            </li>
            <li>
              <span className="db-menu-icon">💳</span> Expenses
            </li>
            <li>
              <span className="db-menu-icon">⚙</span> Settings
            </li>
          </ul>

          <div className="db-sidebar-footer">
            <button className="db-logout-btn" onClick={logout}>
              ⎋ &nbsp;Sign Out
            </button>
          </div>
        </div>

        {/* MAIN */}
        <div className="db-main">
          {/* TOPBAR */}
          <div className="db-topbar">
            <div className="db-topbar-left">
              <h2>Executive Overview</h2>
              <div className="db-topbar-sub">
                {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
              </div>
            </div>
            <div className="db-topbar-right">
              <div className="db-live">
                <div className="db-live-dot" />
                Live
              </div>
              <button className="db-btn db-btn-ghost" onClick={fetchDepartments}>
                Load Departments
              </button>
              <button className="db-btn db-btn-solid" onClick={() => setShowForm(true)}>
                + New Department
              </button>
            </div>
          </div>

          {/* SCROLL AREA */}
          <div className="db-scroll">

            {/* STATS */}
            <div className="db-section-label">Key Metrics</div>
            <div className="db-stats">
              {stats.map((stat, index) => (
                <div key={index} className="db-stat-card">
                  <div className="db-stat-icon">{stat.icon}</div>
                  <div className="db-stat-label">{stat.title}</div>
                  <div className="db-stat-value">{stat.value}</div>
                  <div className="db-stat-delta">{stat.delta}</div>
                </div>
              ))}
            </div>

            {/* DEPARTMENTS */}
            {departments.length > 0 && (
              <>
                <div className="db-section-label">Departments</div>
                <div className="db-dept-grid">
                  {departments.map((dept) => (
                    <div key={dept._id} className="db-dept-card">
                      <button
                        className="db-dept-delete"
                        onClick={() => deleteDepartment(dept._id)}
                        title="Delete"
                      >
                        ✕
                      </button>
                      <div className="db-dept-name">{dept.name}</div>
                      <div className="db-dept-desc">{dept.description}</div>
                      <div className="db-dept-budget">₹ {dept.budgetAllocated?.toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* ACTIVITY */}
            <div className="db-section-label">Recent Activity</div>
            <div className="db-activity">
              <ul className="db-activity-list">
                <li className="db-activity-item">New user registered</li>
                <li className="db-activity-item">Expense approved</li>
                <li className="db-activity-item">Payment received</li>
                <li className="db-activity-item">Backup completed</li>
              </ul>
            </div>

          </div>
        </div>

        {/* MODAL */}
        {showForm && (
          <div className="db-modal-overlay">
            <div className="db-modal">
              <h3>Create Department</h3>
              <form onSubmit={createDepartment}>
                <label className="db-field-label">Department Name</label>
                <input
                  name="name"
                  placeholder="e.g. Engineering"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <label className="db-field-label">Description</label>
                <textarea
                  name="description"
                  placeholder="Brief description of this department..."
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={3}
                />
                <label className="db-field-label">Budget Allocated (₹)</label>
                <input
                  name="budgetAllocated"
                  type="number"
                  placeholder="e.g. 500000"
                  value={formData.budgetAllocated}
                  onChange={handleChange}
                  required
                />
                <div className="db-modal-actions">
                  <button type="button" className="db-modal-cancel" onClick={() => setShowForm(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="db-modal-submit">
                    Create Department
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;