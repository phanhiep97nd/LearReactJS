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
  const [modalOpen, setModalOpen] = useState(false);
  const [modalConfirmOpen, setModalConfirmOpen] = useState(false);
  const [currentBooking, setCurrentBooking] = useState(null);
  const [modalStatus, setModalStatus] = useState('');
  const [modalNote, setModalNote] = useState('');
  const [sortConfig, setSortConfig] = useState({ column: null, ascending: true });
  const [isSearchOpen, setIsSearchOpen] = useState(true);


  useEffect( () => {
	const checkAuth = async () => {
		const token = localStorage.getItem('token');

		const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/me`, {
			headers: { Authorization: `Bearer ${token}` }
		});

		const data = await response.json();
		console.log(data.user); // Hiển thị tên hoặc role của người dùng
		if (!response.ok) {
			navigate('/login'); // Redirect to login if token is invalid or expired
		} else {
			console.log('Authenticated as: ' + data.user.username); // Hiển thị tên người dùng
			fetchBookings(); // Fetch bookings after successful authentication
		}
	}
	checkAuth();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, searchParams]);

  const fetchBookings = async () => {
    try {
		console.log('Fetching bookings with params:', searchParams);
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
    console.log('Search Parameters:', {searchParams });
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

  const openModal = (booking) => {
    setCurrentBooking(booking);
    setModalStatus(booking.status);
    setModalNote(booking.note);
    setModalOpen(true);
  };

  const openModalConfirm = (booking) => {
	setCurrentBooking(booking);
	setModalStatus(booking.status);
	setModalNote(booking.note);
	setModalConfirmOpen(true);
	  };

  const saveModal = () => {
    if (currentBooking) {
      const updatedBookings = bookings.map((booking) =>
        booking.id === currentBooking.id
          ? { ...booking, status: modalStatus, note: modalNote }
          : booking
      );
      setBookings(updatedBookings);
      console.log(`Updated booking ID ${currentBooking.id}: Status=${modalStatus}, Note=${modalNote}`);
      setModalOpen(false);
      setCurrentBooking(null);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentBooking(null);
  };

  const closeModalConfirm = () => {
	setModalConfirmOpen(false);
	setCurrentBooking(null);
	  };

  const handleConfirm = (id) => {
    console.log('Confirm booking:', id);
    // Implement confirm functionality
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
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor="insertDateTo" className="block text-sm font-medium text-gray-700">Ngày đăng ký(To)</label>
                <input
                  type="date"
                  id="insertDateTo"
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
          <h2 className="text-2xl font-bold mb-4">Booking List</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button onClick={() => handleSort('pickupFrom')} className="text-indigo-600 hover:text-indigo-800">
                      Điểm đón <span>{sortConfig.column === 'pickupFrom' ? (sortConfig.ascending ? '↑' : '↓') : ''}</span>
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button onClick={() => handleSort('destination')} className="text-indigo-600 hover:text-indigo-800">
                      Điểm trả <span>{sortConfig.column === 'destination' ? (sortConfig.ascending ? '↑' : '↓') : ''}</span>
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button onClick={() => handleSort('date')} className="text-indigo-600 hover:text-indigo-800">
                      Ngày vận chuyển <span>{sortConfig.column === 'date' ? (sortConfig.ascending ? '↑' : '↓') : ''}</span>
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button onClick={() => handleSort('phoneNumber')} className="text-indigo-600 hover:text-indigo-800">
                      SĐT <span>{sortConfig.column === 'phoneNumber' ? (sortConfig.ascending ? '↑' : '↓') : ''}</span>
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button onClick={() => handleSort('numberOfGuest')} className="text-indigo-600 hover:text-indigo-800">
                      Số người <span>{sortConfig.column === 'numberOfGuest' ? (sortConfig.ascending ? '↑' : '↓') : ''}</span>
                    </button>
                  </th>
                  {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button onClick={() => handleSort('id')} className="text-indigo-600 hover:text-indigo-800">
                      ID <span>{sortConfig.column === 'id' ? (sortConfig.ascending ? '↑' : '↓') : ''}</span>
                    </button>
                  </th> */}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ghi chú</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button onClick={() => handleSort('status')} className="text-indigo-600 hover:text-indigo-800">
                      Trạng thái <span>{sortConfig.column === 'status' ? (sortConfig.ascending ? '↑' : '↓') : ''}</span>
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {bookings.map((booking) => (
                  <tr
					key={booking.id}
					className={`${
						booking.status === '0' ? 'bg-blue-50 hover:bg-neutral-100' :
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
                    <td className="px-6 py-4 whitespace-nowrap">{booking.phoneNumber}</td>
					<td className="px-6 py-4 whitespace-nowrap">{booking.numberOfGuest}</td>
					{/* <td className="px-6 py-4 whitespace-nowrap">{booking.id}</td> */}
					<td className="px-6 py-4 whitespace-nowrap">{booking.note}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{convertStatus(booking.status)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        className="text-indigo-600 hover:text-indigo-900 hover:bg-indigo-100 px-2 py-1 rounded mr-4 transition duration-200"
                        onClick={(e) => { e.stopPropagation(); openModal(booking); }}
                      >
                        Edit
                      </button>
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
      {modalOpen && currentBooking && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Edit Booking</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Pickup Location</label>
              <p className="mt-1 text-sm text-gray-900">{currentBooking.pickupFrom}</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Drop-off Location</label>
              <p className="mt-1 text-sm text-gray-900">{currentBooking.destination}</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">phoneNumber Number</label>
              <p className="mt-1 text-sm text-gray-900">{currentBooking.phoneNumber}</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Number of Guests</label>
              <p className="mt-1 text-sm text-gray-900">{currentBooking.numberOfGuest}</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Departure Date</label>
              <p className="mt-1 text-sm text-gray-900">{currentBooking.date}</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Booking ID</label>
              <p className="mt-1 text-sm text-gray-900">{currentBooking.id}</p>
            </div>
            <div className="mb-4">
              <label htmlFor="modalStatus" className="block text-sm font-medium text-gray-700">Status</label>
              <select
                id="modalStatus"
                value={modalStatus}
                onChange={(e) => setModalStatus(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="modalNote" className="block text-sm font-medium text-gray-700">Note</label>
              <textarea
                id="modalNote"
                value={modalNote}
                onChange={(e) => setModalNote(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                rows="4"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={closeModal}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveModal}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-200"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Modal Dialog */}
      {modalConfirmOpen && currentBooking && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Xác nhận Booking</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Booking ID</label>
              <p className="mt-1 text-sm text-gray-900">{currentBooking.id}</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Departure Date</label>
              <p className="mt-1 text-sm text-gray-900">{currentBooking.date}</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Pickup Location</label>
              <p className="mt-1 text-sm text-gray-900">{currentBooking.pickupFrom}</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Drop-off Location</label>
              <p className="mt-1 text-sm text-gray-900">{currentBooking.destination}</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Number of Guests</label>
              <p className="mt-1 text-sm text-gray-900">{currentBooking.numberOfGuest}</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <p className="mt-1 text-sm text-gray-900">{currentBooking.phoneNumber}</p>
            </div>
            <div className="mb-4">
              <label htmlFor="modalStatus" className="block text-sm font-medium text-gray-700">Status</label>
              <select
                id="modalStatus"
                value={modalStatus}
                onChange={(e) => setModalStatus(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="modalNote" className="block text-sm font-medium text-gray-700">Confirm Note</label>
              <textarea
                id="modalNote"
                value={modalNote}
                onChange={(e) => setModalNote(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
                onClick={saveModal}
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
