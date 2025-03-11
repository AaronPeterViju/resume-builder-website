import { minimalist } from './minimalist';
import { executive } from './executive';
import { compact } from './compact';
import { modernSidebar } from './modernSidebar';
import { previewData } from './previewData';
import { formatMonthYear } from '../utils';

const templates = {
  minimalist,
  executive,
  compact,
  modernSidebar
};

// Function to generate preview HTML for each template
export const generatePreviewHTML = (templateId) => {
  const template = templates[templateId];
  if (!template) return '';
  
  const html = template.render(previewData, formatMonthYear);
  
  // Wrap the template HTML in a container for consistent sizing
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${templateId} Preview</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: white;
          overflow: hidden;
        }
        .preview-container {
          width: 100%;
          height: 100%;
          overflow: hidden;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
          background: white;
        }
      </style>
    </head>
    <body>
      <div class="preview-container">
        ${html}
      </div>
    </body>
    </html>
  `;
};
