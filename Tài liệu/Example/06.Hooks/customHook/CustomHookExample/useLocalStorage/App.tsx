import React from 'react';
import useLocalStorage from './useLocalStorage';
import styles from './App.module.css';

const App: React.FC = () => {
	// Sử dụng custom hook useLocalStorage
	const [name, setName, removeName] = useLocalStorage<string>('name', '');

	return (
	<div className={styles.container}>
		<h1 className={styles.header}>useLocalStorage Hook Example</h1>
		<input
		type="text"
		value={name}
		onChange={(e) => setName(e.target.value)}
		placeholder="Enter your name"
		className={styles.input}
		/>
		<button className={styles.button} onClick={removeName}>
		Clear Name
		</button>
	</div>
	);
};

export default App;
