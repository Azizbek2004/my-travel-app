import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { updateProfile, uploadImage } from '../../services';

const EditProfile = () => {
  const { currentUser } = useAuth();
  const [bio, setBio] = useState('');
  const [photo, setPhoto] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let photoURL = '';
    if (photo) {
      photoURL = await uploadImage(photo, `profiles/${currentUser.uid}`);
    }
    await updateProfile(currentUser.uid, { bio, photoURL });
    alert('Profile updated!');
  };

  if (!currentUser) return <p>Please log in to edit your profile.</p>;

  return (
    <div>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Your bio"
        />
        <input type="file" onChange={(e) => setPhoto(e.target.files[0])} />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditProfile;
