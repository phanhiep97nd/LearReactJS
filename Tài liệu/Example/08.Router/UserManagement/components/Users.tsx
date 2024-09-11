import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useQuery } from 'react-query';
import styles from '../styles/Users.module.css';
import { fetchUsers } from '../backend';
import { User } from '../model';

const Users: React.FC = () => {
	const { user } = useAuth();
	// Sử dụng searchParams được lấy từ hook để bóc tách phần params trong query string
	const [searchParams] = useSearchParams();
	// Sử dụng navigate được cung cấp từ hook để điều hướng
	const navigate = useNavigate();
	const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
	
	const { data: users, isLoading, error } = useQuery<User[]>('users', fetchUsers);

	useEffect(() => {
	if (users) {
		const createDateFrom = searchParams.get('createDateFrom');
		const createDateTo = searchParams.get('createDateTo');

		let filtered = users;

		if (createDateFrom) {
		filtered = filtered.filter(
			(user) => new Date(user.createDate) >= new Date(createDateFrom)
		);
		}

		if (createDateTo) {
		filtered = filtered.filter(
			(user) => new Date(user.createDate) <= new Date(createDateTo)
		);
		}

		setFilteredUsers(filtered);
	}
	}, [users, searchParams]);

	/**
	 * Điều hướng tới Add user
	 */
	const handleAdd = () => {
	navigate('/users/add');
	};

	/**
	 * Điều hướng tới edit user
	 */
	const handleEdit = (id: number) => {
	navigate(`/users/edit/${id}`);
	};

	const handleDelete = (id: number) => {
	if (window.confirm('Are you sure you want to delete this user?')) {
		// Call delete API here
		setFilteredUsers(filteredUsers.filter(user => user.id !== id));
	}
	};

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error loading users</div>;

	return (
	<div className={styles.container}>
		<h2 className={styles.header}>Users</h2>
		<input type="text" placeholder="Search..." className={styles.input} />
		<button className={styles.button}>Search</button>
		{user?.role === 'admin' && <button className={styles.button} onClick={handleAdd}>Add User</button>}
		<div className={styles.results}>
		{filteredUsers.map(user => (
			<div key={user.id} className={styles.userItem}>
			<span>{user.name}</span>
			<span>{user.createDate}</span>
			{user.role !== 'member' && (
				<>
				<button className={styles.button} onClick={() => handleEdit(user.id)}>Edit</button>
				<button className={styles.button} onClick={() => handleDelete(user.id)}>Delete</button>
				</>
			)}
			</div>
		))}
		</div>
	</div>
	);
};

export default Users;
