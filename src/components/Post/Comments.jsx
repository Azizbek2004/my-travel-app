import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { addComment } from '../../services/firestore';

const Comments = ({ postId, comments }) => {
  const [newComment, setNewComment] = useState('');
  const { currentUser } = useContext(AuthContext);

  const handleAddComment = () => {
    if (!currentUser) return alert('Please log in to comment.');
    if (newComment.trim()) {
      addComment(postId, { userId: currentUser.uid, content: newComment });
      setNewComment('');
    }
  };

  return (
    <div>
      <h3>Comments</h3>
      {comments.map((comment) => (
        <p key={comment.id}>{comment.content} - {comment.userId}</p>
      ))}
      <input
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Add a comment"
      />
      <button onClick={handleAddComment}>Post</button>
    </div>
  );
};

export default Comments;