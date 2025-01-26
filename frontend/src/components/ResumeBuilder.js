import React from 'react';

function ResumeBuilder() {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Gather user inputs and create resume
    alert('Resume created successfully!');
  };

  return (
    <div className="container">
      <header>
        <h1>Create Your Resume</h1>
      </header>
      <main>
        <form id="resume-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name:</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number:</label>
            <input type="tel" id="phone" name="phone" required />
          </div>
          <div className="form-group">
            <label htmlFor="education">Education:</label>
            <textarea id="education" name="education" required></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="experience">Work Experience:</label>
            <textarea id="experience" name="experience" required></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="project">Projects:</label>
            <textarea id="project" name="project" required></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="template">Select Template:</label>
            <select id="template" name="template">
              <option value="template1">Template 1</option>
              {/* Additional templates can be added here */}
            </select>
          </div>
          <button type="submit">Generate Resume</button>
        </form>
      </main>
    </div>
  );
}

export default ResumeBuilder;