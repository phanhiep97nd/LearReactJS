const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');				   // Thư viện này giúp sắp xếp các file đối tượng html theo một trật tự nhất định
const { CleanWebpackPlugin } = require('clean-webpack-plugin');		 // Thư viện này giúp dọn dẹp thư mục dist sau khi build để xóa các file không cần thiết

// Cấu hình webpack. Khi thiết lập webpack và thực hiện build thì thư viện webpack đọc file cấu hình để build cho phù hợp
// Bên dưới là ví dụ của một cấu hình webpack
module.exports = (env, argv) => {
		const isDev = argv.mode === 'development';
		return {
				entry: {		// Danh sách file input đích. trường hợp có niều hơn 1 input thì đặt theo dạng object
						main: '/src/App.tsx',
						pageDemo: '/src/components/pages/Demo.tsx',
						pageMain: '/src/components/pages/Main.tsx'
				},
				output: {   // Danh sách output
						path: path.resolve(__dirname, 'dist'),  // Output path. Cấu hình path output là thư mục dist - đây là nơi chứa code đã được tối ưu và hoàn thiện (đóng gói)
																										// Đối với project Next.js, thư mục tương ứng là .next
						filename: 'bundle.js',		// Tên file sau khi build và đóng gói thành bundle file
						publicPath: '/'
				},
				mode: isDev? 'development' : 'production', // Cấu hình mode. Giả định là ở đây cấu hình cho 2 mode 'development' và 'production' thôi
				devtool: isDev? 'inline-source-map' : 'source-map', // Cấu hình file ánh xạ giữa source sau khi build và mã nguồn gốc của nó
																														// Đối với mode develop, sẽ sử dụng inline-source-map do nó dành cho mode debug (mode dev không thể access vào source-map)
																														// inline-source-map tạo bản build một cách nhanh chóng tuy nhiên sẽ phát sinh nhiều file rác hơn
				module: {   // Cấu hình module
						rules: [		// Danh sách các rule cấu hình. Giả định ở đây chúng ta cấu hình cho các đối tượng js/jsx, css, image
								{   // Ví dụ sau đây là cấu hình để chuyển đổi các file js|jsx
										test: /\.(js|jsx)$/, // chỉ nạp những file có định dạng jsx. test có thể là một chuỗi hoặc một regular expression
										exclude: /node_modules/, // bỏ qua thư mục node_module
										use: {
												loader: 'babel-loader', // Sử dụng loader babel. Nó đóng vai trò giúp cho source code của chúng ta có thể tương thích được với nhiều phiên bản trình duyệt (combability), tự chuyển đổi về phiên bản ECMAScript cũ hơn nếu cần thiết
												options: {  // Cấu hình option nếu sử dụng babel-loader
														presets: ['@babel/preset-env', '@babel/preset-react']   // Danh sách các presets sử dụng. Với @babel/preset-env thì chính là tương thích chuyển đổi Javascript phiên bản từ ES6 trở lên về ES5
																																										// Với @babel/preset-react thì là tương thích chuyển đổi mã jsx về Javascript
												}
										}
								},
								{   // Ví dụ sau đây là cấu hình để chuyển đổi các file css
										test: /\.css$/,  // chỉ nạp những file có định dạng css. test có thể là một chuỗi hoặc một regular expression
										use: ['style-loader', 'css-loader'],		// Sử dụng loader css-loader và style-loader. css-loader giúp chúng ta có thể import file css và chuyển đổi nó thành mã JS (css-in-js)
																														// style-loader giúp cho việc xác định vị trí của css mà sẽ được chèn vào trong file html
								},
								{
										test: /\.scss$/,  // chỉ nạp những file có định dạng scss. test có thể là một chuỗi hoặc một regular expression
										use: ['style-loader', 'css-loader', 'sass-loader'],		 // Đối với các file *.scss, sử dụng thêm thư viện sass để build. Thư viện này giúp chuyển đổi các file có định dạng *.sass, *.scss
																																						// thành mã JS
								},
								{
										test: /\.(png|jpg|gif|svg)$/,		// Chỉ nạp những file có định dạng image
										use: [
												{
														loader: 'file-loader',		// Đối với các file có định dạng image, sử dụng thư viện này xử lý việc import/require file. Nó giúp phân tích và note ra output trong thư mục dist
														options: {
																name: '[name].[hash].[ext]',
																outputPath: 'images',
														},
												}
										]
								}
						]
				},
				resolve: {  // Giải quyết các extension theo thứ tự trong mảng
						extensions: ['.tsx', '.ts', '.js', '.jsx'], // Nếu như có nhiều file có cùng tên nhưng khác về extension, webpack sẽ giải quyết file có extension được liệu kê đầu tiên trong mảng
																												// và bỏ qua phần còn lại
				  },
				plugins: [  // Cung cấp một số plugin cần thiết
						new CleanWebpackPlugin(),
						new HtmlWebpackPlugin({								 // Cấu hình đế sinh ra file index trong project. Lưu ý: file html sinh ra đã được minified
								template: './public/index.html',		// Giả định là chúng ta có sẵn một trang mẫu html như này
								filename: 'index.html',						 // File sau khi sinh ra sẽ có tên như này
						}),
				],
				optimization: { // webpack thực thi các hoạt dộng tối ưu tại đây
						splitChunks: {		  // Khi thiết lập cấu hình splitChunks như này thì sau khi build, sinh ra 2 đối tượng app.js (chứa source App) và bundle.js (bao gồm các module). Kích cỡ sẽ được tối ưu sao cho nhỏ nhất
								chunks: 'all',  // Khi build theo cách này thì: 1. Ít sinh ra code hơn. 2. Cache tốt hơn. 3. Chia nhỏ common chunk nên download ít và nhẹ hơn.
						},
				},
		}
}