/**
 * map()
 * VD: Lấy giá của tất cả các sản phẩm trong giỏ hàng theo mã SP
 */
const array_sp1 = [
	{
		ma_sp: '001',
		ten_sp: 'Ti vi',
		mo_ta: 'Ti vi',
		gia: 12000000
	},
	{
		ma_sp: '002',
		ten_sp: 'Điện thoại',
		mo_ta: 'Điện thoại',
		gia: 6000000
	},
]

let map_sp_gia = array_sp.map((x) =>
	{
		return {ma_sp, gia} = x;
	}
);

/**
 * join()
 * VD: Đưa thông tin ti vi được quản lý trên array thành 1 chuỗi
 */
const tv = ['VA001', 'ti vi 24 inch phẳng', 'Giảm giá'];
const tv_title = tv.join('-');

/**
 * filter()
 * VD: Loại bỏ một số sản phẩm khỏi một giỏ hàng
 */
const array_sp2 = [
	{
		ma_sp: '001',
		ten_sp: 'Ti vi',
		mo_ta: 'Ti vi',
		gia: 12000000
	},
	{
		ma_sp: '002',
		ten_sp: 'Ti vi 2',
		mo_ta: 'Ti vi 2',
		gia: 16000000
	},
	{
		ma_sp: '003',
		ten_sp: 'Ti vi 3',
		mo_ta: 'Ti vi 3',
		gia: 16000000
	},
	{
		ma_sp: '004',
		ten_sp: 'Ti vi 4',
		mo_ta: 'Ti vi 4',
		gia: 16000000
	},
]
// Danh sách phần tử cần remove
const removed_eles = [0, 2];
// Remove các phần tử có index thuộc danh sách này
const new_array_sp = array_sp.filter((element, index) => !removed_eles.includes(index));

/**
 * reduce()
 * VD1: Tính tổng số tiền của tất cả sản phẩm trong giỏ hàng
 */
const array_sp = [
	{
		ma_sp: '001',
		ten_sp: 'Ti vi',
		mo_ta: 'Ti vi',
		gia: 12000000
	},
	{
		ma_sp: '002',
		ten_sp: 'Ti vi 2',
		mo_ta: 'Ti vi 2',
		gia: 16000000
	},
	{
		ma_sp: '003',
		ten_sp: 'Ti vi 3',
		mo_ta: 'Ti vi 3',
		gia: 16000000
	},
	{
		ma_sp: '004',
		ten_sp: 'Ti vi 4',
		mo_ta: 'Ti vi 4',
		gia: 16000000
	},
]

const tong_gia = array_sp.reduce((accumulator, currentValue) => accumulator + currentValue.gia, 0);

/**
 * VD2: Convert tổng data các mảng lưu thông tin id hạng mục - giá trị thành đối tượng khu vực
 */
const array_hm_nhap = [
	[ 'tinh', 'Ha Noi'],
	[ 'huyen', 'Cau Giay'],
	[ 'xa', 'Nghia Do'],
	[ 'duong', '106 Hoang Quoc Viet'],
]

const array_khu_vuc = array_hm_nhap.reduce((accumulator, currentValue) =>
	{
		if (!Array.isArray(accumulator)) initialValue = [];
		if (Array.isArray(currentValue) && currentValue.length == 2)
		{
			accumulator.push({ [currentValue[0]]: [currentValue[1]] });
		}
		return accumulator;
	}, {});	

const obj_khu_vuc = Object.assign({}, array_khu_vuc);
