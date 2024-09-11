/**
 * Ví dụ 1: So sánh Function thông thường và function arrow
 */

// Function thông thường
// function fooA() {								
//   this.aParam = '1';						// this ở đây đại diện cho đối tượng fooA		
// }								
						  
// function fooB() {								
//   fooA.call();								
//   console.log(this.aParam);						// this ở đây đại diện cho đối tượng fooB		
// }						

// Function arrow
// const fooA = () => {		this.aParam = '1';   }								// Lỗi runtime vì this gọi đến window chứ không phải fooA nên không tồn tại tham số [aParam]

// var objA = {								
//   name: 'T',								
//   getName: function () {								
//		 return this.name;						// this ở đây trỏ đến đối tượng - chính là objA		
//   }								
// }								
		  
// var objB = {								
//   name: 'T',								
//   getName: () => {								
//		 return this.name;						// this ở đây không trỏ đến đối tượng, vì không có context => nó trỏ ra window		
//   }								
// }								

/**
 * Bài tập ví dụ: Viết một function trả về tổng tất cả các giá trị thuộc mảng truyền vào
 */
const sumArray = (arr) => arr.reduce((lastResult, currentVal) => lastResult + currentVal, 0)