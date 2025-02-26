import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      if (response.status === 200) {
        localStorage.setItem('authenticated', 'true');
        localStorage.setItem('username', username);
        localStorage.setItem('userId', response.data.userId); // Store the user ID
        navigate('/index');
      } else {
        alert('Invalid username or password');
      }
    } catch (error) {
      alert('Error : Incorrect Credentials - ' + error.message);
    }
  };

  return (
    <>
      <div className="auth-background"></div>
      <div className="center-container">
        <div className="animated-box">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-4">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-6">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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