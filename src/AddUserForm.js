// AddUserForm.js
import React, { useState } from 'react';
import './AddUserForm.css'; 

const AddUserForm = ({ onSave, onCancel }) => {
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(newUser);
    setNewUser({
      name: '',
      email: '',
      password: '',
      role: 'USER',
    }); 
  };

  return (
    <div className="add-user-form-page">
      <div className="add-user-form-container">
        <form onSubmit={handleSubmit} className="add-user-form">
          <div className="form-header">
            <h2>Add New User</h2>
          </div>
          <label className="form-label">
            Name
            <input
              type="text"
              name="name"
              value={newUser.name}
              onChange={handleChange}
              className="form-input"
            />
          </label>
          <label className="form-label">
            Email
            <input
              type="email"
              name="email"
              value={newUser.email}
              onChange={handleChange}
              className="form-input"
            />
          </label>
          <label className="form-label">
            Password
            <input
              type="password"
              name="password"
              value={newUser.password}
              onChange={handleChange}
              className="form-input"
            />
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