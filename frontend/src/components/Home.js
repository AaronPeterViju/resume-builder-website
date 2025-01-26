import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container">
      <header>
        <h1>Welcome to Career Catalyst</h1>
      </header>
      <main>
        <section className="description">
          <h3>Enhance Your Job Search Effortlessly</h3>
          <p>The aim of this project is to develop an automated resume builder that enhances the resume creation process by utilizing user-provided inputs, such as personal details, educational qualifications, and work experience. Our system offers a variety of customizable templates, allowing you to tailor your resume to specific industries and job roles.</p>
          <p>By simplifying the creation and formatting processes, this tool significantly reduces the time and effort required by job seekers. Additionally, the resumes generated are optimized for Applicant Tracking Systems (ATS), ensuring higher visibility in recruitment processes.</p>
        </section>
        <section className="description2">
          <h3>Key Features:</h3>
          <ul>
            <li>A variety of customizable resume templates.</li>
            <li>Easy input of personal details, education, and work experience.</li>
            <li>Optimized resumes for better visibility in Applicant Tracking Systems (ATS).</li>
            <li>An ATS checker to verify and improve your resume's compatibility.</li>
          </ul>
          <p>To create your resume or check your ATS score, please log in. <strong>Login is compulsory.</strong></p>
        </section>
        <section className="buttons">
          <Link to="/login" className="button">Log In</Link>
        </section>
      </main>
      <footer>
        <p>&copy; 2025 Automated Resume Builder</p>
      </footer>
    </div>
  );
}

export default Home;