import React, { useReducer } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import TodoList from './TodoListComponent';
import AddTodo from './AddTodo';

interface Todo {
	id: number;
	text: string;
	completed: boolean;
}

/**
 * Định nghĩa type Action dành cho các hoạt động thao tác với TodoList
 */
type Action =
	| { type: 'ADD_TODO'; payload: string }	 // Thêm mới. Thông tin được lưu trong payload và là text - tên task
	| { type: 'EDIT_TODO'; payload: { id: number; text: string } }	// Chỉnh sửa. Thông tin được lưu trong payload gồm id của todo và text của todo
	| { type: 'DELETE_TODO'; payload: number }	// Xóa. Thông tin được lưu trong payload gồm id của todo cần xóa
	| { type: 'TOGGLE_TODO'; payload: number };	// Kiểm tra hoàn thành. Thông tin được lưu trong payload gồm id của todo cần đổi trạng thái

const initialState: Todo[] = [];

/**
 * Reducer function. Đối tượng của reducer là một state lưu trữ danh sách các Todo task
 * Với mỗi action: giá trị của state ở action sau thì phụ thuộc vào giá trị của state ở action trước
 * VD: Với action add Todo: giá trị của state là danh sách Todo trước khi thực hiện action + 1 todo mới
 * @param state giá trị hiện tại của state
 * @param action action chứa type là đại diện cho một hoạt động trên màn hình: Thêm mới, edit, xóa todo,...
 * @returns giá trị state mới phụ thuộc vào state trước đó
 */
function reducer(state: Todo[], action: Action): Todo[] {
	switch (action.type) {
	case 'ADD_TODO':
		return [...state, { id: Date.now(), text: action.payload, completed: false }];
	case 'EDIT_TODO':
		return state.map(todo =>
		todo.id === action.payload.id ? { ...todo, text: action.payload.text } : todo
		);
	case 'DELETE_TODO':
		return state.filter(todo => todo.id !== action.payload);
	case 'TOGGLE_TODO':
		return state.map(todo =>
		todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
		);
	default:
		return state;
	}
}

const TodosTaskView: React.FC = () => {
	// khai báo useReducer. Đối tượng quản lý state lúc này là todos. Function dispatch được React cung cấp dành cho việc thay đổi action
	// Lưu ý: tại ví dụ bên dưới: todos được truy cập và quản lý ở 2 Component: TodoList (danh sách todo) và AddTodo (thêm mới một todo)
	// Tạm thời chưa cần quan tâm đến Routes, Link,... thuộc react-router
	const [todos, dispatch] = useReducer(reducer, initialState);

	return (
	<Router>
		<div>
		<nav>
			<Link to="/">Home</Link>
			<Link to="/add">Add Todo</Link>
		</nav>
		<Routes>
			<Route path="/">
			<TodoList todos={todos} dispatch={dispatch} />
			</Route>
			<Route path="/add">
			<AddTodo dispatch={dispatch} />
			</Route>
		</Routes>
		</div>
	</Router>
	);
};

export default TodosTaskView;
