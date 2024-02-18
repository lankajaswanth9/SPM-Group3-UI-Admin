import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import Dashboard from './Dashboard';
import LandingPage from './Landing page'; 
import AdminProfile from './AdminProfile'; 

/**
 * The main application component.
 * @module App
 */

/**
 * The main App component responsible for routing within the application.
 * @returns {JSX.Element} The JSX element representing the App component.
 */
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} /> 
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/adminprofile" element={<AdminProfile />} /> 
        <Route path="/landingpage" element={<LandingPage />} /> 
      </Routes>
    </Router>
  );
};

export default App;
