import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css'; // Correct the path to styles.css

function Index() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated
    const isAuthenticated = localStorage.getItem('authenticated') === 'true';
    if (!isAuthenticated) {
      navigate('/login'); // Redirect to login page if not authenticated
    }
  }, [navigate]);

  return (
    <div>
      <header>
        <h1><b>Welcome to the Resume Builder And ATS Checker</b></h1>
      </header>
      <main className="container">
        <section>
          <div className="options">
            <button onClick={() => navigate('/ats-checker')} className="option-btn">Check ATS Score</button>
            <button onClick={() => navigate('/resume-builder')} className="option-btn">Build a Resume</button>
          </div>
        </section>
      </main>
      <footer>
        <p>&copy; 2025 Resume Builder Website</p>
      </footer>
    </div>
  );
}

export default Index;