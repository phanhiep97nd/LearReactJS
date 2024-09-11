import { useState, useCallback } from 'react';

/**
 * Khởi tạo custom hook dành cho việc quản lý logic đếm
 * @param initialValue khởi tạo value ban đầu
 * @returns state biểu thị value và hàm logic đếm
 */
const useCounter = (initialValue: number = 0) => {
	const [count, setCount] = useState(initialValue);

	const increment = useCallback(() => {
	setCount((prevCount) => prevCount + 1);
	}, []);

	return { count, increment };
};

export default useCounter;
