import React, { useState, useEffect } from 'react';
import { getPostsRealTime, getAllUsers } from '../../services/firestore';
import Spinner from '../Shared/Spinner';

const Analytics = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribePosts = getPostsRealTime((data) => setPosts(data));
    const unsubscribeUsers = getAllUsers((data) => {
      setUsers(data);
      setLoading(false);
    });
    return () => {
      unsubscribePosts();
      unsubscribeUsers();
    };
  }, []);

  const totalLikes = posts.reduce((sum, post) => sum + (post.likes?.length || 0), 0);
  const topPosts = [...posts].sort((a, b) => (b.likes?.length || 0) - (a.likes?.length || 0)).slice(0, 5);

  if (loading) return <Spinner />;

  return (
    <div>
      <h2>Analytics</h2>
      <p>Total Posts: {posts.length}</p>
      <p>Total Users: {users.length}</p>
      <p>Total Likes: {totalLikes}</p>
      <h3>Top 5 Popular Posts</h3>
      {topPosts.map((post) => (
        <p key={post.id}>
          {post.title} - {post.likes?.length || 0} likes
        </p>
      ))}
    </div>
  );
};

export default Analytics;