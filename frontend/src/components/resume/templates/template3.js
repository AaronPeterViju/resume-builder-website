import { templateConfig } from '../config';

export const template3 = {
  label: 'Ultra Minimal',
  render: (data, formatMonthYear) => `
    <div class="resume-container">
      <style>
        .resume-container {
          max-width: 800px;
          margin: 30px auto;
          padding: 40px 50px;
          font-family: 'Inter', system-ui, sans-serif;
          line-height: 1.5;
          color: #333;
          background: white;
        }
        .header {
          margin-bottom: 40px;
        }
        .header-left h1 {
          font-size: 32px;
          margin: 0;
          color: #000;
          font-weight: 600;
          letter-spacing: -0.5px;
        }
        .header-left h2 {
          font-size: 18px;
          margin: 8px 0 0;
          color: #666;
          font-weight: 400;
        }
        .contact-info {
          margin-top: 15px;
          font-size: 14px;
          color: #666;
        }
        .contact-info a {
          color: #333;
          text-decoration: none;
          margin-right: 20px;
        }
        .section {
          margin-bottom: 35px;
        }
        .section-title {
          font-size: 16px;
          font-weight: 600;
          color: #000;
          margin-bottom: 20px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .content-block {
          margin-bottom: 25px;
          position: relative;
        }
        .content-block h3 {
          font-size: 17px;
          color: #000;
          margin: 0;
          font-weight: 500;
        }
        .subtitle {
          font-size: 15px;
          color: #666;
          font-weight: 400;
          margin: 4px 0;
        }
        .date {
          font-size: 14px;
          color: #888;
          margin-bottom: 10px;
        }
        .details-list {
          padding-left: 0;
          list-style: none;
          margin: 10px 0 0;
        }
        .details-list li {
          font-size: 14px;
          margin-bottom: 8px;
          color: #444;
          line-height: 1.6;
          padding-left: 20px;
          position: relative;
        }
        .details-list li::before {
          content: "•";
          position: absolute;
          left: 0;
          color: #888;
        }
        .skills-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          padding: 0;
          list-style: none;
        }
        .skill-item {
          font-size: 14px;
          color: #444;
          font-weight: 400;
          border-bottom: 1px solid #ddd;
          padding: 4px 0;
        }
        .summary-text {
          font-size: 14px;
          line-height: 1.6;
          color: #444;
        }
        .project-title {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        a:hover {
          color: #000;
          border-bottom: 1px solid #000;
        }
        @media print {
          .resume-container {
            margin: 0;
            padding: 30px 40px;
          }
        }
      </style>

      <div class="header">
        <div class="header-left">
          <h1>${data.name || 'Your Name'}</h1>
          <h2>${data.title || 'Your Title'}</h2>
        </div>
        <div class="contact-info">
          <a href="mailto:${data.email || ''}">${data.email || ''}</a>
          <span>${data.phone || ''}</span>
          <a href="${data.linkedin || '#'}" target="_blank">LinkedIn</a>
          <a href="${data.github || '#'}" target="_blank">GitHub</a>
        </div>
      </div>

      <div class="section">
        <h2 class="section-title">Professional Summary</h2>
        <div class="content-block">
          <p class="summary-text">${data.about || 'A brief summary about yourself.'}</p>
        </div>
      </div>
      
      <div class="section">
        <h2 class="section-title">Education</h2>
        <div class="content-block">
          <h3>${data.education?.qualification || 'Degree'}</h3>
          <div class="subtitle">${data.education?.institution || 'Institution'}</div>
          <div class="date">
            ${formatMonthYear(data.education?.startDate) || 'Start'} - 
            ${data.education?.isPresent ? 'Present' : formatMonthYear(data.education?.endDate) || 'End'}
          </div>
        </div>
      </div>
      <div class="section">
        <h2 class="section-title">Experience</h2>
        ${((data.experience || []).map(exp => `
          <div class="content-block">
            <h3>${exp.title || 'Job Title'}</h3>
            <div class="subtitle">${exp.company || 'Company Name'}</div>
            <div class="date">
              ${formatMonthYear(exp.startDate) || 'Start Date'} - 
              ${exp.isPresent ? 'Present' : formatMonthYear(exp.endDate) || 'End Date'}
            </div>
            <ul class="details-list">
              ${((exp.details || []).map(detail => `
                <li>${typeof detail === 'string' ? detail : 'Detail'}</li>
              `).join('') || '')}
            </ul>
          </div>
        `).join('') || '')}
      </div>
      <div class="section">
        <h2 class="section-title">Skills</h2>
        <div class="content-block">
          <ul class="skills-list">
            ${((data.skills || []).map(skill => `
              <li class="skill-item">${typeof skill === 'string' ? skill : 'Skill'}</li>
            `).join('') || '')}
          </ul>
        </div>
      </div>
      <div class="section">
        <h2 class="section-title">Projects</h2>
        ${((data.projects || []).map(project => `
          <div class="content-block">
            <div class="project-title">
              <h3>${project.name || 'Project'}</h3>
            </div>
            <div class="date">
              ${formatMonthYear(project.durationStart) || ''} - ${formatMonthYear(project.durationEnd) || ''}
            </div>
            <p class="summary-text">${project.details || ''}</p>
          </div>
        `).join('') || '')}
      </div>
    </div>
  `
}; 
