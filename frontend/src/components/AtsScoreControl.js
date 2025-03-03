import React, { useState } from 'react';
import '../stylesa.css';

const AtsScoreControl = () => {
  const [intensity, setIntensity] = useState(50);
  const [keywords, setKeywords] = useState(new Set());
  const [keywordInput, setKeywordInput] = useState("");

  const handleIntensityChange = (event) => {
    setIntensity(event.target.value);
  };

  const addKeyword = () => {
    if (keywordInput.trim() && !keywords.has(keywordInput)) {
      setKeywords(new Set([...keywords, keywordInput.trim()]));
      setKeywordInput("");
    }
  };

  const removeKeyword = (keyword) => {
    setKeywords(new Set([...keywords].filter(k => k !== keyword)));
  };

  return (
    <div className="container">
      <h2>ATS Score Control Panel</h2>
      
      <div className="slider-container">
        <h3>ATS Intensity Control</h3>
        <input 
          type="range" 
          min="1" 
          max="100" 
          value={intensity} 
          className="slider" 
          onChange={handleIntensityChange} 
        />
        <p>Current Intensity: <span>{intensity}</span>%</p>
      </div>
      
      <div className="keyword-section">
        <h3>Keyword Management</h3>
        <input 
          type="text" 
          className="keyword-input" 
          placeholder="Enter a keyword" 
          value={keywordInput} 
          onChange={(e) => setKeywordInput(e.target.value)} 
        />
        <button onClick={addKeyword}>Add Keyword</button>
        
        <div className="keyword-list">
          {[...keywords].map((keyword) => (
            <span key={keyword} className="keyword-item">
              {keyword} 
              <span className="remove-keyword" onClick={() => removeKeyword(keyword)}>&times;</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AtsScoreControl;
