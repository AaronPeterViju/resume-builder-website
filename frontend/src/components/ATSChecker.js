import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

function ATSChecker() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const fileInput = document.getElementById('resume-upload');
    const file = fileInput.files[0];
    if (file) {
      // Process the file and check ATS score
      alert('ATS score checked for: ' + file.name);
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
              <label htmlFor="resume-upload" className="form-label">File formats accepted are .pdf,.doc,.docx</label>
              <input type="file" id="resume-upload" name="resume" className="form-input" accept=".pdf,.doc,.docx" required />
            </div>
            <button type="submit" className="button w-full">Check ATS Score</button>
          </form>
          <div id="ats-score-result" className="hidden">
            <h3>Your ATS Score: <span id="ats-score"></span></h3>
          </div>
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