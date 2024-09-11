import React, { useState, useMemo } from 'react';

interface User {
	id: number;
	name: string;
	age: number;
}

const UserList: React.FC<{ users: User[] }> = ({ users }) => {
	console.log('UserList rendered');
	return (
	<ul>
		{users.map(user => (
		<li key={user.id}>{user.name} - {user.age}</li>
		))}
	</ul>
	);
};

const App: React.FC = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [users] = useState<User[]>([
	{ id: 1, name: 'Alice', age: 25 },
	{ id: 2, name: 'Bob', age: 30 },
	{ id: 3, name: 'Charlie', age: 35 },
	]);

	/**
	 * Function filteredUsers. Thực hiện filter các user theo giá trị search
	 * Giá trị tính toán (danh sách users sau khi filter) được memo lại, do đó khi Component render lại thì
	 * không thực hiện tính toán nếu như searchTerm và users không có thay đổi
	 */
	const filteredUsers = useMemo(() => {
	return users.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()));
	}, [searchTerm, users]);

	return (
	<div>
		<input
		type="text"
		value={searchTerm}
		onChange={e => setSearchTerm(e.target.value)}
		placeholder="Search by name"
		/>
		<UserList users={filteredUsers} />
	</div>
	);
};

export default App;
