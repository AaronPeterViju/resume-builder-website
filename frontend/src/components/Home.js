import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';
// Import icons for features
import { FaCheckCircle, FaLightbulb, FaChartLine } from 'react-icons/fa'; 

function Home() {
  // Animation for elements on scroll
  useEffect(() => {
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
  }, []);

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
            <Link to="/login" className="button glow-button">Login</Link>
            <Link to="/signup" className="button button-outline">Sign Up</Link>
          </nav>
        </div>
      </header>

      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-content">
            <h1 className="hero-title slide-up">Launch Your <span className="gradient-text">Career</span> With A Perfect Resume</h1>
            <p className="hero-subtitle slide-up">Create professional resumes and get your ATS score instantly with our modern AI-powered tools</p>
            <div className="hero-buttons slide-up">
              <Link to="/signup" className="button primary-button">Get Started Free</Link>
            </div>
          </div>
          <div className="hero-image-container slide-in">
            <img src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=500&auto=format" 
                 alt="Resume Builder" 
                 className="hero-image" />
            <div className="floating-elements">
              <div className="floating-badge">ATS Optimized</div>
              <div className="floating-badge">Professional Templates</div>
              <div className="floating-badge">AI Analysis</div>
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
          <h2 className="section-title slide-up">Why Choose Career Catalyst</h2>
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

      <section className="testimonial-section slide-up">
        <div className="container">
          <h2 className="section-title">What Our Users Say</h2>
          <div className="testimonial-carousel">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"Career Catalyst helped me land my dream job! The ATS checker was a game-changer."</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar" style={{
                    backgroundImage: 'url("https://this-person-does-not-exist.com/img/avatar-genea2cbf8f38d31fa828bda9b469b8f60c.jpg")'
                  }}></div>
                  <div className="testimonial-info">
                    <h4>Emma Rodriguez</h4>
                    <p>Software Developer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section slide-up">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Create Your Professional Resume?</h2>
            <p>Start building your future today with our easy-to-use tools.</p>
            <Link to="/signup" className="button cta-button">Get Started Free</Link>
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
                <h4>Product</h4>
                <Link to="/ats-checker">ATS Checker</Link>
                <Link to="/resume-builder">Resume Builder</Link>
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

export default Home;
