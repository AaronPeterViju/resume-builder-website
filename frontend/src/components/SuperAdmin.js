import React from "react";
import { Link, useNavigate } from "react-router-dom";

const SuperAdmin = () => {
  const navigate = useNavigate();

  const User_Dashboard = () => {
    navigate('/index');
  };

  const AtsScoreControl = () => {
    console.log("ATS Score control clicked");
  };

  const AdminManagement = () => {
    console.log("Admin Management clicked");
  };
  
  return (
    <div style={{
      fontFamily: "'Inter', sans-serif",
      margin: 0,
      padding: 0,
      background: "#f5f7fa",
      color: "#333",
      minHeight: "100vh"
    }}>
      <header style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 40px",
        background: "#ffffff",
        color: "#333",
        fontWeight: 600,
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
        borderBottom: "1px solid #e0e0e0"
      }}>
        <div>
          <h1 style={{
            margin: 0,
            fontSize: "22px"
          }}>Super Admin Dashboard</h1>
        </div>
        <button 
          onClick={User_Dashboard} 
          style={{
            padding: "10px 16px",
            border: "none",
            background: "#e74c3c",
            color: "white",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: 500,
            borderRadius: "6px",
            transition: "background 0.3s ease"
          }}
          onMouseOver={(e) => e.currentTarget.style.background = "#c0392b"}
          onMouseOut={(e) => e.currentTarget.style.background = "#e74c3c"}
        >
          User Dashboard / Logout
        </button>
      </header>
      <div style={{
        padding: "40px",
        display: "flex",
        justifyContent: "center",
        gap: "20px"
      }}>
        <section style={{
          background: "#ffffff",
          padding: "20px",
          borderRadius: "25px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
          width: "50%",
          textAlign: "center",
          border: "1px solid #e0e0e0",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          minHeight: "100px" 
        }}>
          <Link to="/SAtsScoreControl" style={{ 
            textDecoration: "none",
            margin: "auto" 
          }}>
            <button style={{
              padding: "15px 25px", 
              border: "none",
              background: "#0073e6",
              color: "white",
              cursor: "pointer",
              fontSize: "16px", 
              fontWeight: 500,
              borderRadius: "6px",
              transition: "background 0.3s ease"
            }}
            onMouseOver={(e) => e.currentTarget.style.background = "#005bb5"}
            onMouseOut={(e) => e.currentTarget.style.background = "#0073e6"}
            >
              ATS Score Control
            </button>
          </Link>
        </section>

        <section style={{
          background: "#ffffff",
          padding: "20px",
          borderRadius: "25px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
          width: "50%",
          textAlign: "center",
          border: "1px solid #e0e0e0",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          minHeight: "100px" 
        }}>
          <Link to="/AdminManagement" style={{ 
            textDecoration: "none",
            margin: "auto" 
          }}>
            <button style={{
              padding: "15px 25px", 
              border: "none",
              background: "#0073e6",
              color: "white",
              cursor: "pointer",
              fontSize: "16px", 
              fontWeight: 500,
              borderRadius: "6px",
              transition: "background 0.3s ease"
            }}
            onMouseOver={(e) => e.currentTarget.style.background = "#005bb5"}
            onMouseOut={(e) => e.currentTarget.style.background = "#0073e6"}
            >
              Admin Management
            </button>
          </Link>
        </section>
      </div>
    </div>
  );
};

export default SuperAdmin;
