import React, { useState } from 'react';

interface ProductData {
  id: string;
  name: string;
  lot: string;
  price: number;
}

interface ProductListData {
  products: ProductData[];
}

/**
 * Component này render danh sách sản phẩm. Sử dụng memo để memoize kết quả render Component
 * Nếu props không có thay đổi gì so với lần render trước thì lấy kết quả render trước đó để trả về
 */
const ProductList: React.FC<ProductListData> = React.memo<ProductListData>(({ products }) => {
  console.log('UserList rendered');
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
});

/**
 * Component này để nhập số lượng mua cho danh sách các sản phẩm
 * Khi nhập, hoặc click button thì có thay đổi state nên Component này render lại
 * Tuy nhiên, danh sách Product thì không thay đổi => vì được memo nên sẽ không render lại
 * @returns 
 */
const ProductsQuantityInput = () => {
  const [quantity, setQuantity] = useState(0);
  const [products] = useState<ProductData[]>([
    { id: 'ID01', name: 'Computer', lot: '1000', price: 1000 },
    { id: 'ID02', name: 'Keyboard', lot: '1001', price: 20 },
    { id: 'ID03', name: 'Mouse', lot: '1002', price: 15 },
  ]);

  return (
    <div>
      <h1>Số lượng: <input type='number' value={quantity} onChange={(e) => setQuantity(Number.parseInt(e.currentTarget.value))}/></h1>
      <button onClick={() => setQuantity(quantity + 1)}>Tăng</button>
      <button onClick={() => setQuantity(quantity - 1)}>Giảm</button>
      <ProductList products={products}/>
    </div>
  );
};

export default ProductsQuantityInput;
