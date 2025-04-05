import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { getUserProfile } from '../../services/firestore';

const Profile = () => {
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (currentUser) {
      getUserProfile(currentUser.uid).then((doc) => {
        if (doc.exists()) setProfile(doc.data());
      });
    }
  }, [currentUser]);

  if (!currentUser) return <p>Please log in to view your profile.</p>;

  return (
    <div>
      <h2>Profile</h2>
      <p>Email: {currentUser.email}</p>
      {profile && (
        <>
          <p>Bio: {profile.bio || 'No bio yet'}</p>
          <img
            src={profile.photoURL}
            alt="Profile"
            style={{ maxWidth: '100px' }}
          />
        </>
      )}
    </div>
  );
};

export default Profile;
