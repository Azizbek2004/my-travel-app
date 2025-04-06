import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { likePost, unlikePost } from '../../services/firestore';

const Likes = ({ postId, likes }) => {
  const { currentUser } = useContext(AuthContext);
  const isLiked = likes.includes(currentUser?.uid);

  const handleLike = () => {
    if (!currentUser) return alert('Please log in to like posts.');
    if (isLiked) {
      unlikePost(postId, currentUser.uid);
    } else {
      likePost(postId, currentUser.uid);
    }
  };

  return (
    <div>
      <button onClick={handleLike}>{isLiked ? 'Unlike' : 'Like'}</button>
      <span> {likes.length} likes</span>
    </div>
  );
};

export default Likes;