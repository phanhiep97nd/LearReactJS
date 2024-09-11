import { useEffect, useState } from "react"
// Data giả định
const prodData = [
  {
    id: 'T01',
    prodName: 'Ti vi 01',
    inventory: false
  },
  {
    id: 'T02',
    prodName: 'Ti vi 02',
    inventory: false
  },
  {
    id: 'T03',
    prodName: 'Ti vi 03',
    inventory: true
  },
  {
    id: 'T04',
    prodName: 'Ti vi 04',
    inventory: true
  },
  {
    id: 'T05',
    prodName: 'Ti vi 05',
    inventory: false
  },
]

/**
 * Đối tượng hiển thị danh sách Grid Product. Hiển thị danh sách đầy đủ hoặc một danh sách filter
 * các sản phẩm có tồn kho
 * 
 * (Chưa cần quan tâm đến các đối tượng React được đề cập ở đây)
 */
const FilterProdGrid = () => {
  const [inventory, setInventory] = useState(false);
  const [filterProdData, setFilterProdData] = useState(prodData);
  
  useEffect(() => {
    // Filter theo trạng thái tồn kho
    setFilterProdData(inventory? prodData : prodData.filter(item => item.inventory));
  }, [inventory])

  return (
    <>
      <ul>
        {
          /** render danh sách đối tượng đã được filter */
          filterProdData.map(item => <li key={item.id}>{item.prodName}</li>)
        }
      </ul>
      <span>
        <input id="checkFil" type="checkbox" checked={inventory} 
          onChange={(e) => setInventory(e.currentTarget.getAttribute('checked'))} />
        <label htmlFor="checkFil">Hiển thị danh sách tồn kho</label>
      </span>
    </>
  )
}

export default FilterProdGrid;