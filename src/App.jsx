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

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
