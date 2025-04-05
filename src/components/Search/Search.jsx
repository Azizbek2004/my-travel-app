import React, { useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import Post from '../Post/Post';

const Search = () => {
  const [queryString, setQueryString] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const q = query(
      collection(db, 'posts'),
      where('content', '>=', queryString),
      where('content', '<=', queryString + '\uf8ff')
    );
    const snapshot = await getDocs(q);
    setResults(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  return (
    <div>
      <h2>Search Posts</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={queryString}
          onChange={(e) => setQueryString(e.target.value)}
          placeholder="Search by content"
        />
        <button type="submit">Search</button>
      </form>
      {results.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Search;
