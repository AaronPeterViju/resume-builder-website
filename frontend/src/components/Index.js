import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

function Index() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Check if the user is authenticated
    const isAuthenticated = localStorage.getItem('authenticated') === 'true';
    if (!isAuthenticated) {
      navigate('/login'); // Redirect to login page if not authenticated
    } else {
      // Retrieve the username from local storage
      const storedUsername = localStorage.getItem('username');
      setUsername(storedUsername);
    }
  }, [navigate]);

  return (
    <div>
      <header className="header">
        <div className="header-content">
          <h1 onClick={() => navigate('/index')} style={{ cursor: 'pointer' }}>Career Catalyst</h1>
          <nav>
            <button onClick={() => navigate('/ats-checker')} className="button button-secondary">ATS Checker</button>
            <button onClick={() => navigate('/resume-builder')} className="button button-secondary">Resume Builder</button>
            <button 
              onClick={() => {
                localStorage.removeItem('authenticated');
                localStorage.removeItem('username');
                navigate('/login');
              }}
              className="button button-secondary"
            >
              Logout
            </button>
          </nav>
        </div>
      </header>

      <section className="hero">
        <div className="container">
          <h1>Welcome, {username}</h1>
          <p>Enhance your job search with our professional tools.</p>
          <div className="options">
            <button onClick={() => navigate('/ats-checker')} className="button">Check ATS Score</button>
            <button onClick={() => navigate('/resume-builder')} className="button">Build a Resume</button>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <div className="grid">
            <div className="feature-card">
              <h3>ATS-Optimized Templates</h3>
              <p>Our templates are designed to pass Applicant Tracking Systems and catch recruiters' attention.</p>
            </div>
            <div className="feature-card">
              <h3>Easy to Use</h3>
              <p>Simple interface guides you through the resume creation process step by step.</p>
            </div>
            <div className="feature-card">
              <h3>ATS Score Checker</h3>
              <p>Instantly analyze your resume's ATS compatibility and get improvement suggestions.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 Career Catalyst. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Index;