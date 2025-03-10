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
      
      setMessage({ type: 'success', text: 'Settings saved successfully. All stored resumes have been deleted.' });
    } catch (error) {
      console.error('Error saving ATS settings:', error);
      setMessage({ type: 'error', text: 'Failed to save settings' });
    } finally {
      setIsSaving(false);
    }
  };

  