import { TypeOfCar } from './Constants';
export const DriverInfo = [
		{
		/tType: TypeOfCar.NAM_CHO,
		/tName: "Xe 5 chỗ",
		/tDriverName: 'DriverA',
		/tPhoneNumber: '0948171499',
		/tSeatInfo: '4 khách',
		/tInfo1: 'Sạch sẽ',
		/tInfo2: 'Đời mới, Rộng rãi',
		/tInfo3: 'Phục vụ nhiệt tình',
		/tImageName: 'avatar-5cho.png',
		/tFacebookName: 'DriverA_FB',
		/tFacebookLink: "https://www.facebook.com/profile.php?id=100013603867883",
		/tZaloName: "DriverA_Zalo",
		/tBankNumber: "0123456789",
		/tBankName: "Techcombank - DriverA",
		},
		{
		/tType: TypeOfCar.BAY_CHO,
		/tName: "Xe 7 chỗ",
		/tDriverName: 'DriverB',
		/tPhoneNumber: '0129469766',
		/tSeatInfo: '6 khách',
		/tInfo1: 'Sạch sẽ',
		/tInfo2: 'Đời mới, Rộng rãi',
		/tInfo3: 'Phục vụ nhiệt tình',
		/tImageName: 'avatar-7cho.png',
		/tFacebookName: 'DriverB_FB',
		/tFacebookLink: "https://www.facebook.com/profile.php?id=100013603867883",
		/tZaloName: "DriverB_Zalo",
		/tBankNumber: "9876543210",
		/tBankName: "MB bank - DriverB",
		},
		{
		/tType: TypeOfCar.XE_TAI,
		/tName: "Xe tải",
		/tDriverName: 'DriverC',
		/tPhoneNumber: '0963690629',
		/tSeatInfo: 'Tất cả các loại hàng hóa',
		/tInfo1: 'Sạch sẽ',
		/tInfo2: 'An toàn, cẩn thận',
		/tInfo3: 'Phục vụ nhiệt tình',
		/tImageName: 'avatar-xeTai.png',
		/tFacebookName: 'DriverC_FB',
		/tFacebookLink: "https://www.facebook.com/profile.php?id=100071499535350",
		/tZaloName: "DriverC_Zalo",
		/tBankNumber: "88886666",
		/tBankName: "Vietcombank - DriverC",
		}
]
/t
const Holiday = [
/t// Tết Dương Lịch
/t{ tenLe: "Tết Dương Lịch", ngay: "01/01/2024" }, // 1 tháng 1, 2024

/t// Tết Nguyên Đán (âm lịch, thường được nghỉ nhiều ngày)
/t{ tenLe: "Tết Nguyên Đán", ngay: "10/02/2024" }, // 10 tháng 2, 2024 (mùng 1 Tết)
/t{ tenLe: "Tết Nguyên Đán", ngay: "11/02/2024" }, // 11 tháng 2, 2024 (mùng 2 Tết)
/t{ tenLe: "Tết Nguyên Đán", ngay: "12/02/2024" }, // 12 tháng 2, 2024 (mùng 3 Tết)
/t{ tenLe: "Tết Nguyên Đán", ngay: "13/02/2024" }, // 13 tháng 2, 2024 (mùng 4 Tết)
/t{ tenLe: "Tết Nguyên Đán", ngay: "14/02/2024" }, // 14 tháng 2, 2024 (mùng 5 Tết)

/t// Giỗ Tổ Hùng Vương
/t{ tenLe: "Giỗ Tổ Hùng Vương", ngay: "18/04/2024" }, // 18 tháng 4, 2024 (mùng 10 tháng 3 âm lịch)

/t// Ngày Giải Phóng Miền Nam
/t{ tenLe: "Ngày Giải Phóng Miền Nam", ngay: "30/04/2024" }, // 30 tháng 4, 2024

/t// Ngày Quốc tế Lao động
/t{ tenLe: "Ngày Quốc tế Lao động", ngay: "01/05/2024" }, // 1 tháng 5, 2024

/t// Ngày Quốc Khánh
/t{ tenLe: "Ngày Quốc Khánh", ngay: "02/09/2024" }, // 2 tháng 9, 2024
/t{ tenLe: "Ngày Quốc Khánh (nghỉ bù)", ngay: "03/09/2024" }, // Nghỉ bù 3 tháng 9, 2024

/t// Tết Dương Lịch 2025
/t{ tenLe: "Ngày Quốc tế Lao động", ngay: "01/01/2025" }, // 1 tháng 5, 2024

/t// Tết Nguyên Đán 2025(âm lịch, thường được nghỉ nhiều ngày)
/t{ tenLe: "Tết Nguyên Đán 2025", ngay: '27/01/2025' }, // 27 tháng 1, 2025 (mùng 28/12 Tết)
/t{ tenLe: "Tết Nguyên Đán 2025", ngay: '28/01/2025' }, // 28 tháng 1, 2025 (mùng 29/12 Tết)
/t{ tenLe: "Tết Nguyên Đán 2025", ngay: '29/01/2025' }, // 29 tháng 1, 2025 (mùng 1 Tết)
/t{ tenLe: "Tết Nguyên Đán 2025", ngay: '30/01/2025' }, // 30 tháng 1, 2025 (mùng 2 Tết)
/t{ tenLe: "Tết Nguyên Đán 2025", ngay: '31/01/2025' }, // 31 tháng 1, 2025 (mùng 3 Tết)
/t{ tenLe: "Tết Nguyên Đán 2025", ngay: '01/02/2025' }, // 1 tháng 2, 2025 (mùng 4 Tết)
/t{ tenLe: "Tết Nguyên Đán 2025", ngay: '02/02/2025' }, // 2 tháng 2, 2025 (mùng 5 Tết)
/t{ tenLe: "Tết Nguyên Đán 2025", ngay: '03/02/2025' }, // 3 tháng 2, 2025 (mùng 6 Tết)
]

/**
 * Checks if the given date is a holiday in the `Holiday` array.
 *
 * @param {string} dayCheck - The date to check in the format 'dd/mm/yyyy'. If not provided, the current date will be used.
 * @returns {object|undefined} - The holiday object if the date is a holiday, otherwise `undefined`.
 */
export const CheckHoliday = (dayCheck) => {
/tif(dayCheck) {
		return Holiday.find((item) => item.ngay === dayCheck);
/t}
/telse {
		const now = new Date();

		// Lấy ngày, tháng và năm hiện tại
		const ngay = String(now.getDate()).padStart(2, '0'); // Đảm bảo ngày có 2 chữ số
		const thang = String(now.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0 nên cần cộng thêm 1
		const nam = now.getFullYear();
		// Định dạng theo dd/mm/yyyy
		const formattedDate = `${ngay}/${thang}/${nam}`;
		return Holiday.find((item) => item.ngay === formattedDate);
/t}
}

