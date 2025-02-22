import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { templateConfig, formFields, initialFormState } from './resume/config';
import { template1 } from './resume/templates/template1';
import { template2 } from './resume/templates/template2';
import { template3 } from './resume/templates/template3';
import { generatePDF } from './resume/pdfGenerator';
import { formatMonthYear, loadPdfMake } from './resume/utils';
import '../styles.css';

// Define templates object using imported templates
const templates = {
  template1,
  template2,
  template3
};

function ResumeBuilder() {
  const navigate = useNavigate();
  const previewRef = useRef(null);
  const [pdfMakeReady, setPdfMakeReady] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  const [preview, setPreview] = useState('');
  const [isCustomTitle, setIsCustomTitle] = useState(false);

  useEffect(() => {
    loadPdfMake().then(setPdfMakeReady);
  }, []);

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

  // Define formatMonthYear function
  const formatMonthYear = (value) => value ? new Date(value).toLocaleString('default', { month: 'long', year: 'numeric' }) : 'Present';

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
      <div style={{ display: 'flex', gap: '10px' }}>
        <select
          value={monthIndex !== '' ? months[monthIndex] : ''}
          onChange={(e) => handleMonthChange(e.target.value)}
          required={required}
          disabled={disabled}
          id={`${id}-month`}
          className="form-input"
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
          className="form-input"
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
    }
  };

  // Add loading indicator for PDF generation
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  return (
    <div>
      <header className="header">
        <div className="header-content">
          <h1 onClick={() => navigate('/index')} style={{ cursor: 'pointer' }}>Career Catalyst</h1>
          <img className="logo" src="logo512.png" alt="Logo" width="100" height="100" />
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
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="title" className="form-label">Title/Role:</label>
            <select
              id="title"
              name="title"
              className="form-input"
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
                className="form-input mt-2"
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
                  className="form-input"
                  value={formData[name]}
                  onChange={handleChange}
                  required
                />
              ) : (
                <input
                  type={type}
                  id={name}
                  name={name}
                  className="form-input"
                  value={formData[name]}
                  onChange={handleChange}
                  required
                />
              )}
            </div>
          ))}

          <div className="form-group">
            <label className="form-label">Experience:</label>
            {formData.experience.map((exp, index) => (
              <div key={index} className="mb-4">
                <input 
                  type="text" 
                  placeholder="Title" 
                  className="form-input mb-2" 
                  value={exp.title} 
                  onChange={(e) => handleNestedChange('experience', index, 'title', e.target.value)} 
                  required 
                />
                <input 
                  type="text" 
                  placeholder="Company" 
                  className="form-input mb-2" 
                  value={exp.company} 
                  onChange={(e) => handleNestedChange('experience', index, 'company', e.target.value)} 
                  required 
                />
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: '0.9rem', color: '#666', marginBottom: '5px', display: 'block' }}>Start Date:</label>
                    <DateSelector
                      id={`exp-start-${index}`}
                      value={exp.startDate}
                      onChange={(e) => handleNestedChange('experience', index, 'startDate', e.target.value)}
                      required
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: '0.9rem', color: '#666', marginBottom: '5px', display: 'block' }}>End Date:</label>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <DateSelector
                        id={`exp-end-${index}`}
                        value={exp.endDate}
                        onChange={(e) => handleNestedChange('experience', index, 'endDate', e.target.value)}
                        required={!exp.isPresent}
                        disabled={exp.isPresent}
                      />
                      <label style={{ display: 'flex', alignItems: 'center', gap: '5px', whiteSpace: 'nowrap' }}>
                        <input
                          type="checkbox"
                          checked={exp.isPresent}
                          onChange={(e) => handleNestedChange('experience', index, 'isPresent', e.target.checked)}
                        />
                        Present
                      </label>
                    </div>
                  </div>
                </div>
                <textarea 
                  placeholder="Details (one per line)" 
                  className="form-input mt-2" 
                  value={exp.details.join('\n')} 
                  onChange={(e) => handleNestedChange('experience', index, 'details', e.target.value.split('\n'))} 
                  required 
                />
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
              onChange={(e) => handleNestedChange('education', 'qualification', '', e.target.value)} 
              required 
            />
            <input 
              type="text" 
              id="education-institution" 
              name="institution" 
              className="form-input mb-2" 
              placeholder="Institution" 
              value={formData.education.institution} 
              onChange={(e) => handleNestedChange('education', 'institution', '', e.target.value)} 
              required 
            />
            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '0.9rem', color: '#666', marginBottom: '5px' }}>Start Date:</label>
                <DateSelector
                  id="education-start"
                  value={formData.education.startDate}
                  onChange={(e) => handleNestedChange('education', 'startDate', '', e.target.value)}
                  required
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '0.9rem', color: '#666', marginBottom: '5px' }}>End Date:</label>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <DateSelector
                    id="education-end"
                    value={formData.education.endDate}
                    onChange={(e) => handleNestedChange('education', 'endDate', '', e.target.value)}
                    required={!formData.education.isPresent}
                    disabled={formData.education.isPresent}
                  />
                  <label style={{ display: 'flex', alignItems: 'center', gap: '5px', whiteSpace: 'nowrap' }}>
                    <input
                      type="checkbox"
                      checked={formData.education.isPresent}
                      onChange={(e) => handleNestedChange('education', 'isPresent', '', e.target.checked)}
                    />
                    Present
                  </label>
                </div>
              </div>
            </div>
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
                onChange={(e) => handleNestedChange('skills', index, '', e.target.value)} 
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
                  onChange={(e) => handleNestedChange('projects', index, 'name', e.target.value)} 
                  required 
                />
                <div className="mb-2">
                  <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ fontSize: '0.9rem', color: '#666', marginBottom: '5px', display: 'block' }}>Start Date:</label>
                      <DateSelector
                        id={`project-start-${index}`}
                        value={project.durationStart}
                        onChange={(e) => handleNestedChange('projects', index, 'durationStart', e.target.value)}
                        required
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ fontSize: '0.9rem', color: '#666', marginBottom: '5px', display: 'block' }}>End Date:</label>
                      <DateSelector
                        id={`project-end-${index}`}
                        value={project.durationEnd}
                        onChange={(e) => handleNestedChange('projects', index, 'durationEnd', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
                <textarea 
                  placeholder="Project Details" 
                  className="form-input" 
                  value={project.details} 
                  onChange={(e) => handleNestedChange('projects', index, 'details', e.target.value)} 
                  required 
                />
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
              {Object.entries(templates).map(([key, { label }]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>

          <button type="submit" className="button w-full">Generate Resume</button>
        </form>

        {preview && (
          <div className="resume-preview mt-6">
            <h2>Resume Preview</h2>
            <button 
              onClick={async () => {
                setIsGeneratingPDF(true);
                await downloadPDF();
                setIsGeneratingPDF(false);
              }} 
              className="button mt-4" 
              style={{ background: '#2ecc71' }}
              disabled={isGeneratingPDF}
            >
              {isGeneratingPDF ? 'Generating PDF...' : 'Download as PDF'}
            </button>
            <div ref={previewRef} dangerouslySetInnerHTML={{ __html: preview }} />
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
