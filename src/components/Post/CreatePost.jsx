import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { createPost } from '../../services/firestore';
import { uploadImage } from '../../services/storage';

const CreatePost = () => {
  const { currentUser } = useAuth();
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      alert('Please log in to create a post.');
      return;
    }
    let imageUrl = '';
    if (image) {
      imageUrl = await uploadImage(
        image,
        `posts/${currentUser.uid}/${Date.now()}`
      );
    }
    await createPost({
      content,
      imageUrl,
      createdAt: Date.now(),
      userId: currentUser.uid,
    });
    setContent('');
    setImage(null);
    alert('Post created!');
  };

  return (
    <div>
      <h2>Create a Post</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write about your travel..."
          required
        />
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <button type="submit">Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
