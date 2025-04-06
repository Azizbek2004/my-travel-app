import React from 'react';

const ShareButton = ({ postId }) => {
  const handleShare = () => {
    const url = `${window.location.origin}/post/${postId}`;
    if (navigator.share) {
      navigator.share({ title: 'Check out this post', url });
    } else {
      navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    }
  };

  return <button onClick={handleShare}>Share</button>;
};

export default ShareButton;