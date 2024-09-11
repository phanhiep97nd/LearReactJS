import axios from "axios";

// I. So sánh giữa axios và fetch API về request - response như sau:
// 1. cấu hình một thông tin HTTP request. Bao gồm:
// - config:	fetch API thì cần tạo config bao gồm thông method, body, các thông tin khác
// như headers,... Còn axios, vì có alias method nên chỉ cần cấu hình các thông tin như headers,...
// - data: Trong fetch API, data request được lưu trong attr `body`. Ngoài ra, data cần
// được convert về dạng json. axios thì tự động được convert
// 2. Với response:
// - Với fetch, dữ liệu trả về cần phải được convert với response.json(). Với axios thì tự
// động chuyển đổi response data
// - Với trường hợp lỗi: axios tự động reject exception và có thể catch được để xử lý nếu như
// response trả về có HTTP status code khác dạng 2xx. Đối với fetch, các HTTP status code khác 200,
// không bị reject, không thể catch được, và cần phải check với attr response.ok


const urlToDoCreate = '/todos/create';

const todoData = {
	name: 'Task A',
	description: 'This is task A',
	completed: false,
	startDate: '2024/06/24',
	endDate: '2024/06/25',
	userId: 1
}

// Fetch API
const optionsFetchAPI = {
	method: 'POST',
	headers: {
	'Accept': 'application/json',
	'Content-Type': 'application/json;charset=UTF-8',
	'Authorization': '',
	},
	body: JSON.stringify(todoData),
}

fetch(urlToDoCreate, optionsFetchAPI)
	.then(response => {
	if (response.ok)
		return response.json();
	return {}
	})
	.then(data => {
	console.log(`Add task success. Task name: ${data.name}`);
	})
	.catch(error => console.error(error.message));

// Axios
axios.post(urlToDoCreate, todoData, {
	headers: {
	'Accept': 'application/json',
	'Content-Type': 'application/json;charset=UTF-8',
	'Authorization': '',
	}
}).then(({ data }) => {
	console.log(`Add task success. Task name: ${data.name}`);
}).catch(error => {
	if (error.response) {
	console.error(`HTTP error: ${error.response.status}`);
	} else if (error.request) {
	console.error("Request error: No response received");
	} else {
	console.error("Error:", error.message);
	}
});


// II. So sánh về xử lý chặn (intercepting) HTTP Requests và Response
// Với Axios thì có tính năng chặn (intercept) các HTTP Requests, nó sẽ hữu ích trong trường hợp cần kiểm
// tra hoặc thay đổi các HTTP request từ ứng dụng đến máy chủ hoặc ngược lại. có thể coi nó tương đương như một
// middleware function cho phép can thiệp vào giữa các HTTP request - response
// Ứng dụng: 
// - Ghi nhật ký
// - xác thực thông tin, update request (thêm thông tin token, kiểm tra token expired,...)
// - gửi lại data, transform data và error

const urltodoList = '/todos/list';

// Tạo một request interceptors thực hiện ghi log mỗi khi có một request gửi tới endpoint
// Log được thực hiện trước khi request được gửi
axios.interceptors.request.use((request) => {
	console.log(`Request has been sent to endpoint ${request.url}`);

	// giả định chúng ta cần add thông tin token cố định vào request
	const newToken = 'Bearer abc';
	const newHeaders = {
	...request.headers,
	Authorization: newToken,
	};

	const tokenRequest = {
	...request, headers: newHeaders
	}

	return tokenRequest;
}, (error) => {
	return Promise.reject(error);
})

axios.interceptors.response.use((response) => {
	// Xử lý response trả về. Ví dụ khi chúng ta chỉ cần lấy thông tin về data response, không quan tâm đến các thông tin khác (status code, request,...)
	const data = response.data;

	return { data };
})

axios.get(urltodoList)
	.then(({data}) => {
	console.log("Data received:", data);
	})
	.catch((error) => {
	console.error("Error:", error.message);
	});


// III. Cấu hình thông tin timeout khi quá thời gian phản hồi
// Đối với axios có attr timeout nên khi quá thời gian phản hồi sẽ tự động reject
// Đối với fetch thì không có attr này nên cần sử dụng một cách gián tiếp thông qua
// AbortController
const timeout = 5000;

// Axios

axios.get(urltodoList, { timeout: timeout })
	.then(({data}) => {
	console.log("Data received:", data);
	})
	.catch((error) => {
	console.error("Error:", error.message);
	});


// Fetch

// Tạo một instance của đối tượng AbortController
// Đối tượng này thực hiện đóng tất cả các luồng bất đồng bộ - như vượt quá thời gian nhận response
const controller = new AbortController();
const signal = controller.signal;

const timeoutId = setTimeout(() => {
	controller.signal;
}, timeout);

fetch(urltodoList, { signal })
	.then(response => {
	if (!response.ok) {
		throw new Error('Network response was not ok');
	}
	return response.json();
	})
	.then(data => {
	console.log('Data received:', data);
	})
	.catch(error => {
	// Kiểm tra xem lỗi trả về có phải là lỗi timeout hay không (thông qua đối tượng AbortError)
	if (error.name === 'AbortError') {
		console.error('Request timed out');
	} else {
		console.error('Error fetching data:', error.message);
	}
	})
	.finally(() => {
	// Clear đối tượng timeout. Đối tượng này là không tự giải phóng được nên cần phải clear
	clearTimeout(timeoutId);
	});

// IV. Parallel requests: Trong axios, có hỗ trợ việc thực hiện việc gọi nhiều HTTP request đồng thời
// Trong khi đó fetch chưa hỗ trợ built-in function dành cho triển khai nhiều HTTP request đồng thời
// Sẽ cần phải triển khai gián tiếp qua Promise.all

// Giả định màn hình cần hiển thị các thông tin gồm:
// - Số lượng todo task đã hoàn thành
// - Todo task đang được thực hiện
// Axios triển khai parallel request cho 2 yêu cầu trên với axios.all
// Ngược lại, fetch cần triển khai gián tiếp với Promise.all

const urlCountDoneTodos = '/todos/countDone?date=today';
const urlGetCurrentTodo = '/todos/current';

const urls = [
	urlCountDoneTodos,
	urlGetCurrentTodo,
]

// Axios
const axiosRequests = urls.map(url => axios.get(url));
axios.all(axiosRequests)
.then(axios.spread(...responses => {
	responses.array.forEach((response, index) => {
	if (index == 0) {
		// Action for urlCountDoneTodos response
	}
	if (index == 1) {
		// Action for urlGetCurrentTodo response
	}
	});
}))
.catch(error => {
	console.error('Error fetching data:', error.message);
});

// Fetch
const fetchRequests = urls.map((url) => fetch(url));

Promise.all(fetchRequests)
.then((responses) => {
	responses.array.forEach((response, index) => {
	if (response.ok) {
		if (index == 0) {
		// Action for urlCountDoneTodos response
		}
		if (index == 1) {
		// Action for urlGetCurrentTodo response
		}
		response.json().then((data) => {
		// Process data
		})
	}
	});
})
.catch((error) => {
	console.error("Error fetching data:", error.message);
})