import { templateConfig } from '../config';

export const template1 = {
  label: 'Professional',
  render: (data, formatMonthYear) => `
    <div class="resume-container">
      <style>
        .resume-container {
          max-width: 800px;
          margin: 40px auto;
          padding: 40px;
          font-family: Arial, sans-serif;
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
        }
        .header h1 {
          font-size: ${templateConfig.fonts.sizes.h1};
          color: ${templateConfig.colors.primary};
        }
        .header h2 {
          font-size: ${templateConfig.fonts.sizes.h2};
          color: ${templateConfig.colors.secondary};
        }
        .contact-info {
          text-align: center;
          font-size: ${templateConfig.fonts.sizes.body};
          margin-bottom: 30px;
          border-bottom: 3px double ${templateConfig.colors.primary};
          padding-bottom: 20px;
        }
        .two-column {
          display: flex;
          gap: 40px;
        }
        .left-column {
          flex: 30;
          padding-right: 20px;
        }
        .right-column {
          flex: 70;
          padding-left: 20px;
          border-left: 1px solid ${templateConfig.colors.border};
        }
        .section-title {
          font-size: 20px;
          color: ${templateConfig.colors.primary};
          font-weight: bold;
          border-bottom: 2px solid ${templateConfig.colors.accent};
          margin-bottom: 15px;
        }
        .skill-item {
          background: ${templateConfig.colors.background};
          padding: 8px 12px;
          margin-bottom: 8px;
          border-radius: 4px;
        }
        .experience-item, .project-item {
          margin-bottom: 20px;
        }
        .company, .institution {
          color: ${templateConfig.colors.secondary};
          font-weight: bold;
        }
        .date {
          color: ${templateConfig.colors.secondary};
          font-style: italic;
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
      </style>

      <div class="header">
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

      <div class="two-column">
        <div class="left-column">
          <div class="section">
            <div class="section-title">Skills</div>
            <ul class="skills-list">
              ${(data.skills || []).map(skill => `<li class="skill-item">${typeof skill === 'object' ? skill.text || '' : skill}</li>`).join('')}
            </ul>
          </div>

          <div class="section">
            <div class="section-title">Education</div>
            <div class="experience-item">
              <h3>${data.education?.qualification}</h3>
              <div class="institution">${data.education?.institution}</div>
              <div class="date">
                ${formatMonthYear(data.education?.startDate)} - 
                ${data.education?.isPresent ? 'Present' : formatMonthYear(data.education?.endDate)}
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
            ${(data.experience || []).map(exp => `
              <div class="experience-item">
                <h3>${exp.title}</h3>
                <div class="company">${exp.company}</div>
                <div class="date">${formatMonthYear(exp.startDate)} - ${exp.isPresent ? 'Present' : formatMonthYear(exp.endDate)}</div>
                <ul>
                  ${(exp.details || []).map(detail => `<li>${typeof detail === 'object' ? detail.text || '' : detail}</li>`).join('')}
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
                <p>${project.details}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `
}; 
