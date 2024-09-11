import React, { useRef } from 'react';
import CustomInput from './CustomInput';
import styles from './App.module.css';

const App: React.FC = () => {
	const inputRef = useRef<HTMLInputElement>(null);

	// Truy cập vào inputRef. Điều kiện control phải là forwardRef
	const handleFocus = () => {
	if (inputRef.current) {
		inputRef.current.focus();
	}
	};

	return (
	<div className={styles.container}>
		<h1 className={styles.header}>Forward Ref Example</h1>
		<CustomInput ref={inputRef} placeholder="Enter text here" />
		<button className={styles.button} onClick={handleFocus}>Focus Input</button>
	</div>
	);
};

export default App;
