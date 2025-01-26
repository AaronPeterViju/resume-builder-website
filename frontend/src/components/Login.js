import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
        navigate('/index'); // Redirect to /index
      } else {
        alert('Invalid username or password');
      }
    } catch (error) {
      alert('Error logging in: ' + error.message);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Login</h1>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="form-group">
            <button type="submit">Login</button>
          </div>
        </form>
        <div className="form-footer">
          <p>Don't have an account? <a href="/signup">Sign up</a></p>
        </div>
      </main>
    </div>
  );
}

export default Login;