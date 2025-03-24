import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles.css';
import { FaFileUpload, FaChartLine, FaArrowRight, FaSignOutAlt } from 'react-icons/fa';

function ATSChecker() {
  const navigate = useNavigate();
  const [atsScore, setAtsScore] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [fileName, setFileName] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const navigateToTop = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    // Animation for elements on scroll
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

  // Effect to animate results when they appear
  useEffect(() => {
    if (atsScore !== null) {
      setTimeout(() => {
        setShowResults(true);
      }, 500);
    }
  }, [atsScore]);

  const handleFileChange = (event) => {
    if (event.target.files[0]) {
      setFileName(event.target.files[0].name);
    }
  };

  // Update the handleSubmit function with improved scrolling logic
  const handleSubmit = async (event) => {
    event.preventDefault();
    const fileInput = document.getElementById('resume-upload');
    const file = fileInput.files[0];
    const userId = localStorage.getItem('userId');
    if (!userId) {
      navigate('/login');
      return;
    }
    
    if (file) {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('resume', file);
      formData.append('userId', userId);

      try {
        // Add a slight delay to show loading state
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const response = await axios.post('http://localhost:5000/api/resume/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        setAtsScore(response.data.atsScore);
        setSuggestions(response.data.suggestions || []);
        
        // Improved scroll behavior
        setTimeout(() => {
          setShowResults(true);
          // Wait for DOM update before scrolling
          setTimeout(() => {
            const resultsHeading = document.querySelector('.results-section .section-title');
            if (resultsHeading) {
              const headerOffset = 80; // Offset to account for the fixed header
              const elementPosition = resultsHeading.getBoundingClientRect().top;
              const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
              
              window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
              });
            }
          }, 100);
        }, 400);
        
      } catch (error) {
        alert('Error uploading resume: ' + error.message);
      } finally {
        setIsUploading(false);
      }
    } else {
      alert('Please upload a resume file.');
    }
  };

  // Update the renderScoreGauge function with this corrected version

const renderScoreGauge = () => {
  const scorePercentage = atsScore;
  const dashArray = 283; // Circumference of a circle with r=45
  const dashOffset = dashArray - (dashArray * scorePercentage) / 100;
  
  let scoreColor = "#ff4e42"; // Red for low scores
  if (scorePercentage >= 70) {
    scoreColor = "#0cce6b"; // Green for high scores
  } else if (scorePercentage >= 50) {
    scoreColor = "#ffa400"; // Orange for medium scores
  }
  
  return (
    <div className="score-gauge">
      <svg className="score-circle" viewBox="0 0 100 100">
        <circle className="score-circle-bg" cx="50" cy="50" r="45" />
        <circle 
          className="score-circle-progress" 
          cx="50" 
          cy="50" 
          r="45" 
          style={{ 
            strokeDasharray: dashArray,
            strokeDashoffset: dashOffset,
            stroke: scoreColor
          }}
        />
        <text 
          x="50" 
          y="50" 
          style={{
            fill: "#333",
            fontSize: "24px",
            fontWeight: "bold",
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            textAnchor: "middle",
            dominantBaseline: "central"
          }}
          transform="rotate(90, 50, 50)"
        >
          {scorePercentage}
        </text>
      </svg>
    </div>
  );
};

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length) {
      const file = files[0];
      // Check if the file is a PDF
      if (file.type === 'application/pdf') {
        setFileName(file.name);
        
        // Update the file input value
        const fileInput = document.getElementById('resume-upload');
        // Create a new DataTransfer object and add our file
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        fileInput.files = dataTransfer.files;
      } else {
        alert('Please upload a PDF file.');
      }
    }
  };

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
            <h1 onClick={() => navigate('/index')} className="logo-text" style={{ cursor: 'pointer' }}>Career Catalyst</h1>
          </div>
          <nav className="fade-in">
            <button onClick={() => navigate('/AATSChecker')} className="button secondary-button">ATS Checker</button>
            <button onClick={() => navigate('/AresumeBuilder')} className="button secondary-button">Resume Builder</button>
            <button onClick={() => navigate('/admin-dashboard')} className="button secondary-button">Admin Dashboard</button>
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
        <div className="container hero-container ats-hero-container">
          <div className="hero-content slide-up">
            <div className="feature-tag">
              <FaChartLine /> ATS Compatibility Check
            </div>
            <h1 className="hero-title">Optimize Your <span className="gradient-text">Resume</span> for ATS</h1>
            <p className="hero-subtitle">
              Upload your resume to analyze its compatibility with Applicant Tracking Systems and get actionable improvement suggestions.
            </p>
          </div>
          <div className="upload-card slide-in">
            <div className="upload-icon">
              <FaFileUpload />
            </div>
            <form id="ats-checker-form" onSubmit={handleSubmit} className="upload-form" encType="multipart/form-data">
              <div 
                className="file-upload-container"
                onDragEnter={handleDragEnter}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <label 
                  htmlFor="resume-upload" 
                  className={`file-upload-label ${isDragging ? 'dragging' : ''}`}
                >
                  <div className="file-upload-text">
                    {fileName ? fileName : "Drop your file here or click to browse"}
                  </div>
                </label>
                <input 
                  type="file" 
                  id="resume-upload" 
                  name="resume" 
                  className="file-upload-input" 
                  accept=".pdf" 
                  onChange={handleFileChange}
                  required 
                />
              </div>
              <button type="submit" className="button primary-button upload-button" disabled={isUploading}>
                {isUploading ? "Analyzing..." : "Check ATS Score"} {!isUploading && <FaArrowRight />}
              </button>
            </form>
          </div>
        </div>
        <div className="wave-divider">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100">
            <path fill="#ffffff" fillOpacity="1" d="M0,64L80,58.7C160,53,320,43,480,48C640,53,800,75,960,74.7C1120,75,1280,53,1360,42.7L1440,32L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {atsScore !== null && (
        <section className={`results-section ${showResults ? 'results-visible' : ''}`}>
          <div className="container">
            <h2 className="section-title">ATS Analysis Results</h2>
            <div className="results-container">
              <div className="results-card score-card">
                <h3>Your ATS Score</h3>
                {renderScoreGauge()}
                <div className="score-interpretation">
                  {atsScore >= 80 ? (
                    <div className="score-message good">
                      <strong>Great job!</strong> Your resume is well-optimized for ATS systems.
                    </div>
                  ) : atsScore >= 60 ? (
                    <div className="score-message medium">
                      <strong>Good start!</strong> With a few tweaks, your resume can perform better with ATS systems.
                    </div>
                  ) : (
                    <div className="score-message poor">
                      <strong>Needs improvement.</strong> Your resume may struggle to pass through ATS filters.
                    </div>
                  )}
                </div>
              </div>
              
              <div className="results-card suggestions-card">
                <h3>Improvement Suggestions</h3>
                {suggestions.length > 0 ? (
                  <ul className="suggestion-list">
                    {suggestions.map((suggestion, index) => (
                      <li key={index} className="suggestion-item">
                        <div className="suggestion-number">{index + 1}</div>
                        <div className="suggestion-text">{suggestion}</div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No specific suggestions at this time. Your resume looks good!</p>
                )}
              </div>
            </div>
            
            <div className="next-steps-container">
              <h3>Next Steps</h3>
              <div className="next-steps-grid">
                <div className="next-step">
                  <div className="next-step-icon">1</div>
                  <h4>Apply Changes</h4>
                  <p>Implement the suggestions to improve your resume's ATS compatibility.</p>
                </div>
                <div className="next-step">
                  <div className="next-step-icon">2</div>
                  <h4>Re-analyze</h4>
                  <p>Upload your revised resume to confirm improvements.</p>
                </div>
                <div className="next-step">
                  <div className="next-step-icon">3</div>
                  <h4>Create New Resume</h4>
                  <p>Or start fresh with our resume builder for optimal results.</p>
                  <button 
                    onClick={() => navigateToTop('/resume-builder')} // Changed from navigate to navigateToTop
                    className="button primary-button"
                    style={{
                      width: '100%',
                      marginTop: '15px',
                      padding: '12px 0',
                      fontSize: '1rem',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <span>Build New Resume</span>
                    <FaArrowRight />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="features-section">
        <div className="container">
          <h2 className="section-title slide-up">Why ATS Optimization Matters</h2>
          <div className="features-grid">
            <div className="feature-card slide-up">
              <div className="feature-icon">
                <FaChartLine />
              </div>
              <h3>75% of Resumes are Rejected</h3>
              <p>Most resumes are rejected by ATS before a human ever sees them. Our tool helps you beat those odds.</p>
              <div className="card-decoration"></div>
            </div>
            <div className="feature-card slide-up" style={{animationDelay: "0.2s"}}>
              <div className="feature-icon">
                <FaFileUpload />
              </div>
              <h3>Keyword Optimization</h3>
              <p>We analyze your resume for the right keywords and formatting that ATS systems look for.</p>
              <div className="card-decoration"></div>
            </div>
            <div className="feature-card slide-up" style={{animationDelay: "0.4s"}}>
              <div className="feature-icon">
                <FaArrowRight />
              </div>
              <h3>Get More Interviews</h3>
              <p>An ATS-optimized resume significantly increases your chances of landing interviews.</p>
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
                      navigateToTop('/login');
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

export default ATSChecker;
