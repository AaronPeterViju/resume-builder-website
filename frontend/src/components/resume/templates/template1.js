import { templateConfig } from '../config';

export const template1 = {
  label: 'Professional',
  render: (data, formatMonthYear) => `
    <div class="resume-container">
      <style>
        .resume-container {
          max-width: 800px;
          margin: 30px auto;
          padding: 40px;
          font-family: 'Arial', 'Helvetica', sans-serif;
          line-height: 1.4;
          color: #333;
          background: white;
          box-shadow: 0 1px 5px rgba(0,0,0,0.05);
        }
        .header {
          text-align: center;
          margin-bottom: 20px;
        }
        .header h1 {
          font-size: 24px;
          margin: 0 0 15px 0;
          color: #000;
          font-weight: 700;
        }
        .contact-info {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          font-size: 12px;
          color: #333;
          margin-bottom: 5px;
        }
        .contact-item {
          margin: 0 8px;
          display: inline-flex;
          align-items: center;
        }
        .contact-info a {
          color: #000;
          text-decoration: none;
        }
        .section {
          margin-bottom: 15px;
        }
        .section-title {
          font-size: 16px;
          text-transform: uppercase;
          color: #000;
          margin: 0 0 8px 0;
          font-weight: 700;
          border-bottom: 1px solid #000;
          padding-bottom: 3px;
        }
        .experience-item, .project-item, .education-item {
          margin-bottom: 12px;
        }
        .item-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 5px;
        }
        .item-title {
          font-size: 15px;
          font-weight: 700;
          color: #000;
          margin: 0;
        }
        .item-subtitle {
          font-size: 14px;
          font-style: italic;
          margin: 2px 0;
        }
        .date-range {
          font-size: 13px;
          font-style: italic;
          text-align: right;
        }
        .details-list {
          margin: 5px 0 0 15px;
          padding-left: 5px;
        }
        .details-list li {
          font-size: 13px;
          margin-bottom: 3px;
          position: relative;
          padding-left: 0;
          list-style-type: circle;
        }
        .skill-item {
          margin-bottom: 5px;
          font-size: 13px;
        }
        .skill-name {
          font-weight: 700;
        }
        .about-text {
          font-size: 13px;
          line-height: 1.5;
          margin: 0;
        }
        @media print {
          .resume-container {
            box-shadow: none;
            margin: 0;
            padding: 20px;
          }
        }
      </style>

      <div class="header">
        <h1>${data.name || 'Your Name'}</h1>
        <div class="contact-info">
          ${data.location ? `<span class="contact-item">📍 ${data.location}</span>` : ''}
          ${data.email ? `<span class="contact-item">✉️ <a href="mailto:${data.email}">${data.email}</a></span>` : ''}
          ${data.phone ? `<span class="contact-item">📞 ${data.phone}</span>` : ''}
          ${data.linkedin ? `<span class="contact-item">🔗 <a href="${data.linkedin}" target="_blank">LinkedIn</a></span>` : ''}
          ${data.github ? `<span class="contact-item">🔗 <a href="${data.github}" target="_blank">GitHub</a></span>` : ''}
        </div>
      </div>

      <div class="section">
        <div class="section-title">About me</div>
        <p class="about-text">${data.about || 'A brief summary about yourself.'}</p>
      </div>

      <div class="section">
        <div class="section-title">Education</div>
        <div class="education-item">
          <div class="item-header">
            <div>
              <h3 class="item-title">${data.education?.institution || 'Institution'}</h3>
              <div class="item-subtitle">${data.education?.qualification || data.education?.degree || 'Degree'}</div>
            </div>
            <div class="date-range">
              ${formatMonthYear(data.education?.startDate) || 'Start'} – ${data.education?.isPresent ? 'Present' : formatMonthYear(data.education?.endDate) || 'End'}
            </div>
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">Skills</div>
        <div class="skill-item">
          ${Array.isArray(data.skills?.languages) ? 
            `<span class="skill-name">Languages:</span> ${(data.skills.languages || []).join(', ')}` : 
            (Array.isArray(data.skills) ? 
              `<span class="skill-name">Skills:</span> ${(data.skills || []).map(skill => typeof skill === 'object' ? skill.text || '' : skill || '').filter(Boolean).join(', ')}` : 
              '')}
        </div>
        ${data.skills?.soft && Array.isArray(data.skills.soft) ? 
          `<div class="skill-item">
            <span class="skill-name">Soft Skills:</span> ${(data.skills.soft || []).join(', ')}
          </div>` : 
          ''}
      </div>

      <div class="section">
        <div class="section-title">Experience</div>
        ${((data.experience || []).map(exp => `
          <div class="experience-item">
            <div class="item-header">
              <div>
                <h3 class="item-title">${exp.title || 'Job Title'}</h3>
                <div class="item-subtitle">${exp.company || 'Company Name'}</div>
              </div>
              <div class="date-range">
                ${formatMonthYear(exp.startDate) || 'Start'} – ${exp.isPresent ? 'Present' : formatMonthYear(exp.endDate) || 'End'}
              </div>
            </div>
            ${Array.isArray(exp.details) && exp.details.length > 0 ? `
              <ul class="details-list">
                ${exp.details.map(detail => `
                  <li>${typeof detail === 'string' ? detail : 'Detail'}</li>
                `).join('')}
              </ul>
            ` : ''}
          </div>
        `).join('') || '')}
      </div>

      <div class="section">
        <div class="section-title">Projects</div>
        ${((data.projects || []).map(project => `
          <div class="project-item">
            <div class="item-header">
              <div>
                <h3 class="item-title">${project.name || 'Project Name'}</h3>
              </div>
              ${project.durationStart || project.durationEnd ? `
                <div class="date-range">
                  ${formatMonthYear(project.durationStart) || ''} ${project.durationStart && project.durationEnd ? '–' : ''} ${formatMonthYear(project.durationEnd) || ''}
                </div>
              ` : ''}
            </div>
            ${project.details ? `<p class="about-text">${project.details}</p>` : ''}
          </div>
        `).join('') || '')}
      </div>
    </div>
  `
};
