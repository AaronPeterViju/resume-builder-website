import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles.css';

function ATSChecker() {
  const navigate = useNavigate();
  const [atsScore, setAtsScore] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

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
      const formData = new FormData();
      formData.append('resume', file);
      formData.append('userId', userId);

      try {
        const response = await axios.post('http://localhost:5000/api/resume/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        setAtsScore(response.data.atsScore);
        setSuggestions(response.data.suggestions || []);
      } catch (error) {
        alert('Error uploading resume: ' + error.message);
      }
    } else {
      alert('Please upload a resume file.');
    }
  };

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
                localStorage.removeItem('userId');
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
          <h1>ATS Checker</h1>
          <p>Upload your resume to check its ATS compatibility.</p>
        </div>
      </section>

      <main className="container">
        <section>
          <h2>Upload Your Resume</h2>
          <form id="ats-checker-form" onSubmit={handleSubmit} className="form" encType="multipart/form-data">
            <div className="form-group">
              <label htmlFor="resume-upload" className="form-label">File formats accepted are .pdf, .doc, .docx</label>
              <input type="file" id="resume-upload" name="resume" className="form-input" accept=".pdf,.doc,.docx" required />
            </div>
            <button type="submit" className="button w-full">Check ATS Score</button>
          </form>
          {atsScore !== null && (
            <div id="ats-score-result">
              <h3>Your ATS Score: <span id="ats-score">{atsScore}</span></h3>
              <h4>Suggestions for Improvement:</h4>
              <ul>
                {suggestions.map((suggestion, index) => (
                  <li key={index}>{suggestion}</li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <p onClick={() => navigate('/index')} style={{ cursor: 'pointer' }}>&copy; 2025 Career Catalyst. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default ATSChecker;