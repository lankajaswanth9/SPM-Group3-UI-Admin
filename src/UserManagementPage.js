import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import UserList from './UserList';
import EditUserForm from './EditUserForm';
import AddUserForm from './AddUserForm';
import './UserManagementPage.css';
import './Navbar.css';
import axios from 'axios';


const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [addingUser, setAddingUser] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZW1haWwiOiJsYW5rajAxQHBmdy5lZHUiLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3MTE3MjUyMjB9.u8vdK1HALZkXcz3VcaPgzwsWGWxOneWCj_zGaZnOy8Q'; 
        const response = await axios.get('http://localhost:3000/users', {
          headers: {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json',
          },
        });
        setUsers(response.data); 
      } catch (error) {
        console.error('Error fetching users:', error);
        alert('Error fetching users: ' + error.message); 
      }
    };
  
    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setEditingUser(user);
    setAddingUser(false);
  };

  const handleSave = async (updatedUser) => {
    try {
    
      const token = localStorage.getItem('token'); 
      await axios.put(`http://localhost:3000/users/${updatedUser.user_id}`, updatedUser, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      // Update the local state to reflect the changes
      setUsers(users.map(user => user.user_id === updatedUser.user_id ? updatedUser : user));
      setEditingUser(null);
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Error updating user: ' + error.message);
    }
  };
  

  const handleCancel = () => {
    setEditingUser(null);
    setAddingUser(false);
  };

  const handleDelete = async (user_id) => {
    try {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZW1haWwiOiJsYW5rajAxQHBmdy5lZHUiLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3MTE3MjUyMjB9.u8vdK1HALZkXcz3VcaPgzwsWGWxOneWCj_zGaZnOy8Q'; // Replace with your JWT token
      await axios.delete(`http://localhost:3000/users/${user_id}`, {
        headers: {
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json',
        },
      });
  
      
      setUsers(users.filter(user => user.user_id !== user_id));
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Error deleting user: ' + error.message); 
    }
  };
  

  const handleAddUser = () => {
    setAddingUser(true);
    setEditingUser(null);
  };

  const handleSaveNewUser = async (newUser) => {
    try {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZW1haWwiOiJsYW5rajAxQHBmdy5lZHUiLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3MTE3MjUyMjB9.u8vdK1HALZkXcz3VcaPgzwsWGWxOneWCj_zGaZnOy8Q'; // Replace with your JWT token
      const response = await axios.post('http://localhost:3000/users', newUser, {
        headers: {
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json',
        },
      });
      

      const createdUser = response.data;

    
      setUsers([...users, createdUser]);
      setAddingUser(false); 
    } catch (error) {
      console.error('Error adding new user:', error);
      alert('Error adding new user: ' + error.message); 
    }
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
