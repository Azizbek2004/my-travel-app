import React, { useState, useEffect } from 'react';
import { getPosts } from '../services/firestore';
import Post from '../components/Post/Post';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts().then((snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
  }, []);

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
