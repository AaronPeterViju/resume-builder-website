import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', { username, email, password });
      if (response.status === 201) {
        alert('User signed up successfully');
        navigate('/login');
      } else {
        alert('Sign-up failed');
      }
    } catch (error) {
      alert('Error signing up: ' + error.message);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Sign Up</h1>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="form-group">
            <button type="submit">Sign Up</button>
          </div>
        </form>
        <div className="form-footer">
          <p>Already have an account? <a href="/login">Login</a></p>
        </div>
      </main>
    </div>
  );
}

export default Signup;