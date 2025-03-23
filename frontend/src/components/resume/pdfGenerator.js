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
    pageMargins: [56, 56, 56, 56], // 2cm margins
    content: [
      // Header with name
      {
        text: formData.name || 'Your Name',
        style: 'headerName',
        alignment: 'center'
      },
      
      // Contact information row - Improved alignment
      {
        columns: generateContactColumns(formData),
        margin: [0, 8, 0, 0]
      },
      
      // About Me Section
      {
        stack: [
          getSectionTitle('About me'),
          {
            text: formData.about || 'A brief summary about yourself.',
            style: 'normalText',
            margin: [0, 5, 0, 0]
          }
        ],
        margin: [0, 20, 0, 0]
      },
      
      // Education Section
      {
        stack: [
          getSectionTitle('Education'),
          {
            columns: [
              {
                width: '*',
                stack: [
                  {
                    text: formData.education?.institution || 'Institution',
                    style: 'itemTitle',
                  },
                  {
                    text: formData.education?.qualification || formData.education?.degree || 'Degree',
                    style: 'itemSubtitle',
                  }
                ]
              },
              {
                width: 'auto',
                text: `${formatMonthYear(formData.education?.startDate) || 'Start'} – ${formData.education?.isPresent ? 'Present' : formatMonthYear(formData.education?.endDate) || 'End'}`,
                style: 'dateRange',
                alignment: 'right'
              }
            ]
          }
        ],
        margin: [0, 15, 0, 0]
      },
      
      // Skills Section
      {
        stack: [
          getSectionTitle('Skills'),
          {
            columns: [
              {
                width: 'auto',
                text: 'Languages:',
                style: 'skillCategory',
                margin: [0, 5, 5, 0]
              },
              {
                width: '*',
                text: Array.isArray(formData.skills?.languages) 
                  ? formData.skills.languages.join(', ')
                  : (Array.isArray(formData.skills) 
                      ? formData.skills.map(skill => typeof skill === 'object' ? skill.text || '' : skill || '').filter(Boolean).join(', ')
                      : ''),
                style: 'normalText',
                margin: [0, 5, 0, 0]
              }
            ]
          },
          formData.skills?.soft && Array.isArray(formData.skills.soft) ? {
            columns: [
              {
                width: 'auto',
                text: 'Soft Skills:',
                style: 'skillCategory',
                margin: [0, 5, 5, 0]
              },
              {
                width: '*',
                text: formData.skills.soft.join(', '),
                style: 'normalText',
                margin: [0, 5, 0, 0]
              }
            ]
          } : null
        ].filter(Boolean),
        margin: [0, 15, 0, 0]
      },
      
      // Experience Section
      {
        stack: [
          getSectionTitle('Experience'),
          ...(formData.experience || []).flatMap(exp => [
            {
              columns: [
                {
                  width: '*',
                  stack: [
                    {
                      text: exp.title || 'Job Title',
                      style: 'itemTitle'
                    },
                    {
                      text: exp.company || 'Company Name',
                      style: 'itemSubtitle'
                    }
                  ]
                },
                {
                  width: 'auto',
                  text: `${formatMonthYear(exp.startDate) || 'Start'} – ${exp.isPresent ? 'Present' : formatMonthYear(exp.endDate) || 'End'}`,
                  style: 'dateRange',
                  alignment: 'right'
                }
              ]
            },
            Array.isArray(exp.details) && exp.details.length > 0 ? {
              ul: exp.details.map(detail => ({
                text: typeof detail === 'string' ? detail : 'Detail',
                style: 'bulletPoint'
              })),
              style: 'bulletList',
              margin: [0, 5, 0, 0]
            } : null
          ].filter(Boolean))
        ],
        margin: [0, 15, 0, 0]
      },
      
      // Projects Section
      {
        stack: [
          getSectionTitle('Projects'),
          ...(formData.projects || []).flatMap(project => [
            {
              text: project.name || 'Project Name',
              style: 'itemTitle',
              margin: [0, 10, 0, 0]
            },
            project.durationStart || project.durationEnd ? {
              text: `${formatMonthYear(project.durationStart) || ''} ${project.durationStart && project.durationEnd ? '–' : ''} ${formatMonthYear(project.durationEnd) || ''}`,
              style: 'dateRange'
            } : null,
            project.details ? {
              text: project.details,
              style: 'normalText',
              margin: [0, 5, 0, 0]
            } : null
          ].filter(Boolean))
        ],
        margin: [0, 15, 0, 0]
      }
    ].filter(Boolean),
    
    styles: {
      headerName: {
        fontSize: 24,
        bold: true,
        color: '#000000',
        margin: [0, 0, 0, 5]
      },
      sectionTitle: {
        fontSize: 14,
        bold: true,
        color: '#000000',
        margin: [0, 0, 0, 8]
      },
      sectionLine: {
        lineWidth: 1,
        lineColor: '#000000'
      },
      contactText: {
        fontSize: 11,
        color: '#000000',
        alignment: 'center'
      },
      itemTitle: {
        fontSize: 12,
        bold: true,
        color: '#000000',
        margin: [0, 10, 0, 2]
      },
      itemSubtitle: {
        fontSize: 11,
        italics: true,
        color: '#000000',
        margin: [0, 0, 0, 2]
      },
      dateRange: {
        fontSize: 11,
        italics: true,
        color: '#444444',
        margin: [0, 10, 0, 0]
      },
      normalText: {
        fontSize: 11,
        color: '#000000',
        lineHeight: 1.3
      },
      skillCategory: {
        fontSize: 11,
        bold: true,
        color: '#000000'
      },
      bulletList: {
        margin: [15, 0, 0, 0]
      },
      bulletPoint: {
        fontSize: 10,
        color: '#000000',
        lineHeight: 1.3
      }
    }
  };
};

// Helper function to create better aligned contact information
const generateContactColumns = (formData) => {
  // Get available contact items
  const contactItems = [];
  
  if (formData.email) {
    contactItems.push({
      text: formData.email,
      link: `mailto:${formData.email}`
    });
  }
  
  if (formData.phone) {
    contactItems.push({
      text: formData.phone
    });
  }
  
  if (formData.location) {
    contactItems.push({
      text: formData.location
    });
  }
  
  if (formData.linkedin) {
    contactItems.push({
      text: 'LinkedIn',
      link: formData.linkedin
    });
  }
  
  if (formData.github) {
    contactItems.push({
      text: 'GitHub',
      link: formData.github
    });
  }
  
  // Create a visually balanced row of contact information
  const columnCount = Math.min(contactItems.length, 5); // Maximum 5 items in a row
  
  if (columnCount === 0) {
    return [{ text: '', width: '*' }]; // Empty placeholder if no contact info
  }
  
  // Create evenly distributed columns
  const columns = [];
  
  // Add left spacer for visual balance if fewer than 5 items
  if (columnCount < 5) {
    columns.push({ text: '', width: '*' });
  }
  
  // Add contact items
  contactItems.forEach((item, index) => {
    columns.push({
      width: 'auto',
      stack: [
        item.link
          ? { text: item.text, link: item.link, style: 'contactText', alignment: 'center' }
          : { text: item.text, style: 'contactText', alignment: 'center' }
      ],
      margin: [10, 0, 10, 0] // Even spacing between items
    });
    
    // Add separator line between items (except after the last one)
    if (index < contactItems.length - 1) {
      columns.push({
        width: 'auto',
        canvas: [
          {
            type: 'line',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 12,
            lineWidth: 1,
            lineColor: '#dddddd'
          }
        ]
      });
    }
  });
  
  // Add right spacer for visual balance if fewer than 5 items
  if (columnCount < 5) {
    columns.push({ text: '', width: '*' });
  }
  
  return columns;
};

// Helper function to create a section title with a line underneath
const getSectionTitle = (title) => {
  return {
    stack: [
      {
        text: title,
        style: 'sectionTitle'
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
            lineColor: '#000000'
          }
        ]
      }
    ]
  };
};

// Helper function to create contact information items with proper icons
const getContactItem = (text, type, link = null) => {
  // This function is kept for backward compatibility but replaced with the
  // more flexible generateContactColumns function for template1
  if (!text) return { text: '', width: '*' };
  
  return {
    width: '*',
    text: link
      ? { text: text, link: link, style: 'contactText' }
      : { text: text, style: 'contactText' }
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
  // Helper function to create section title with line
  const createSectionTitle = (title) => ({
    stack: [
      {
        text: title,
        style: 'sectionTitle'
      },
      {
        canvas: [
          {
            type: 'line',
            x1: 0,
            y1: 0,
            x2: 515,
            y2: 0,
            lineWidth: 0.7,  // Slightly thicker line
            lineColor: '#3182ce'  // Changed to blue color to match preview
          }
        ],
        margin: [0, 8, 0, 12]
      }
    ]
  });

  return {
    pageSize: 'A4',
    pageMargins: [50, 40, 50, 40],
    defaultStyle: {
      font: 'Roboto',
      lineHeight: 1.4
    },
    styles: {
      headerName: {
        fontSize: 28,
        bold: true,
        color: '#1a202c',
        margin: [0, 0, 0, 4],
        font: 'Roboto'
      },
      headerTitle: {
        fontSize: 16,
        color: '#4a5568',
        margin: [0, 0, 0, 15],
        font: 'Roboto'
      },
      contactInfo: {
        fontSize: 11,
        color: '#4a5568',
        font: 'Roboto',
        alignment: 'left'
      },
      sectionTitle: {
        fontSize: 13,
        bold: true,
        color: '#1a202c',
        margin: [0, 0, 0, 0],  // Reduced bottom margin since we add it in the line
        font: 'Roboto',
        letterSpacing: 2
      },
      contentTitle: {
        fontSize: 13,
        bold: true,
        color: '#2d3748',
        margin: [0, 0, 0, 2],
        font: 'Roboto'
      },
      subtitle: {
        fontSize: 12,
        color: '#4a5568',
        margin: [0, 0, 0, 2],
        font: 'Roboto'
      },
      dateText: {
        fontSize: 11,
        color: '#718096',
        margin: [0, 0, 0, 8],
        font: 'Roboto',
        italics: true
      },
      normalText: {
        fontSize: 11,
        color: '#4a5568',
        lineHeight: 1.5,
        font: 'Roboto'
      },
      bulletPoint: {
        fontSize: 11,
        color: '#4a5568',
        lineHeight: 1.5,
        font: 'Roboto'
      },
      skillItem: {
        fontSize: 11,
        color: '#4a5568',
        font: 'Roboto',
        margin: [0, 0, 15, 4]
      }
    },
    content: [
      // Header section
      {
        stack: [
          {
            text: formData.name || 'Your Name',
            style: 'headerName'
          },
          {
            text: formData.title || 'Your Title',
            style: 'headerTitle'
          },
          {
            columns: [
              {
                text: [
                  { text: formData.email || '', link: `mailto:${formData.email}`, color: '#3182ce' },
                  '   •   ',
                  formData.phone || '',
                  '   •   ',
                  { text: 'LinkedIn', link: formData.linkedin, color: '#3182ce' },
                  '   •   ',
                  { text: 'GitHub', link: formData.github, color: '#3182ce' }
                ],
                style: 'contactInfo'
              }
            ]
          }
        ],
        margin: [0, 0, 0, 25]
      },

      // Professional Summary
      {
        stack: [
          createSectionTitle('PROFESSIONAL SUMMARY'),
          {
            text: formData.about || '',
            style: 'normalText'
          }
        ],
        margin: [0, 0, 0, 20]
      },

      // Education
      {
        stack: [
          createSectionTitle('EDUCATION'),
          {
            text: formData.education?.qualification || '',
            style: 'contentTitle'
          },
          {
            text: formData.education?.institution || '',
            style: 'subtitle'
          },
          {
            text: `${formatMonthYear(formData.education?.startDate)} - ${formData.education?.isPresent ? 'Present' : formatMonthYear(formData.education?.endDate)}`,
            style: 'dateText'
          }
        ],
        margin: [0, 0, 0, 20]
      },

      // Experience
      {
        stack: [
          createSectionTitle('EXPERIENCE'),
          ...(formData.experience || []).map(exp => ({
            stack: [
              {
                text: exp.title || '',
                style: 'contentTitle'
              },
              {
                text: exp.company || '',
                style: 'subtitle'
              },
              {
                text: `${formatMonthYear(exp.startDate)} - ${exp.isPresent ? 'Present' : formatMonthYear(exp.endDate)}`,
                style: 'dateText'
              },
              {
                ul: exp.details.map(detail => ({
                  text: detail,
                  style: 'bulletPoint',
                  margin: [0, 0, 0, 4]
                }))
              }
            ],
            margin: [0, 0, 0, 15]
          }))
        ],
        margin: [0, 0, 0, 20]
      },

      // Skills
      {
        stack: [
          createSectionTitle('SKILLS'),
          {
            columns: [
              {
                width: 'auto',
                stack: (formData.skills || []).map(skill => ({
                  text: `• ${skill}`,
                  style: 'skillItem'
                }))
              }
            ]
          }
        ],
        margin: [0, 0, 0, 20]
      },

      // Projects
      {
        stack: [
          createSectionTitle('PROJECTS'),
          ...(formData.projects || []).map(project => ({
            stack: [
              {
                text: project.name || '',
                style: 'contentTitle'
              },
              {
                text: `${formatMonthYear(project.durationStart)} - ${formatMonthYear(project.durationEnd)}`,
                style: 'dateText'
              },
              {
                text: project.details || '',
                style: 'normalText'
              }
            ],
            margin: [0, 0, 0, 15]
          }))
        ]
      }
    ]
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
