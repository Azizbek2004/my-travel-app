import React, { useState, useEffect } from 'react';
import Likes from './Likes';
import Comments from './Comments';
import ShareButton from './ShareButton';
import { getComments } from '../../services/firestore';

const Post = ({ post }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const unsubscribe = getComments(post.id, setComments);
    return () => unsubscribe();
  }, [post.id]);

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <Likes postId={post.id} likes={post.likes || []} />
      <Comments postId={post.id} comments={comments} />
      <ShareButton postId={post.id} />
    </div>
  );
};

export default Post;