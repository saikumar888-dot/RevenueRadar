import React from "react";
import "../styles/Admin.css";

const Admin = () => {
  return (
    <div className="admin-container">
      <div className="admin-card">
        <h1>Admin Panel</h1>
        <p>Welcome to the Admin Dashboard</p>

        <div className="admin-actions">
          <button className="admin-btn">Manage Users</button>
          <button className="admin-btn">View Reports</button>
          <button className="admin-btn">Settings</button>
        </div>
      </div>
    </div>
  );
};

export default Admin;