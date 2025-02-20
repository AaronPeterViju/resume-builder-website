import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

//popular jobs
const commonRoles = [
  'Software Engineer',
  'Product Manager',
  'Data Scientist',
  'Project Manager',
  'Software Tester',
  'Other'
];

// basic form fields 
const formFields = [
  { name: 'name', label: 'Name', type: 'text' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'phone', label: 'Phone', type: 'tel' },
  { name: 'linkedin', label: 'LinkedIn', type: 'url' },
  { name: 'github', label: 'GitHub', type: 'url' },
  { name: 'about', label: 'About Me', type: 'textarea' }
];

// 
const styles = `
  .resume-preview {
    margin-top: 2rem;
    padding: 20px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  .preview {
    margin-top: 1rem;
    overflow: auto;
  }
`;

// resume templates 
const templateConfigs = {
  // temp 1 minimal design
  template1: {
    label: 'temp1',
    render: (data, formatDate) => (
      <div className="container" data-template="template1">
        <style>{styles}{`
          .container[data-template="template1"] { max-width: 850px; margin: 30px auto; padding: 40px; font-family: 'Helvetica Neue', Arial, sans-serif; box-shadow: 0 5px 15px rgba(0,0,0,0.1); }
          .header[data-template="template1"] { text-align: center; padding-bottom: 30px; border-bottom: 2px solid #e2e8f0; }
          .header[data-template="template1"] h1 { font-size: 36px; color: #2d3748; margin: 0; font-weight: 700; }
          .header[data-template="template1"] h2 { font-size: 18px; color: #4a5568; margin: 10px 0; }
          .contact-info[data-template="template1"] { display: flex; justify-content: center; gap: 20px; margin-top: 15px; font-size: 14px; color: #4a5568; }
          .section[data-template="template1"] { margin-bottom: 25px; }
          .section-title[data-template="template1"] { font-size: 20px; color: #2d3748; font-weight: 600; margin-bottom: 15px; padding-bottom: 5px; border-bottom: 2px solid #e2e8f0; }
          .experience-item[data-template="template1"] { margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #e2e8f0; }
          .experience-title[data-template="template1"] { font-size: 16px; font-weight: 600; color: #2d3748; }
          .experience-company[data-template="template1"] { color: #4a5568; margin: 5px 0; }
          .experience-date[data-template="template1"] { color: #718096; font-size: 14px; margin-bottom: 10px; }
          .experience-details[data-template="template1"] { list-style-type: disc; padding-left: 20px; margin: 10px 0; }
          .experience-details[data-template="template1"] li { color: #4a5568; margin-bottom: 5px; font-size: 14px; }
          .skills-list[data-template="template1"] { display: flex; flex-wrap: wrap; gap: 10px; }
          .skill-item[data-template="template1"] { background: #edf2f7; padding: 6px 12px; border-radius: 4px; font-size: 14px; color: #2d3748; }
        `}</style>
        <header className="header" data-template="template1">
          <h1>{data.name}</h1>
          <h2>{data.title}</h2>
          <div className="contact-info" data-template="template1">
            <a href={`mailto:${data.email}`}>{data.email}</a>
            <span>{data.phone}</span>
            <a href={data.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href={data.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </header>
        <div className="section" data-template="template1">
          <div className="section-title" data-template="template1">About</div>
          <p>{data.about}</p>
        </div>
        <div className="section" data-template="template1">
          <div className="section-title" data-template="template1">Experience</div>
          {data.experience.map((exp, index) => (
            <div key={index} className="experience-item" data-template="template1">
              <div className="experience-title" data-template="template1">{exp.title}</div>
              <div className="experience-company" data-template="template1">{exp.company}</div>
              <div className="experience-date" data-template="template1">
                {formatDate(exp.startDate)} - {exp.isPresent ? 'Present' : formatDate(exp.endDate)}
              </div>
              <ul className="experience-details" data-template="template1">
                {exp.details.map((detail, i) => <li key={i}>{detail}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="section" data-template="template1">
          <div className="section-title" data-template="template1">Education</div>
          <div className="experience-item" data-template="template1">
            <div className="experience-title" data-template="template1">{data.education.qualification}</div>
            <div className="experience-company" data-template="template1">{data.education.institution}</div>
            <div className="experience-date" data-template="template1">
              {formatDate(data.education.startDate)} - {data.education.isPresent ? 'Present' : formatDate(data.education.endDate)}
            </div>
          </div>
        </div>
        <div className="section" data-template="template1">
          <div className="section-title" data-template="template1">Skills</div>
          <div className="skills-list" data-template="template1">
            {data.skills.map((skill, index) => <div key={index} className="skill-item" data-template="template1">{skill}</div>)}
          </div>
        </div>
        <div className="section" data-template="template1">
          <div className="section-title" data-template="template1">Projects</div>
          {data.projects.map((project, index) => (
            <div key={index} className="experience-item" data-template="template1">
              <div className="experience-title" data-template="template1">{project.name}</div>
              <div className="experience-date" data-template="template1">
                {formatDate(project.durationStart)} - {formatDate(project.durationEnd)}
              </div>
              <p>{project.details}</p>
            </div>
          ))}
        </div>
      </div>
    )
  },

  // temp 2 gradient coulou
  template2: {
    label: 'temp2',
    render: (data, formatDate) => (
      <div className="container" data-template="template2">
        <style>{styles}{`
          .container[data-template="template2"] { max-width: 850px; margin: 30px auto; padding: 40px; font-family: 'Helvetica Neue', Arial, sans-serif; box-shadow: 0 10px 25px rgba(0,0,0,0.1); }
          .header[data-template="template2"] { background: linear-gradient(135deg, #6366f1, #a855f7); color: white; padding: 40px; margin: -40px -40px 40px; }
          .header[data-template="template2"] h1 { font-size: 42px; margin: 0; font-weight: 800; }
          .header[data-template="template2"] h2 { font-size: 20px; margin: 10px 0; opacity: 0.9; }
          .contact-info[data-template="template2"] { background: rgba(255,255,255,0.1); padding: 15px 25px; border-radius: 8px; margin-top: 20px; display: flex; gap: 20px; }
          .contact-info[data-template="template2"] a { color: white; text-decoration: none; }
          .section[data-template="template2"] { margin-bottom: 35px; }
          .section-title[data-template="template2"] { font-size: 24px; color: #6366f1; font-weight: 700; margin-bottom: 20px; display: flex; align-items: center; }
          .section-title[data-template="template2"]::after { content: ''; flex: 1; height: 3px; margin-left: 15px; background: linear-gradient(to right, #6366f1, transparent); }
          .experience-item[data-template="template2"] { margin-bottom: 25px; padding: 20px; background: #f8fafc; border-radius: 8px; border-left: 4px solid #6366f1; }
          .experience-title[data-template="template2"] { font-size: 18px; font-weight: 600; color: #1e293b; }
          .experience-company[data-template="template2"] { color: #6366f1; font-weight: 500; margin: 5px 0; }
          .experience-date[data-template="template2"] { color: #64748b; font-size: 14px; margin-bottom: 10px; }
          .experience-details[data-template="template2"] { list-style: none; padding-left: 20px; }
          .experience-details[data-template="template2"] li { position: relative; padding-left: 20px; margin-bottom: 8px; color: #475569; }
          .experience-details[data-template="template2"] li::before { content: "→"; position: absolute; left: 0; color: #6366f1; }
          .skills-grid[data-template="template2"] { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 15px; }
          .skill-item[data-template="template2"] { background: linear-gradient(135deg, #6366f1, #a855f7); color: white; padding: 10px 15px; border-radius: 8px; text-align: center; }
        `}</style>
        <header className="header" data-template="template2">
          <h1>{data.name}</h1>
          <h2>{data.title}</h2>
          <div className="contact-info" data-template="template2">
            <a href={`mailto:${data.email}`}>{data.email}</a>
            <span>{data.phone}</span>
            <a href={data.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href={data.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </header>
        <div className="section" data-template="template2">
          <div className="section-title" data-template="template2">About</div>
          <p>{data.about}</p>
        </div>
        <div className="section" data-template="template2">
          <div className="section-title" data-template="template2">Experience</div>
          {data.experience.map((exp, index) => (
            <div key={index} className="experience-item" data-template="template2">
              <div className="experience-title" data-template="template2">{exp.title}</div>
              <div className="experience-company" data-template="template2">{exp.company}</div>
              <div className="experience-date" data-template="template2">
                {formatDate(exp.startDate)} - {exp.isPresent ? 'Present' : formatDate(exp.endDate)}
              </div>
              <ul className="experience-details" data-template="template2">
                {exp.details.map((detail, i) => <li key={i}>{detail}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="section" data-template="template2">
          <div className="section-title" data-template="template2">Education</div>
          <div className="experience-item" data-template="template2">
            <div className="experience-title" data-template="template2">{data.education.qualification}</div>
            <div className="experience-company" data-template="template2">{data.education.institution}</div>
            <div className="experience-date" data-template="template2">
              {formatDate(data.education.startDate)} - {data.education.isPresent ? 'Present' : formatDate(data.education.endDate)}
            </div>
          </div>
        </div>
        <div className="section" data-template="template2">
          <div className="section-title" data-template="template2">Skills</div>
          <div className="skills-grid" data-template="template2">
            {data.skills.map((skill, index) => <div key={index} className="skill-item" data-template="template2">{skill}</div>)}
          </div>
        </div>
        <div className="section" data-template="template2">
          <div className="section-title" data-template="template2">Projects</div>
          {data.projects.map((project, index) => (
            <div key={index} className="experience-item" data-template="template2">
              <div className="experience-title" data-template="template2">{project.name}</div>
              <div className="experience-date" data-template="template2">
                {formatDate(project.durationStart)} - {formatDate(project.durationEnd)}
              </div>
              <p>{project.details}</p>
            </div>
          ))}
        </div>
      </div>
    )
  },

  // Temp3 gradient blue
  template3: {
    label: 'temp3',
    render: (data, formatDate) => (
      <div className="container" data-template="template3">
        <style>{styles}{`
          .container[data-template="template3"] { max-width: 850px; margin: 30px auto; padding: 40px; font-family: 'Helvetica Neue', Arial, sans-serif; box-shadow: 0 10px 25px rgba(0,0,0,0.1); }
          .header[data-template="template3"] { position: relative; padding: 40px; margin: -40px -40px 40px; background: linear-gradient(45deg, #000046, #1CB5E0); color: white; }
          .header[data-template="template3"] h1 { font-size: 44px; margin: 0; font-weight: 700; letter-spacing: 1px; }
          .header[data-template="template3"] h2 { font-size: 20px; margin: 10px 0 20px; font-weight: 400; opacity: 0.9; }
          .contact-info[data-template="template3"] { display: flex; gap: 25px; flex-wrap: wrap; padding: 15px 0; border-top: 1px solid rgba(255,255,255,0.2); margin-top: 20px; }
          .contact-info[data-template="template3"] a { color: white; text-decoration: none; }
          .section[data-template="template3"] { margin-bottom: 35px; background: #ffffff; border-radius: 8px; padding: 25px; }
          .section-title[data-template="template3"] { font-size: 24px; color: #000046; font-weight: 700; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 1px; border-bottom: 3px solid #1CB5E0; padding-bottom: 10px; }
          .experience-item[data-template="template3"] { margin-bottom: 25px; padding: 20px; background: #f8fafc; border-radius: 8px; position: relative; transition: transform 0.2s; }
          .experience-item[data-template="template3"]:hover { transform: translateX(5px); }
          .experience-title[data-template="template3"] { font-size: 18px; font-weight: 600; color: #000046; }
          .experience-company[data-template="template3"] { color: #1CB5E0; font-weight: 500; margin: 5px 0; }
          .experience-date[data-template="template3"] { color: #64748b; font-size: 14px; margin-bottom: 10px; }
          .skills-grid[data-template="template3"] { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 15px; }
          .skill-item[data-template="template3"] { background: linear-gradient(45deg, #000046, #1CB5E0); color: white; padding: 12px 20px; border-radius: 8px; font-size: 15px; font-weight: 500; text-align: center; transition: all 0.3s; }
        `}</style>
        <header className="header" data-template="template3">
          <h1>{data.name}</h1>
          <h2>{data.title}</h2>
          <div className="contact-info" data-template="template3">
            <a href={`mailto:${data.email}`}>{data.email}</a>
            <span>{data.phone}</span>
            <a href={data.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href={data.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </header>
        <div className="section" data-template="template3">
          <div className="section-title" data-template="template3">About</div>
          <p>{data.about}</p>
        </div>
        <div className="section" data-template="template3">
          <div className="section-title" data-template="template3">Experience</div>
          {data.experience.map((exp, index) => (
            <div key={index} className="experience-item" data-template="template3">
              <div className="experience-title" data-template="template3">{exp.title}</div>
              <div className="experience-company" data-template="template3">{exp.company}</div>
              <div className="experience-date" data-template="template3">
                {formatDate(exp.startDate)} - {exp.isPresent ? 'Present' : formatDate(exp.endDate)}
              </div>
              <ul className="experience-details" data-template="template3">
                {exp.details.map((detail, i) => <li key={i}>{detail}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="section" data-template="template3">
          <div className="section-title" data-template="template3">Education</div>
          <div className="experience-item" data-template="template3">
            <div className="experience-title" data-template="template3">{data.education.qualification}</div>
            <div className="experience-company" data-template="template3">{data.education.institution}</div>
            <div className="experience-date" data-template="template3">
              {formatDate(data.education.startDate)} - {data.education.isPresent ? 'Present' : formatDate(data.education.endDate)}
            </div>
          </div>
        </div>
        <div className="section" data-template="template3">
          <div className="section-title" data-template="template3">Skills</div>
          <div className="skills-grid" data-template="template3">
            {data.skills.map((skill, index) => <div key={index} className="skill-item" data-template="template3">{skill}</div>)}
          </div>
        </div>
        <div className="section" data-template="template3">
          <div className="section-title" data-template="template3">Projects</div>
          {data.projects.map((project, index) => (
            <div key={index} className="experience-item" data-template="template3">
              <div className="experience-title" data-template="template3">{project.name}</div>
              <div className="experience-date" data-template="template3">
                {formatDate(project.durationStart)} - {formatDate(project.durationEnd)}
              </div>
              <p>{project.details}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }
};

// function for resume builder
function ResumeBuilder() {
  // page navigation
  const navigate = useNavigate();

  // store info from user
  const [formData, setFormData] = useState({
    // Basic information
    name: '',
    title: '',
    email: '',
    phone: '',
    linkedin: '',
    github: '',
    about: '',

    // Work experience
    experience: [{ 
      title: '', 
      company: '', 
      startDate: '', 
      endDate: '', 
      isPresent: false, // Checkbox for current job
      details: [''] 
    }],

    // Education section
    education: { 
      qualification: '', 
      institution: '', 
      startDate: '', 
      endDate: '', 
      isPresent: false // Checkbox for current education
    },

    // Skills and projects sections
    skills: [''],
    projects: [{ name: '', details: '', durationStart: '', durationEnd: '' }],
    template: 'template1', 
  });

  //stores preview of resume
  const [preview, setPreview] = useState(null);

  // Add this state to track if "Other" is selected
  const [isCustomTitle, setIsCustomTitle] = useState(false);

  const formatMonthYear = (value) => value ? new Date(value).toLocaleString('default', { month: 'long', year: 'numeric' }) : 'Present';

  // handle form changes
  const handleNestedChange = (field, index, subField, value) => {
    const newData = { ...formData };
    if (subField) {
      newData[field][index][subField] = value;
    } else {
      newData[field][index] = value;
    }
    setFormData(newData);
  };

  //handle education changes
  const handleEducationChange = (field, value) => {
    setFormData({
      ...formData,
      education: {
        ...formData.education,
        [field]: value
      }
    });
  };

  // date selector 
  const DateSelector = ({ value, onChange, required, disabled, id }) => {
    //years
    const years = generateYearOptions();
    const [year, month] = value ? value.split('-') : ['', ''];
    const monthIndex = month ? parseInt(month) - 1 : '';

    //month
    const handleMonthChange = (selectedMonth) => {
      const monthIndex = months.indexOf(selectedMonth);
      const newMonth = (monthIndex + 1).toString().padStart(2, '0');
      
      // if year selected combine them
      if (year) {
        onChange({ target: { value: `${year}-${newMonth}` } });
      } else {
        // If no year selected, use current year
        const currentYear = new Date().getFullYear();
        onChange({ target: { value: `${currentYear}-${newMonth}` } });
      }
    };

    // Handle year selection
    const handleYearChange = (selectedYear) => {
      if (month) {
        onChange({ target: { value: `${selectedYear}-${month}` } });
      } else {
        // If no month selected, use January as default
        onChange({ target: { value: `${selectedYear}-01` } });
      }
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

  // Handle changes in form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //add new sections to the form
  const addExperience = () => {
    setFormData({
      ...formData,
      experience: [...formData.experience, { title: '', company: '', startDate: '', endDate: '', isPresent: false, details: [''] }],
    });
  };

  const addSkill = () => {
    setFormData({ ...formData, skills: [...formData.skills, ''] });
  };

  const addProject = () => {
    setFormData({ ...formData, projects: [...formData.projects, { name: '', details: '', durationStart: '', durationEnd: '' }] });
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

  //creates the final resume when the form is submitted
  const generateResume = (e) => {
    e.preventDefault();
    const template = templateConfigs[formData.template];
    if (!template) {
      console.error(`Template ${formData.template} not found`);
      return;
    }
    setPreview(template.render(formData, formatMonthYear));
  };

  //Update the template selector options
  const templates = Object.entries(templateConfigs).map(([value, config]) => ({
    value,
    label: config.label
  }));

  // Add the handleArrayChange function
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
              onChange={(e) => handleEducationChange('qualification', e.target.value)} 
              required 
            />
            <input 
              type="text" 
              id="education-institution" 
              name="institution" 
              className="form-input mb-2" 
              placeholder="Institution" 
              value={formData.education.institution} 
              onChange={(e) => handleEducationChange('institution', e.target.value)} 
              required 
            />
            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '0.9rem', color: '#666', marginBottom: '5px' }}>Start Date:</label>
                <DateSelector
                  id="education-start"
                  value={formData.education.startDate}
                  onChange={(e) => handleEducationChange('startDate', e.target.value)}
                  required
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '0.9rem', color: '#666', marginBottom: '5px' }}>End Date:</label>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <DateSelector
                    id="education-end"
                    value={formData.education.endDate}
                    onChange={(e) => handleEducationChange('endDate', e.target.value)}
                    required={!formData.education.isPresent}
                    disabled={formData.education.isPresent}
                  />
                  <label style={{ display: 'flex', alignItems: 'center', gap: '5px', whiteSpace: 'nowrap' }}>
                    <input
                      type="checkbox"
                      checked={formData.education.isPresent}
                      onChange={(e) => handleEducationChange('isPresent', e.target.checked)}
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
                ></textarea>
              </div>
            ))}
            <button type="button" onClick={addProject} className="button">Add Project</button>
          </div>
          <div className="form-group">
            <label htmlFor="template" className="form-label">Select Template:</label>
            <select id="template" name="template" className="form-input" value={formData.template} onChange={handleChange}>
              {templates.map(temp => (
                <option key={temp.value} value={temp.value}>{temp.label}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="button w-full">Generate Resume</button>
        </form>

        {preview && (
          <div className="resume-preview mt-6">
            <h2>Resume Preview</h2>
            <div className="preview">
              {preview}
            </div>
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
