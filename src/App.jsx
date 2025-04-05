import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/Home';
import ProfilePage from './pages/ProfilePage';
import PostPage from './pages/PostPage';
import SearchPage from './pages/SearchPage';
import AdminPage from './pages/AdminPage';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import CreatePost from './components/Post/CreatePost';
import Header from './components/Shared/Header';
import Footer from './components/Shared/Footer';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={ <ProtectedRoute> <ProfilePage /> </ProtectedRoute> } />
          <Route path="/create-post" element={ <ProtectedRoute> <CreatePost /> </ProtectedRoute> } />
          <Route path="/post/:id" element={ <ProtectedRoute> <PostPage /> </ProtectedRoute> } />
          <Route path="/search" element={ <ProtectedRoute> <SearchPage /> </ProtectedRoute> } />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
