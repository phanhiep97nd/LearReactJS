const list_filter = [
  {key: '1', value: 'Item 1'},
  {key: '2', value: 'Item 2'},
  {key: '3', value: 'Item 3'},
]

const MenuList = 
<ul>
  {
    list_filter.map(item => <li key={item.key}>{item.value}</li>)
  }
</ul>

export default MenuList;