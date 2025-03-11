import { templateConfig } from '../config';

export const modernSidebar = {
  label: 'ModernSidebar',
  render: (data, formatMonthYear) => `
    <div style="
      display: flex;
      max-width: 900px;
      margin: 20px auto;
      font-family: Helvetica, Arial, sans-serif;
      background: #f4f4f4;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1)
    ">
      <div style="
        width: 35%;
        padding: 20px;
        background: #1a237e;
        color: white;
        display: flex;
        flex-direction: column;
        gap: 10px
      ">
        <h2>Personal Info</h2>
        <hr style="border: 0.5px solid white; margin: 10px 0" />
        ${data.phone ? `<p><span style="color: #64b5f6">&#9742;</span> ${data.phone}</p>` : ''}
        ${data.email ? `<p><span style="color: #64b5f6">&#9993;</span> <a href="mailto:${data.email}" style="color: white; text-decoration: none; font-weight: bold">${data.email}</a></p>` : ''}
        ${data.address ? `<p><span style="color: #64b5f6">&#127758;</span> ${data.address}</p>` : ''}
        
        <hr style="border: 0.5px solid white; margin: 10px 0" />
        <div style="margin: 20px 0;">
          <div style="color: white; font-size: 18px; font-weight: bold; margin-bottom: 10px;">Links</div>
          <div style="width: 170px; height: 1px; background-color: white; margin-bottom: 10px;"></div>
          ${data.linkedin ? `<div style="color: white; margin: 5px 0;"><span style="color: #64b5f6;">&#128187;</span> <a href="${data.linkedin}" style="color: white; text-decoration: none;">LinkedIn</a></div>` : ''}
          ${data.portfolio ? `<div style="color: white; margin: 5px 0;"><span style="color: #64b5f6;">&#128187;</span> <a href="${data.portfolio}" style="color: white; text-decoration: none;">Portfolio</a></div>` : ''}
          ${data.github ? `<div style="color: white; margin: 5px 0;"><span style="color: #64b5f6;">&#128214;</span> <a href="${data.github}" style="color: white; text-decoration: none;">Github</a></div>` : ''}
        </div>
        
        <hr style="border: 0.5px solid white; margin: 10px 0" />
        <h2>Skills</h2>
        ${(data.skills || []).map(skill => `<p><span style="color: #64b5f6">&#9899;</span> ${skill}</p>`).join('')}
      </div>
      
      <div style="
        width: 65%;
        padding: 20px;
        background: white;
        color: black;
        display: flex;
        flex-direction: column;
        gap: 15px
      ">
        <h1 style="
          color: #1a237e;
          border-bottom: 2px solid #1a237e;
          padding-bottom: 5px;
          margin-bottom: 10px
        ">${data.name || 'Full Name'}</h1>
        <h3>${data.title || 'Professional Title'}</h3>
        <p>${data.about || 'Professional Summary'}</p>
        
        <hr />
        <h2 style="
          color: #1a237e;
          border-bottom: 2px solid #1a237e;
          padding-bottom: 5px;
          margin-bottom: 10px
        ">Work Experience</h2>
        ${(data.experience || []).map(work => `
          <div>
            <h3>${work.title}, ${work.company}</h3>
            <p><small>${formatMonthYear(work.startDate)} - ${work.isPresent ? 'Present' : formatMonthYear(work.endDate)}</small></p>
            <ul style="padding-left: 20px">
              ${work.details.map(detail => `<li>${detail}</li>`).join('')}
            </ul>
          </div>
        `).join('')}
        
        <hr />
        <h2 style="
          color: #1a237e;
          border-bottom: 2px solid #1a237e;
          padding-bottom: 5px;
          margin-bottom: 10px
        ">Education</h2>
        ${data.education ? `
          <div>
            <h3>${data.education.qualification}, ${data.education.institution}</h3>
            <p><small>${formatMonthYear(data.education.startDate)} - ${data.education.isPresent ? 'Present' : formatMonthYear(data.education.endDate)}</small></p>
          </div>
        ` : ''}
      </div>
    </div>
  `
};

export default modernSidebar;
