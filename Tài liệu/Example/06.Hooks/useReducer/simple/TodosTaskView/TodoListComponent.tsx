import React from 'react';
import { Link } from 'react-router-dom';
import { TODO_TYPE } from './constant';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoListProps {
  todos: Todo[];
  dispatch: React.Dispatch<any>;
}
/**
 * Component này thể hiện một danh sách các Todo task dưới dạng ul-li
 * Trên mỗi đối tượng todo, có button cho phép xóa todo
 * Khi click vào todo thì đổi trạng thái todo
 * Trên Component đồng thời có link di chuyển sang màn hình add mới todo
 * @param param0 gồm các tham số: todos là danh sách todos (truyền từ Component cha)
 * và dispatch (function đóng vai trò truyền action type cho reducer)
 * Khi dispatch truyền giá trị thì làm thay đổi state ở Component cha => render lại Component
 * @returns Trả về cấu trúc jsx của Component danh sách Todo
 */
const TodoList: React.FC<TodoListProps> = ({ todos, dispatch }) => {
  return (
    <div>
      <h1>Todo List</h1>
      <Link to="/add">Add New Todo</Link>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span
              style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
              onClick={() => dispatch({ type: TODO_TYPE.TOGGLE_TODO, payload: todo.id })}
            >
              {todo.text}
            </span>
            <button onClick={() => dispatch({ type: TODO_TYPE.DELETE_TODO, payload: todo.id })}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
