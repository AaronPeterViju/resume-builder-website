import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AtsScoreControl = () => {
  const navigate = useNavigate();
  const [intensity, setIntensity] = useState(50);
  const [keywords, setKeywords] = useState(new Set());
  const [keywordInput, setKeywordInput] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState(null);

  // Load current settings on component mount
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/ats/settings');
        setIntensity(response.data.intensity);
        setKeywords(new Set(response.data.keywords));
      } catch (error) {
        console.error('Error fetching ATS settings:', error);
        setMessage({ type: 'error', text: 'Failed to load current settings' });
      }
    };

    fetchSettings();
  }, []);

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

  const saveChanges = async () => {
    setIsSaving(true);
    setMessage(null);

    try {
      await axios.post('http://localhost:5000/api/ats/settings', {
        intensity: Number(intensity),
        keywords: Array.from(keywords)
      });
     
      setMessage({ type: 'success', text: 'Settings saved successfully' });
    } catch (error) {
      console.error('Error saving ATS settings:', error);
      setMessage({ type: 'error', text: 'Failed to save settings' });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div style={{
      fontFamily: "'Inter', sans-serif",
      margin: 0,
      padding: 0,
      background: "#f5f7fa",
      color: "#333",
      minHeight: "100vh"          
    }}>
      <header style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 40px",
        background: "#ffffff",
        color: "#333",
        fontWeight: 600,
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
        borderBottom: "1px solid #e0e0e0"
      }}>
        <h1 style={{ margin: 0, fontSize: "22px" }}>ATS Score Control</h1>
        <div>
          <button
            onClick={() => navigate('/admin-dashboard')}
            style={{
              padding: "10px 16px",
              border: "none",
              background: "#0073e6",
              color: "white",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: 500,
              borderRadius: "6px",
              transition: "background 0.3s ease",
              marginRight: "10px"
            }}
            onMouseOver={(e) => e.currentTarget.style.background = "#005bb5"}
            onMouseOut={(e) => e.currentTarget.style.background = "#0073e6"}
          >
            Back to Dashboard(Click only if you are a superadmin)
          </button>
        </div>
      </header>
     
      <div style={{
        maxWidth: "600px",
        margin: "40px auto",
        background: "#ffffff",
        padding: "30px",
        borderRadius: "25px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
        textAlign: "center",
        border: "1px solid #e0e0e0"
      }}>
        <h2 style={{ marginTop: 0 }}>ATS Score Control Panel</h2>
       
        {message && (
          <div style={{
            padding: "10px 15px",
            margin: "15px 0",
            borderRadius: "6px",
            backgroundColor: message.type === 'success' ? "#d4edda" : "#f8d7da",
            color: message.type === 'success' ? "#155724" : "#721c24",
            border: `1px solid ${message.type === 'success' ? "#c3e6cb" : "#f5c6cb"}`
          }}>
            {message.text}
          </div>
        )}
       
        <div style={{ margin: "20px 0" }}>
          <h3>ATS Intensity Control</h3>
          <p>Adjust how strict the ATS checker should be</p>
          <p>Higher values mean stricter scoring</p>
          <input
            type="range"
            min="0"
            max="100"
            value={intensity}
            style={{
              width: "100%",
              accentColor: "#0073e6"
            }}
            onChange={handleIntensityChange}
          />
          <p>Current Intensity: <span>{intensity}</span>%</p>
        </div>
       
        <div style={{ marginTop: "20px" }}>
          <h3>Keyword Management</h3>
          <p>Add important keywords that resumes should include</p>
          <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "15px" }}>
            <input
              type="text"
              style={{
                padding: "10px",
                width: "70%",
                border: "1px solid #ccc",
                borderRadius: "6px",
                outline: "none",
                fontSize: "14px"
              }}
              placeholder="Enter a keyword"
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addKeyword()}
            />
            <button
              onClick={addKeyword}
              style={{
                padding: "10px 16px",
                border: "none",
                background: "#0073e6",
                color: "white",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: 500,
                borderRadius: "6px",
                transition: "background 0.3s ease"
              }}
              onMouseOver={(e) => e.currentTarget.style.background = "#005bb5"}
              onMouseOut={(e) => e.currentTarget.style.background = "#0073e6"}
            >
              Add Keyword
            </button>
          </div>
         
          <div style={{
            marginTop: "15px",
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            justifyContent: "center"
          }}>
            {[...keywords].map((keyword) => (
              <span key={keyword} style={{
                display: "inline-flex",
                alignItems: "center",
                background: "#e0e0e0",
                color: "#333",
                padding: "6px 12px",
                borderRadius: "6px",
                fontSize: "14px",
                fontWeight: 500
              }}>
                {keyword}
                <span
                  style={{
                    marginLeft: "8px",
                    cursor: "pointer",
                    background: "#e74c3c",
                    color: "white",
                    width: "18px",
                    height: "18px",
                    borderRadius: "50%",
                    display: "inline-flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "12px",
                    fontWeight: "bold"
                  }}
                  onClick={() => removeKeyword(keyword)}
                >
                  &times;
                </span>
              </span>
            ))}
          </div>
         
          <div style={{ marginTop: "30px" }}>
            <button
              onClick={saveChanges}
              disabled={isSaving}
              style={{
                padding: "10px 20px",
                border: "none",
                background: isSaving ? "#666" : "#27ae60",
                color: "white",
                cursor: isSaving ? "not-allowed" : "pointer",
                fontSize: "16px",
                fontWeight: 500,
                borderRadius: "6px",
                transition: "background 0.3s ease"
              }}
              onMouseOver={(e) => !isSaving && (e.currentTarget.style.background = "#219653")}
              onMouseOut={(e) => !isSaving && (e.currentTarget.style.background = "#27ae60")}
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AtsScoreControl;
