import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { logout } from '../../services/auth';

const Header = () => {
  const { currentUser } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header>
      <nav>
        <Link to="/">Home</Link> |
        {currentUser ? (
          <>
            <Link to="/profile">Profile</Link> |
            <Link to="/create-post">Create Post</Link> |
            <Link to="/search">Search</Link> |
            {currentUser.email === 'admin@example.com' && (
              <Link to="/admin">Admin</Link>
            )}{' '}
            |<button onClick={handleLogout}>Logout`Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link> |<Link to="/signup">Signup</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
