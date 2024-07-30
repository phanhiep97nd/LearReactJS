/**
 * Ví dụ 1: Cách thức khai báo spread operator
 */

// // Đối với Array
// var arr1 = ['a', 'b', 'g', 'h'];
// var arr2 = [...arr1];   // Giá trị trả về là arr2 = ['a', 'b', 'g', 'h']

// // Đối với Object
// var obj1 = {	
//   name: 'Nguyễn Văn A',
//   age: 30,
//   country: 'Việt Nam',
// }	

// var obj2 = {...obj1}	

// var arr5 = [1, '2', 'abc', {script_dat: 'hello', greet: () => console.log(this.script_dat)}]

/**
 * Ví dụ 2: Sử dụng Spread Operator để sao chép Array/Object
 */

// // Với Object

// var obj1 = {			
//   name: 'Nguyễn Văn A',			
//   age: 30,			
//   country: 'Việt Nam',			
// }			
   
// var obj2 = {...obj1}			
   
// var obj1 = {			
//   name: 'Nguyễn Văn A',			
//   age: 30,			
//   country: 'Việt Nam',			
// }			
   
// var obj2 = {			        // obj2 được sao chép và thay đổi từ obj1. Ở đây chúng ta cần lưu ý: dù là
//   ...obj1,		            // đang gán 2 lần thuộc tính  name trong obj tuy nhiên không có lỗi do thuộc
//   name: 'Nguyễn Văn B',		// tính được lấy theo giá trị set sau. Về bản chất obj vẫn chỉ có 1 thuộc tính name
// }	

/**
 * Ví dụ 3: Sử dụng Spread Operator để mở rộng Array/Object
 */

// // Với Array
// var arr1 = ['a', 'b', 'g', 'h']	
// var arr2 = [...arr1, 'b', 'c', 'd'] // arr2 = ['a', 'b', 'g', 'h', 'b', 'c', 'd']

// // Với Object
// var initEmp = {			
//   name: '',
//   age: 0,
//   country: 'Việt Nam',
// }
   
// var firstEmp = {			// emp2 được mở rộng từ initEmp
//   ...initEmp,
//   name: 'Nguyễn Văn B',
//   age: 30,
//   dev: 'DEV6'
// }

/**
 * Ví dụ 4: Sử dụng Spread Operator để kết hợp Array/Object
 */

// Với Array
var arr3 = ['a', 'b', 'g', 'h']
var arr4 = ['e', 'f', 'i', 'k']
var arr2 = [...arr1, ...arr2]

// Với Object
var info = {
  id: 'I01',
  name: 'Name 1',
  age: 20,
  gender: 'Male'
}

var address = {
  city: 'city',
  district: 'district',
  ward: 'ward',
}

var profile = {...info, ...address}

/**
 * Ví dụ 5: Sử dụng Spread Operator để chuyển đổi thành đối số
 */

function sumPrice(priceProd, tax, other) {	
  return (priceProd + tax + other);	
}	

let phonePrices = [100, 10, 2]	
console.log(sum(...addressphonePrices))	



/**
 * Ví dụ 6: Sử dụng Spread Operator làm tham số
 */
function checkData(...args) {
  let queryString = '?';
  if (args.name) {
    queryString = `${queryString}name=${args.name}&`;
  }
  if (args.age) {
    queryString = `${queryString}age=${args.age}&`;
  }
  //...
  return queryString;
}

let qr = checkData({name: '2', age: 23, address: 'abc'})