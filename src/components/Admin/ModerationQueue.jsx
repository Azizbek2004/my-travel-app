import React, { useState, useEffect } from 'react';
import { getFlaggedPosts, deletePost, flagPost } from '../../services/firestore';
import Spinner from '../Shared/Spinner';

const ModerationQueue = () => {
  const [flaggedPosts, setFlaggedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = getFlaggedPosts((data) => {
      setFlaggedPosts(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleApprove = (postId) => {
    flagPost(postId, false); // Unflag the post
  };

  const handleReject = (postId) => {
    if (window.confirm('Reject and delete this post?')) {
      deletePost(postId);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div>
      <h2>Moderation Queue</h2>
      {flaggedPosts.length === 0 ? (
        <p>No flagged posts.</p>
      ) : (
        flaggedPosts.map((post) => (
          <div key={post.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <button onClick={() => handleApprove(post.id)}>Approve</button>
            <button onClick={() => handleReject(post.id)}>Reject & Delete</button>
          </div>
        ))
      )}
    </div>
  );
};

export default ModerationQueue;