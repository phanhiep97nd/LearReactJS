import React from 'react';
import { useGenres } from './api'; // Đường dẫn có thể khác tùy theo cấu trúc thư mục của bạn
import './ListFilm.css'; // Import CSS file

const ListFilm: React.FC = () => {
  const { data: genres, error, isLoading, isError } = useGenres();

  return (
    <div className="list-film-container">
      <h2>List of Movie Genres</h2>
      {isLoading && <p>Loading...</p>}
      {isError && <p className="error-message">{error?.message}</p>}
      <select className="genre-select">
        {genres && genres?.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ListFilm;
