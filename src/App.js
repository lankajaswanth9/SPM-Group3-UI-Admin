import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import Dashboard from './Dashboard';
import LandingPage from './Landing page';
import AdminProfile from './AdminProfile';
import Workouts from './Workouts';
import AddExercise from './AddExercise';
import UserManagementPage from './UserManagementPage';
import '@fortawesome/fontawesome-free/css/all.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/adminprofile" element={<AdminProfile />} />
        <Route path="/landingpage" element={<LandingPage />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="/addexercise" element={<AddExercise />} />
        <Route path="/admin/users" element={<UserManagementPage />} />
      </Routes>
    </Router>
  );
};

export default App;