// AddUserForm.js
import React, { useState } from 'react';
import './AddUserForm.css'; // Make sure to import the CSS file for styles

const AddUserForm = ({ onSave, onCancel }) => {
  const [newUser, setNewUser] = useState({
    Name: '',
    Email: '',
    Password: '',
    role: '',
  });

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(newUser);
    setNewUser({
      Name: '',
      Email: '',
      Password: '',
      role: '',
    }); // Reset the form after saving
  };

  return (
    <div className="add-user-form-page">
      <div className="add-user-form-container">
        <form onSubmit={handleSubmit} className="add-user-form">
          <div className="form-header">
            <h2>Add New User</h2>
            <img src="./public/Images/Adduserlogo.png" alt="Add User Icon" className="form-icon" />
          </div>
          <label className="form-label">
            Name
            <input
              type="text"
              name="Name"
              value={newUser.Name}
              onChange={handleChange}
              className="form-input"
            />
          </label>
          <label className="form-label">
            Email
            <input
              type="email"
              name="Email"
              value={newUser.Email}
              onChange={handleChange}
              className="form-input"
            />
          </label>
          <label className="form-label">
            Password
            <input
              type="password"
              name="Password"
              value={newUser.Password}
              onChange={handleChange}
              className="form-input"
            />
          </label>
          <label className="form-label">
            Role
            <select
              name="role"
              value={newUser.role}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </select>
          </label>
          <div className="form-actions">
            <button type="submit" className="save-btn">Add</button>
            <button type="button" onClick={onCancel} className="cancel-btn">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserForm;