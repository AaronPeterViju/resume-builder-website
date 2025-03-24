import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles.css';

function Login() {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotUsername, setForgotUsername] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [resetMessage, setResetMessage] = useState({ text: '', isError: false });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { usernameOrEmail, password });

      if (response.status === 200) {
        const { role, userId, username } = response.data;
  
        // Store authentication data
        localStorage.setItem('authenticated', 'true');
        localStorage.setItem('username', username);
        localStorage.setItem('userId', userId);
        localStorage.setItem('role', role);

        // Redirect based on role
        if (role === 'admin') {
          navigate('/admin-dashboard');
        } else {
          navigate('/index');
        }
      } else {
        setErrorMessage('Invalid login credentials');
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

  // Get security question for a user
  const getSecurityQuestion = async () => {
    if (!forgotUsername) {
      setResetMessage({ text: 'Please enter a username', isError: true });
      return;
    }

    setIsLoading(true);
    setResetMessage({ text: '', isError: false });

    try {
      const response = await axios.get(`http://localhost:5000/api/auth/security-question/${forgotUsername}`);
      if (response.status === 200) {
        setSecurityQuestion(response.data.securityQuestion);
      }
    } catch (error) {
      setResetMessage({ text: 'User not found', isError: true });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle username enter key press in forgot password form
  const handleUsernameKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission
      getSecurityQuestion();
    }
  };

  // Reset password with security answer
  const resetPassword = async (event) => {
    event.preventDefault();
    setResetMessage({ text: '', isError: false });

    if (!securityQuestion) {
      setResetMessage({ text: 'Please get your security question ', isError: true });
      return;
    }

    if (!securityAnswer) {
      setResetMessage({ text: 'Please enter your security answer', isError: true });
      return;
    }

    if (!newPassword) {
      setResetMessage({ text: 'Please enter a new password', isError: true });
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/reset-password', {
        username: forgotUsername,
        securityAnswer,
        newPassword
      });

      if (response.status === 200) {
        setResetMessage({ text: 'Password reset successful! You can now login.', isError: false });
        // Reset form and toggle back to login after 3 seconds
        setTimeout(() => {
          setShowForgotPassword(false);
          setForgotUsername('');
          setSecurityQuestion('');
          setSecurityAnswer('');
          setNewPassword('');
        }, 3000);
      }
    } catch (error) {
      setResetMessage({ text: error.response?.data?.error || 'Password reset failed', isError: true });
    }
  };

  // Toggle between login and forgot password forms
  const toggleForgotPassword = () => {
    setShowForgotPassword(!showForgotPassword);
    setResetMessage({ text: '', isError: false });
    // Reset form fields
    if (showForgotPassword) {
      setForgotUsername('');
      setSecurityQuestion('');
      setSecurityAnswer('');
      setNewPassword('');
    }
  };

  return (
    <>
      <div className="auth-background"></div>
      <div className="center-container">
        <div className="animated-box">
          {!showForgotPassword ? (
            // Login Form
            <>
              <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
              
              {errorMessage && <div className="error-message mb-4">{errorMessage}</div>}
              
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-4">
                  <label className="form-label">Username or Email</label>
                  <input
                    type="text"
                    className="form-input"
                    value={usernameOrEmail}
                    onChange={(e) => handleInputChange(setUsernameOrEmail, e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-5">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-input"
                    value={password}
                    onChange={(e) => handleInputChange(setPassword, e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="button w-full mb-6">Login</button>
                
                <div className="flex items-center justify-center space-x-4 px-2">
                  <Link 
                    to="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      toggleForgotPassword();
                    }}
                    className="text-blue-600 hover:text-blue-800 transition-colors text-sm font-medium px-3 py-2"
                  >
                    Forgot Password?
                  </Link>
                  <div className="h-5 border-r border-gray-300"></div>
                  <Link to="/signup" className="text-blue-600 hover:text-blue-800 transition-colors text-sm font-medium px-3 py-2">
                    Sign up
                  </Link>
                </div>
              </form>
            </>
          ) : (
            // Forgot Password Form
            <>
              <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
              
              {resetMessage.text && (
                <div className={resetMessage.isError ? "error-message mb-4" : "success-message mb-4"}>
                  {resetMessage.text}
                </div>
              )}
              
              <form onSubmit={resetPassword}>
                <div className="form-group mb-4">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-input w-full"
                    value={forgotUsername}
                    onChange={(e) => setForgotUsername(e.target.value)}
                    onKeyPress={handleUsernameKeyPress}
                    placeholder="Enter your username and press Enter"
                    required
                  />
                  {isLoading && (
                    <div className="text-center text-sm text-gray-500 mt-2">
                      Retrieving security question...
                    </div>
                  )}
                </div>
                
                {securityQuestion && (
                  <>
                    <div className="form-group mb-4">
                      <label className="form-label">Security Question</label>
                      <div className="form-input bg-gray-100 text-gray-700" style={{ cursor: 'not-allowed' }}>
                        {securityQuestion}
                      </div>
                    </div>
                    <div className="form-group mb-4">
                      <label className="form-label">Security Answer</label>
                      <input
                        type="text"
                        className="form-input"
                        value={securityAnswer}
                        onChange={(e) => setSecurityAnswer(e.target.value)}
                        placeholder="Enter your answer"
                        required
                      />
                    </div>
                    <div className="form-group mb-5">
                      <label className="form-label">New Password</label>
                      <input
                        type="password"
                        className="form-input"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password"
                        required
                      />
                    </div>
                    <button type="submit" className="button w-full mb-6">Reset Password</button>
                  </>
                )}
                
                <div className="text-center">
                  <Link
                    to="#"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleForgotPassword();
                    }}
                    className="text-blue-600 hover:text-blue-800 transition-colors font-medium px-4 py-2"
                  >
                    Back to Login
                  </Link>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Login;
