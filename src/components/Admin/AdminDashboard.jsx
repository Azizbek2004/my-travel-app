import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { getDocs, query, collection, orderBy } from 'firebase/firestore';
import { db } from '../../firebase';
import { deletePost } from '../../services/firestore';

const AdminDashboard = () => {
  const { currentUser } = useAuth();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (currentUser && currentUser.email === 'admin@example.com') {
      const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
      getDocs(q).then((snapshot) => {
        setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      });
    }
  }, [currentUser]);

  const handleDelete = async (id) => {
    await deletePost(id);
    setPosts(posts.filter((post) => post.id !== id));
  };

  if (!currentUser || currentUser.email !== 'admin@example.com') {
    return <p>You do not have permission to view this page.</p>;
  }

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <h3>Manage Posts</h3>
      {posts.map((post) => (
        <div key={post.id}>
          <p>{post.content}</p>
          <button onClick={() => handleDelete(post.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
