import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });

      if (response.status === 200) {
        const { role, userId } = response.data;
  
        // Store authentication data
        localStorage.setItem('authenticated', 'true');
        localStorage.setItem('username', username);
        localStorage.setItem('userId', userId);
        localStorage.setItem('role', role);

        // Redirect based on role
        if (role === 'superadmin') {
          navigate('/SuperAdmin');
        } else if (role === 'admin') {
          navigate('/admin-dashboard');
        } else {
          navigate('/index');
        }
        
      } else {
        setErrorMessage('Invalid username or password');
      }
    } catch (error) {
      setErrorMessage('Error: Incorrect credentials');
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
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          
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
            <button type="submit" className="button w-full">Login</button>
          </form>
          <p className="text-center mt-4">
            Don't have an account? <Link to="/signup" className="auth-link">Sign up</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
