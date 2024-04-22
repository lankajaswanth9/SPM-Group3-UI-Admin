import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setEmailError('');
    setPasswordError('');

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    if (!validatePassword(password)) {
      setPasswordError('Password must be at least 8 characters long with at least one special character and at least one uppercase letter.');
      return;
    }
    try {
      const response = await axios.post(`http://3.14.144.6:3000/auth/signin`, {
        email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  

      localStorage.setItem('token', response.data.token);
      
      navigate('/Landingpage');
    } catch (error) {
      console.error('Login error:', error);
      if (error.response) {
        // Server responded with an error
        if (error.response.status === 401) {
          setPasswordError('Invalid email or password. Please try again.');
        } else {
          setPasswordError(`Server error: ${error.response.status}`);
        }
      } else if (error.request) {
        // The request was made but no response was received
        setPasswordError('Network error. Please check your internet connection.');
      } else {
        // Something happened in setting up the request that triggered an error
        setPasswordError('An unexpected error occurred. Please try again later.');
      }
    }
    
    
  };

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
