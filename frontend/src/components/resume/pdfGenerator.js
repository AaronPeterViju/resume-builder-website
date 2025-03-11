const getMinimalistDefinition = (formData, formatMonthYear) => {
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
        ]
      }
    ]
  };
};

const getExecutiveDefinition = (formData, formatMonthYear) => {
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

const getCompactDefinition = (formData, formatMonthYear) => {
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

const getModernSidebarDefinition = (formData, formatMonthYear) => {
  return {
    pageSize: 'A4',
    pageMargins: [0, 0, 0, 0],
    content: [
      {
        columns: [
          {
            width: '35%',
            stack: [
              {
                canvas: [
                  {
                    type: 'rect',
                    x: 0,
                    y: 0,
                    w: 215,
                    h: 842,
                    color: '#1a237e'
                  }
                ],
                absolutePosition: { x: 0, y: 0 }
              },
              {
                stack: [
                  { text: 'Personal Info', style: 'sidebarHeader' },
                  { canvas: [{ type: 'line', x1: 0, y1: 5, x2: 170, y2: 5, lineWidth: 1, lineColor: 'white' }] },
                  formData.phone && { text: [{ text: '📞 ', color: '#64b5f6' }, formData.phone], style: 'sidebarText' },
                  formData.email && { text: [{ text: '✉ ', color: '#64b5f6' }, { text: formData.email, link: `mailto:${formData.email}` }], style: 'sidebarText' },
                  
                  { text: 'Links', style: 'sidebarHeader', margin: [0, 20, 0, 0] },
                  { canvas: [{ type: 'line', x1: 0, y1: 5, x2: 170, y2: 5, lineWidth: 1, lineColor: 'white' }] },
                  formData.linkedin && { text: [{ text: '🔗 ', color: '#64b5f6' }, { text: 'LinkedIn', link: formData.linkedin }], style: 'sidebarText' },
                  formData.portfolio && { text: [{ text: '💻 ', color: '#64b5f6' }, { text: 'Portfolio', link: formData.portfolio }], style: 'sidebarText' },
                  formData.github && { text: [{ text: '📖 ', color: '#64b5f6' }, { text: 'Github', link: formData.github }], style: 'sidebarText' },
                  
                  { text: 'Skills', style: 'sidebarHeader', margin: [0, 20, 0, 0] },
                  { canvas: [{ type: 'line', x1: 0, y1: 5, x2: 170, y2: 5, lineWidth: 1, lineColor: 'white' }] },
                  ...(formData.skills || []).map(skill => ({
                    text: [{ text: '⚫ ', color: '#64b5f6' }, skill],
                    style: 'sidebarText'
                  }))
                ],
                margin: [20, 40, 20, 20]
              }
            ],
            fillColor: '#1a237e'
          },
          {
            width: '65%',
            stack: [
              {
                text: formData.name,
                style: 'mainHeader',
                margin: [0, 40, 0, 0]
              },
              {
                text: formData.title,
                style: 'subHeader',
                margin: [0, 5, 0, 10]
              },
              {
                text: formData.about,
                style: 'normalText',
                margin: [0, 0, 0, 20]
              },
              {
                canvas: [{ type: 'line', x1: 0, y1: 5, x2: 380, y2: 5, lineWidth: 1 }],
                margin: [0, 0, 0, 20]
              },
              {
                text: 'Work Experience',
                style: 'sectionHeader'
              },
              ...(formData.experience || []).map(exp => [
                {
                  text: `${exp.title}, ${exp.company}`,
                  style: 'experienceHeader',
                  margin: [0, 10, 0, 5]
                },
                {
                  text: `${formatMonthYear(exp.startDate)} - ${exp.isPresent ? 'Present' : formatMonthYear(exp.endDate)}`,
                  style: 'dateText'
                },
                {
                  ul: exp.details,
                  style: 'normalText',
                  margin: [0, 5, 0, 15]
                }
              ]).flat(),
              {
                canvas: [{ type: 'line', x1: 0, y1: 5, x2: 380, y2: 5, lineWidth: 1 }],
                margin: [0, 0, 0, 20]
              },
              {
                text: 'Education',
                style: 'sectionHeader'
              },
              formData.education && [
                {
                  text: `${formData.education.qualification}, ${formData.education.institution}`,
                  style: 'experienceHeader',
                  margin: [0, 10, 0, 5]
                },
                {
                  text: `${formatMonthYear(formData.education.startDate)} - ${formData.education.isPresent ? 'Present' : formatMonthYear(formData.education.endDate)}`,
                  style: 'dateText',
                  margin: [0, 0, 0, 10]
                }
              ]
            ],
            margin: [40, 0, 40, 40]
          }
        ]
      }
    ],
    styles: {
      sidebarHeader: {
        fontSize: 18,
        bold: true,
        color: 'white',
        margin: [0, 0, 0, 10]
      },
      sidebarText: {
        fontSize: 12,
        color: 'white',
        margin: [0, 5, 0, 0]
      },
      mainHeader: {
        fontSize: 24,
        bold: true,
        color: '#1a237e'
      },
      subHeader: {
        fontSize: 16,
        color: '#1a237e'
      },
      sectionHeader: {
        fontSize: 18,
        bold: true,
        color: '#1a237e',
        margin: [0, 0, 0, 10]
      },
      experienceHeader: {
        fontSize: 14,
        bold: true,
        color: '#1a237e'
      },
      dateText: {
        fontSize: 12,
        italics: true,
        color: '#666666'
      },
      normalText: {
        fontSize: 12,
        color: '#333333',
        lineHeight: 1.4
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

export const generatePDF = async (formData, formatMonthYear, template) => {
  if (!window.pdfMake) {
    throw new Error('PDF generator is not ready');
  }

  let docDefinition;
  switch(template) {
    case 'executive':
      docDefinition = getExecutiveDefinition(formData, formatMonthYear);
      break;
    case 'compact':
      docDefinition = getCompactDefinition(formData, formatMonthYear);
      break;
    case 'modernSidebar':
      docDefinition = getModernSidebarDefinition(formData, formatMonthYear);
      break;
    default:
      docDefinition = getMinimalistDefinition(formData, formatMonthYear);
  }

  return window.pdfMake.createPdf(docDefinition);
};
