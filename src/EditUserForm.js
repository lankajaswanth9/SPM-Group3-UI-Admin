import React from 'react';
import './EditUserForm.css'; // Make sure to import the CSS file for styles

const EditUserForm = ({ user, onSave, onCancel }) => {
  const [editedUser, setEditedUser] = React.useState({ ...user });

  const handleChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedUser);
  };

  return (
    <div className="edit-user-form-page">
      <div className="edit-user-form-container">
        <form onSubmit={handleSubmit} className="edit-user-form">
          <div className="form-header">
            <h2>Edit User</h2>
            {/* Icon or image */}
            <img src="./public/Images/Edituserlogo.png" alt="Weights Icon" className="form-icon" />
          </div>
          <label className="form-label">
            Name
            <input
              type="text"
              name="Name"
              value={editedUser.Name}
              onChange={handleChange}
              className="form-input"
            />
          </label>
          <label className="form-label">
            Email
            <input
              type="email"
              name="Email"
              value={editedUser.Email}
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
