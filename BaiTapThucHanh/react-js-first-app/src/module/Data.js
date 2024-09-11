import { TypeOfCar } from './Constants';
export const DriverInfo = [
	{
		Type: TypeOfCar.NAM_CHO,
		Name: "Xe 5 chỗ",
		DriverName: 'DriverA',
		PhoneNumber: '0948171499',
		SeatInfo: '4 khách',
		Info1: 'Sạch sẽ',
		Info2: 'Đời mới, Rộng rãi',
		Info3: 'Phục vụ nhiệt tình',
		ImageName: 'avatar-5cho.png',
		FacebookName: 'DriverA_FB',
		FacebookLink: "https://www.facebook.com/profile.php?id=100013603867883",
		ZaloName: "DriverA_Zalo",
		BankNumber: "0123456789",
		BankName: "Techcombank - DriverA",
		ImageQRBank: "Bank_Driver1.jpg",
	},
	{
		Type: TypeOfCar.BAY_CHO,
		Name: "Xe 7 chỗ",
		DriverName: 'DriverB',
		PhoneNumber: '0129469766',
		SeatInfo: '6 khách',
		Info1: 'Sạch sẽ',
		Info2: 'Đời mới, Rộng rãi',
		Info3: 'Phục vụ nhiệt tình',
		ImageName: 'avatar-7cho.png',
		FacebookName: 'DriverB_FB',
		FacebookLink: "https://www.facebook.com/profile.php?id=100013603867883",
		ZaloName: "DriverB_Zalo",
		BankNumber: "9876543210",
		BankName: "MB bank - DriverB",
		ImageQRBank: "Bank_Driver2.jpg",
	},
	{
		Type: TypeOfCar.XE_TAI,
		Name: "Xe tải",
		DriverName: 'DriverC',
		PhoneNumber: '0963690629',
		SeatInfo: 'Tất cả các loại hàng hóa',
		Info1: 'Sạch sẽ',
		Info2: 'An toàn, cẩn thận',
		Info3: 'Phục vụ nhiệt tình',
		ImageName: 'avatar-xeTai.png',
		FacebookName: 'DriverC_FB',
		FacebookLink: "https://www.facebook.com/profile.php?id=100071499535350",
		ZaloName: "DriverC_Zalo",
		BankNumber: "88886666",
		BankName: "Vietcombank - DriverC",
		ImageQRBank: "Bank_Driver3.jpg",
	}
]
	
const Holiday = [
	// Tết Dương Lịch
	{ tenLe: "Tết Dương Lịch", ngay: "01/01/2024" }, // 1 tháng 1, 2024

	// Tết Nguyên Đán (âm lịch, thường được nghỉ nhiều ngày)
	{ tenLe: "Tết Nguyên Đán", ngay: "10/02/2024" }, // 10 tháng 2, 2024 (mùng 1 Tết)
	{ tenLe: "Tết Nguyên Đán", ngay: "11/02/2024" }, // 11 tháng 2, 2024 (mùng 2 Tết)
	{ tenLe: "Tết Nguyên Đán", ngay: "12/02/2024" }, // 12 tháng 2, 2024 (mùng 3 Tết)
	{ tenLe: "Tết Nguyên Đán", ngay: "13/02/2024" }, // 13 tháng 2, 2024 (mùng 4 Tết)
	{ tenLe: "Tết Nguyên Đán", ngay: "14/02/2024" }, // 14 tháng 2, 2024 (mùng 5 Tết)

	// Giỗ Tổ Hùng Vương
	{ tenLe: "Giỗ Tổ Hùng Vương", ngay: "18/04/2024" }, // 18 tháng 4, 2024 (mùng 10 tháng 3 âm lịch)

	// Ngày Giải Phóng Miền Nam
	{ tenLe: "Ngày Giải Phóng Miền Nam", ngay: "30/04/2024" }, // 30 tháng 4, 2024

	// Ngày Quốc tế Lao động
	{ tenLe: "Ngày Quốc tế Lao động", ngay: "01/05/2024" }, // 1 tháng 5, 2024

	// Ngày Quốc Khánh
	{ tenLe: "Ngày Quốc Khánh", ngay: "02/09/2024" }, // 2 tháng 9, 2024
	{ tenLe: "Ngày Quốc Khánh (nghỉ bù)", ngay: "03/09/2024" }, // Nghỉ bù 3 tháng 9, 2024

	// Tết Dương Lịch 2025
	{ tenLe: "Ngày Quốc tế Lao động", ngay: "01/01/2025" }, // 1 tháng 5, 2024

	// Tết Nguyên Đán 2025(âm lịch, thường được nghỉ nhiều ngày)
	{ tenLe: "Tết Nguyên Đán 2025", ngay: '27/01/2025' }, // 27 tháng 1, 2025 (mùng 28/12 Tết)
	{ tenLe: "Tết Nguyên Đán 2025", ngay: '28/01/2025' }, // 28 tháng 1, 2025 (mùng 29/12 Tết)
	{ tenLe: "Tết Nguyên Đán 2025", ngay: '29/01/2025' }, // 29 tháng 1, 2025 (mùng 1 Tết)
	{ tenLe: "Tết Nguyên Đán 2025", ngay: '30/01/2025' }, // 30 tháng 1, 2025 (mùng 2 Tết)
	{ tenLe: "Tết Nguyên Đán 2025", ngay: '31/01/2025' }, // 31 tháng 1, 2025 (mùng 3 Tết)
	{ tenLe: "Tết Nguyên Đán 2025", ngay: '01/02/2025' }, // 1 tháng 2, 2025 (mùng 4 Tết)
	{ tenLe: "Tết Nguyên Đán 2025", ngay: '02/02/2025' }, // 2 tháng 2, 2025 (mùng 5 Tết)
	{ tenLe: "Tết Nguyên Đán 2025", ngay: '03/02/2025' }, // 3 tháng 2, 2025 (mùng 6 Tết)
]

/**
 * Checks if the given date is a holiday in the `Holiday` array.
 *
 * @param {string} dayCheck - The date to check in the format 'dd/mm/yyyy'. If not provided, the current date will be used.
 * @returns {object|undefined} - The holiday object if the date is a holiday, otherwise `undefined`.
 */
export const CheckHoliday = (dayCheck) => {
	if(dayCheck) {
		return Holiday.find((item) => item.ngay === dayCheck);
	}
	else {
		const now = new Date();

		// Lấy ngày, tháng và năm hiện tại
		const ngay = String(now.getDate()).padStart(2, '0'); // Đảm bảo ngày có 2 chữ số
		const thang = String(now.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0 nên cần cộng thêm 1
		const nam = now.getFullYear();
		// Định dạng theo dd/mm/yyyy
		const formattedDate = `${ngay}/${thang}/${nam}`;
		return Holiday.find((item) => item.ngay === formattedDate);
	}
}

