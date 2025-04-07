import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';

const Header = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
    <header style={{ backgroundColor: '#333', color: '#fff', padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontSize: '24px' }}>Travel App</Link>
      </div>
      <nav>
        <Link to="/" style={navLinkStyle}>Home</Link>
        <Link to="/search" style={navLinkStyle}>Search</Link>
        {currentUser && (
          <>
            <Link to="/create-post" style={navLinkStyle}>Create Post</Link>
            <Link to="/messaging" style={navLinkStyle}>Messages</Link>
            {currentUser.role === 'admin' && <Link to="/admin" style={navLinkStyle}>Admin</Link>}
          </>
        )}
      </nav>
      <div>
        {currentUser ?  console.log(currentUser) && (
          <>
            <span style={{ marginRight: '10px' }}>Welcome, {currentUser.bio}</span>
            <button onClick={handleLogout} style={buttonStyle}>Logout</button>
          </>
        ) : (
          <Link to="/login" style={navLinkStyle}>Login</Link>
        )}
      </div>
      <div>
        <input type="text" placeholder="Search..." style={{ padding: '5px', borderRadius: '5px', border: 'none' }} />
      </div>
    </header>
  );
};

const navLinkStyle = {
  color: '#fff',
  textDecoration: 'none',
  margin: '0 10px',
};

const buttonStyle = {
  backgroundColor: '#fff',
  color: '#333',
  border: 'none',
  padding: '5px 10px',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default Header;