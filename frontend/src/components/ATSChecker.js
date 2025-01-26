import React from 'react';

function ATSChecker() {
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
    <div className="container">
      <header>
        <h1>ATS Checker</h1>
      </header>
      <main>
        <section>
          <h2>Upload Your Resume</h2>
          <form id="ats-checker-form" onSubmit={handleSubmit} enctype="multipart/form-data">
            <label htmlFor="resume-upload">Select a resume file:</label>
            <input type="file" id="resume-upload" name="resume" accept=".pdf,.doc,.docx" required />
            <button type="submit">Check ATS Score</button>
          </form>
          <div id="ats-score-result" className="hidden">
            <h3>Your ATS Score: <span id="ats-score"></span></h3>
          </div>
        </section>
      </main>
    </div>
  );
}

export default ATSChecker;