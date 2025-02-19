import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';

function Home() {
  return (
    <div style={{ background: 'linear-gradient(to right,#6e8efb, #a777e3)', minHeight: '100vh' }}>
      <header className="header">
        <div className="header-content">
          <h1>Career Catalyst</h1><img class="logo" src="logo512.png" alt="Hello world" width="100" height="100"></img>
          <nav>
            <Link to="/login" className="button">Login</Link>
          </nav>
        </div>
      </header>

      <section className="hero">
        <div className="container">
          <h1>Create Professional Resumes in Minutes</h1>
          <p>Also check ATS score of your resume with our modern tools</p>
          <Link to="/signup" className="button">Get Started Free</Link>
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
          <p>&copy; 2025 Career Catalyst All rights reserved</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
