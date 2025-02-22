import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

// Template styles and colors
const templateConfig = {
  colors: {
    primary: '#2c3e50',
    secondary: '#7f8c8d',
    accent: '#3498db',
    text: '#333333',
    background: '#f8f9fa'
  },
  fonts: {
    primary: 'Arial, sans-serif',
    sizes: { h1: '32px', h2: '18px', body: '14px' }
  }
};

// Form field definitions
const formFields = [
  { name: 'name', label: 'Name', type: 'text' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'phone', label: 'Phone', type: 'tel' },
  { name: 'linkedin', label: 'LinkedIn', type: 'url' },
  { name: 'github', label: 'GitHub', type: 'url' },
  { name: 'about', label: 'About Me', type: 'textarea' }
];

// Initial form state
const initialFormState = {
  name: '', title: '', email: '', phone: '', linkedin: '', github: '', about: '',
  experience: [{ title: '', company: '', startDate: '', endDate: '', isPresent: false, details: [''] }],
  education: { qualification: '', institution: '', startDate: '', endDate: '', isPresent: false },
  skills: [''],
  projects: [{ name: '', details: '', durationStart: '', durationEnd: '' }],
  template: 'template1'
};

function ResumeBuilder() {
  const navigate = useNavigate();
  const previewRef = useRef(null);
  const [pdfMakeReady, setPdfMakeReady] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  const [preview, setPreview] = useState('');
  const [isCustomTitle, setIsCustomTitle] = useState(false);

  // Load PDF dependencies
  useEffect(() => {
    const loadPdfMake = async () => {
      try {
        const pdfMake = await import('pdfmake/build/pdfmake');
        const pdfFonts = await import('pdfmake/build/vfs_fonts');
        pdfMake.default.vfs = pdfFonts.pdfMake.vfs;
        window.pdfMake = pdfMake.default;
        setPdfMakeReady(true);
      } catch (error) {
        console.error('Error loading PDF dependencies:', error);
        alert('Failed to load PDF generator. Please refresh the page.');
      }
    };
    loadPdfMake();
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

  const templates = {
    template1: {
      label: 'Professional',
      render: (data, format) => `
        <div class="resume-container">
          <style>
            .resume-container {
              max-width: 800px;
              margin: 40px auto;
              padding: 40px;
              background: #fff;
              font-family: 'Times New Roman', serif;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
            }
            .header h1 {
              color: #2c3e50;
              margin: 0;
              font-size: 28px;
              font-weight: bold;
            }
            .header h2 {
              color: #7f8c8d;
              margin: 5px 0;
              font-size: 18px;
            }
            .contact-info {
              text-align: center;
              margin-bottom: 30px;
              font-size: 12px;
            }
            .two-column {
              display: flex;
              gap: 30px;
            }
            .left-column {
              flex: 3;
            }
            .right-column {
              flex: 7;
            }
            .section {
              margin-bottom: 25px;
            }
            .section-title {
              color: #2c3e50;
              border-bottom: 2px solid #3498db;
              padding-bottom: 5px;
              margin-bottom: 15px;
              font-size: 16px;
              font-weight: bold;
              text-transform: uppercase;
            }
            .experience-item, .project-item {
              margin-bottom: 15px;
            }
            .experience-item h3, .project-item h3 {
              color: #34495e;
              margin: 0 0 5px 0;
              font-size: 14px;
              font-weight: bold;
            }
            .date {
              color: #7f8c8d;
              font-size: 12px;
              margin-bottom: 5px;
            }
            ul {
              margin: 5px 0;
              padding-left: 20px;
            }
            li {
              margin-bottom: 3px;
              font-size: 12px;
            }
            .skills-list {
              list-style-type: none;
              padding: 0;
              margin: 10px 0;
            }
            .skill-item {
              background: #f0f0f0;
              padding: 5px 10px;
              margin: 0 0 5px 0;
              border-radius: 3px;
              font-size: 12px;
            }
          </style>

          <div class="header">
            <h1>${data.name}</h1>
            <h2>${data.title}</h2>
          </div>

          <div class="contact-info">
            <p>
              ${data.email} | ${data.phone} | 
              LinkedIn: ${data.linkedin} | 
              GitHub: ${data.github}
            </p>
          </div>

          <div class="two-column">
            <div class="left-column">
              <div class="section">
                <div class="section-title">Skills</div>
                <ul class="skills-list">
                  ${data.skills.map(skill => `<li class="skill-item">${typeof skill === 'object' ? skill.text : skill}</li>`).join('')}
                </ul>
              </div>

              <div class="section">
                <div class="section-title">Education</div>
                <div class="experience-item">
                  <h3>${data.education.qualification}</h3>
                  <div>${data.education.institution}</div>
                  <div class="date">
                    ${format(data.education.startDate)} - 
                    ${data.education.isPresent ? 'Present' : format(data.education.endDate)}
                  </div>
                </div>
              </div>
            </div>

            <div class="right-column">
              <div class="section">
                <div class="section-title">Professional Summary</div>
                <p>${data.about}</p>
              </div>

              <div class="section">
                <div class="section-title">Experience</div>
                ${data.experience.map(exp => `
                  <div class="experience-item">
                    <h3>${exp.title}</h3>
                    <div>${exp.company}</div>
                    <div class="date">${format(exp.startDate)} - ${exp.isPresent ? 'Present' : format(exp.endDate)}</div>
                    <ul>
                      ${exp.details.map(detail => `<li>${typeof detail === 'object' ? detail.text : detail}</li>`).join('')}
                    </ul>
                  </div>
                `).join('')}
              </div>

              <div class="section">
                <div class="section-title">Projects</div>
                ${data.projects.map(project => `
                  <div class="project-item">
                    <h3>${project.name}</h3>
                    <div class="date">${format(project.durationStart)} - ${format(project.durationEnd)}</div>
                    <p>${project.details}</p>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      `
    },
    template2: {
      label: 'Modern Two-Column',
      render: (data, format) => `
        <div class="container" data-template="template2">
          <style>
            .container[data-template="template2"] {
              max-width: 850px;
              margin: 20px auto;
              padding: 20px;
              background: #fff;
              font-family: 'Arial', sans-serif;
              line-height: 1.6;
              color: #333;
            }
            .header {
              text-align: center;
              border-bottom: 2px solid #2c3e50;
              padding-bottom: 15px;
              margin-bottom: 20px;
            }
            .header h1 {
              font-size: 32px;
              margin: 0;
              color: #2c3e50;
            }
            .header h2 {
              font-size: 18px;
              font-weight: normal;
              color: #7f8c8d;
              margin: 5px 0;
            }
            .contact-info {
              font-size: 14px;
              margin-bottom: 20px;
            }
            .contact-info a {
              color: #3498db;
              text-decoration: none;
            }
            .two-column {
              display: flex;
              gap: 30px;
            }
            .left-column {
              flex: 1;
              min-width: 200px;
            }
            .right-column {
              flex: 2;
            }
            .section {
              margin-bottom: 25px;
            }
            .section-title {
              font-size: 20px;
              font-weight: bold;
              color: #2c3e50;
              border-bottom: 1px solid #3498db;
              padding-bottom: 5px;
              margin-bottom: 15px;
              text-transform: uppercase;
            }
            .experience-item, .education-item, .project-item {
              margin-bottom: 20px;
            }
            .experience-item h3, .project-item h3 {
              font-size: 18px;
              margin: 0 0 5px;
              color: #34495e;
            }
            .company, .institution {
              font-weight: bold;
              color: #7f8c8d;
            }
            .date {
              font-size: 14px;
              color: #7f8c8d;
              margin-bottom: 10px;
            }
            ul {
              padding-left: 20px;
              margin: 0;
            }
            li {
              margin-bottom: 8px;
            }
            .skills-list {
              list-style: none;
              padding: 0;
              display: flex;
              flex-wrap: wrap;
              gap: 10px;
            }
            .skills-list li {
              background: #f0f0f0;
              padding: 5px 10px;
              border-radius: 4px;
              font-size: 14px;
            }
            @media (max-width: 600px) {
              .two-column {
                flex-direction: column;
              }
            }
            @media print {
              body {
                margin: 0;
              }
              .container {
                box-shadow: none;
                margin: 0;
                padding: 10px;
              }
            }
          </style>

          <div class="header">
            <h1>${data.name}</h1>
            <h2>${data.title}</h2>
          </div>

          <div class="contact-info">
            <p>Email: <a href="mailto:${data.email}">${data.email}</a> | Phone: ${data.phone} | LinkedIn: <a href="${data.linkedin}" target="_blank">LinkedIn</a> | GitHub: <a href="${data.github}" target="_blank">GitHub</a></p>
          </div>

          <div class="two-column">
            <div class="left-column">
              <div class="section">
                <h2 class="section-title">Skills</h2>
                <ul class="skills-list">
                  ${data.skills.map(skill => `<li>${skill}</li>`).join('')}
                </ul>
              </div>

              <div class="section">
                <h2 class="section-title">Education</h2>
                <div class="education-item">
                  <h3>${data.education.qualification}</h3>
                  <p class="institution">${data.education.institution}</p>
                  <p class="date">${format(data.education.startDate)} - ${data.education.isPresent ? 'Present' : format(data.education.endDate)}</p>
                </div>
              </div>
            </div>

            <div class="right-column">
              <div class="section">
                <h2 class="section-title">Professional Summary</h2>
                <p>${data.about}</p>
              </div>

              <div class="section">
                <h2 class="section-title">Work Experience</h2>
                ${data.experience.map(exp => `
                  <div class="experience-item">
                    <h3>${exp.title}</h3>
                    <p class="company">${exp.company}</p>
                    <p class="date">${format(exp.startDate)} - ${exp.isPresent ? 'Present' : format(exp.endDate)}</p>
                    <ul>
                      ${exp.details.map(detail => `<li>${detail}</li>`).join('')}
                    </ul>
                  </div>
                `).join('')}
              </div>

              <div class="section">
                <h2 class="section-title">Projects</h2>
                ${data.projects.map(project => `
                  <div class="project-item">
                    <h3>${project.name}</h3>
                    <p class="date">${format(project.durationStart)} - ${format(project.durationEnd)}</p>
                    <p>${project.details}</p>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      `
    }
  };

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
    if (!pdfMakeReady || !window.pdfMake) {
      alert('PDF generator is not ready. Please try again.');
      return;
    }

    try {
      const docDefinition = {
        pageSize: 'A4',
        pageMargins: [40, 40, 40, 40],
        content: [
          // Header section
          {
            text: formData.name,
            style: 'header'
          },
          {
            text: formData.title,
            style: 'subheader'
          },
          {
            text: [
              { text: 'Email: ', bold: true }, formData.email, ' | ',
              { text: 'Phone: ', bold: true }, formData.phone, ' | ',
              { text: 'LinkedIn: ', bold: true }, formData.linkedin, ' | ',
              { text: 'GitHub: ', bold: true }, formData.github
            ],
            style: 'contact'
          },
          // Two-column layout
          {
            columns: [
              // Left column (30%)
              {
                width: '30%',
                stack: [
                  {
                    text: 'SKILLS',
                    style: 'sectionHeader'
                  },
                  {
                    ul: formData.skills.map(skill => 
                      typeof skill === 'object' ? skill : skill
                    )
                  },
                  {
                    text: 'EDUCATION',
                    style: 'sectionHeader',
                    marginTop: 20
                  },
                  {
                    text: formData.education.qualification,
                    style: 'jobTitle'
                  },
                  {
                    text: formData.education.institution,
                    style: 'normal'
                  },
                  {
                    text: `${formatMonthYear(formData.education.startDate)} - ${formData.education.isPresent ? 'Present' : formatMonthYear(formData.education.endDate)}`,
                    style: 'date'
                  }
                ]
              },
              // Right column (70%)
              {
                width: '70%',
                stack: [
                  {
                    text: 'PROFESSIONAL SUMMARY',
                    style: 'sectionHeader'
                  },
                  {
                    text: formData.about,
                    style: 'normal'
                  },
                  {
                    text: 'EXPERIENCE',
                    style: 'sectionHeader',
                    marginTop: 20
                  },
                  ...formData.experience.map(exp => ([
                    {
                      text: exp.title,
                      style: 'jobTitle'
                    },
                    {
                      text: exp.company,
                      style: 'company'
                    },
                    {
                      text: `${formatMonthYear(exp.startDate)} - ${exp.isPresent ? 'Present' : formatMonthYear(exp.endDate)}`,
                      style: 'date'
                    },
                    {
                      ul: exp.details.map(detail => 
                        typeof detail === 'object' ? detail : detail
                      )
                    }
                  ])).flat(),
                  {
                    text: 'PROJECTS',
                    style: 'sectionHeader',
                    marginTop: 20
                  },
                  ...formData.projects.map(project => ([
                    {
                      text: project.name,
                      style: 'jobTitle'
                    },
                    {
                      text: `${formatMonthYear(project.durationStart)} - ${formatMonthYear(project.durationEnd)}`,
                      style: 'date'
                    },
                    {
                      text: project.details,
                      style: 'normal'
                    }
                  ])).flat()
                ]
              }
            ]
          }
        ],
        styles: {
          header: {
            fontSize: 28,
            bold: true,
            alignment: 'center',
            margin: [0, 0, 0, 5]
          },
          subheader: {
            fontSize: 18,
            color: '#666666',
            alignment: 'center',
            margin: [0, 0, 0, 20]
          },
          contact: {
            fontSize: 11,
            alignment: 'center',
            margin: [0, 0, 0, 30]
          },
          sectionHeader: {
            fontSize: 16,
            bold: true,
            decoration: 'underline',
            decorationStyle: 'solid',
            decorationColor: '#3498db',
            margin: [0, 20, 0, 10]
          },
          jobTitle: {
            fontSize: 14,
            bold: true,
            margin: [0, 5, 0, 0]
          },
          company: {
            fontSize: 12,
            bold: true,
            color: '#666666',
            margin: [0, 2, 0, 2]
          },
          date: {
            fontSize: 11,
            italics: true,
            color: '#666666',
            margin: [0, 2, 0, 5]
          },
          normal: {
            fontSize: 11,
            margin: [0, 2, 0, 5]
          },
          bulletList: {
            fontSize: 11,
            margin: [0, 0, 0, 15]
          },
          skill: {
            fontSize: 11,
            margin: [0, 5, 0, 15]
          }
        },
        defaultStyle: {
          fontSize: 11,
          lineHeight: 1.4,
          color: '#333333'
        }
      };

      window.pdfMake.createPdf(docDefinition).download(`${formData.name || 'resume'}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please check your input data and try again.');
    }
  };

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
            <button onClick={downloadPDF} className="button mt-4" style={{ background: '#2ecc71' }}>Download as PDF</button>
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
