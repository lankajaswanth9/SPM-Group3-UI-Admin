// UserList Component
import React from 'react';
import UserItem from './UserItem';

const UserList = ({ users, onEdit, onDelete }) => (
  <div className="user-list">
    {users.map(users => (
      <UserItem key={users.user_id} users={users} onEdit={onEdit} onDelete={onDelete} />
    ))}
  </div>
);

export default UserList;
