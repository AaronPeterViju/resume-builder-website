import React, { useEffect, useRef } from 'react';
import { generatePreviewHTML } from './templates/generatePreviews';
import { FaCheck } from 'react-icons/fa';

const TemplateSelector = ({ selectedTemplate, onTemplateSelect }) => {
  const templates = [
    { id: 'minimalist', name: 'Minimalist', description: 'Clean and professional layout with perfect balance of content' },
    { id: 'executive', name: 'Executive', description: 'Bold header design with modern professional styling' },
    { id: 'compact', name: 'Compact', description: 'Space-efficient design that fits more content elegantly' },
    { id: 'modernSidebar', name: 'Modern Sidebar', description: 'Contemporary design with a stylish colored sidebar' }
  ];

  const iframeRefs = useRef({});

  useEffect(() => {
    templates.forEach(template => {
      const iframe = iframeRefs.current[template.id];
      if (iframe) {
        const html = generatePreviewHTML(template.id);
        iframe.srcdoc = html;
      }
    });
  }, []);

  return (
    <div className="template-selector">
      <div className="section-header">
        <h3 className="form-section-title">Choose Your Template</h3>
        <p className="section-description">Select from our professionally designed templates</p>
      </div>
      
      <div className="template-grid">
        {templates.map(template => (
          <div
            key={template.id}
            className={`template-item ${selectedTemplate === template.id ? 'selected' : ''}`}
            onClick={() => onTemplateSelect(template.id)}
          >
            <div className="preview-frame">
              <iframe
                ref={el => iframeRefs.current[template.id] = el}
                title={template.name}
                className="template-preview"
                sandbox="allow-same-origin"
                scrolling="no"
              />
              {selectedTemplate === template.id && (
                <div className="selected-overlay">
                  <div className="check-circle">
                    <FaCheck />
                  </div>
                </div>
              )}
            </div>
            <div className="template-info">
              <div className="template-name">{template.name}</div>
              <div className="template-description">{template.description}</div>
            </div>
          </div>
        ))}
      </div>
      <style>{`
        .template-selector {
          margin: 20px 0;
          padding: 15px;
          background: #f8f9fa;
          border-radius: 12px;
        }
        
        .section-header {
          text-align: center;
          margin-bottom: 20px;
        }
        
        .form-section-title {
          color: #1a237e;
          font-size: 1.5em;
          margin-bottom: 6px;
        }
        
        .section-description {
          color: #666;
          font-size: 1em;
          margin: 0;
        }
        
        .template-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 25px;
          margin: 25px auto;
          max-width: 1200px;
          padding: 0 15px;
        }
        
        @media (max-width: 900px) {
          .template-grid {
            grid-template-columns: repeat(1, 1fr);
            max-width: 600px;
          }
        }
        
        .template-item {
          border: 1px solid #e0e0e0;
          border-radius: 12px;
          padding: 12px;
          cursor: pointer;
          transition: all 0.25s ease;
          background: white;
          position: relative;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }
        
        .template-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          border-color: #1a237e;
        }
        
        .template-item.selected {
          border-color: #1a237e;
          box-shadow: 0 0 0 2px #1a237e;
        }
        
        .preview-frame {
          width: 100%;
          padding-top: 90%;
          position: relative;
          overflow: hidden;
          border-radius: 8px;
          background: #f8f9fa;
          border: 1px solid #eee;
        }
        
        .template-preview {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: none;
          transform: scale(0.9);
          transform-origin: top;
          pointer-events: none;
        }
        
        .selected-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(26, 35, 126, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
        }
        
        .check-circle {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #1a237e;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 20px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }
        
        .template-info {
          margin-top: 12px;
          padding: 0 4px;
        }
        
        .template-name {
          font-weight: 600;
          color: #1a237e;
          font-size: 1.1em;
          margin-bottom: 4px;
        }
        
        .template-description {
          color: #666;
          font-size: 0.9em;
          line-height: 1.4;
        }
      `}</style>
    </div>
  );
};

export default TemplateSelector;
