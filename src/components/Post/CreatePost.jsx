import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { createPost } from '../../services/firestore';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) return alert('Please log in to create a post.');
    await createPost({ title, content, userId: currentUser.uid });
    navigate('/');
  };

  return (
    <div>
      <h1>Create a Post</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Tell your travel story..."
          required
        />
        <button type="submit">Post</button>
      </form>
    </div>
  );
};

export default CreatePost;