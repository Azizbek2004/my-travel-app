import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import Home from './pages/Home';
import CreatePost from './components/Post/CreatePost';
import SearchPage from './pages/SearchPage';
import MessagingPage from './pages/MessagingPage';
import Login from './components/Auth/Login';
import AdminPage from './pages/AdminPage';
import {Header,Footer} from './components/Shared';

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  return currentUser ? children : <Navigate to="/login" replace />;
};

const AdminRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  return currentUser && currentUser.role === 'admin' ? children : <Navigate to="/" replace />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
      <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/create-post"
            element={
              <ProtectedRoute>
                <CreatePost />
              </ProtectedRoute>
            }
          />
          <Route path="/search" element={<SearchPage />} />
          <Route
            path="/messaging"
            element={
              <ProtectedRoute>
                <MessagingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminPage />
              </AdminRoute>
            }
          />
        </Routes>
        <Footer/>
      </Router>
    </AuthProvider>
  );
}

export default App;