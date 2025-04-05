import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../hooks/useAuth';
import Post from '../components/Post/Post';
import { formatDate } from '../utils/helpers';

const PostPage = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postDoc = await getDoc(doc(db, 'posts', id));
        if (postDoc.exists()) {
          setPost({ id: postDoc.id, ...postDoc.data() });
        } else {
          setError('Post not found');
        }
      } catch (err) {
        setError('Failed to load post: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!post) return <p>No post data available</p>;

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto' }}>
      <h1>Post Details</h1>
      <Post post={post} />
      <div style={{ marginTop: '1rem' }}>
        <p>
          <strong>Author ID:</strong> {post.userId}
        </p>
        <p>
          <strong>Posted on:</strong> {formatDate(post.createdAt)}
        </p>
        {currentUser && currentUser.uid === post.userId && (
          <button
            onClick={() => navigate('/create-post', { state: { post } })}
            style={{ marginRight: '1rem' }}
          >
            Edit Post
          </button>
        )}
        <button onClick={() => navigate(-1)}>Back</button>
      </div>
    </div>
  );
};

export default PostPage;
