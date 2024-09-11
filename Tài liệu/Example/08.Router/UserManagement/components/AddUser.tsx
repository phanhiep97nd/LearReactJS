import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../styles/AddUser.module.css';

const AddUser: React.FC = () => {
	const [name, setName] = useState('');
	const [role, setRole] = useState('');
	// Sử dụng navigate được cung cấp từ hook để điều hướng
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
	e.preventDefault();
	try {
		await axios.post('/api/users', { name, role });
		/**
		 * Chuyển hướng sang Component list users
		 */
		navigate('/users');
	} catch (error) {
		console.error('Failed to add user:', error);
	}
	};

	return (
	<div className={styles.container}>
		<h2 className={styles.header}>Add User</h2>
		<form onSubmit={handleSubmit} className={styles.form}>
		<label className={styles.label}>
			Name:
			<input type="text" value={name} onChange={(e) => setName(e.target.value)} className={styles.input} />
		</label>
		<label className={styles.label}>
			Role:
			<select value={role} onChange={(e) => setRole(e.target.value)} className={styles.input}>
			<option value="">Select role</option>
			<option value="member">Member</option>
			<option value="manager">Manager</option>
			<option value="admin">Admin</option>
			</select>
		</label>
		<button type="submit" className={styles.button}>Add</button>
		</form>
	</div>
	);
};

export default AddUser;
