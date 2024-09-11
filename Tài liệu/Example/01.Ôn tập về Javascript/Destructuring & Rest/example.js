/**
 * Ví dụ 1: So sánh khi chưa áp dụng/ có áp dụng Destructuring
 */

// // 1. Đối với Array
// const initialArr = [1, 2, 5];

// // Chưa áp dụng Destructuring
// let paramA = initialArr[0];				// a = 1
// let paramB = initialArr[1];				// b = 2
// let paramC = initialArr[2];				// c = 5

// // Có áp dụng Destructuring

// // TH1: lấy tất cả các phần tử
// let [paramD, paramE, paramF] = initialArr;
// console.log(paramD);
// console.log(paramE);
// console.log(paramF);

// // TH2: chỉ lấy một số lượng phần tử trong mảng
// let [paramG, ,paramH] = initialArr;				// paramG = 1, paramH = 5
// console.log(paramG);
// console.log(paramH);


// // 2. Đối với object
// const initialObj = {a: 1, b: 3, c: 6}		

// // Chưa áp dụng Destructuring
// let keyA = initialObj.a;
// let keyB = initialObj.b;
// let keyC = initialObj.c;

// // Có áp dụng Destructuring

// // TH1: lấy tất cả các key
// let [keyD, keyE, keyF] = initialObj;
// console.log(keyD);
// console.log(keyE);
// console.log(keyF);

// // TH2: Tạo object với các key mới và value tương ứng với value trong initialObj
// let {a:keyG, b:keyH, c:keyI} = initialObj
// console.log(keyG);  // 1
// console.log(keyH);  // 3
// console.log(keyI);  // 6


/**
 * Ví dụ 2: Áp dụng Rest
 */

// // Đối với Array
// const initialArr = [1, 2, 5];

// // Chưa áp dụng Rest
// let paramA = initialArr[0];		
// let paramsRest = initialArr.shift();		

// // Có áp dụng Rest
// let [a, ...rest] = initialArr;

// Đối với object
const initialObj = {x: 1, y: 2, z: 3};

// Có áp dụng Rest
let {x, ...rest} = initialObj;						// x = 1, rest = {y: 2, z: 3}
console.log(rest)

let newObj = {x}
console.log(newObj)		// newObj = {x: 1}

/**
 * Ví dụ: Áp dụng Destructuring & Rest trong vòng lặp từng phần tử của Array
 * giả định 1 mảng departs gồm nhiều phòng ban và mỗi phòng ban lại có 1 mảng employees có nhiều nhân viên
 * Cần lấy thông tin của nhân viên để xử lý nội dung nào đó
 */

const departs = [
  {
		depart_code: 'D1',
		depart_name: 'Depart 1',
		employees: [
		  {
				emp_code: 'E1',
				emp_name: 'Empl 1',
				role: 'Member'
		  },
		  {
				emp_code: 'E2',
				emp_name: 'Empl 2',
				role: 'Member'
		  },
		  {
				emp_code: 'E3',
				emp_name: 'Empl 3',
				role: 'Member'
		  },
		]
  },
  {
		depart_code: 'D2',
		depart_name: 'Depart 2',
		employees: [
		  {
				emp_code: 'E4',
				emp_name: 'Empl 4',
				role: 'Member'
		  },
		  {
				emp_code: 'E5',
				emp_name: 'Empl 5',
				role: 'Member'
		  },
		  {
				emp_code: 'E6',
				emp_name: 'Empl 6',
				role: 'Member'
		  },
		]
  }
]

// TH 1: Xử lý như thông thường
for (let i = 1; i < departs.length; i++)		// Để loop thì phải khai báo qua biến i
{		
  let employees = departs[i].employees;		
  //… xử lý employees		
}

// TH 2: Sử dụng Destructuring
for (let {employees} of departments)		
{		
  //… xử lý employees		
}		
