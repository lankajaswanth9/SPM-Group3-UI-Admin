// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import Dashboard from './Dashboard';
import LandingPage from './Landing page';
import AdminProfile from './AdminProfile';
import Workouts from './Workouts';
import AddExercise from './AddExercise';
import UserManagementPage from './UserManagementPage';
import EditUserForm from './EditUserForm';
import AddUserForm from './AddUserForm';
import UserWorkouts from './userworkouts';
import AddPredefinedWorkout from './Addworkouts';

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
        <Route path="/admin/users" element={< UserManagementPage/>} />
        <Route path="/admin/users/add" element={<AddUserForm />} /> {/* Route for Add User page */}
        <Route path="/admin/users/edit/:userId" element={<EditUserForm />} />
        <Route path="/userworkouts" element={< UserWorkouts />} />
        <Route path="/add-workout" element={<AddPredefinedWorkout/>} />
      </Routes>
    </Router>
  );
};

export default App;
