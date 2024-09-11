import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TODO_TYPE } from './constant';

interface AddTodoProps {
  dispatch: React.Dispatch<any>;
}

/**
 * Component dành cho màn hình đăng ký Todo task mới. Khi đăng ký xong thì danh sách todo được cập nhật thêm thông tin todo mới
 * @param param0 nhận tham số dispatch là function truyền trạng thái và thông tin khi add mới todo
 * @returns Cấu trúc jsx của Component dành cho việc add mới
 */
const AddTodo: React.FC<AddTodoProps> = ({ dispatch }) => {
  const [text, setText] = useState('');
  const navigate = useNavigate();

  const handleAdd = () => {
		if (text.trim()) {
		  // Khi click button add và có thông tin task thì đưa vào tham số truyền trong dispatch tới reducer
		  dispatch({ type: TODO_TYPE.ADD_TODO, payload: text });
		  navigate('/');
		}
  };

  return (
		<div>
		  <h1>Add Todo</h1>
		  <input
				type="text"
				value={text}
				onChange={e => setText(e.target.value)}
				placeholder="Enter todo"
		  />
		  <button onClick={handleAdd}>Add</button>
		</div>
  );
};

export default AddTodo;
