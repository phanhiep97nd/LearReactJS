import { keyboardKey } from '@testing-library/user-event';
import { getEventListeners } from 'events';
import React, { useState, useEffect } from 'react';

type ItemType = {
	id: string,
	name: string,
	price: number,
}

/**
 * Component này thực hiện việc thao tác với hoạt động scroll trên màn hình
 * Infinite Scroll: Mỗi khi scroll xuống cuối trang thì thực hiện load dữ liệu thêm từ database cho tới khi không còn dữ liệu nữa
 * @returns 
 */
const SearchData = () => {
	const [prodName, setProdName] = useState('');
	const [items, setItems] = useState<ItemType[]>([]);
	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(1);

	useEffect(() => {
	const handlerF5Click = async (e: KeyboardEvent) => {
		if (e.key === '116')	{ // Nếu là press F5 key thì thực hiện gọi action click giống như click button tìm kiếm
		await handleClick();
		}
	}

	window.addEventListener('keypress', async (e) => handlerF5Click(e));
	// Gọi 1 lần khi Component unmount. Hủy sự kiện đã đăng ký để tránh gây ra ảnh hưởng tới các Component khác
	return () => {
		window.removeEventListener('keypress', async (e) => handlerF5Click(e));
	}
	}, []); // Gọi 1 lần Component mount

	// function thao tác dành cho việc click button: gọi đến API lấy dữ liệu
	const handleClick = async () => {
	try {
		const response = await fetch(`/api/products?page=${page}`);
		if (response.ok) {
			const newItems = await response.json();
			setItems(newItems);
			setPage(1);
			setLoading(false);
		}
	} catch (error) {
		alert(`Error fetching products: ${error}`);
		setLoading(false);
	}
	}

	return (
	<div>
		<h1>Danh sách sản phẩm</h1>
		<div className='search-grid'>
		<div>
			<span>Tên sản phẩm: </span>
			<input type='text' value={prodName} onChange={(e) => setProdName(e.target.value)} />
		</div>
		<button onClick={() => handleClick()} title='Có thể tìm kiếm khi click F5'>Tìm kiếm</button>
		</div>
		<ul>
		{items.map((item, index) => (
			<li key={index}>{item.name}</li>
		))}
		</ul>
		{loading && <p>Loading...</p>}
	</div>
	);
}

export default SearchData;
