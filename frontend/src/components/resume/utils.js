export const formatMonthYear = (date) => {
  return date ? new Date(date).toLocaleString('default', { month: 'long', year: 'numeric' }) : '';
};

export const makeClickable = (text, link) => {
  if (!link) return text;
  return {
    text: text,
    link: link,
    color: '#0066cc',
    decoration: 'underline',
    style: 'link'
  };
};

export const loadPdfMake = async () => {
  try {
    const pdfMake = await import('pdfmake/build/pdfmake');
    const pdfFonts = await import('pdfmake/build/vfs_fonts');
    pdfMake.default.vfs = pdfFonts.pdfMake.vfs;
    window.pdfMake = pdfMake.default;
    return true;
  } catch (error) {
    console.error('Error loading PDF dependencies:', error);
    return false;
  }
}; 