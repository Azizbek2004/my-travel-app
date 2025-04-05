import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import Post from '../components/Post/Post';

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResults([]);

    try {
      // Basic search: match content starting with the query
      const q = query(
        collection(db, 'posts'),
        where('content', '>=', searchQuery),
        where('content', '<=', searchQuery + '\uf8ff'),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(q);
      const foundPosts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setResults(foundPosts);

      if (foundPosts.length === 0) {
        setError('No posts found matching your search.');
      }
    } catch (err) {
      setError('Failed to search posts: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto' }}>
      <h1>Search Travel Posts</h1>
      <form
        onSubmit={handleSearch}
        style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}
      >
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by content (e.g., 'Paris')"
          style={{ flex: 1, padding: '0.5rem' }}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {results.length > 0 && (
        <div>
          <h2>Search Results</h2>
          {results.map((post) => (
            <div
              key={post.id}
              onClick={() => navigate(`/post/${post.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <Post post={post} />
            </div>
          ))}
        </div>
      )}
      <button onClick={() => navigate(-1)} style={{ marginTop: '1rem' }}>
        Back
      </button>
    </div>
  );
};

export default SearchPage;
