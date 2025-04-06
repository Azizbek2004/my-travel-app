import React, { useState, useEffect } from 'react';
import { getPostsRealTime, deletePost, featurePost } from '../../services/firestore';
import Spinner from '../Shared/Spinner';

const PostManagement = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = getPostsRealTime((data) => {
      setPosts(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      deletePost(postId);
    }
  };

  const handleFeature = (postId, currentFeatured) => {
    featurePost(postId, !currentFeatured);
  };

  if (loading) return <Spinner />;

  return (
    <div>
      <h2>Post Management</h2>
      {posts.map((post) => (
        <div key={post.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <p>Likes: {post.likes.length} | Featured: {post.featured ? 'Yes' : 'No'}</p>
          <button onClick={() => handleDelete(post.id)}>Delete</button>
          <button onClick={() => handleFeature(post.id, post.featured)}>
            {post.featured ? 'Unfeature' : 'Feature'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default PostManagement;