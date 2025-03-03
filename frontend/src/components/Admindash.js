import React from "react";
import { Link } from "react-router-dom";
import "../stylesa.css";

const AdminDashboard = () => {
  const logout = () => {
    console.log("Logging out...");
  };

  const AtsScoreControl = () => {
    console.log("ATS Score control clicked");
  };

  const TemplateManagement = () => {
    console.log("Template Management clicked");
  };
  
  return (
    <div>
      <header className="header">
        <h1>Career Catalyst</h1>
        <h1>Admin Dashboard</h1>
        <button onClick={logout} className="button-secondary">
          Logout
        </button>
      </header>
      <div className="admin-content">
        <section className="admin-section">
          <Link to="/AtsScoreControl">
            <button className="button">ATS Score Control</button>
          </Link>
          
          <ul id="ats-log-list" className="admin-list"></ul>
        </section>
        <section className="admin-section">
          <button onClick={TemplateManagement} className="button">
            Template Management
          </button>
          <ul id="template-list" className="admin-list"></ul>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
