// EditUserForm.js

import React, { useState } from 'react';
import axios from 'axios';
import './EditUserForm.css'; 

const EditUserForm = ({ user }) => {
  const [name, setName] = useState(user.name);
  const [error, setError] = useState(null); 

  const handleChange = (e) => {
    setName(e.target.value);
    if (error) setError(null);  
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = { name, user_id: user.user_id };
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://3.14.144.6:3000/admin/updateuser', updatedUser, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      alert('User updated successfully!'); 
      window.location.reload(); 
    } catch (error) {
      console.error('Error updating user:', error);
      setError('Error updating user: ' + error.message); 
    }
  };

  return (
    <div className="edit-user-form-page">
      <div className="edit-user-form-container">
        <form onSubmit={handleSubmit} className="edit-user-form">
          <div className="form-header">
            <h2>Edit User</h2>
            <img src="./public/Images/Edituserlogo.png" alt="Edit User Icon" className="form-icon" />
          </div>
          <label className="form-label">
            Name
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
              className="form-input"
            />
          </label>
          {error && <p className="error-text">{error}</p>}
          <div className="form-actions">
            <button type="submit" className="save-btn">Save</button>
            <button type="button" onClick={() => window.location.reload()} className="cancel-btn">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserForm;
