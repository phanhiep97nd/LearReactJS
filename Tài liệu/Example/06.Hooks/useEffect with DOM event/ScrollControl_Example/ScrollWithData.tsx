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
const InfiniteScroll = () => {
  const [items, setItems] = useState<ItemType[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
		// Hàm này thiết lập xử lý scroll dữ liệu. Thực hiện cập nhật state loading nếu như:
		// 1. Đang không loading dữ liệu
		// 2. Nếu như đã scroll xuống cuối
		// Đối tượng state là `loading`
		const handleScroll = () => {
		  if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading) {
				return;
		  }
		  setLoading(true);
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
		  window.removeEventListener('scroll', handleScroll);
		};
  }, []);  // Gọi 1 lần khi component được mount thôi để tránh việc memory leak

  useEffect(() => {
		// Function xử lý load thêm dữ liệu. Sau khi load xong thì thiết lập loading thành false
		const loadMoreItems = async () => {
		  try {
				const response = await fetch(`/api/products?page=${page}`);
				if (response.ok) {
						const newItems = await response.json();
						setItems(prevItems => [...prevItems, ...newItems]);
						setPage(prevPage => prevPage + 1);
						setLoading(false);
				}
		  } catch (error) {
				alert(`Error fetching products: ${error}`);
				setLoading(false);
		  }
		};

		if (loading) {
		  loadMoreItems();
		}
  }, [loading, page]);  // Side effect thực hiện khi thay đổi trạng thái loading và số page

  return (
		<div>
		  <h1>Danh sách sản phẩm</h1>
		  <ul>
				{items.map((item, index) => (
				  <li key={index}>{item.name}</li>
				))}
		  </ul>
		  {loading && <p>Loading...</p>}
		</div>
  );
}

export default InfiniteScroll;
