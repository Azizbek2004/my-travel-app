import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { getMessages, sendMessage } from '../services/firestore';
import Spinner from '../components/Shared/Spinner';

const MessagingPage = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (currentUser) {
      const unsubscribe = getMessages(currentUser.uid, (data) => {
        setMessages(data);
        setLoading(false);
      });
      return () => unsubscribe();
    }
  }, [currentUser]);

  const handleSendMessage = (toUserId) => {
    if (!currentUser) return alert('Please log in to send messages.');
    if (newMessage.trim()) {
      sendMessage({ from: currentUser.uid, to: toUserId, content: newMessage });
      setNewMessage('');
    }
  };

  if (loading) return <Spinner />;

  return (
    <div>
      <h1>Messages</h1>
      {messages.map((msg) => (
        <p key={msg.id}>
          From: {msg.from} - {msg.content}
        </p>
      ))}
      <input
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message"
      />
      {/* Hardcoded recipient; replace with dynamic UI */}
      <button onClick={() => handleSendMessage('recipientUserId')}>Send</button>
    </div>
  );
};

export default MessagingPage;