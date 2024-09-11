import React, { useEffect, useState } from 'react';
import './ChannelFavourite.css'; // Import CSS file
import ChannelView from './ChannelView'; // Import ChannelView component

// Ví dụ này xây dựng một Channel Favourite thông qua việc thao tác đến các API
// Sử dụng fetch API để trao đổi dữ liệu với DB
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
   * Thiết lập cấu hình fetch option
   */
  const createFetchOptions = (method: 'GET' | 'POST' | 'PUT' | 'DELETE', headers?: HeadersInit, body?: BodyInit | null) => {
		return {
		  method,
		  headers: {
				'Content-Type': 'application/json;charset=utf-8', ...(headers ?? {})
		  },
		  body: body
		}
  }
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
   * khởi tạo session. Theo docs của TMDB thì cần tạo session trước mỗi request post
   */
  const createSession = async () => {
		try {
		  const response = await fetch(`https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}`,
				createFetchOptions('POST', undefined, JSON.stringify({ request_token: requestToken }))
		  );
		  const data = await response.json();
		  if (response.ok) {
				return data.session_id;
		  } else {
				throw new Error(data.status_message);
		  }
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
		  const response = await fetch(`https://api.themoviedb.org/3/list?api_key=${apiKey}&session_id=${sessionId}`, 
				createFetchOptions('POST', undefined, JSON.stringify({
				  name: channelName,
				  description: channelDescription,
				  language: "en"
				}))
		  );
		  const data = await response.json();
		  if (response.ok) {
				setResponseData(data);
				alert('Your channel has been created!!');
		  } else {
				throw new Error(data.status_message);
		  }
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
		  const response = await fetch(`https://api.themoviedb.org/3/authentication/session?api_key=${apiKey}`,
				createFetchOptions('DELETE', undefined, JSON.stringify({ session_id: sessionId }))
		  );
		  if (!response.ok) {
				const data = await response.json();
				throw new Error(data.status_message);
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
		  await fetch('/api/logError', 
				createFetchOptions('POST', undefined, JSON.stringify({ message, error }))
		  );
		} catch (logError) {
		  console.error('Error logging to external service', logError);
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
