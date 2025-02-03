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
        localStorage.setItem('username', username); // Store the username
        navigate('/index'); // Redirect to /index
      } else {
        alert('Invalid username or password');
      }
    } catch (error) {
      alert('Error : Incorrect Credentials - ' + error.message);
    }
  };

  return (
    <div style={{ background: 'linear-gradient(to right, #1e3c72, #2a5298, #4facfe)', minHeight: '100vh' }} className="min-h-screen flex items-center justify-center">
      <div className="centered-box">
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
          Don't have an account? <Link to="/signup" className="text-primary">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;