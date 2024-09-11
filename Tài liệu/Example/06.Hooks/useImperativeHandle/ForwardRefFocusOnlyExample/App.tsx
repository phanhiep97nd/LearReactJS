import React, { useRef } from 'react';
import CustomInput from './CustomInput';
import styles from './App.module.css';

const App: React.FC = () => {
	// truy cập đến các method đã định nghĩa trong CustomInput (hook useImperativeHandle)
	// thông qua useRef
	// Theo định nghĩa của input handle chỉ public 2 method nên khi truy cập với ref.current cũng chỉ sử dụng
	// được 2 method này
	const inputRef = useRef<{ focus: () => void; clear: () => void }>(null);

	const handleFocus = () => {
	if (inputRef.current) {
		inputRef.current.focus();
	}
	};

	const handleClear = () => {
	if (inputRef.current) {
		inputRef.current.clear();
	}
	};

	return (
	<div className={styles.container}>
		<h1 className={styles.header}>Forward Ref Example</h1>
		<CustomInput ref={inputRef} placeholder="Enter text here" />
		<button className={styles.button} onClick={handleFocus}>Focus Input</button>
		<button className={styles.button} onClick={handleClear}>Clear Input</button>
	</div>
	);
};

export default App;
