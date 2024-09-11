import React, { useState, useRef, useLayoutEffect } from 'react';


interface Position {
		x: number;
		y: number;
  }

/**
 * Tạo một Component có khả năng kéo thả. Khi kéo thả hạng mục trên màn hình thì layout mới được cập nhật ngay lập tức
 * @returns 
 */
const DraggableBox = () => {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const boxRef = useRef<HTMLDivElement | null>(null);

  // Sử dụng useLayoutEffect do cập nhật về giao diện yêu cầu phải được phản ánh ngay lập tức lên giao diện
  useLayoutEffect(() => {
		const box = boxRef.current;
		let startX: number, startY: number, initialX: number, initialY: number;

		// Action cho event nhấn chuột. Lấy tọa độ hiện tại của con chuột cũng như tọa độ hiện tại của Component (tọa độ x, y)
		// Đồng thời đăng ký event action dành cho mousemove (di chuột) và mouseup (thả chuột)
		const handleMouseDown = (event: MouseEvent) => {
		  startX = event.clientX;
		  startY = event.clientY;
		  initialX = position.x;
		  initialY = position.y;
		  document.addEventListener('mousemove', handleMouseMove);
		  document.addEventListener('mouseup', handleMouseUp);
		};

		// Action dành cho event di chuột. Tính toán tọa độ mới dựa theo tọa độ hiện tại của chuột - tọa độ cũ
		// Sau đó cộng vào tọa độ của Component (cũ)
		const handleMouseMove = (event: MouseEvent) => {
		  const dx = event.clientX - startX;
		  const dy = event.clientY - startY;
		  setPosition({ x: initialX + dx, y: initialY + dy });
		};

		// Action dành cho event thả chuột. Remove các event handler đã đăng ký tại event handler mousedown
		const handleMouseUp = () => {
		  document.removeEventListener('mousemove', handleMouseMove);
		  document.removeEventListener('mouseup', handleMouseUp);
		};

		box!.addEventListener('mousedown', handleMouseDown);

		// Clean event listener với hoạt động nhấn chuột. Việc clear event được chạy mỗi khi state position có thay đổi
		return () => {
		  box!.removeEventListener('mousedown', handleMouseDown);
		};
  }, [position]); // Chạy lại mỗi khi position thay đổi

  return (
		<div
		  ref={boxRef}
		  style={{
				position: 'absolute',
				left: `${position.x}px`,
				top: `${position.y}px`,
				width: '100px',
				height: '100px',
				backgroundColor: 'lightblue',
				cursor: 'grab',
		  }}
		>
		  Drag me
		</div>
  );
}

export default DraggableBox;
