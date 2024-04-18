import React from 'react';
import UserItem from './UserItem';

const UserList = ({ users, onEdit, onDelete, onViewHistory }) => (
  <div className="user-list">
    {users.map(user => (
      <UserItem
        key={user.user_id}
        user={user}
        onEdit={onEdit}
        onDelete={onDelete}
        onViewHistory={onViewHistory} // Pass the onViewHistory function to UserItem
      />
    ))}
  </div>
);

export default UserList;
