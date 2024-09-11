import React, { useState, useCallback } from 'react';

interface Item {
  id: number;
  value: string;
}

/**
 * ItemList là đối tượng được memoize bằng React.memo => chỉ render nếu như cả 2 tham số input đều có thay đổi
 * trong đó: addItem là callback function đã được memoize => tác động đến việc memoize của Component ItemList
 * Tối ưu hiệu suất cho cả ItemList theo callback function
 */
const ItemList: React.FC<{ items: Item[]; addItem: () => void }> = React.memo(({ items, addItem }) => {
  return (
		<div>
		  <ul>
				{items.map(item => (
				  <li key={item.id}>{item.value}</li>
				))}
		  </ul>
		  <button onClick={addItem}>Add Item</button>
		</div>
  );
});

const App: React.FC = () => {
  const [items, setItems] = useState<Item[]>([{ id: 1, value: 'Item 1' }]);
  const [quantity, setQuantity] = useState(0);

  /**
   * Sử dụng useCallback ở đây để addItem chỉ thực hiện render lại khi setItems có thay đổi
   * Khi Component bị thay đổi (do state thay đổi) - thì addItem chỉ tạo lại nếu đối tượng thay đổi là setItems (khi có thêm item mới)
   */
  const addItem = useCallback(() => {
		setItems(prevItems => [
		  ...prevItems,
		  { id: prevItems.length + 1, value: `Item ${prevItems.length + 1}` }
		]);
  }, [setItems]);

  return (
		<div>
		  <p>Count: <input type='number' value={quantity} onChange={(e) => setQuantity(Number.parseInt(e.currentTarget.value))} /></p>
		  <button onClick={() => setQuantity(quantity + 1)}>+</button>
		  <button onClick={() => setQuantity(quantity - 1)}>-</button>
		  <ItemList items={items} addItem={addItem} />
		</div>
  );
};

export default App;
