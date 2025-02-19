import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

function ResumeBuilder() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    email: '',
    phone: '',
    linkedin: '',
    github: '',
    about: '',
    experience: [{ title: '', company: '', duration: '', details: [''] }],
    education: { qualification: '', institution: '', duration: '' },
    skills: [''],
    projects: [{ name: '', details: '' }],
    template: 'template1', // Default to first new template
  });
  const [preview, setPreview] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleArrayChange = (e, field, index, subField = '') => {
    const newData = { ...formData };
    if (subField === 'details') {
      // Split textarea input into array by newlines
      newData[field][index][subField] = e.target.value.split('\n');
    } else if (subField) {
      newData[field][index][subField] = e.target.value;
    } else {
      newData[field][index] = e.target.value;
    }
    setFormData(newData);
  };

  const addExperience = () => {
    setFormData({
      ...formData,
      experience: [...formData.experience, { title: '', company: '', duration: '', details: [''] }],
    });
  };

  const addSkill = () => {
    setFormData({ ...formData, skills: [...formData.skills, ''] });
  };

  const addProject = () => {
    setFormData({ ...formData, projects: [...formData.projects, { name: '', details: '' }] });
  };

  const generateResume = (e) => {
    e.preventDefault();
    let resumeContent;

    switch (formData.template) {
      case 'template1':
        resumeContent = `
          <style>
            .container[data-template="template1"] {
              max-width: 900px;
              margin: 20px auto;
              background-color: white;
              padding: 20px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }

            .container[data-template="template1"] .header {
              text-align: center;
            }

            .container[data-template="template1"] .header h1 {
              margin: 0;
              font-size: 36px;
              color: rgb(45, 3, 255);
            }

            .container[data-template="template1"] .header h2 {
              font-size: 18px;
              color: gray;
            }

            .container[data-template="template1"] .section-title {
              color: rgb(25, 76, 35);
              font-size: 24px;
              margin-top: 20px;
              border-bottom: 2px solid rgb(25, 76, 35);
              padding-bottom: 5px;
            }

            .container[data-template="template1"] .contact-info,
            .container[data-template="template1"] .education,
            .container[data-template="template1"] .experience,
            .container[data-template="template1"] .skills,
            .container[data-template="template1"] .languages,
            .container[data-template="template1"] .interests {
              margin-top: 20px;
            }

            .container[data-template="template1"] .experience-item,
            .container[data-template="template1"] .education-item,
            .container[data-template="template1"] .skill-item,
            .container[data-template="template1"] .language-item,
            .container[data-template="template1"] .interest-item {
              margin-bottom: 15px;
            }

            .container[data-template="template1"] .experience-item h3,
            .container[data-template="template1"] .education-item h3 {
              font-size: 16px;
              color: #333;
            }

            .container[data-template="template1"] ul {
              list-style: none;
              padding-left: 0;
            }

            .container[data-template="template1"] ul li {
              font-size: 14px;
              color: #555;
              margin-bottom: 5px;
            }

            .container[data-template="template1"] .two-column {
              display: flex;
              justify-content: space-between;
            }

            .container[data-template="template1"] .left-column,
            .container[data-template="template1"] .right-column {
              width: 48%;
            }

            .container[data-template="template1"] .box {
              background-color: #f1f1f1;
              padding: 15px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              border-radius: 5px;
              margin-bottom: 20px;
            }
          </style>
          <div class="container" data-template="template1">
            <header class="header">
              <h1>${formData.name}</h1>
              <h2>${formData.title}</h2>
            </header>
            <div class="two-column">
              <div class="left-column">
                <div class="section-title">EXPERIENCE</div>
                ${formData.experience.map(exp => `
                  <div class="experience-item">
                    <h3>${exp.title}, ${exp.company}</h3>
                    <p>${exp.duration}</p>
                    <ul>${exp.details.map(detail => `<li>${detail}</li>`).join('')}</ul>
                  </div>
                `).join('')}
              </div>
              <div class="right-column">
                <div class="box">
                  <div class="section-title">CONTACT INFO</div>
                  <p>LinkedIn: <a href="${formData.linkedin}">${formData.linkedin}</a></p>
                  <p>GitHub: <a href="${formData.github}">${formData.github}</a></p>
                  <p>Phone: ${formData.phone}</p>
                  <p>Email: <a href="mailto:${formData.email}">${formData.email}</a></p>
                </div>
                <div class="box">
                  <div class="section-title">EDUCATION</div>
                  <p><strong>${formData.education.qualification}</strong><br>${formData.education.institution}<br>${formData.education.duration}</p>
                </div>
                <div class="box">
                  <div class="section-title">SKILLS & TOOLS</div>
                  <ul>${formData.skills.map(skill => `<li>${skill}</li>`).join('')}</ul>
                </div>
                <div class="box">
                  <div class="section-title">PROJECTS</div>
                  <ul>${formData.projects.map(project => `
                    <li><b>${project.name}</b><p>${project.details}</p></li>
                  `).join('')}</ul>
                </div>
              </div>
            </div>
          </div>
        `;
        break;

      case 'template2':
        resumeContent = `
          <style>
            .container[data-template="template2"] {
              max-width: 850px;
              margin: 50px auto;
              background-color: #f9f9f9;
              border-radius: 15px;
              box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
              overflow: hidden;
              padding: 20px 40px;
            }

            .container[data-template="template2"] header {
              text-align: center;
              background: #0731cb;
              color: white;
              padding: 30px 0;
              border-radius: 15px 15px 0 0;
            }

            .container[data-template="template2"] header h1 {
              margin: 0;
              font-size: 2.5rem;
              font-weight: bold;
            }

            .container[data-template="template2"] header p {
              margin: 5px 0;
              font-size: 1rem;
            }

            .container[data-template="template2"] header a {
              color: #ffc107;
              text-decoration: none;
            }

            .container[data-template="template2"] .section {
              margin-bottom: 30px;
            }

            .container[data-template="template2"] .section h2 {
              font-size: 1.8rem;
              color: #0731cb;
              border-left: 5px solid #0731cb;
              padding-left: 10px;
              margin-bottom: 20px;
            }

            .container[data-template="template2"] .section-content {
              margin-left: 15px;
            }

            .container[data-template="template2"] .skills {
              display: flex;
              flex-wrap: wrap;
              gap: 10px;
            }

            .container[data-template="template2"] .skills span {
              background-color: #0731cb;
              color: white;
              padding: 8px 12px;
              border-radius: 5px;
              font-size: 0.9rem;
            }
          </style>
          <div class="container" data-template="template2">
            <header id="header">
              <h1>${formData.name}</h1>
              <p>Email: <a href="mailto:${formData.email}">${formData.email}</a> | Phone: ${formData.phone}</p>
              <p>Portfolio: <a href="${formData.linkedin}">${formData.linkedin}</a> | GitHub: <a href="${formData.github}">${formData.github}</a></p>
            </header>
            <section class="section" id="about">
              <h2>About Me</h2>
              <p class="section-content">${formData.about}</p>
            </section>
            <section class="section" id="experience">
              <h2>Professional Experience</h2>
              ${formData.experience.map(exp => `
                <div class="section-content">
                  <h3>${exp.title}</h3>
                  <p>${exp.company} | ${exp.duration}</p>
                  <ul>${exp.details.map(detail => `<li>${detail}</li>`).join('')}</ul>
                </div>
              `).join('')}
            </section>
            <section class="section" id="education">
              <h2>Education</h2>
              <div class="section-content">
                <h3>${formData.education.qualification}</h3>
                <p>${formData.education.institution} | ${formData.education.duration}</p>
              </div>
            </section>
            <section class="section" id="skills">
              <h2>Skills</h2>
              <div class="skills">
                ${formData.skills.map(skill => `<span>${skill}</span>`).join('')}
              </div>
            </section>
            <section class="section" id="projects">
              <h2>Projects</h2>
              ${formData.projects.map(proj => `
                <div class="section-content">
                  <h3>${proj.name}</h3>
                  <p>${proj.details}</p>
                </div>
              `).join('')}
            </section>
          </div>
        `;
        break;

      case 'template3':
        resumeContent = `
          <style>
            .container[data-template="template3"] {
              max-width: 900px;
              margin: 30px auto;
              background: #fff;
              padding: 20px 30px;
              border-radius: 10px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            }

            .container[data-template="template3"] header {
              text-align: center;
              margin-bottom: 20px;
            }

            .container[data-template="template3"] header h1 {
              margin: 0;
              font-size: 2rem;
              color: #222;
            }

            .container[data-template="template3"] header p {
              margin: 5px 0;
              color: #555;
            }

            .container[data-template="template3"] .section {
              margin-bottom: 20px;
            }

            .container[data-template="template3"] .section h2 {
              border-bottom: 2px solid #007bff;
              padding-bottom: 5px;
              margin-bottom: 15px;
            }

            .container[data-template="template3"] .section div {
              margin-bottom: 10px;
            }

            .container[data-template="template3"] .experience,
            .container[data-template="template3"] .education {
              margin-left: 20px;
            }

            .container[data-template="template3"] ul li {
              padding: 5px 0;
            }

            .container[data-template="template3"] .skills span {
              display: inline-block;
              background: #007bff;
              color: #fff;
              padding: 8px 15px;
              border-radius: 15px;
              margin-right: 5px;
              margin-bottom: 5px;
            }
          </style>
          <div class="container" data-template="template3">
            <header>
              <h1>${formData.name}</h1>
              <p>Email: ${formData.email} | Phone: ${formData.phone}</p>
              <p>LinkedIn: ${formData.linkedin}</p>
            </header>
            <section class="about section">
              <h2>About Me</h2>
              <p>${formData.about}</p>
            </section>
            <section class="experience section">
              <h2>Experience</h2>
              ${formData.experience.map(exp => `
                <div>
                  <h3>${exp.title} - ${exp.company}</h3>
                  <p>${exp.duration}</p>
                  <ul>
                    ${exp.details.map(detail => `<li>${detail}</li>`).join('')}
                  </ul>
                </div>
              `).join('')}
            </section>
            <section class="education section">
              <h2>Education</h2>
              <div>
                <h3>${formData.education.qualification}</h3>
                <p>${formData.education.institution}, ${formData.education.duration}</p>
              </div>
            </section>
            <section class="skills section">
              <h2>Skills</h2>
              <div>
                ${formData.skills.map(skill => `<span>${skill}</span>`).join('')}
              </div>
            </section>
          </div>
        `;
        break;

      default:
        resumeContent = ''; // Default case, though should not reach here
    }

    setPreview(resumeContent);
  };

  const templates = [
    { value: 'template1', label: 'Two-Column' },
    { value: 'template2', label: 'Modern' },
    { value: 'template3', label: 'Professional CV' },
  ];

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
          <h1>Resume Builder</h1>
          <p>Create a professional resume with our easy-to-use builder.</p>
        </div>
      </section>

      <main className="container">
        <form onSubmit={generateResume} className="form">
          <div className="form-group">
            <label htmlFor="name" className="form-label">Name:</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              className="form-input" 
              value={formData.name} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="title" className="form-label">Title/Role:</label>
            <input 
              type="text" 
              id="title" 
              name="title" 
              className="form-input" 
              value={formData.title} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email:</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              className="form-input" 
              value={formData.email} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone" className="form-label">Phone:</label>
            <input 
              type="tel" 
              id="phone" 
              name="phone" 
              className="form-input" 
              value={formData.phone} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="linkedin" className="form-label">LinkedIn:</label>
            <input 
              type="url" 
              id="linkedin" 
              name="linkedin" 
              className="form-input" 
              value={formData.linkedin} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="github" className="form-label">GitHub:</label>
            <input 
              type="url" 
              id="github" 
              name="github" 
              className="form-input" 
              value={formData.github} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="about" className="form-label">About Me:</label>
            <textarea 
              id="about" 
              name="about" 
              className="form-input" 
              value={formData.about} 
              onChange={handleChange} 
              required 
            ></textarea>
          </div>
          <div className="form-group">
            <label className="form-label">Experience:</label>
            {formData.experience.map((exp, index) => (
              <div key={index} className="mb-4">
                <input 
                  type="text" 
                  placeholder="Title" 
                  className="form-input mb-2" 
                  value={exp.title} 
                  onChange={(e) => handleArrayChange(e, 'experience', index, 'title')} 
                  required 
                />
                <input 
                  type="text" 
                  placeholder="Company" 
                  className="form-input mb-2" 
                  value={exp.company} 
                  onChange={(e) => handleArrayChange(e, 'experience', index, 'company')} 
                  required 
                />
                <input 
                  type="text" 
                  placeholder="Duration" 
                  className="form-input mb-2" 
                  value={exp.duration} 
                  onChange={(e) => handleArrayChange(e, 'experience', index, 'duration')} 
                  required 
                />
                <textarea 
                  placeholder="Details (one per line)" 
                  className="form-input" 
                  value={exp.details.join('\n')} 
                  onChange={(e) => handleArrayChange(e, 'experience', index, 'details')} 
                  required 
                ></textarea>
              </div>
            ))}
            <button type="button" onClick={addExperience} className="button">Add Experience</button>
          </div>
          <div className="form-group">
            <label htmlFor="education" className="form-label">Education:</label>
            <input 
              type="text" 
              id="education-qualification" 
              name="qualification" 
              className="form-input mb-2" 
              placeholder="Qualification" 
              value={formData.education.qualification} 
              onChange={(e) => setFormData({ ...formData, education: { ...formData.education, qualification: e.target.value } })} 
              required 
            />
            <input 
              type="text" 
              id="education-institution" 
              name="institution" 
              className="form-input mb-2" 
              placeholder="Institution" 
              value={formData.education.institution} 
              onChange={(e) => setFormData({ ...formData, education: { ...formData.education, institution: e.target.value } })} 
              required 
            />
            <input 
              type="text" 
              id="education-duration" 
              name="duration" 
              className="form-input" 
              placeholder="Duration" 
              value={formData.education.duration} 
              onChange={(e) => setFormData({ ...formData, education: { ...formData.education, duration: e.target.value } })} 
              required 
            />
          </div>
          <div className="form-group">
            <label className="form-label">Skills:</label>
            {formData.skills.map((skill, index) => (
              <input 
                key={index} 
                type="text" 
                className="form-input mb-2" 
                placeholder={`Skill ${index + 1}`} 
                value={skill} 
                onChange={(e) => handleArrayChange(e, 'skills', index)} 
                required 
              />
            ))}
            <button type="button" onClick={addSkill} className="button">Add Skill</button>
          </div>
          <div className="form-group">
            <label className="form-label">Projects:</label>
            {formData.projects.map((project, index) => (
              <div key={index} className="mb-4">
                <input 
                  type="text" 
                  placeholder="Project Name" 
                  className="form-input mb-2" 
                  value={project.name} 
                  onChange={(e) => handleArrayChange(e, 'projects', index, 'name')} 
                  required 
                />
                <textarea 
                  placeholder="Project Details" 
                  className="form-input" 
                  value={project.details} 
                  onChange={(e) => handleArrayChange(e, 'projects', index, 'details')} 
                  required 
                ></textarea>
              </div>
            ))}
            <button type="button" onClick={addProject} className="button">Add Project</button>
          </div>
          <div className="form-group">
            <label htmlFor="template" className="form-label">Select Template:</label>
            <select 
              id="template" 
              name="template" 
              className="form-input" 
              value={formData.template} 
              onChange={handleChange}
            >
              {templates.map((temp) => (
                <option key={temp.value} value={temp.value}>{temp.label}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="button w-full">Generate Resume</button>
        </form>

        {preview && (
          <div className="resume-preview mt-6">
            <h2>Resume Preview</h2>
            <div dangerouslySetInnerHTML={{ __html: preview }} />
          </div>
        )}
      </main>

      <footer className="footer">
        <div className="container">
          <p onClick={() => navigate('/index')} style={{ cursor: 'pointer' }}>© 2025 Career Catalyst. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default ResumeBuilder;
