import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../styles/AddDepart.module.css';

const AddDepart: React.FC = () => {
	const [name, setName] = useState('');
	// Sử dụng navigate được cung cấp từ hook để điều hướng
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
	e.preventDefault();
	try {
		await axios.post('/api/departs', { name });
		/**
		 * Chuyển hướng sang Component list departs
		 */
		navigate('/departs');
	} catch (error) {
		console.error('Failed to add department:', error);
	}
	};

	return (
	<div className={styles.container}>
		<h2 className={styles.header}>Add Department</h2>
		<form onSubmit={handleSubmit} className={styles.form}>
		<label className={styles.label}>
			Name:
			<input type="text" value={name} onChange={(e) => setName(e.target.value)} className={styles.input} />
		</label>
		<button type="submit" className={styles.button}>Add</button>
		</form>
	</div>
	);
};

export default AddDepart;
