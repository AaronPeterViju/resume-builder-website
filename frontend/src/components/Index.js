import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';
// Import icons for features
import { FaCheckCircle, FaLightbulb, FaChartLine, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';

function Index() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  
  // Add this function near the top of your Index component
  const navigateToTop = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

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
    
    // Add scroll animation observer
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);
    
    // Observe all elements with animation classes
    document.querySelectorAll('.fade-in, .slide-up, .slide-in').forEach(el => {
      observer.observe(el);
    });
    
    return () => observer.disconnect();
  }, [navigate]);

  return (
    <div className="home-page">
      {/* Animated background with gradients */}
      <div className="animated-background">
        <div className="gradient-sphere gradient-1"></div>
        <div className="gradient-sphere gradient-2"></div>
        <div className="gradient-sphere gradient-3"></div>
      </div>
      
      <header className="modern-header">
        <div className="container header-content">
          <div className="logo-container fade-in">
            <img src="/logo512.png" alt="Career Catalyst Logo" className="logo-image" />
            <h1 className="logo-text">Career Catalyst</h1>
          </div>
          <nav className="fade-in">
            <button 
              onClick={() => navigate('/ats-checker')} 
              className="button secondary-button"
            >
              ATS Checker
            </button>
            <button 
              onClick={() => navigate('/resume-builder')} 
              className="button secondary-button"
            >
              Resume Builder
            </button>
            <button 
              onClick={() => {
                localStorage.removeItem('authenticated');
                localStorage.removeItem('username');
                localStorage.removeItem('userId');
                navigate('/login');
              }}
              className="button glow-button"
            >
              <FaSignOutAlt style={{marginRight: '5px'}} /> Logout
            </button>
          </nav>
        </div>
      </header>

      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-content">
            <div className="welcome-badge slide-up">
              <FaUserCircle size={24} /> Welcome, {username}!
            </div>
            <h1 className="hero-title slide-up">Your Career <span className="gradient-text">Dashboard</span></h1>
            <p className="hero-subtitle slide-up">Access all the tools you need to create professional resumes and improve your job applications.</p>
            <div className="hero-buttons slide-up">
              <button onClick={() => navigate('/resume-builder')} className="button primary-button">Build Resume</button>
              <button onClick={() => navigate('/ats-checker')} className="button secondary-button">Check ATS Score</button>
            </div>
          </div>
          <div className="dashboard-card slide-in">
            <div className="dashboard-stats">
              <div className="stats-card">
                <div className="stats-value">80</div>
                <div className="stats-label">Average ATS Score</div>
              </div>
              <div className="stats-card">
                <div className="stats-value">Templates</div>
                <div className="stats-label">Professional designs ready to use</div>
              </div>
            </div>
            <div className="user-journey">
              <div className="journey-step">
                <div className="step-number">1</div>
                <div className="step-text">Create Resume</div>
              </div>
              <div className="step-arrow">→</div>
              <div className="journey-step">
                <div className="step-number">2</div>
                <div className="step-text">Check ATS Score</div>
              </div>
              <div className="step-arrow">→</div>
              <div className="journey-step">
                <div className="step-number">3</div>
                <div className="step-text">Apply Confidently</div>
              </div>
            </div>
          </div>
        </div>
        <div className="wave-divider">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100">
            <path fill="#ffffff" fillOpacity="1" d="M0,64L80,58.7C160,53,320,43,480,48C640,53,800,75,960,74.7C1120,75,1280,53,1360,42.7L1440,32L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <h2 className="section-title slide-up">Tools & Features</h2>
          <div className="features-grid">
            <div className="feature-card slide-up">
              <div className="feature-icon">
                <FaCheckCircle />
              </div>
              <h3>ATS-Optimized Templates</h3>
              <p>Our templates are designed to pass Applicant Tracking Systems and catch recruiters' attention.</p>
              <div className="card-decoration"></div>
            </div>
            <div className="feature-card slide-up" style={{animationDelay: "0.2s"}}>
              <div className="feature-icon">
                <FaLightbulb />
              </div>
              <h3>Easy to Use</h3>
              <p>Simple interface guides you through the resume creation process step by step.</p>
              <div className="card-decoration"></div>
            </div>
            <div className="feature-card slide-up" style={{animationDelay: "0.4s"}}>
              <div className="feature-icon">
                <FaChartLine />
              </div>
              <h3>ATS Score Checker</h3>
              <p>Instantly analyze your resume's ATS compatibility and get improvement suggestions.</p>
              <div className="card-decoration"></div>
            </div>
          </div>
        </div>
      </section>

      <footer className="modern-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <h3>Career Catalyst</h3>
              <p>Launch your career with confidence</p>
            </div>
            <div className="footer-links">
              <div className="footer-column">
                <h4>Tools</h4>
                <div className="footer-nav-item">
                  <button 
                    onClick={() => navigateToTop('/resume-builder')} 
                    style={{background: 'transparent', border: 'none', padding: 0, cursor: 'pointer', color: 'rgba(255, 255, 255, 0.7)', textAlign: 'left'}}
                  >
                    Resume Builder
                  </button>
                </div>
                <div className="footer-nav-item">
                  <button 
                    onClick={() => navigateToTop('/ats-checker')} 
                    style={{background: 'transparent', border: 'none', padding: 0, cursor: 'pointer', color: 'rgba(255, 255, 255, 0.7)', textAlign: 'left'}}
                  >
                    ATS Checker
                  </button>
                </div>
              </div>
              <div className="footer-column">
                <h4>Account</h4>
                <div className="footer-nav-item">
                  <button 
                    onClick={() => {
                      localStorage.removeItem('authenticated');
                      localStorage.removeItem('username');
                      localStorage.removeItem('userId');
                      navigate('/login');
                    }} 
                    style={{background: 'transparent', border: 'none', padding: 0, cursor: 'pointer', color: 'rgba(255, 255, 255, 0.7)', textAlign: 'left'}}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 Career Catalyst. All rights reserved</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Index;
