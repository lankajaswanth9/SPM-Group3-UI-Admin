
import React from 'react';

const UserItem = ({ users, onEdit, onDelete }) => (
  <div className="user-item">
    <span className="avatar-icon">👤</span>
    <div className="user-details">
      <span className="user-name">{users.name}</span>
      <span className="user-email">{users.email}</span>
    </div>
    <div className="button-container">
      <button className="view-btn" >view history</button>
      <button className="edit-btn" onClick={() => onEdit(users)}>Edit</button>
      <button className="delete-btn" onClick={() => onDelete(users.user_id)}>Delete</button>
    </div>
  </div>
);

export default UserItem;
