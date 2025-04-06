import React, { useState, useEffect } from 'react';
import { getPostsRealTime } from '../services/firestore';
import Post from '../components/Post/Post';
import Spinner from '../components/Shared/Spinner';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = getPostsRealTime((data) => {
      setPosts(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <Spinner />;

  return (
    <div>
      <h1>Travel Feed</h1>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Home;