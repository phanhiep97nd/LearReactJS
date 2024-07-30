import React, { useState } from 'react';

const CounterFunction = () => {
	// Sử dụng hook useState để thêm state vào function component
	const [count, setCount] = useState(0);

	// Hàm để cập nhật state
	const incrementCount = () => {
		setCount(count + 1);
	};

	return (
		<div>
			<p>Count: {count}</p>
			<button onClick={incrementCount}>Increment</button>
		</div>
	);
}

export default CounterFunction;	
