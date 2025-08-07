import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookingManager = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [searchParams, setSearchParams] = useState({
    id: '',
    insertDateFrom: '',
    insertDateTo: '',
    status: '',
    phoneNumberNumber: '',
    date: ''
  });
  const [modalConfirmOpen, setModalConfirmOpen] = useState(false);
  const [currentBooking, setCurrentBooking] = useState(null);
  const [modalStatus, setModalStatus] = useState('');
  const [modalConfirmNote, setmodalConfirmNote] = useState('');
  const [sortConfig, setSortConfig] = useState({ column: null, ascending: true });
  const [isSearchOpen, setIsSearchOpen] = useState(true);
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState(null); // alert = { type: 'success' | 'error', message: string }




  useEffect( () => {
	const checkAuth = async () => {
		const token = localStorage.getItem('token');

		const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/me`, {
			headers: { Authorization: `Bearer ${token}` }
		});

		const data = await response.json();
		if (!response.ok) {
			navigate('/login'); // Redirect to login if token is invalid or expired
		} else {
			console.log('Authenticated as: ' + data.user.username); // Hiển thị tên người dùng
			setUser(data.user); // Lưu thông tin người dùng vào state
			fetchBookings(); // Fetch bookings after successful authentication
		}
	}
	checkAuth();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, searchParams]);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/booking/SearchBooking`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        params: searchParams
      });
      setBookings(response.data);
    } catch (err) {
      console.error('Fetch failed:', err);
      navigate('/login'); // token hết hạn hoặc không hợp lệ
    }
  };
  const handleSearch = (e) => {
    e.preventDefault();
	setSearchParams({
		id: e.target.id.value,
		insertDateFrom: e.target.insertDateFrom.value,
		insertDateTo: e.target.insertDateTo.value,
		status: e.target.status.value,
		phoneNumberNumber: e.target.phoneNumberNumber.value,
		date: e.target.date.value
	});
  };

  const handleClearSearch = () => {
    setSearchParams({
      id: '',
      insertDateFrom: '',
      insertDateTo: '',
      status: '',
      phoneNumberNumber: '',
      date: ''
    });
    // Reset form inputs
    document.getElementById('id').value = '';
    document.getElementById('insertDateFrom').value = '';
    document.getElementById('insertDateTo').value = '';
    document.getElementById('status').value = '';
    document.getElementById('phoneNumberNumber').value = '';
    document.getElementById('date').value = '';
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleSort = (column) => {
    const ascending = sortConfig.column === column ? !sortConfig.ascending : true;
    setSortConfig({ column, ascending });

    const sortedBookings = [...bookings].sort((a, b) => {
      let aValue, bValue;
      switch (column) {
        case 'id':
          aValue = a.id;
          bValue = b.id;
          break;
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'phoneNumber':
          aValue = a.phoneNumber;
          bValue = b.phoneNumber;
          break;
        case 'date':
          aValue = new Date(a.date);
          bValue = new Date(b.date);
          break;
        case 'insertDate':
          aValue = new Date(a.insertDate);
          bValue = new Date(b.insertDate);
          break;
        case 'status':
          aValue = a.status.toLowerCase();
          bValue = b.status.toLowerCase();
          break;
        case 'numberOfGuest':
          aValue = a.numberOfGuest;
          bValue = b.numberOfGuest;
          break;
        case 'pickupFrom':
          aValue = a.pickupFrom.toLowerCase();
          bValue = b.pickupFrom.toLowerCase();
          break;
        case 'destination':
          aValue = a.destination.toLowerCase();
          bValue = b.destination.toLowerCase();
          break;
        default:
          return 0;
      }
      return ascending ? (aValue > bValue ? 1 : -1) : (aValue < bValue ? 1 : -1);
    });

    setBookings(sortedBookings);
  };

//   const openModal = (booking) => {
//     setCurrentBooking(booking);
//     setModalStatus(booking.status);
//     setmodalConfirmNote(booking.note);
//     setModalOpen(true);
//   };

  const openModalConfirm = (booking) => {
	setCurrentBooking(booking);
	setModalStatus(booking.status);
	setmodalConfirmNote(booking.confirmNote || '');
	setModalConfirmOpen(true);
	  };

  const saveModalConfirm = async () => {
    if (!currentBooking) return;

	try {
		console.log(user);
		const response = await axios.put(`${process.env.REACT_APP_API_URL}/booking/UpdateBooking`, {
			id: currentBooking._id,
			status: modalStatus,
			confirmNote: modalConfirmNote,
			updateBy: user?.username || 'system',
		}, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('token')}`
		}
		});

		const updatedBookingID = response.data;
		if (!updatedBookingID) {
			console.error('❌ Cập nhật booking thất bại');
			return;
		}

		// Cập nhật lại danh sách bookings
		const updatedBookings = bookings.map((booking) =>
        booking._id === currentBooking._id
			? { ...booking, status: modalStatus, confirmNote: modalConfirmNote}
			: booking
		);
		setBookings(updatedBookings);
		console.log('✅ Cập nhật booking thành công:', bookings);

		console.log(`✅ Booking ${updatedBookingID} đã cập nhật:`, convertStatus(modalStatus));
		setAlert({ type: 'success', message: `✅ Booking ${updatedBookingID} đã cập nhật thành công! Status: ` + convertStatus(modalStatus) }); // Hiển thị thông báo thành công

		// Đóng modal và reset
		closeModalConfirm(false);
		setCurrentBooking(null);
	} catch (error) {
		console.error('❌ Lỗi khi cập nhật booking:', error.response?.data?.message || error.message);
		setAlert({
			type: 'error',
			message: '❌ Lỗi khi cập nhật booking: ' + (error.response?.data?.message || error.message),
		});
	}
 	// Tự động ẩn thông báo sau 5 giây
  	setTimeout(() => setAlert(null), 5000);
  };

  const closeModalConfirm = () => {
	setModalConfirmOpen(false);
	setCurrentBooking(null);
	  };

  const convertStatus = (status) => {
	switch (status) {
		case '0':
			return '📞Chưa kiểm tra'
		case '1':
			return '📵Liên lạc chưa thành công';
		case '2':
			return '🆗Đã xác nhận'
		case '3':
			return '🚫Đã hủy';
		default:
			return 'Unknown Status';
	}
  }

  const formatDateTimeVN = (dateInput) => {
	const date = new Date(dateInput);

	const options = {
		weekday: 'long',  // Thứ hai, Thứ ba,...
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		hour12: false,
		timeZone: 'Asia/Ho_Chi_Minh' // múi giờ Việt Nam
	};

	return date.toLocaleString('vi-VN', options);
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
		{alert && (
			<div
				className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-4 py-2 text-sm border rounded shadow transition-all duration-300 min-w-[320px] max-w-[90%] w-fit text-center
				${alert.type === 'success' ? 'text-green-800 bg-green-100 border-green-300' : ''}
				${alert.type === 'error' ? 'text-red-800 bg-red-100 border-red-300' : ''}
				`}
			>
				{alert.message}
			</div>
		)}
      <div className="container mx-auto p-6">
        {/* Search Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Tìm kiếm Bookings</h2>
            <button
              onClick={toggleSearch}
              className={`${ !isSearchOpen ? 'bg-emerald-400 hover:brightness-110' : 'bg-orange-400 hover:brightness-110'} text-white px-4 py-2 rounded-md transition duration-200`}
            >
              {isSearchOpen ? 'Ẩn -' : 'Hiện +'}
            </button>
          </div>
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              isSearchOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <form className="grid grid-cols-1 md:grid-cols-3 gap-4" onSubmit={handleSearch}>
              <div>
                <label htmlFor="id" className="block text-sm font-medium text-gray-700">ID</label>
                <input
                  type="text"
                  id="id"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="Enter Booking ID"
                />
              </div>
              <div>
                <label htmlFor="insertDateFrom" className="block text-sm font-medium text-gray-700">Ngày đăng ký(From)</label>
                <input
                  type="date"
                  id="insertDateFrom"
				  defaultValue={new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]} // Default to 7 days ago
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor="insertDateTo" className="block text-sm font-medium text-gray-700">Ngày đăng ký(To)</label>
                <input
                  type="date"
                  id="insertDateTo"
				  defaultValue={new Date(Date.now()).toISOString().split('T')[0]} // Default to today
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">Trạng thái</label>
                <select
                  id="status"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                  <option value="">📖Tất cả</option>
                  <option value="0">📞Chưa kiểm tra</option>
                  <option value="1">📵Liên lạc chưa thành công</option>
                  <option value="2">🆗Đã xác nhận</option>
                  <option value="3">🚫Đã hủy</option>
                </select>
              </div>
              <div>
                <label htmlFor="phoneNumberNumber" className="block text-sm font-medium text-gray-700">Số điện thoại</label>
                <input
                  type="number"
                  id="phoneNumberNumber"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="Nhập số điện thoại ..."
                />
              </div>
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">Ngày vận chuyển</label>
                <input
                  type="date"
                  id="date"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div className="md:col-span-3 flex justify-end  space-x-4">
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-200"
                >♻️Hủy tìm kiếm</button>
                <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-200">
                  🔎Tìm kiếm
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Booking List Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Booking List <span className="text-sm font-normal text-gray-600">({bookings.length} items)</span></h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button onClick={() => handleSort('pickupFrom')} className="text-indigo-600 hover:text-indigo-800">
                      Điểm đón <span>{sortConfig.column === 'pickupFrom' ? (sortConfig.ascending ? '↑' : '↓') : ''}</span>
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button onClick={() => handleSort('destination')} className="text-indigo-600 hover:text-indigo-800">
                      Điểm trả <span>{sortConfig.column === 'destination' ? (sortConfig.ascending ? '↑' : '↓') : ''}</span>
                    </button>
                  </th> */}
				  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Điểm đón</th>
				  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Điểm trả</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button onClick={() => handleSort('date')} className="text-indigo-600 hover:text-indigo-800 uppercase">
                      Ngày vận chuyển <span>{sortConfig.column === 'date' ? (sortConfig.ascending ? '↑' : '↓') : ''}</span>
                    </button>
                  </th>
                  {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button onClick={() => handleSort('phoneNumber')} className="text-indigo-600 hover:text-indigo-800">
                      SĐT <span>{sortConfig.column === 'phoneNumber' ? (sortConfig.ascending ? '↑' : '↓') : ''}</span>
                    </button>
                  </th> */}
				  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SDT</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button onClick={() => handleSort('numberOfGuest')} className="text-indigo-600 hover:text-indigo-800 uppercase">
                      Số người <span>{sortConfig.column === 'numberOfGuest' ? (sortConfig.ascending ? '↑' : '↓') : ''}</span>
                    </button>
                  </th>
                  {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button onClick={() => handleSort('_id')} className="text-indigo-600 hover:text-indigo-800">
                      ID <span>{sortConfig.column === '_id' ? (sortConfig.ascending ? '↑' : '↓') : ''}</span>
                    </button>
                  </th> */}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ghi chú</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button onClick={() => handleSort('status')} className="text-indigo-600 hover:text-indigo-800 uppercase">
                      Trạng thái <span>{sortConfig.column === 'status' ? (sortConfig.ascending ? '↑' : '↓') : ''}</span>
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {bookings.map((booking) => (
                  <tr
					key={booking._id}
					className={`${
						booking.status === '0' ? 'bg-blue-10 hover:bg-neutral-100' :
						booking.status === '1' ? 'bg-yellow-50 hover:bg-yellow-100' :
						booking.status === '2' ? 'bg-green-50 hover:bg-green-100' :
						booking.status === '3' ? 'bg-red-50 hover:bg-red-100' :
						''
					} transition duration-200 cursor-pointer`}
					onClick={() => openModalConfirm(booking)}
					>
                    <td className="px-6 py-4 whitespace-nowrap">{booking.pickupFrom}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{booking.destination}</td>
					
					<td className="px-6 py-4 whitespace-nowrap">{formatDateTimeVN(booking.date)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
						<a href={`tel:${booking.phoneNumber}`} className="text-blue-600 hover:underline">
							{booking.phoneNumber}
						</a>
					</td>
					<td className="px-6 py-4 whitespace-nowrap">{booking.numberOfGuest}</td>
					{/* <td className="px-6 py-4 whitespace-nowrap">{booking._id}</td> */}
					<td className="px-6 py-4 whitespace-nowrap">{booking.note}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{convertStatus(booking.status)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {/* <button
                        className="text-indigo-600 hover:text-indigo-900 hover:bg-indigo-100 px-2 py-1 rounded mr-4 transition duration-200"
                        onClick={(e) => { e.stopPropagation(); openModal(booking); }}
                      >
                        Edit
                      </button> */}
                      <button
                        className="text-green-600 hover:text-green-900 hover:bg-green-100 px-2 py-1 rounded transition duration-200"
                        onClick={(e) => { e.stopPropagation(); openModalConfirm(booking); }}
                      >
                        Confirm
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal Dialog */}
      {modalConfirmOpen && currentBooking && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-lg font-bold mb-3">Xác nhận Booking</h3>
            <table className="mb-4 min-w-full text-sm text-left text-gray-700 dark:text-gray-300 table-fixed">
				<tbody>
					<tr>
						<th className="w-40 pr-4 py-1 font-medium text-gray-700 dark:text-gray-400 align-top">Booking ID</th>
						<td className="py-1 break-words whitespace-normal">{currentBooking._id}</td>
					</tr>
					<tr>
						<th className="w-40 pr-4 py-1 font-medium text-gray-700 dark:text-gray-400 align-top">Loại</th>
						<td className="py-1 break-words whitespace-normal">{currentBooking.type}</td>
					</tr>
					<tr>
						<th className="w-40 pr-4 py-1 font-medium text-gray-700 dark:text-gray-400 align-top">Ngày vận chuyển</th>
						<td className="py-1 break-words whitespace-normal">{formatDateTimeVN(currentBooking.date)}</td>
					</tr>
					<tr>
						<th className="w-40 pr-4 py-1 font-medium text-gray-700 dark:text-gray-400 align-top">Địa điểm đón</th>
						<td className="py-1 break-all whitespace-normal">{currentBooking.pickupFrom}</td>
					</tr>
					<tr>
						<th className="w-40 pr-4 py-1 font-medium text-gray-700 dark:text-gray-400 align-top">Địa điểm trả</th>
						<td className="py-1 break-all whitespace-normal">{currentBooking.destination}</td>
					</tr>
					<tr>
						<th className="w-40 pr-4 py-1 font-medium text-gray-700 dark:text-gray-400 align-top">Số lượng khách</th>
						<td className="py-1 break-words whitespace-normal">{currentBooking.numberOfGuest}</td>
					</tr>
					<tr>
						<th className="w-40 pr-4 py-1 font-medium text-gray-700 dark:text-gray-400 align-top">Số điện thoại</th>
						<td className="py-1 break-words whitespace-normal">
							<a href={`tel:${currentBooking.phoneNumber}`} className="text-blue-600 hover:underline">
								{currentBooking.phoneNumber}
							</a>
						</td>
					</tr>
					<tr>
						<th className="w-40 pr-4 py-1 font-medium text-gray-700 dark:text-gray-400 align-top">Ghi chú(người đặt)</th>
						<td className="py-1 break-all whitespace-normal">{currentBooking.note}</td>
					</tr>
					<tr>
						<th>-------------</th>
						<td>-------------</td>
					</tr>
				</tbody>
			</table>


            <div className="mb-4">
              {/* <label htmlFor="modalStatus" className="block text-sm font-medium text-gray-700">Status</label>
              <select
                id="modalStatus"
                value={convertStatus(currentBooking.status)}
                onChange={(e) => setModalStatus(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                  <option value="0">📞Chưa kiểm tra</option>
                  <option value="1">📵Liên lạc chưa thành công</option>
                  <option value="2">🆗Đã xác nhận</option>
                  <option value="3">🚫Đã hủy</option>
              </select> */}
				<h3 className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
					Thay đổi trạng thái xác nhận
				</h3>
				<ul className="grid grid-cols-4 gap-2 p-0">
					{[
						{ id: "0", label: "📞Chưa kiểm tra", bg: "peer-checked:bg-blue-100 peer-checked:hover:bg-neutral-150" },
						{ id: "1", label: "📵Liên lạc chưa thành công", bg: "peer-checked:bg-yellow-100 peer-checked:hover:bg-yellow-150" },
						{ id: "2", label: "🆗Đã xác nhận", bg: "peer-checked:bg-green-100 peer-checked:hover:bg-green-150" },
						{ id: "3", label: "🚫Đã hủy", bg: "peer-checked:bg-red-100 peer-checked:hover:bg-red-150" },
					].map((item) => (
						<li key={item.id}>
						<input
							type="radio"
							id={`status-${item.id}`}
							name="status"
							value={item.id}
							className="hidden peer"
							checked={modalStatus === item.id}
							onChange={() => setModalStatus(item.id)}
						/>
						<label
							htmlFor={`status-${item.id}`}
							className={`inline-flex items-center justify-center w-full min-h-[64px] px-2 py-1 text-xs text-center text-gray-500 border border-gray-200 rounded cursor-pointer
							bg-gray-100 hover:bg-gray-200
							dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-400
							peer-checked:border-blue-600 peer-checked:text-blue-600 dark:peer-checked:text-blue-500
							${item.bg}`}
						>
							<span className="text-sm font-semibold break-words">{item.label}</span>
						</label>
						</li>
					))}
				</ul>
            </div>
            <div className="mb-4">
              <label htmlFor="modalConfirmNote" className="block text-sm font-medium text-gray-700">Ghi chú đơn hàng</label>
              <textarea
                id="modalConfirmNote"
                value={modalConfirmNote}
                onChange={(e) => setmodalConfirmNote(e.target.value)}
                className="mt-0 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                rows="4"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={closeModalConfirm}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-200"
              >
                Close
              </button>
              <button
                type="button"
                onClick={saveModalConfirm}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-200"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingManager;
