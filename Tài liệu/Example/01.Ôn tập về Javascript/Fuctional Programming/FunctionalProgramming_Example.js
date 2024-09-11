///////////////////////////////////////////////////////////////////////////////////////
/// Purity
///////////////////////////////////////////////////////////////////////////////////////

// Ví dụ bên dưới là ví dụ về một function có tính chất purity (còn gọi là pure function)
// Function calculateTwoValue nhận đầu vào là 2 tham số với tính chất:
// 1. Với mỗi cặp tham số (a, b) xác định 1 kết quả duy nhất trả về từ calculateTwoValue cho dù có được gọi bao nhiêu lần chăng nữa
// 2. Việc tính toán của calculateTwoValue không làm thay đổi giá trị của bất cứ tham số nào nằm ngoài nó
var gAExp = '';
function calculateTwoValue(a, b) {
		if (typeof(a) === 'number' && typeof(b) === 'number') {
				return a + b;
		}
		return -1;
}

console.log(calculateTwoValue(1, 2));
console.log(calculateTwoValue(1, 'b'));



///////////////////////////////////////////////////////////////////////////////////////
/// Immutablility
///////////////////////////////////////////////////////////////////////////////////////

// Ví dụ bên dưới là một ví dụ về tính bất biến (immutability) của đối tượng. Ở đây từ khóa sử dụng là const, một đối tượng được khai
// báo là const thì sẽ là một hằng số. Biến firstArr lúc này được coi là một constance và không thể update giá trị được
// Do đó, trong trường hợp cần tạo một biến mới, có tính toán giá trị mới từ một giá trị có sẵn chúng ta thực hiện tạo mới một đối tượng
// const, sao chép từ đối tượng cũ rồi mới thực hiện các tính toán cũng như thay đổi
const arr1 = [1, 2, 3, 4, '5']
const arr2 = arr1.map(item => calculateTwoValue(item, 2));

console.log(arr1);
console.log(arr2);

// Lưu ý: Ví dụ sau đây dù có sử dụng contance nhưng thực chất là immutable
// Khi sử dụng const đối với một object thì thực chất tính bất biến áp dụng cho các attribute của object đó chứ không phải áp dụng cho giá trị tham chiếu
// Do đó, mặc dù đối tượng là const nhưng thuộc tính ref có thể thay đổi giá trị
const firstUser = {
		name: '',
		age: 20,
		gender: 'Male'
}

firstUser.age = 25



///////////////////////////////////////////////////////////////////////////////////////
/// First-class function
///////////////////////////////////////////////////////////////////////////////////////

// Ví dụ bên dưới là ví dụ về first-class functions
// function getRegexMatch có thể được gọi như một tham số tại một hoặc nhiều function khác như ví dụ bên dưới
// Ghi chú: first-class functions có một dạng nhỏ hơn, được sử dụng thường xuyên là callback function. Đây là các function
// mà sẽ được gọi như một tham số của function khác, tại một thời điểm cụ thể nào đó
function getRegexMatch(codeId) {
		switch (codeId) {
				case 'A':
						return '[A-Z]{1,}';
				case 'B':
						return '[0-9]{1,}'
				case 'C':
						return '[a-z]{1,}'
				default:
						return '*';
		}
}

function mapInput(input, codeId, regexFormat) {
		const regex = new RegExp(regexFormat(codeId), 'g');
		console.log(regex.test(input)? 'Match' : 'Not match');
}

mapInput('abc', 'B', getRegexMatch);

function isNumberString(input, regexFormat) {
		if (typeof(input) === 'string')
				return input.match(regexFormat('B'));
}

console.log(isNumberString('99', getRegexMatch));


///////////////////////////////////////////////////////////////////////////////////////
/// Higher-order function
///////////////////////////////////////////////////////////////////////////////////////


// Higher-order function là một function có thể nhận một hoặc nhiều function khác làm tham số, hoặc trả về một function dưới dạng đầu ra
// Ví dụ sau đây về higher-order function mà nhận tham số input là function: Chính là các built-in function của mảng
// Ví dụ: map, filter, reduce, forEach, every, some, find, findIndex, includes, indexOf, lastIndexOf, join,...
// Tại xử lý tính toán arr3, hàm map() - built-in function của mảng, nhận tham số input là một callbackFn
function square(input) {
		if (typeof(input) === 'number')
				return input * input;
		return -1;
}

const arr3 = arr1.map(function(item) {
		return square(item);
})

// Function calculator có thể coi là một higher-order function. Ở đây, nó vừa nhận tham số là một function và đồng thời cũng trả về một function
function calculator(fn) {
		let currentValue = 0;

		const enhancedFunction = function(...args) {
				const result = fn(...args);
				currentValue += result;
				return currentValue;
		};

		enhancedFunction.reset = function() {
				currentValue = 0;
		};

		return enhancedFunction;
}

// Hàm tính toán
function add(input) {
		return input;
}

const enhancedAdd = calculator(add);

console.log(calculator(enhancedAdd(5)));



///////////////////////////////////////////////////////////////////////////////////////
/// Function Composition
///////////////////////////////////////////////////////////////////////////////////////

// Compose function là việc kết hợp nhiều function với nhau trở thành một đối tượng function duy nhất
// Như ví dụ ở bên dưới, calculateComposed là hàm được tạo nhờ việc kết hợp tính toán của nhiều biểu thức khác nhau như addFn, subFn, multipleFn,...

const addFn = (x, y) => x + y;
const subFn = (x, y) => x - y;
const multipleFn = (x, y) => x * y;
const divideFn = (x, y) => x / y;

const fitParam = 3;
const calculateComposed = x => addFn(multipleFn(subFn(x, fitParam)), fitParam);

console.log(calculateComposed(9));


///////////////////////////////////////////////////////////////////////////////////////
/// Declarative function
///////////////////////////////////////////////////////////////////////////////////////

// Declarative function là các function chú trọng vào mô tả cách thức để đạt được kết quả mong muốn thay vì từng bước tới kết quả
// Ví dụ của Declarative function là các function built-in dành cho Array
// Khi chúng ta muốn lọc các phần tử trong một mảng theo một điều kiện nào đó (ví dụ: là số chẵn), thay vì triển khai vòng lặp, tính toán trên từng step như
// Interative function, đối với Declarative function, chúng ta sử dụng built-in function filter và truyền vào điều kiện của việc filter (cách thức để filter một đối tượng số chẵn)
// Chúng ta không quan tâm hàm filter được tạo ra như nào mà chỉ quan tâm điều kiện cần được mô tả cho việc filter mà thôi
const arr5 = arr1.filter(item => (typeof(item) === 'number' && item % 2 == 0));

// Đối với những yêu cầu phức tạp hơn (ví dụ: tính tổng các phần tử là số chẵn trong một mảng), việc sử dụng declarative linh hoạt giúp cho code ngắn gọn và dễ theo dõi hơn
const sum = arr1
								.filter(item => (typeof(item) === 'number' && item % 2 == 0))   // Filter đối tượng
								.reduce((acc, item) => acc + item, 0);												  // Tính tổng

// Một ví dụ khác về cách thức khai báo declarative code với hàm fetching dữ liệu (thư viện axios). Bằng cách thức triển khai này, hoạt động lấy dữ liệu trở nên dễ đọc và dễ theo dõi hơn
const axios = require('axios');

// Fetching dũ liệu
const fetchData = async () => {
  try {
		const { data } = await axios.get('https://api.example.com/data');
		processData(data);
  } catch (error) {
		console.error('Error fetching data:', error);
  }
};

// Function thực thi từng đối tượng trong data
const processData = (data) => {
  data.forEach(item => console.log(item));
};

// Gọi function
fetchData();



///////////////////////////////////////////////////////////////////////////////////////
/// Referential Transparency
///////////////////////////////////////////////////////////////////////////////////////

// Referential Transparency là việc đảm bảo một biểu thức nếu như có được thay thế nó bằng một giá trị đã được tính toán thì không làm thay đổi hành vi của cả chương trình
// Pure function chính là mang tính chất Referential Transparency do nó đảm bảo hạn chế các đối tượng phát sinh có thể gây ra thay đổi hành vi và giá trị của nó chỉ phụ thuộc vào
// tham số đầu vào của chính nó
// Ví dụ dưới đây tạo một hàm tính giá trị chiết khấu. Trong đó nếu như thay thế discountedPrice1 bằng giá trị thực tế thì kết quả tính toán không có thay đổi và không gây ảnh hưởng
// đến kết quả tính toán của hàm

const discount = (price, percentage) => price * (percentage / 100);

const discountedPrice1 = discount(100, 10);
const discountedPrice2 = discount(discountedPrice1, 15);

console.log(discountedPrice1);
console.log(discountedPrice2);



///////////////////////////////////////////////////////////////////////////////////////
/// Lazy Evaluation
///////////////////////////////////////////////////////////////////////////////////////

// Sử dụng Lazy Evaluation trong những trường hợp chúng ta chỉ mong muốn gọi đến logic tính toán khi đảm bảo một điều kiện nào đó 
// Việc này liên quan nhiều tới tối ưu khi tiết kiệm tài nguyên tính toán.
function* lazyRange(start, end) {
		for (let i = start; i < end; i++) {
		  yield i;
		}
  }
  
  const range = lazyRange(1, 5);
  // console.log là hàm callback. Nếu không áp dụng lazy evaluation ở đây thì mỗi lần gọi sẽ thực hiện loop giá trị sau đó lấy giá trị tương ứng gây tốn tài nguyên
  // Nhờ từ khóa yeild, sau khi lấy kết quả hàm sẽ dừng xử lý cho tới khi nào gặp hàm next() kế tiếp
  console.log(range.next().value); // 1
  console.log(range.next().value); // 2
  console.log(range.next().value); // 3
  console.log(range.next().value); // 4
  


///////////////////////////////////////////////////////////////////////////////////////
/// Recursion
///////////////////////////////////////////////////////////////////////////////////////

// Ứng dụng Recursion đối với các pure function trong việc thay thế các vòng lặp. Đối với Imperative code, thông thường không hay sử dụng Recursion do nó thiếu tính
// tối ưu trong tài nguyên (kết quả trả về của lần thực thi này phù thuộc vào xử lý tính toán của lần thực thi kế tiếp). Tuy nhiên khi kết hợp cùng với pure function
// thì lại tối ưu tài nguyên khi được biên dịch bởi trình biên dịch do tính chất không thay đổi của pure function

// Ví dụ khi muốn tính toán tổng các phần tử của một mảng
const sumArray = (arr) => {
		if (arr.length === 0) {
		  return 0;
		}
		const [first, ...rest] = arr;
		return first + sumArray(rest);
  };
  
console.log(sumArray([1, 2, 3, 4, 5]));
  