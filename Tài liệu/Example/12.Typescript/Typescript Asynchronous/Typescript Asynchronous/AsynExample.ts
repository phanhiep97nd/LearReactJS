//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Callback function
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function fetchData(callback: (data: string) => void) {
  setTimeout(() => {
		callback("Data received");
  }, 1000);
}

fetchData((data: string) => {
  console.log(data); // Output: Data received
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Promise
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function fetchDataPromise(): Promise<string> {
  return new Promise((resolve, reject) => {
		setTimeout(() => {
		  resolve("Data received");
		}, 1000);
  });
}

fetchDataPromise()
  .then((data) => {
		console.log(data); // Output: Data received
  })
  .catch((error) => {
		console.error(error);
  });


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Async/Await
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import axios from 'axios';

// Định nghĩa interface cho dữ liệu nhận được
interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

// Định nghĩa hàm async để fetch data
async function fetchTodo(): Promise<void> {
  try {
		const response = await axios.get<Todo>('https://localhost:1234/todos/1');
		const todo = response.data;
		console.log('Todo received:', todo);
  } catch (error) {
		console.error('Error fetching todo:', error);
  }
}

// Gọi hàm fetchTodo
fetchTodo();