import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { templateConfig, formFields, initialFormState } from './resume/config';
import { minimalist } from './resume/templates/minimalist';
import { executive } from './resume/templates/executive';
import { compact } from './resume/templates/compact';
import { modernSidebar } from './resume/templates/modernSidebar';
import TemplateSelector from './resume/TemplateSelector';
import { generatePDF } from './resume/pdfGenerator';
import { formatMonthYear, loadPdfMake } from './resume/utils';
import '../style.css';
import { FaDownload, FaBriefcase, FaGraduationCap, FaTools, FaFileAlt, FaPlus, FaTrash, FaSignOutAlt } from 'react-icons/fa';

// Define templates object using imported templates
const templates = {
  minimalist,
  executive,
  compact,
  modernSidebar
};

function ResumeBuilder() {
  const navigate = useNavigate();
  const previewRef = useRef(null);
  const formRef = useRef(null);
  const [pdfMakeReady, setPdfMakeReady] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  const [preview, setPreview] = useState('');
  const [isCustomTitle, setIsCustomTitle] = useState(false);
  const [activeSection, setActiveSection] = useState('personal');
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  useEffect(() => {
    loadPdfMake().then(setPdfMakeReady);
  }, []);

  // Add this function near the top of your ResumeBuilder component
  const navigateToTop = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  // Form handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNestedChange = (section, index, field, value) => {
    setFormData(prev => {
      const newData = { ...prev };
      if (field) {
        newData[section][index][field] = value;
      } else {
        newData[section][index] = value;
      }
      return newData;
    });
  };

  // Add/remove form sections
  const addExperience = () => setFormData(prev => ({
    ...prev,
    experience: [...prev.experience, { title: '', company: '', startDate: '', endDate: '', isPresent: false, details: [''] }]
  }));

  const addSkill = () => setFormData(prev => ({ ...prev, skills: [...prev.skills, ''] }));
  
  const addProject = () => setFormData(prev => ({
    ...prev,
    projects: [...prev.projects, { name: '', details: '', durationStart: '', durationEnd: '' }]
  }));

  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedTemplate = templates[formData.template];
    setPreview(selectedTemplate.render(formData, formatMonthYear));
  };

  // Date selection components
  const formatMonthYearDisplay = (value) => value ? new Date(value).toLocaleString('default', { month: 'long', year: 'numeric' }) : 'Present';
  
  const commonRoles = [
    'Software Engineer',
    'Product Manager',
    'Data Scientist',
    'Project Manager',
    'Software Tester',
    'Other'
  ];

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = currentYear + 5; year >= 1950; year--) {
      years.push(year);
    }
    return years;
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const DateSelector = ({ value, onChange, required, disabled, id }) => {
    const years = generateYearOptions();
    const [year, month] = value ? value.split('-') : ['', ''];
    const monthIndex = month ? parseInt(month) - 1 : '';

    const handleMonthChange = (selectedMonth) => {
      const newMonthIndex = months.indexOf(selectedMonth);
      const newMonth = (newMonthIndex + 1).toString().padStart(2, '0');
      onChange({ target: { value: year ? `${year}-${newMonth}` : `${new Date().getFullYear()}-${newMonth}` } });
    };

    const handleYearChange = (selectedYear) => {
      onChange({ target: { value: month ? `${selectedYear}-${month}` : `${selectedYear}-01` } });
    };

    return (
      <div className="date-selector">
        <select
          value={monthIndex !== '' ? months[monthIndex] : ''}
          onChange={(e) => handleMonthChange(e.target.value)}
          required={required}
          disabled={disabled}
          id={`${id}-month`}
          className="form-input date-input"
        >
          <option value="">Month</option>
          {months.map((month) => (
            <option key={month} value={month}>{month}</option>
          ))}
        </select>
        <select
          value={year || ''}
          onChange={(e) => handleYearChange(e.target.value)}
          required={required}
          disabled={disabled}
          id={`${id}-year`}
          className="form-input date-input"
        >
          <option value="">Year</option>
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
    );
  };

  const downloadPDF = async () => {
    try {
      setIsGeneratingPDF(true);
      
      if (!pdfMakeReady) {
        // Try loading pdfMake again if not ready
        await loadPdfMake();
        setPdfMakeReady(true);
      }

      const pdf = await generatePDF(formData, formatMonthYear, formData.template);
      pdf.download(`${formData.name || 'resume'}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again in a few moments.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const SectionHeader = ({ title, id }) => (
    <div 
      className={`section-header ${activeSection === id ? 'active' : ''}`}
      onClick={() => setActiveSection(id)}
    >
      <h2>{title}</h2>
    </div>
  );

  return (
    <div className="home-page">
      {/* Animated background with gradients */}
      <div className="animated-background">
        <div className="gradient-sphere gradient-1"></div>
        <div className="gradient-sphere gradient-2"></div>
        <div className="gradient-sphere gradient-3"></div>
      </div>
      
      <header className="header">
        <div className="header-content">
          <h1 onClick={() => navigate('/index')} style={{ cursor: 'pointer' }}>Career Catalyst</h1>
          <img className="logo" src="logo512.png" alt="Logo" width="100" height="100" />
          <nav>
            <button onClick={() => navigate('/ats-checker')} className="modern-button secondary">ATS Checker</button>
            <button onClick={() => navigate('/resume-builder')} className="modern-button secondary">Resume Builder</button>
            <button 
              onClick={() => {
                localStorage.removeItem('authenticated');
                localStorage.removeItem('username');
                localStorage.removeItem('userId');
                navigate('/login');
              }}
              className="modern-button secondary"
            >
              <FaSignOutAlt /> Logout
            </button>
          </nav>
        </div>
      </header>

      <section className="hero-section">
        <div className="container">
          <h1 className="hero-title">Resume Builder</h1>
          <p className="hero-subtitle">Create a professional resume with our easy-to-use builder.</p>
        </div>
      </section>

      <div className="content-wrapper">
        <main className="container builder-container">
          <div className="builder-layout">
            <form ref={formRef} onSubmit={handleSubmit} className="form">
              {/* Personal Information Section */}
              <div className={`form-section ${activeSection === 'personal' ? 'active' : ''}`}>
                <SectionHeader 
                  title="Personal Information" 
                  id="personal" 
                />
                
                <div className="section-content">
                  <div className="content-card">
                    <div className="card-header">
                      <h3>Basic Details</h3>
                    </div>
                    
                    <div className="card-content">
                      <div className="form-group">
                        <label htmlFor="title" className="form-label">Title/Role:</label>
                        <select
                          id="title"
                          name="title"
                          className="form-input enhanced-select"
                          value={isCustomTitle ? 'Other' : formData.title}
                          onChange={(e) => {
                            if (e.target.value === 'Other') {
                              setIsCustomTitle(true);
                              setFormData({ ...formData, title: '' });
                            } else {
                              setIsCustomTitle(false);
                              setFormData({ ...formData, title: e.target.value });
                            }
                          }}
                          required
                        >
                          <option value="">Select a role</option>
                          {commonRoles.map(role => (
                            <option key={role} value={role}>{role}</option>
                          ))}
                        </select>
                        {isCustomTitle && (
                          <input
                            type="text"
                            className="form-input"
                            style={{ marginTop: "20px" }} // Increased space between dropdown and input
                            placeholder="Enter your custom title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                          />
                        )}
                      </div>

                      {formFields.map(({ name, label, type }) => (
                        <div key={name} className="form-group">
                          <label htmlFor={name} className="form-label">{label}:</label>
                          {type === 'textarea' ? (
                            <textarea
                              id={name}
                              name={name}
                              className="form-input enhanced-textarea"
                              value={formData[name]}
                              onChange={handleChange}
                              required
                            />
                          ) : (
                            <input
                              type={type}
                              id={name}
                              name={name}
                              className="form-input enhanced-input"
                              value={formData[name]}
                              onChange={handleChange}
                              required
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Experience Section */}
              <div className={`form-section ${activeSection === 'experience' ? 'active' : ''}`}>
                <SectionHeader 
                  title="Work Experience" 
                  id="experience" 
                />
                
                <div className="section-content">
                  {formData.experience.map((exp, index) => (
                    <div key={index} className="content-card experience-card">
                      <div className="card-header">
                        <h3>Position {index + 1}</h3>
                        {index > 0 && (
                          <button 
                            type="button"
                            className="modern-button danger"
                            onClick={() => setFormData(prev => ({
                              ...prev,
                              experience: prev.experience.filter((_, i) => i !== index)
                            }))}
                          >
                            <FaTrash /> Remove
                          </button>
                        )}
                      </div>
                      
                      <div className="card-content">
                        <div className="form-group">
                          <label className="form-label">Job Title:</label>
                          <input 
                            type="text" 
                            placeholder="e.g. Senior Developer" 
                            className="form-input enhanced-input" 
                            value={exp.title} 
                            onChange={(e) => handleNestedChange('experience', index, 'title', e.target.value)} 
                            required 
                          />
                        </div>
                        
                        <div className="form-group">
                          <label className="form-label">Company:</label>
                          <input 
                            type="text" 
                            placeholder="e.g. Google Inc." 
                            className="form-input enhanced-input" 
                            value={exp.company} 
                            onChange={(e) => handleNestedChange('experience', index, 'company', e.target.value)} 
                            required 
                          />
                        </div>
                        
                        <div className="form-row">
                          <div className="form-group half">
                            <label className="form-label">Start Date:</label>
                            <DateSelector
                              id={`exp-start-${index}`}
                              value={exp.startDate}
                              onChange={(e) => handleNestedChange('experience', index, 'startDate', e.target.value)}
                              required
                            />
                          </div>
                          
                          <div className="form-group half">
                            <div className="form-group" style={{marginBottom: "10px"}}>
                              <label className="present-checkbox">
                                <input
                                  type="checkbox"
                                  checked={exp.isPresent}
                                  onChange={(e) => handleNestedChange('experience', index, 'isPresent', e.target.checked)}
                                />
                                <span>Present</span>
                              </label>
                            </div>
                            
                            <label className="form-label">End Date:</label>
                            <DateSelector
                              id={`exp-end-${index}`}
                              value={exp.endDate}
                              onChange={(e) => handleNestedChange('experience', index, 'endDate', e.target.value)}
                              required={!exp.isPresent}
                              disabled={exp.isPresent}
                            />
                          </div>
                        </div>
                        
                        <div className="form-group">
                          <label className="form-label">Responsibilities & Achievements:</label>
                          <textarea 
                            placeholder="• Developed a feature that increased users&#10;• Led a team of 5 developers for a major project&#10;• Optimized database queries" 
                            className="form-input enhanced-textarea" 
                            value={exp.details.join('\n')} 
                            onChange={(e) => handleNestedChange('experience', index, 'details', e.target.value.split('\n'))} 
                            required 
                            rows={5}
                          />
                          <small className="input-help">Each bullet point on a new line</small>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <button type="button" onClick={addExperience} className="modern-button ghost">
                    <FaPlus /> Add Experience
                  </button>
                </div>
              </div>

              {/* Education Section */}
              <div className={`form-section ${activeSection === 'education' ? 'active' : ''}`}>
                <SectionHeader 
                  title="Education" 
                  id="education" 
                />
                
                <div className="section-content">
                  <div className="content-card">
                    <div className="card-header">
                      <h3>Education Details</h3>
                    </div>
                    
                    <div className="card-content">
                      <div className="form-group">
                        <label className="form-label">Qualification/Degree:</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Bachelor of Science in Computer Science" 
                          className="form-input enhanced-input" 
                          value={formData.education.qualification || ''} 
                          onChange={(e) => handleNestedChange('education', 'qualification', '', e.target.value)} 
                          required 
                        />
                      </div>
                      
                      <div className="form-group">
                        <label className="form-label">Institution:</label>
                        <input 
                          type="text" 
                          placeholder="e.g. University of Technology" 
                          className="form-input enhanced-input" 
                          value={formData.education.institution || ''} 
                          onChange={(e) => handleNestedChange('education', 'institution', '', e.target.value)} 
                          required 
                        />
                      </div>
                      
                      <div className="form-row">
                        <div className="form-group half">
                          <label className="form-label">Start Date:</label>
                          <DateSelector
                            id="edu-start"
                            value={formData.education.startDate}
                            onChange={(e) => handleNestedChange('education', 'startDate', '', e.target.value)}
                            required
                          />
                        </div>
                        
                        <div className="form-group half">
                          <div className="form-group" style={{marginBottom: "10px"}}>
                            <label className="present-checkbox">
                              <input
                                type="checkbox"
                                checked={formData.education.isPresent || false}
                                onChange={(e) => handleNestedChange('education', 'isPresent', '', e.target.checked)}
                              />
                              <span>Present</span>
                            </label>
                          </div>
                          
                          <label className="form-label">End Date:</label>
                          <DateSelector
                            id="edu-end"
                            value={formData.education.endDate}
                            onChange={(e) => handleNestedChange('education', 'endDate', '', e.target.value)}
                            required={!formData.education.isPresent}
                            disabled={formData.education.isPresent}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills Section */}
              <div className={`form-section ${activeSection === 'skills' ? 'active' : ''}`}>
                <SectionHeader 
                  title="Skills" 
                  id="skills" 
                />
                
                <div className="section-content">
                  <div className="content-card">
                    <div className="card-header">
                      <h3>Skills</h3>
                    </div>
                    
                    <div className="card-content">
                      <div className="skills-container">
                        {formData.skills.map((skill, index) => (
                          <div key={index} className="skill-item">
                            <input 
                              type="text" 
                              placeholder={`e.g. JavaScript, Team Leadership, Project Management`} 
                              className="form-input enhanced-input" 
                              value={skill} 
                              onChange={(e) => handleNestedChange('skills', index, '', e.target.value)} 
                              required 
                            />
                            {index > 0 && (
                              <button 
                                type="button"
                                className="modern-button danger modern-skill-remove"
                                onClick={() => setFormData(prev => ({
                                  ...prev,
                                  skills: prev.skills.filter((_, i) => i !== index)
                                }))}
                              >
                                ×
                              </button>
                            )}
                          </div>
                        ))}
                        <button type="button" onClick={addSkill} className="modern-button ghost skill-add">
                          <FaPlus /> Add Skill
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Projects Section */}
              <div className={`form-section ${activeSection === 'projects' ? 'active' : ''}`}>
                <SectionHeader 
                  title="Projects" 
                  id="projects" 
                />
                
                <div className="section-content">
                  {formData.projects.map((project, index) => (
                    <div key={index} className="content-card project-card">
                      <div className="card-header">
                        <h3>Project {index + 1}</h3>
                        {index > 0 && (
                          <button 
                            type="button"
                            className="modern-button danger"
                            onClick={() => setFormData(prev => ({
                              ...prev,
                              projects: prev.projects.filter((_, i) => i !== index)
                            }))}
                          >
                            <FaTrash /> Remove
                          </button>
                        )}
                      </div>
                      
                      <div className="card-content">
                        <div className="form-group">
                          <label className="form-label">Project Name:</label>
                          <input 
                            type="text" 
                            placeholder="e.g. E-commerce Website" 
                            className="form-input enhanced-input" 
                            value={project.name || ''} 
                            onChange={(e) => handleNestedChange('projects', index, 'name', e.target.value)} 
                            required 
                          />
                        </div>
                        
                        <div className="form-row">
                          <div className="form-group half">
                            <label className="form-label">Start Date:</label>
                            <DateSelector
                              id={`project-start-${index}`}
                              value={project.durationStart}
                              onChange={(e) => handleNestedChange('projects', index, 'durationStart', e.target.value)}
                              required
                            />
                          </div>
                          
                          <div className="form-group half">
                            <label className="form-label">End Date:</label>
                            <DateSelector
                              id={`project-end-${index}`}
                              value={project.durationEnd}
                              onChange={(e) => handleNestedChange('projects', index, 'durationEnd', e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="form-group">
                          <label className="form-label">Project Details:</label>
                          <textarea 
                            placeholder="Describe the project, technologies used, and your role" 
                            className="form-input enhanced-textarea" 
                            value={project.details || ''} 
                            onChange={(e) => handleNestedChange('projects', index, 'details', e.target.value)} 
                            required 
                            rows={4}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <button type="button" onClick={addProject} className="modern-button ghost">
                    <FaPlus /> Add Project
                  </button>
                </div>
              </div>

              {/* Template Selection Section */}
              <div className={`form-section ${activeSection === 'template' ? 'active' : ''}`}>
                <SectionHeader 
                  title="Choose Template" 
                  id="template" 
                />
                
                <div className="section-content">
                  <div className="content-card">
                    <div className="card-header">
                      <h3>Resume Template</h3>
                    </div>
                    
                    <div className="card-content">
                      <TemplateSelector 
                        selectedTemplate={formData.template} 
                        onTemplateSelect={(template) => setFormData(prev => ({ ...prev, template }))}
                      />

                      <button type="submit" className="modern-button primary">
                        <FaFileAlt /> Generate Resume
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>

            {preview && (
              <div className="resume-preview" ref={previewRef}>
                <h2>Resume Preview</h2>
                <div className="preview-iframe-container">
                  <iframe
                    title="Resume Preview"
                    className="resume-preview-iframe"
                    srcDoc={`
                      <!DOCTYPE html>
                      <html>
                        <head>
                          <style>
                            body {
                              margin: 0;
                              padding: 0;
                              font-family: Arial, sans-serif;
                              color: #000;
                              line-height: 1.5;
                            }
                            /* Template-specific styles */
                            .section-title {
                              font-size: 14px;
                              font-weight: bold;
                              color: #2c3e50;
                              margin: 10px 0;
                              padding-bottom: 5px;
                              border-bottom: 1px solid #3498db;
                              text-decoration: underline;
                              text-decoration-color: #3498db;
                            }
                            table {
                              width: 100%;
                              border-collapse: collapse;
                            }
                            td {
                              padding: 5px;
                              vertical-align: top;
                            }
                            h1, h2, h3, h4, h5, h6 {
                              margin: 0;
                              padding: 0;
                              color: #2c3e50;
                            }
                            ul {
                              margin: 5px 0;
                              padding-left: 20px;
                            }
                            li {
                              margin-bottom: 3px;
                            }
                            p {
                              margin: 5px 0;
                            }
                            .header-section {
                              text-align: center;
                              margin-bottom: 20px;
                            }
                            .header {
                              font-size: 24px;
                              font-weight: bold;
                            }
                            .subheader {
                              font-size: 16px;
                              color: #7f8c8d;
                            }
                            .company {
                              color: #3498db;
                            }
                            .date {
                              font-style: italic;
                              color: #7f8c8d;
                            }
                          </style>
                        </head>
                        <body>
                          ${preview}
                        </body>
                      </html>
                    `}
                    seamless
                    sandbox="allow-same-origin"
                  ></iframe>
                </div>
                <div className="button-center-container">
                  <button 
                    onClick={downloadPDF} 
                    className="modern-button success" 
                    disabled={isGeneratingPDF}
                  >
                    <FaDownload /> {isGeneratingPDF ? 'Generating PDF...' : 'Download'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

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

export default ResumeBuilder;
