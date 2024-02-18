import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; 

/**
 * LoginPage component for handling user login.
 * @component
 */
const LoginPage = () => {
  /**
   * State variables for email, password, emailError, and passwordError.
   * @type {string}
   */
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  /**
   * Function to navigate between pages.
   */
  const navigate = useNavigate();

  /**
   * Validates the email format.
   * @param {string} email - The email to validate.
   * @returns {boolean} - Indicates if the email is valid.
   */
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  /**
   * Validates the password format.
   * @param {string} password - The password to validate.
   * @returns {boolean} - Indicates if the password is valid.
   */
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
    return passwordRegex.test(password);
  };

  /**
   * Handles the login form submission.
   * @param {Event} e - The form submission event.
   */
  const handleLogin = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    } else {
      setEmailError('');
    }

    if (!validatePassword(password)) {
      setPasswordError('Password must be at least 8 characters long with at least one special character and at least one uppercase letter.');
      return;
    } else {
      setPasswordError('');
    }

    // For testing purposes, navigate to the landing page
    navigate('/Landingpage');
  }

  /**
   * Renders the login form.
   * @returns {JSX.Element} - The JSX element representing the login form.
   */
  return (
    <div className="container">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaQfALhECwtR_ZlrM6zvAJ7z0G3pvq4L-R1w&usqp=CAU" alt="Logo" className="logo" />
      <h2 className="title">Admin Login</h2>
      <div className="login-box">
        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <label className="label" htmlFor="email">Email</label>
            <input
              className="input"
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {emailError && <span className="error">{emailError}</span>}
          </div>
          <div className="input-group">
            <label className="label" htmlFor="password">Password</label>
            <input
              className="input"
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {passwordError && <span className="error">{passwordError}</span>}
          </div>
          <button className="button" type="submit">Log In</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
