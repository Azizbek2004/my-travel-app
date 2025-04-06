import React, { useState, useEffect } from 'react';
import { getAllUsers, banUser, setUserRole } from '../../services/firestore';
import Spinner from '../Shared/Spinner';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = getAllUsers((data) => {
      setUsers(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleBan = (userId, currentBanned) => {
    if (window.confirm(`Are you sure you want to ${currentBanned ? 'unban' : 'ban'} this user?`)) {
      banUser(userId, !currentBanned);
    }
  };

  const handlePromote = (userId, currentRole) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    if (window.confirm(`Set role to ${newRole}?`)) {
      setUserRole(userId, newRole);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div>
      <h2>User Management</h2>
      {users.map((user) => (
        <div key={user.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
          <p>Email: {user.email}</p>
          <p>Role: {user.role || 'user'} | Banned: {user.banned ? 'Yes' : 'No'}</p>
          <button onClick={() => handleBan(user.id, user.banned)}>
            {user.banned ? 'Unban' : 'Ban'}
          </button>
          <button onClick={() => handlePromote(user.id, user.role)}>
            {user.role === 'admin' ? 'Demote' : 'Promote to Admin'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default UserManagement;