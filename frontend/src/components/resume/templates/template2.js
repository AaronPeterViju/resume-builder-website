import { templateConfig } from '../config';

export const template2 = {
  label: 'Modern Professional',
  render: (data, formatMonthYear) => `
    <div class="resume-container">
      <style>
        .resume-container {
          max-width: 850px;
          margin: 40px auto;
          padding: 40px;
          font-family: 'Helvetica Neue', Arial, sans-serif;
          line-height: 1.6;
          color: ${templateConfig.colors.text};
          background: white;
        }
        .header {
          display: flex;
          justify-content: space-between;
          padding: 30px;
          background: ${templateConfig.colors.primary};
          color: white;
          border-radius: 15px;
          margin-bottom: 40px;
          position: relative;
          overflow: hidden;
        }
        .header::after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 200px;
          height: 100%;
          background: linear-gradient(135deg, transparent 50%, ${templateConfig.colors.accent} 50%);
          opacity: 0.1;
        }
        .name-title {
          z-index: 1;
        }
        .name-title h1 {
          font-size: 28px;
          margin: 0;
          font-weight: 700;
          letter-spacing: -1px;
          color: white;
        }
        .name-title h2 {
          font-size: 18px;
          margin: 5px 0 0;
          font-weight: 400;
          opacity: 0.9;
          color:white;
        }
        .contact-info {
          text-align: right;
          font-size: 14px;
          z-index: 1;
        }
        .contact-info p {
          margin: 5px 0;
          opacity: 0.9;
        }
        .main-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 30px;
        }
        .left-sidebar {
          grid-column: span 4;
          padding-right: 30px;
        }
        .main-content {
          grid-column: span 8;
        }
        .section {
          margin-bottom: 35px;
        }
        .section-title {
          position: relative;
          color: ${templateConfig.colors.primary};
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 20px;
          display: inline-block;
        }
        .section-title::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -5px;
          width: 100%;
          height: 2px;
          background: ${templateConfig.colors.accent};
        }
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          gap: 10px;
        }
        .skill-item {
          background: white;
          padding: 10px;
          border-radius: 8px;
          font-size: 14px;
          text-align: center;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
          border: 1px solid ${templateConfig.colors.accent}20;
          transition: transform 0.2s;
        }
        .skill-item:hover {
          transform: translateY(-2px);
        }
        .experience-item {
          padding: 20px;
          background: white;
          border-radius: 12px;
          margin-bottom: 20px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          border: 1px solid rgba(0,0,0,0.05);
        }
        .experience-item h3 {
          color: ${templateConfig.colors.primary};
          font-size: 18px;
          margin: 0;
          font-weight: 600;
        }
        .company {
          color: ${templateConfig.colors.accent};
          font-weight: 500;
          font-size: 16px;
          margin: 5px 0;
        }
        .date {
          display: inline-block;
          padding: 4px 12px;
          background: ${templateConfig.colors.background};
          border-radius: 15px;
          font-size: 13px;
          color: ${templateConfig.colors.secondary};
          margin: 5px 0;
        }
        .details-list {
          margin: 15px 0 0;
          padding-left: 20px;
        }
        .details-list li {
          margin-bottom: 8px;
          font-size: 14px;
          line-height: 1.6;
        }
        .education-item {
          background: white;
          padding: 20px;
          border-radius: 12px;
          margin-bottom: 15px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          border: 1px solid rgba(0,0,0,0.05);
        }
        .education-item h3 {
          color: ${templateConfig.colors.primary};
          margin: 0;
          font-size: 16px;
          font-weight: 600;
        }
        .institution {
          color: ${templateConfig.colors.accent};
          font-size: 14px;
          margin: 5px 0;
        }
        .summary-text {
          font-size: 15px;
          line-height: 1.8;
          color: ${templateConfig.colors.text};
          padding: 20px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          border: 1px solid rgba(0,0,0,0.05);
        }
        .project-item {
          background: white;
          padding: 20px;
          border-radius: 12px;
          margin-bottom: 20px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          border: 1px solid rgba(0,0,0,0.05);
        }
        .project-item h3 {
          color: ${templateConfig.colors.primary};
          font-size: 16px;
          margin: 0;
          font-weight: 600;
        }
        .project-details {
          margin-top: 10px;
          font-size: 14px;
          line-height: 1.6;
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
      </style>

      <div class="header">
        <div class="name-title">
          <h1>${data.name}</h1>
          <h2>${data.title}</h2>
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
      </div>

      <div class="main-grid">
        <div class="left-sidebar">
          <div class="section">
            <div class="section-title">Skills</div>
            <div class="skills-grid">
              ${(data.skills || []).map(skill => `
                <div class="skill-item">${typeof skill === 'object' ? skill.text || '' : skill}</div>
              `).join('')}
            </div>
          </div>

          <div class="section">
            <div class="section-title">Education</div>
            <div class="education-item">
              <h3>${data.education?.qualification}</h3>
              <div class="institution">${data.education?.institution}</div>
              <div class="date">
                ${formatMonthYear(data.education?.startDate)} - 
                ${data.education?.isPresent ? 'Present' : formatMonthYear(data.education?.endDate)}
              </div>
            </div>
          </div>
        </div>

        <div class="main-content">
          <div class="section">
            <div class="section-title">Professional Summary</div>
            <p class="summary-text">${data.about}</p>
          </div>

          <div class="section">
            <div class="section-title">Experience</div>
            ${(data.experience || []).map(exp => `
              <div class="experience-item">
                <h3>${exp.title}</h3>
                <div class="company">${exp.company}</div>
                <div class="date">
                  ${formatMonthYear(exp.startDate)} - ${exp.isPresent ? 'Present' : formatMonthYear(exp.endDate)}
                </div>
                <ul class="details-list">
                  ${(exp.details || []).map(detail => `
                    <li>${typeof detail === 'object' ? detail.text || '' : detail}</li>
                  `).join('')}
                </ul>
              </div>
            `).join('')}
          </div>

          <div class="section">
            <div class="section-title">Projects</div>
            ${(data.projects || []).map(project => `
              <div class="project-item">
                <div class="project-title">
                  <h3>${project.name}</h3>
                </div>
                <div class="date">
                  ${formatMonthYear(project.durationStart)} - ${formatMonthYear(project.durationEnd)}
                </div>
                <p class="project-details">${project.details}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `
}; 
