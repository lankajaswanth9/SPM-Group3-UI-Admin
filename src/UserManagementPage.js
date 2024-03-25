// UserManagementPage.js
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import UserList from './UserList';
import EditUserForm from './EditUserForm';
import AddUserForm from './AddUserForm'; // Import the AddUserForm component
import './UserManagementPage.css';
import './Navbar.css';

const mockUsers = [
  { userid: '1', Name: 'Name1', Email: 'email1@example.com', Password: 'password1', role: 'Admin', create_time: '2021-01-01T09:00:00Z', update_time: '2021-01-01T12:00:00Z' },
  { userid: '2', Name: 'Name2', Email: 'email2@example.com', Password: 'password2', role: 'User', create_time: '2021-02-01T09:00:00Z', update_time: '2021-02-01T12:00:00Z' },
  // ... more users
];

const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [addingUser, setAddingUser] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setUsers(mockUsers);
    }, 500);
  }, []);

  const handleEdit = (user) => {
    setEditingUser(user);
    setAddingUser(false); // Hide the AddUserForm if it's visible
  };

  const handleSave = (updatedUser) => {
    setUsers(users.map(user => user.userid === updatedUser.userid ? updatedUser : user));
    setEditingUser(null);
  };

  const handleCancel = () => {
    setEditingUser(null);
    setAddingUser(false);
  };

  const handleDelete = (userId) => {
    setTimeout(() => {
      setUsers(users.filter(user => user.userid !== userId));
    }, 500);
  };

  const handleAddUser = () => {
    setAddingUser(true);
    setEditingUser(null); // Hide the EditUserForm if it's visible
  };

  const handleSaveNewUser = (newUser) => {
    // Generate a unique ID for the new user (you might want to use a more robust method in a real application)
    const newId = Math.max(...users.map(user => parseInt(user.userid))) + 1;
    const newUserWithId = { ...newUser, userid: newId.toString() };
    setUsers([...users, newUserWithId]);
    setAddingUser(false);
  };

  return (
    <>
      <Navbar />
      <div className="user-management-container">
        <div className="user-management">
          <input type="text" placeholder="Search by name" />
          <input type="text" placeholder="Search by Email id" />
          <h2>User Accounts</h2>
          <button className="add-user-btn" onClick={handleAddUser}>Add New User</button>
          <UserList users={users} onEdit={handleEdit} onDelete={handleDelete} />
          {editingUser && (
            <EditUserForm
              user={editingUser}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          )}
          {addingUser && (
            <AddUserForm
              onSave={handleSaveNewUser}
              onCancel={handleCancel}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default UserManagementPage;
