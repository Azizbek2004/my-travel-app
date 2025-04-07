import React, { useContext } from 'react';
import { AuthContext } from '../contexts';
import { PostManagement, UserManagement,Analytics, ModerationQueue } from '../components/Admin';

const AdminDashboard = () => {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser || currentUser.role !== 'admin') {
    return <h1>Access Denied: Admins Only</h1>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Admin Dashboard</h1>
      <PostManagement />
      <UserManagement />
      <Analytics />
      <ModerationQueue />
    </div>
  );
};

export default AdminDashboard;