/**
 * Ví dụ về Enhanced object literals: Khi server xử lý để lấy ra phòng ban và danh sách nhân viên phòng ban
 */
var departs = [												
		{										
				id: '001',								
				name: 'Phòng ban A',								
				employees: [								
						{						
								id: 'e001',				
								name: 'Nguyễn văn A',				
								role: 'tp'				
						},						
						{						
								id: 'e002',				
								name: 'Nguyễn văn B',				
								role: 'pp'				
						},						
				]								
		},										
		{										
				id: '002',								
				name: 'Phòng ban B',								
				employees: [								
						{						
								id: 'e003',				
								name: 'Nguyễn văn C',				
								role: 'tp'				
						},						
						{						
								id: 'e004',				
								name: 'Nguyễn văn D',				
								role: 'pp'				
						},						
				]								
		}										
]
/**
 * Ví dụ 2: Về cách định nghĩa key value cho object: [Trong một object thì được định nghĩa thuộc tính của object đó dưới dạng key: value]
 */
// var name = 'A';								
// var age = 20;								
								
// const obj = {								
//		  name: name,				// key là `name` - là định nghĩa thuộc tính `name` của đối tượng obj, value là `name` - là tham chiếu đến biến `name` có giá trị là 'A'				
//		  age: age,				// với age cũng tương tự. Chỗ này cần phân biệt rõ kẻo dễ nhầm lẫn				
//		  getName() {								
//				   return this.name;								
//		  }								
// }								

// var name = 'A';				
// var age = 20;				
				
// function obj() {				
//		  this.name = name;				
//		  this.age = age;				
//		  function getName() {				
//				   return obj.name;				
//		  }				
// }				

/**
 * Ví dụ 3: Định nghĩa key cho object dưới dạng biến
 */
// const obj = {
// 		name,
// 		age,
// 		getName: () => {
// 						 return this.name;
// 		}
// }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Ví dụ 4: Định nghĩa rút gọn tên
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var filedName = 'name'						
var fieldAge = 'age'						
						
const obj = {						
		 [filedName]: 'A',						
		 [fieldAge]: 20,						
}						
						
console.log(obj)						// Lúc này giá trị của obj là {name: 'A', age: 20}
						
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Bài tập ví dụ
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Viết một hàm chuyển đổi một mảng array thành object (dùng reduce)
 * 
 * VD: 
 * const obj1 = arrToObj([
 * ['name', 'Nguyen Van A'],		
 * ['age', 25],				
 * ['dev', 'DEV6'],				
 * ])				
 * console.log(obj1);				// Mong muốn: obj1 = {name: 'Nguyen Van A', age: 25, dev: 'DEV6'}
 * 
 */
function arrToObj(arr) {
		 var arrObj = arr.reduce((prev, curr) => {
						if (!prev) prev = []
						if (Array.isArray(prev)){
								 if (Array.isArray(curr) && curr.length == 2){
												prev.push({ [curr[0]]: curr[1]})		// Định nghĩa key là 1 biến
								 }
						}
						return prev;
		 }, [])		

		 return Object.assign({}, ...arrObj)
}
