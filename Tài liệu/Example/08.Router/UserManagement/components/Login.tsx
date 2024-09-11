import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import styles from '../styles/Login.module.css';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
		  await login({username, password});
		} catch (error) {
		  console.error('Failed to login:', error);
		}
  };

  return (
		<div className={styles.container}>
		  <h2 className={styles.header}>Login</h2>
		  <form onSubmit={handleSubmit} className={styles.form}>
				<label className={styles.label}>
				  Username:
				  <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className={styles.input} />
				</label>
				<label className={styles.label}>
				  Password:
				  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={styles.input} />
				</label>
				<button type="submit" className={styles.button}>Login</button>
		  </form>
		</div>
  );
};

export default Login;
