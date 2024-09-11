// CounterClassComponent.tsx
import React, { Component } from 'react';
import withCounter from './withCounter';

interface CounterProps {
	counter: {
	count: number;
	increment: () => void;
	};
}

class CounterClassComponent extends Component<CounterProps> {
	render() {
	const { count, increment } = this.props.counter;

	return (
		<div>
		<p>Count: {count}</p>
		<button onClick={increment}>Increment</button>
		</div>
	);
	}
}

// Ở đây, thông qua HOCs, giá trị từ hook được truyền vào cho CounterClassComponent như là một tham số props
// CounterClassComponent chỉ cần method render để render cấu trúc theo props đã nhận. Giúp tận dụng ưu thế
// của hook là sự ngắn gọn và dễ triển khai
export default withCounter(CounterClassComponent);
