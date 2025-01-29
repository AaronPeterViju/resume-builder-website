import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

function ResumeBuilder() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle resume generation logic here
    alert('Resume generated!');
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
          <h1>Resume Builder</h1>
          <p>Create a professional resume with our easy-to-use builder.</p>
        </div>
      </section>

      <main className="container">
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="name" className="form-label">Name:</label>
            <input type="text" id="name" name="name" className="form-input" required />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email:</label>
            <input type="email" id="email" name="email" className="form-input" required />
          </div>
          <div className="form-group">
            <label htmlFor="phone" className="form-label">Phone:</label>
            <input type="tel" id="phone" name="phone" className="form-input" required />
          </div>
          <div className="form-group">
            <label htmlFor="education" className="form-label">Education:</label>
            <textarea id="education" name="education" className="form-input" required></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="experience" className="form-label">Experience:</label>
            <textarea id="experience" name="experience" className="form-input" required></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="skills" className="form-label">Skills:</label>
            <textarea id="skills" name="skills" className="form-input" required></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="project" className="form-label">Projects:</label>
            <textarea id="project" name="project" className="form-input" required></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="template" className="form-label">Select Template:</label>
            <select id="template" name="template" className="form-input">
              <option value="template1">Template 1</option>
              {/* Additional templates can be added here */}
            </select>
          </div>
          <button type="submit" className="button w-full">Generate Resume</button>
        </form>
      </main>

      <footer className="footer">
        <div className="container">
          <p onClick={() => navigate('/index')} style={{ cursor: 'pointer' }}>&copy; 2025 Career Catalyst. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default ResumeBuilder;