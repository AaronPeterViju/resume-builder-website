export const generatePDF = async (formData, formatMonthYear, template) => {
  if (!window.pdfMake) {
    throw new Error('PDF generator is not ready');
  }

  let docDefinition;
  switch(template) {
    case 'template2':
      docDefinition = getTemplate2Definition(formData, formatMonthYear);
      break;
    case 'template3':
      docDefinition = getTemplate3Definition(formData, formatMonthYear);
      break;
    default:
      docDefinition = getTemplate1Definition(formData, formatMonthYear);
  }

  return window.pdfMake.createPdf(docDefinition);
};

const getTemplate1Definition = (formData, formatMonthYear) => {
  return {
    pageSize: 'A4',
    pageMargins: [40, 40, 40, 40],
    content: [
      {
        stack: [
          {
            text: formData.name,
            style: 'header',
            alignment: 'center'
          },
          {
            text: formData.title,
            style: 'subheader',
            alignment: 'center'
          },
          {
            text: [
              { text: formData.email, link: `mailto:${formData.email}`, color: '#0066cc' },
              ' | ',
              formData.phone,
              ' | ',
              { text: 'LinkedIn', link: formData.linkedin, color: '#0066cc' },
              ' | ',
              { text: 'GitHub', link: formData.github, color: '#0066cc' }
            ],
            style: 'contact',
            alignment: 'center',
            margin: [0, 5, 0, 20]
          }
        ],
        margin: [0, 0, 0, 20]
      },
      {
        canvas: [
          {
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 515,
            y2: 5,
            lineWidth: 1,
            lineColor: '#3498db'
          }
        ],
        margin: [0, 0, 0, 20]
      },
      {
        columns: [
          {
            width: '30%',
            stack: [
              {
                text: 'SKILLS',
                style: 'sectionTitle'
              },
              {
                ul: formData.skills.map(skill => ({
                  text: typeof skill === 'object' ? skill.text || '' : skill,
                  style: 'skillItem'
                })),
                margin: [0, 0, 0, 20]
              },
              {
                text: 'EDUCATION',
                style: 'sectionTitle'
              },
              {
                stack: [
                  {
                    text: formData.education.qualification,
                    style: 'educationTitle'
                  },
                  {
                    text: formData.education.institution,
                    style: 'institution'
                  },
                  {
                    text: `${formatMonthYear(formData.education.startDate)} - ${formData.education.isPresent ? 'Present' : formatMonthYear(formData.education.endDate)}`,
                    style: 'date'
                  }
                ]
              }
            ]
          },
          {
            width: '70%',
            stack: [
              {
                text: 'PROFESSIONAL SUMMARY',
                style: 'sectionTitle'
              },
              {
                text: formData.about,
                style: 'normal',
                margin: [0, 0, 0, 20]
              },
              {
                text: 'EXPERIENCE',
                style: 'sectionTitle'
              },
              ...formData.experience.map(exp => ({
                stack: [
                  {
                    text: exp.title,
                    style: 'experienceTitle'
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
                    ul: exp.details.map(detail => ({
                      text: typeof detail === 'object' ? detail.text || '' : detail,
                      style: 'normal'
                    }))
                  }
                ],
                margin: [0, 0, 0, 15]
              })),
              {
                text: 'PROJECTS',
                style: 'sectionTitle',
                margin: [0, 20, 0, 10]
              },
              ...formData.projects.map(project => projectSection(project, formatMonthYear))
            ]
          }
        ]
      }
    ],
    styles: {
      header: {
        fontSize: 24,
        bold: true,
        color: '#2c3e50'
      },
      subheader: {
        fontSize: 16,
        color: '#7f8c8d',
        margin: [0, 5, 0, 5]
      },
      contact: {
        fontSize: 10,
        color: '#666666',
        margin: [0, 5, 0, 5]
      },
      sectionTitle: {
        fontSize: 14,
        bold: true,
        color: '#2c3e50',
        margin: [0, 10, 0, 10],
        decoration: 'underline',
        decorationStyle: 'solid',
        decorationColor: '#3498db'
      },
      skillItem: {
        fontSize: 10,
        color: '#333333'
      },
      experienceTitle: {
        fontSize: 12,
        bold: true,
        color: '#2c3e50'
      },
      company: {
        fontSize: 11,
        color: '#3498db'
      },
      date: {
        fontSize: 10,
        italics: true,
        color: '#7f8c8d',
        margin: [0, 2, 0, 5]
      },
      normal: {
        fontSize: 10,
        color: '#333333',
        lineHeight: 1.4
      },
      educationTitle: {
        fontSize: 11,
        bold: true,
        color: '#2c3e50'
      },
      institution: {
        fontSize: 10,
        color: '#3498db'
      }
    }
  };
};

const getTemplate2Definition = (formData, formatMonthYear) => {
  return {
    pageSize: 'A4',
    pageMargins: [40, 40, 40, 40],
    content: [
      {
        canvas: [
          {
            type: 'rect',
            x: 0,
            y: 0,
            w: 515,
            h: 100,
            color: '#2c3e50'
          }
        ],
        absolutePosition: { x: 40, y: 40 }
      },
      {
        stack: [
          {
            text: formData.name,
            style: 'header',
            margin: [0, 20, 0, 0]
          },
          {
            text: formData.title,
            style: 'subheader'
          },
          {
            text: [
              { text: formData.email, link: `mailto:${formData.email}`, color: 'white' },
              ' | ',
              formData.phone,
              ' | ',
              { text: 'LinkedIn', link: formData.linkedin, color: 'white' },
              ' | ',
              { text: 'GitHub', link: formData.github, color: 'white' }
            ],
            style: 'contact',
            alignment: 'center'
          }
        ],
        alignment: 'center'
      },
      {
        canvas: [
          {
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 515,
            y2: 5,
            lineWidth: 2,
            lineColor: '#2c3e50'
          }
        ],
        margin: [0, 20, 0, 20]
      },
      {
        columns: [
          {
            width: '33%',
            stack: [
              {
                text: 'SKILLS',
                style: 'sectionTitle'
              },
              {
                ul: formData.skills.map(skill => ({
                  text: typeof skill === 'object' ? skill.text || '' : skill,
                  style: 'skillItem'
                }))
              },
              {
                text: 'EDUCATION',
                style: 'sectionTitle',
                margin: [0, 20, 0, 10]
              },
              {
                stack: [
                  {
                    text: formData.education.qualification,
                    style: 'educationTitle'
                  },
                  {
                    text: formData.education.institution,
                    style: 'institution'
                  },
                  {
                    text: `${formatMonthYear(formData.education.startDate)} - ${formData.education.isPresent ? 'Present' : formatMonthYear(formData.education.endDate)}`,
                    style: 'date'
                  }
                ]
              }
            ]
          },
          {
            width: '67%',
            stack: [
              {
                text: 'PROFESSIONAL SUMMARY',
                style: 'sectionTitle'
              },
              {
                text: formData.about,
                style: 'normal',
                margin: [0, 0, 0, 20]
              },
              {
                text: 'EXPERIENCE',
                style: 'sectionTitle'
              },
              ...formData.experience.map(exp => ({
                stack: [
                  {
                    text: exp.title,
                    style: 'experienceTitle'
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
                    ul: exp.details.map(detail => ({
                      text: typeof detail === 'object' ? detail.text || '' : detail,
                      style: 'normal'
                    }))
                  }
                ],
                margin: [0, 0, 0, 15]
              })),
              {
                text: 'PROJECTS',
                style: 'sectionTitle',
                margin: [0, 20, 0, 10]
              },
              ...formData.projects.map(project => projectSection(project, formatMonthYear))
            ]
          }
        ],
        columnGap: 20
      }
    ],
    styles: {
      header: {
        fontSize: 28,
        bold: true,
        color: 'white'
      },
      subheader: {
        fontSize: 16,
        color: 'white'
      },
      contact: {
        fontSize: 10,
        color: 'white'
      },
      sectionTitle: {
        fontSize: 14,
        bold: true,
        color: '#2c3e50',
        margin: [0, 10, 0, 10],
        decoration: 'underline',
        decorationStyle: 'solid',
        decorationColor: '#2c3e50'
      },
      skillItem: {
        fontSize: 10,
        color: '#333333'
      },
      experienceTitle: {
        fontSize: 12,
        bold: true,
        color: '#2c3e50',
        cursor: 'pointer'
      },
      company: {
        fontSize: 11,
        color: '#3498db'
      },
      date: {
        fontSize: 10,
        italics: true,
        color: '#7f8c8d'
      },
      normal: {
        fontSize: 10,
        color: '#333333',
        lineHeight: 1.4
      },
      link: {
        color: '#0066cc',
        decoration: 'underline',
        cursor: 'pointer'
      }
    },
    pageBreakBefore: function(currentNode, followingNodesOnPage) {
      return currentNode.headlineLevel === 1 && followingNodesOnPage.length === 0;
    },
    info: {
      title: `${formData.name}'s Resume`,
      author: formData.name,
      subject: 'Resume',
      keywords: 'resume, cv, career'
    }
  };
};

const getTemplate3Definition = (formData, formatMonthYear) => {
  return {
    pageSize: 'A4',
    pageMargins: [40, 40, 40, 40],
    content: [
      {
        stack: [
          {
            text: formData.name,
            style: 'header',
            alignment: 'center'
          },
          {
            text: formData.title,
            style: 'subheader',
            alignment: 'center'
          }
        ],
        margin: [0, 0, 0, 10]
      },
      {
        text: [
          { text: formData.email, link: `mailto:${formData.email}`, color: '#0066cc' },
          ' | ',
          formData.phone,
          ' | ',
          { text: 'LinkedIn', link: formData.linkedin, color: '#0066cc' },
          ' | ',
          { text: 'GitHub', link: formData.github, color: '#0066cc' }
        ],
        style: 'contact',
        alignment: 'center',
        margin: [0, 0, 0, 20]
      },
      {
        canvas: [
          {
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 515,
            y2: 5,
            lineWidth: 1,
            lineColor: '#3498db'
          }
        ],
        margin: [0, 10, 0, 20]
      },
      {
        stack: [
          {
            text: 'PROFESSIONAL SUMMARY',
            style: 'sectionTitle'
          },
          {
            text: formData.about,
            style: 'normal',
            margin: [0, 0, 0, 20]
          },
          {
            text: 'EXPERIENCE',
            style: 'sectionTitle'
          },
          ...formData.experience.map(exp => ({
            stack: [
              {
                text: exp.title,
                style: 'experienceTitle'
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
                ul: exp.details.map(detail => ({
                  text: typeof detail === 'object' ? detail.text || '' : detail,
                  style: 'normal'
                }))
              }
            ],
            margin: [0, 0, 0, 15]
          })),
          {
            text: 'PROJECTS',
            style: 'sectionTitle',
            margin: [0, 20, 0, 10]
          },
          ...formData.projects.map(project => projectSection(project, formatMonthYear)),
          {
            text: 'SKILLS',
            style: 'sectionTitle',
            margin: [0, 20, 0, 10]
          },
          {
            ul: formData.skills.map(skill => ({
              text: typeof skill === 'object' ? skill.text || '' : skill,
              style: 'skillItem'
            }))
          },
          {
            text: 'EDUCATION',
            style: 'sectionTitle',
            margin: [0, 20, 0, 10]
          },
          {
            stack: [
              {
                text: formData.education.qualification,
                style: 'educationTitle'
              },
              {
                text: formData.education.institution,
                style: 'institution'
              },
              {
                text: `${formatMonthYear(formData.education.startDate)} - ${formData.education.isPresent ? 'Present' : formatMonthYear(formData.education.endDate)}`,
                style: 'date'
              }
            ]
          }
        ]
      },
      {
        canvas: [
          {
            type: 'line',
            x1: 0,
            y1: 0,
            x2: 515,
            y2: 0,
            lineWidth: 1,
            lineColor: '#e0e0e0'
          }
        ],
        margin: [0, 10, 0, 20]
      }
    ],
    styles: {
      header: {
        fontSize: 24,
        bold: true,
        color: '#2c3e50'
      },
      subheader: {
        fontSize: 16,
        color: '#7f8c8d'
      },
      contact: {
        fontSize: 10,
        color: '#666666'
      },
      sectionTitle: {
        fontSize: 14,
        bold: true,
        color: '#2c3e50',
        margin: [0, 20, 0, 10],
        decoration: 'underline',
        decorationStyle: 'solid',
        decorationColor: '#3498db'
      },
      skillItem: {
        fontSize: 10,
        color: '#333333'
      },
      experienceTitle: {
        fontSize: 12,
        bold: true,
        color: '#2c3e50'
      },
      company: {
        fontSize: 11,
        color: '#3498db'
      },
      date: {
        fontSize: 10,
        italics: true,
        color: '#7f8c8d'
      },
      normal: {
        fontSize: 10,
        color: '#333333',
        lineHeight: 1.4
      },
      educationTitle: {
        fontSize: 11,
        bold: true,
        color: '#2c3e50'
      },
      institution: {
        fontSize: 10,
        color: '#3498db'
      }
    }
  };
};

const projectSection = (project, formatMonthYear) => ({
  stack: [
    {
      text: project.name,
      style: 'experienceTitle',
      link: project.github || project.link,
      color: project.github || project.link ? '#0066cc' : '#2c3e50'
    },
    {
      text: `${formatMonthYear(project.durationStart)} - ${formatMonthYear(project.durationEnd)}`,
      style: 'date'
    },
    {
      text: project.details,
      style: 'normal'
    }
  ],
  margin: [0, 0, 0, 15]
}); 