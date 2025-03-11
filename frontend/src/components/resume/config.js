export const templateConfig = {
  colors: {
    primary: '#2c3e50',
    secondary: '#7f8c8d',
    accent: '#3498db',
    text: '#333333',
    background: '#f8f9fa'
  },
  fonts: {
    primary: 'Arial, sans-serif',
    sizes: { h1: '32px', h2: '18px', body: '14px' }
  }
};

export const formFields = [
  { name: 'name', label: 'Name', type: 'text' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'phone', label: 'Phone', type: 'tel' },
  { name: 'linkedin', label: 'LinkedIn', type: 'url' },
  { name: 'github', label: 'GitHub', type: 'url' },
  { name: 'about', label: 'About Me', type: 'textarea' }
];

export const initialFormState = {
  name: '', title: '', email: '', phone: '', linkedin: '', github: '', about: '',
  experience: [{ title: '', company: '', startDate: '', endDate: '', isPresent: false, details: [''] }],
  education: { qualification: '', institution: '', startDate: '', endDate: '', isPresent: false },
  skills: [''],
  projects: [{ name: '', details: '', durationStart: '', durationEnd: '' }],
  template: 'template1'
};
