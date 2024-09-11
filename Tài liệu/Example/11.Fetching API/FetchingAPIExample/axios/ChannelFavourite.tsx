import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ChannelFavourite.css'; // Import CSS file
import ChannelView from './ChannelView'; // Import ChannelView component

// Ví dụ này xây dựng một Channel Favourite thông qua việc thao tác đến các API
// Sử dụng Axios để trao đổi dữ liệu với DB
const ChannelFavourite: React.FC = () => {
  const apiKey = process.env.REACT_APP_API_KEY;
  const requestToken = process.env.REACT_APP_REQUEST_TOKEN;
  const [btnChannelAttribute, setBtnChannelAttribute] = useState({ disabled: true });
  const [responseData, setResponseData] = useState(null);
  const [channelName, setChannelName] = useState('');
  const [channelDescription, setChannelDescription] = useState('');

  useEffect(() => {
		setBtnChannelAttribute({ disabled: channelName === '' || channelDescription === '' });
  }, [channelName, channelDescription]);

  /**
   * Khởi tạo favoutite channel
   */
  const createChannel = async (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		const sessionId = await createSession();
		if (sessionId) {
		  await performApiPost(sessionId);
		  await deleteSession(sessionId);
		}
  };

  /**
   * Khởi tạo session. Theo docs của TMDB thì cần tạo session trước mỗi request post
   */
  const createSession = async () => {
		try {
		  const response = await axios.post(`https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}`, {
				request_token: requestToken
		  });
		  return response.data.session_id;
		} catch (error) {
		  logError('Error creating session', error);
		  return null;
		}
  };

  /**
   * Thực hiện API đăng ký kênh
   */
  const performApiPost = async (sessionId: string) => {
		try {
		  const response = await axios.post(`https://api.themoviedb.org/3/list?api_key=${apiKey}&session_id=${sessionId}`, {
				name: channelName,
				description: channelDescription,
				language: "en"
		  });
		  setResponseData(response.data);
		  alert(`Your channel has been created!!`);
		} catch (error) {
		  logError('Error performing API POST', error);
		  alert('Something has been wrong...');
		}
  };

  /**
   * Xóa session
   */
  const deleteSession = async (sessionId: string) => {
		try {
		  const response = await axios.delete(`https://api.themoviedb.org/3/authentication/session?api_key=${apiKey}`, {
				data: { session_id: sessionId }
		  });
		  if (response.status !== 200) {
				throw new Error('Failed to delete session');
		  }
		} catch (error) {
		  logError('Error deleting session', error);
		  alert('Something has been wrong...');
		}
  };

  /**
   * Ghi log khi có phát sinh lỗi
   */
  const logError = async (message: string, error: unknown) => {
		console.error(message, error);
		// ghi log vào service lưu log
		try {
		  await axios.post('/api/logError', {
				message,
				error: error instanceof Error ? error.message : String(error)
		  });
		} catch (logError) {
		  console.error('Error logging to external service', logError);
		}
  };

  return (
		<div className="channel-favourite-container">
		  <h1>Create my favourite playlist</h1>
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
