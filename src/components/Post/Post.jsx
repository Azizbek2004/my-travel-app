import React from 'react';
import { formatDate } from '../../utils/helpers';

const Post = ({ post }) => {
  return (
    <div
      style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem 0' }}
    >
      <p>{post.content}</p>
      {post.imageUrl && (
        <img src={post.imageUrl} alt="Post" style={{ maxWidth: '200px' }} />
      )}
      <p>Posted on: {formatDate(post.createdAt)}</p>
    </div>
  );
};

export default Post;
