import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles.css';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', { username, email, password });
      if (response.status === 201) {
        setSuccessMessage('User signed up successfully!');
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      } else {
        setErrorMessage('Sign-up failed');
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Error signing up: User may already exist');
    }
  };

  // Clear error message when user starts typing
  const handleInputChange = (setter, value) => {
    setter(value);
    setErrorMessage('');
  };

  return (
    <>
      <div className="auth-background"></div>
      <div className="center-container">
        <div className="animated-box">
          <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
          
          {errorMessage && (
            <div className="error-message">
              {errorMessage}
            </div>
          )}
          
          {successMessage && (
            <div className="success-message">
              {successMessage}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-4">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-input"
                value={username}
                onChange={(e) => handleInputChange(setUsername, e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-4">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-input"
                value={email}
                onChange={(e) => handleInputChange(setEmail, e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-6">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-input"
                value={password}
                onChange={(e) => handleInputChange(setPassword, e.target.value)}
                required
              />
            </div>
            <button type="submit" className="button w-full">Sign Up</button>
          </form>
          <p className="text-center mt-4">
            Already have an account? <Link to="/login" className="auth-link">Login</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Signup;