import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles.css';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const generatePassword = () => {
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const chars = "@#%&()\"?!_-*$^";
    const numbers = "1234567890";
    
    // Convert strings to arrays
    const upperArr = Array.from(upper);
    const lowerArr = Array.from(lower);
    const charsArr = Array.from(chars);
    const numbersArr = Array.from(numbers);
    
    // Generate a random length between 12 and 16
    const length = Math.floor(Math.random() * 5) + 12;
    
    // Calculate number of each type of character
    const u = Math.floor(Math.random() * 3) + 2; // 2-4 uppercase
    const l = Math.floor(Math.random() * 3) + 2; // 2-4 lowercase
    const c = Math.floor(Math.random() * 2) + 1; // 1-2 special chars
    const n = length - u - l - c; // remaining for numbers
    
    // Generate password
    const password = [
      ...Array(u).fill().map(() => upperArr[Math.floor(Math.random() * upperArr.length)]),
      ...Array(l).fill().map(() => lowerArr[Math.floor(Math.random() * lowerArr.length)]),
      ...Array(c).fill().map(() => charsArr[Math.floor(Math.random() * charsArr.length)]),
      ...Array(n).fill().map(() => numbersArr[Math.floor(Math.random() * numbersArr.length)])
    ];
    
    // Shuffle the password array
    for (let i = password.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [password[i], password[j]] = [password[j], password[i]];
    }
    
    // Join array into string and set password
    setPassword(password.join(''));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', { 
        username, 
        email, 
        password,
        securityQuestion,
        securityAnswer
      });
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

  // Inline styles
  const passwordInputGroupStyle = {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
    width: '100%'
  };

  const [generateHover, setGenerateHover] = useState(false);
  const [showHover, setShowHover] = useState(false);

  const generateButtonStyle = {
    background: generateHover ? '#0a5cb8' : 'var(--primary-color)',
    color: 'white',
    padding: '0.75rem 1.5rem',
    borderRadius: 'var(--border-radius)',
    border: 'none',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'var(--transition)',
    whiteSpace: 'nowrap',
    transform: generateHover ? 'translateY(-1px)' : 'none'
  };

  const toggleButtonStyle = {
    background: showHover ? '#0a5cb8' : 'var(--primary-color)',
    color: 'white',
    padding: '0.75rem 1.5rem',
    borderRadius: 'var(--border-radius)',
    border: 'none',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'var(--transition)',
    whiteSpace: 'nowrap',
    transform: showHover ? 'translateY(-1px)' : 'none'
  };

  return (
    <>
      <div className="auth-background"></div>
      <div className="center-container">
        <div className="animated-box">
          <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
          
          {errorMessage && (
            <div className="error-message mb-4">
              {errorMessage}
            </div>
          )}
          
          {successMessage && (
            <div className="success-message mb-4">
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
                placeholder="Enter username"
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
                placeholder="Enter email"
                onChange={(e) => handleInputChange(setEmail, e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-4">
              <label className="form-label">Password</label>
              <div style={passwordInputGroupStyle}>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-input"
                  value={password}
                  placeholder="Enter password"
                  onChange={(e) => handleInputChange(setPassword, e.target.value)}
                  required
                  style={{ flex: 1 }}
                />
                <button
                  type="button"
                  onClick={generatePassword}
                  style={generateButtonStyle}
                  onMouseEnter={() => setGenerateHover(true)}
                  onMouseLeave={() => setGenerateHover(false)}
                >
                  Generate
                </button>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={toggleButtonStyle}
                  onMouseEnter={() => setShowHover(true)}
                  onMouseLeave={() => setShowHover(false)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>
            <div className="form-group mb-4">
              <label className="form-label">Security Question</label>
              <input
                type="text"
                className="form-input"
                placeholder="Example: What is your mother's name?"
                value={securityQuestion}
                onChange={(e) => handleInputChange(setSecurityQuestion, e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-5">
              <label className="form-label">Security Answer</label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter your answer"
                value={securityAnswer}
                onChange={(e) => handleInputChange(setSecurityAnswer, e.target.value)}
                required
              />
            </div>
            <button type="submit" className="button w-full mb-6">Sign Up</button>
            
            <div className="text-center">
              <span>
                Already have an account? <Link to="/login" className="text-blue-600 hover:text-blue-800 transition-colors font-medium px-4 py-2">Login</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
