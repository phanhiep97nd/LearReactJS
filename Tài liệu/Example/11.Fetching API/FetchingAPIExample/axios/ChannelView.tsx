import React from 'react';

const ChannelView: React.FC<{ name: string; description: string; }> = ({ name, description }) => {
  return (
    <div className="channel-view">
      <h2>Channel Information</h2>
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Description:</strong> {description}</p>
    </div>
  );
};

export default ChannelView;
