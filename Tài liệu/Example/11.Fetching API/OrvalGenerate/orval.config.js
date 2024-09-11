module.exports = {
  tmdb: {
		output: {
		  mode: 'split',  // Cấu hình mode. Mặc định là single (type được generate chung vào 1 file)
										  // Nếu là split thì phân chia thành các đối tượng khác nhau
		  target: './src/api/api.ts', // Đối tượng output của react-query 
		  schemas: './src/api/model', // Đối tượng generate các shema model đã được định nghĩa
		  client: 'react-query' // Phân loại đối tượng generate client. vì chúng ta sử dụng với
														// react-query nên ta khai báo là react-query
		},
		input: {
		  target: './config/openAPI.json' // Đối tượng cấu hình bản ghi openAPI
		}
  }
};