import React from 'react';

const UserItem = ({ user, onEdit, onDelete }) => (
  <div className="user-item">
    <span className="avatar-icon">👤</span>
    <div className="user-details">
      <span className="user-name">{user.Name}</span>
      <span className="user-email">{user.Email}</span>
    </div>
    <div className="button-container">
      <button className="edit-btn" onClick={() => onEdit(user)}>Edit</button>
      <button className="delete-btn" onClick={() => onDelete(user.userid)}>Delete</button>
    </div>
  </div>
);

export default UserItem;
