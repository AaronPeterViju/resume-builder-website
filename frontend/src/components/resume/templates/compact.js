import { templateConfig } from '../config';

export const compact = {
  label: 'Compact',
  render: (data, formatMonthYear) => `
    <div class="resume-container">
      <style>
        .resume-container {
          max-width: 700px;
          margin: 30px auto;
          padding: 25px;
          font-family: 'Arial', sans-serif;
          line-height: 1.6;
          color: ${templateConfig.colors.text};
          background: white;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          border-radius: 10px;
        }
        .header {
          text-align: center;
          padding: 20px;
          background: ${templateConfig.colors.background};
          border-bottom: 3px solid ${templateConfig.colors.accent};
          margin-bottom: 25px;
        }
        .header h1 {
          font-size: 28px;
          margin: 0;
          color: ${templateConfig.colors.primary};
          font-weight: 700;
        }
        .header h2 {
          font-size: 16px;
          margin: 5px 0 0;
          color: ${templateConfig.colors.secondary};
          font-weight: 400;
        }
        .contact-info {
          font-size: 12px;
          color: ${templateConfig.colors.secondary};
          text-align: center;
          margin-bottom: 20px;
        }
        .contact-info a {
          color: ${templateConfig.colors.accent};
          text-decoration: none;
        }
        .section {
          margin-bottom: 25px;
          padding: 0 15px;
        }
        .section-title {
          font-size: 18px;
          font-weight: 600;
          color: ${templateConfig.colors.primary};
          border-left: 4px solid ${templateConfig.colors.accent};
          padding-left: 10px;
          margin-bottom: 15px;
          text-transform: uppercase;
        }
        .content-block {
          background: ${templateConfig.colors.background};
          padding: 15px;
          border-radius: 8px;
          margin-bottom: 15px;
          border: 1px solid rgba(0,0,0,0.05);
        }
        .content-block h3 {
          font-size: 16px;
          color: ${templateConfig.colors.primary};
          margin: 0 0 5px;
          font-weight: 600;
        }
        .subtitle {
          font-size: 14px;
          color: ${templateConfig.colors.accent};
          font-weight: 500;
          margin-bottom: 5px;
        }
        .date {
          font-size: 12px;
          color: ${templateConfig.colors.secondary};
          margin-bottom: 10px;
        }
        .details-list {
          padding-left: 20px;
          margin: 5px 0 0;
        }
        .details-list li {
          font-size: 13px;
          margin-bottom: 5px;
        }
        .skills-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          padding: 0;
          list-style: none;
        }
        .skill-item {
          background: white;
          padding: 6px 12px;
          border-radius: 15px;
          font-size: 12px;
          color: ${templateConfig.colors.primary};
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        .summary-text {
          font-size: 14px;
          line-height: 1.7;
        }
        .icon {
          color: ${templateConfig.colors.accent};
          margin-right: 5px;
        }
        .contact-item {
          display: inline-flex;
          align-items: center;
          margin: 0 10px;
        }
        .project-title {
          display: flex;
          align-items: center;
          gap: 5px;
        }
        a {
          color: ${templateConfig.colors.accent};
          text-decoration: none;
        }
        a:hover {
          text-decoration: underline;
        }
      </style>

      <div class="header">
        <h1>${data.name || 'Your Name'}</h1>
        <h2>${data.title || 'Your Title'}</h2>
      </div>

      <div class="contact-info">
        <span class="contact-item">
          <a href="mailto:${data.email}">${data.email}</a>
        </span>
        <span class="contact-item">
          ${data.phone}
        </span>
        <span class="contact-item">
          <a href="${data.linkedin}" target="_blank">LinkedIn</a>
        </span>
        <span class="contact-item">
          <a href="${data.github}" target="_blank">GitHub</a>
        </span>
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
        ${(data.experience || []).map(exp => `
          <div class="content-block">
            <h3>${exp.title || 'Job Title'}</h3>
            <div class="subtitle">${exp.company || 'Company Name'}</div>
            <div class="date">
              ${formatMonthYear(exp.startDate) || 'Start Date'} - 
              ${exp.isPresent ? 'Present' : formatMonthYear(exp.endDate) || 'End Date'}
            </div>
            <ul class="details-list">
              ${(exp.details || []).map(detail => `
                <li>${typeof detail === 'string' ? detail : 'Detail'}</li>
              `).join('')}
            </ul>
          </div>
        `).join('')}
      </div>
      <div class="section">
        <h2 class="section-title">Skills</h2>
        <div class="content-block">
          <ul class="skills-list">
            ${(data.skills || []).map(skill => `
              <li class="skill-item">${typeof skill === 'string' ? skill : 'Skill'}</li>
            `).join('')}
          </ul>
        </div>
      </div>
      <div class="section">
        <h2 class="section-title">Projects</h2>
        ${(data.projects || []).map(project => `
          <div class="content-block">
            <div class="project-title">
              <h3>${project.name}</h3>
            </div>
            <div class="date">
              ${formatMonthYear(project.durationStart)} - ${formatMonthYear(project.durationEnd)}
            </div>
            <p class="summary-text">${project.details}</p>
          </div>
        `).join('')}
        </div>
    </div>
  `
}; 
