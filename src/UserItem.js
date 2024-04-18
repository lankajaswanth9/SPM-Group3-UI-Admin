import React from 'react';

const UserItem = ({ user, onEdit, onDelete, onViewHistory }) => (
  <div className="user-item">
    <span className="avatar-icon">👤</span>
    <div className="user-details">
      <span className="user-name">{user.name}</span>
      <span className="user-email">{user.email}</span>
    </div>
    <div className="button-container">
      <button className="view-btn" onClick={() => onViewHistory(user.user_id)}>View History</button>
      <button className="edit-btn" onClick={() => onEdit(user)}>Edit</button>
      <button className="delete-btn" onClick={() => onDelete(user.user_id)}>Delete</button>
    </div>
  </div>
);

export default UserItem;
