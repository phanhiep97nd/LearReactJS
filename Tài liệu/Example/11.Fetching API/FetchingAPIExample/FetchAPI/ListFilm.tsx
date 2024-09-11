import React, { useState } from "react";
import './ListFilm.css'; // Import CSS file

// Type của dữ liệu trả về
type DataType = {
  id: string,
  name: string
}

const ListFilm: React.FC = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Lấy danh sách các movie genre thông qua fetching API đến một URL API
  // Dữ liệu lấy về (trong response) được xử lý để thiết lập lên màn hình
  const getListFilm = () => {
		fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', {
		  method: 'GET',
		  headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer <<API_KEY>>',
		  },
		  credentials: 'omit',
		  cache: 'no-cache',
		})
		.then(response => {
		  if (!response.ok) {
				throw new Error(response.statusText);
		  }
		  return response.json();
		})
		.then(data => {
		  setData(data.genres);
		  setError(null);
		})
		.catch(error => {
		  setError('Failed to fetch genres. Please try again.');
		})
  }

  return (
		<div className="list-film-container">
		  <h2>List of Movie Genres</h2>
		  {error && <p className="error-message">{error}</p>}
		  <select className="genre-select">
				{
				  data.map(item => (
						<option key={item.id} value={item.id}>{item.name}</option>
				  ))
				}
		  </select>
		  <button className="fetch-button" onClick={getListFilm}>Get List Film</button>
		</div>
  )
}

export default ListFilm;
