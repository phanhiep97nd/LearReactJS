import React, { useEffect, useState } from 'react';
import { useCreateSession, useDeleteSession, usePerformApiPost } from './api';
import './ChannelFavourite.css'; // Import CSS file
import ChannelView from './ChannelView'; // Import ChannelView component

const ChannelFavourite: React.FC = () => {
  const [btnChannelAttribute, setBtnChannelAttribute] = useState({ disabled: true });
  const [responseData, setResponseData] = useState(null);
  const [channelName, setChannelName] = useState('');
  const [channelDescription, setChannelDescription] = useState('');

  const createSessionMutation = useCreateSession();
  const deleteSessionMutation = useDeleteSession();
  const performApiPostMutation = usePerformApiPost();

  useEffect(() => {
    setBtnChannelAttribute({ disabled: channelName === '' || channelDescription === '' });
  }, [channelName, channelDescription]);

  const createChannel = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const sessionId = await createSessionMutation.mutateAsync();
      if (sessionId) {
        const response = await performApiPostMutation.mutateAsync({ sessionId, channelName, channelDescription });
        setResponseData(response);
        alert('Your channel has been created!!');
        await deleteSessionMutation.mutateAsync(sessionId);
      }
    } catch (error) {
      alert('Something has been wrong...');
    }
  };

  return (
    <div className="channel-favourite-container">
      <h1>Create my favourite channel</h1>
      <form className="channel-favourite-form">
        <div className="form-group">
          <label htmlFor="channelName">Channel name:</label>
          <input 
            type='text' 
            id="channelName" 
            name='name' 
            value={channelName} 
            placeholder='Ex: My Favorite Movies' 
            onChange={(e) => setChannelName(e.currentTarget.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="channelDescription">Description:</label>
          <textarea 
            id="channelDescription" 
            name='description' 
            placeholder='A list of my favorite movies' 
            value={channelDescription}
            onChange={(e) => setChannelDescription(e.currentTarget.value)}
          />
        </div>
        <button 
          className="btn-create-channel" 
          onClick={createChannel} 
          {...btnChannelAttribute}
        >
          Create Channel
        </button>
      </form>
      {responseData && (
        <ChannelView name={channelName} description={channelDescription} />
      )}
    </div>
  );
};

export default ChannelFavourite;
