import React from 'react';
import './EditUserForm.css'; // Make sure to import the CSS file for styles

const EditUserForm = ({ user, onSave, onCancel }) => {
  const [editedUser, setEditedUser] = React.useState({ ...user });

  const handleChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Always set the role as "USER" when saving
    const updatedUser = { ...editedUser, role: 'USER' };
    onSave(updatedUser);
  };

  return (
    <div className="edit-user-form-page">
      <div className="edit-user-form-container">
        <form onSubmit={handleSubmit} className="edit-user-form">
          <div className="form-header">
            <h2>Edit User</h2>
            {/* Icon or image */}
            <img src="./public/Images/Edituserlogo.png" alt="Edit User Icon" className="form-icon" />
          </div>
          <label className="form-label">
            Name
            <input
              type="text"
              name="name"
              value={editedUser.name}
              onChange={handleChange}
              className="form-input"
            />
          </label>
          <label className="form-label">
            Email
            <input
              type="email"
              name="email"
              value={editedUser.email}
              onChange={handleChange}
              className="form-input"
            />
          </label>
          <div className="form-actions">
            <button type="submit" className="save-btn">Save</button>
            <button type="button" onClick={onCancel} className="cancel-btn">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserForm;
