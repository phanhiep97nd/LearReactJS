import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaEdit, FaPlus } from 'react-icons/fa';

const TransportsManager = () => {
  const navigate = useNavigate();
  const [transports, setTransports] = useState([]);
  const [searchParams, setSearchParams] = useState({
    date: '',
    phoneNumber: '',
    pickupFrom: '',
    destination: '',
    status: ''
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [currentTransport, setCurrentTransport] = useState(null);
  const [modalStatus, setModalStatus] = useState('');
  const [modalNote, setModalNote] = useState('');
  const [sortConfig, setSortConfig] = useState({ column: null, ascending: true });
  const [isSearchOpen, setIsSearchOpen] = useState(true);
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      if (!response.ok) {
        navigate('/login');
      } else {
        console.log('Authenticated as: ' + data.user.username);
        setUser(data.user);
        fetchTransports();
      }
    }
    checkAuth();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, searchParams]);

  const fetchTransports = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/transport/SearchTransport`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        params: searchParams
      });
      setTransports(response.data);
    } catch (err) {
      console.error('Fetch failed:', err);
      navigate('/login');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({
      date: e.target.date.value,
      phoneNumber: e.target.phoneNumber.value,
      pickupFrom: e.target.pickupFrom.value,
      destination: e.target.destination.value,
      status: e.target.status.value
    });
  };

  const handleClearSearch = () => {
    setSearchParams({
      date: '',
      phoneNumber: '',
      pickupFrom: '',
      destination: '',
      status: ''
    });
    document.getElementById('date').value = '';
    document.getElementById('phoneNumber').value = '';
    document.getElementById('pickupFrom').value = '';
    document.getElementById('destination').value = '';
    document.getElementById('status').value = '';
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleSort = (column) => {
    const ascending = sortConfig.column === column ? !sortConfig.ascending : true;
    setSortConfig({ column, ascending });

    const sortedTransports = [...transports].sort((a, b) => {
      let aValue, bValue;
      switch (column) {
        case 'pickupFrom':
          aValue = a.pickupFrom.toLowerCase();
          bValue = b.pickupFrom.toLowerCase();
          break;
        case 'destination':
          aValue = a.destination.toLowerCase();
          bValue = b.destination.toLowerCase();
          break;
        case 'date':
          aValue = new Date(a.date);
          bValue = new Date(b.date);
          break;
        case 'phoneNumber':
          aValue = a.phoneNumber;
          bValue = b.phoneNumber;
          break;
        case 'numberOfPeople':
          aValue = a.numberOfPeople;
          bValue = b.numberOfPeople;
          break;
        case 'status':
          aValue = a.status.toLowerCase();
          bValue = b.status.toLowerCase();
          break;
        default:
          return 0;
      }
      return ascending ? (aValue > bValue ? 1 : -1) : (aValue < bValue ? 1 : -1);
    });

    setTransports(sortedTransports);
  };

  const openModal = (transport = null) => {
    setCurrentTransport(transport);
    setModalStatus(transport ? transport.status : '');
    setModalNote(transport ? transport.note || '' : '');
    setModalOpen(true);
  };

  const saveModal = async () => {
    if (!currentTransport && !modalStatus) return;

    try {
      const payload = {
        id: currentTransport?._id,
        pickupFrom: currentTransport?.pickupFrom || '',
        destination: currentTransport?.destination || '',
        date: currentTransport?.date || new Date().toISOString().split('T')[0],
        phoneNumber: currentTransport?.phoneNumber || '',
        numberOfPeople: currentTransport?.numberOfPeople || 0,
        status: modalStatus,
        note: modalNote,
        updateBy: user?.username || 'system',
      };

      const url = currentTransport
        ? `${process.env.REACT_APP_API_URL}/transport/UpdateTransport`
        : `${process.env.REACT_APP_API_URL}/transport/AddTransport`;

      const response = await axios[currentTransport ? 'put' : 'post'](url, payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      const updatedTransportID = response.data._id || response.data;
      if (!updatedTransportID) {
        console.error('❌ Cập nhật/thêm mới thất bại');
        return;
      }

      if (currentTransport) {
        const updatedTransports = transports.map((t) =>
          t._id === currentTransport._id ? { ...t, status: modalStatus, note: modalNote } : t
        );
        setTransports(updatedTransports);
        setAlert({ type: 'success', message: `✅ Transport ${updatedTransportID} đã cập nhật thành công! Status: ${convertStatus(modalStatus)}` });
      } else {
        fetchTransports(); // Reload to include new transport
        setAlert({ type: 'success', message: `✅ Transport ${updatedTransportID} đã được thêm mới thành công!` });
      }

      closeModal();
    } catch (error) {
      console.error('❌ Lỗi khi cập nhật/thêm mới:', error.response?.data?.message || error.message);
      setAlert({
        type: 'error',
        message: '❌ Lỗi khi cập nhật/thêm mới: ' + (error.response?.data?.message || error.message),
      });
    }
    setTimeout(() => setAlert(null), 5000);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentTransport(null);
  };

  const convertStatus = (status) => {
    switch (status) {
      case '0':
        return '📦Chưa lấy hàng';
      case '1':
        return '🚚Đã lấy hàng';
      case '2':
        return '✅Đã trả hàng';
      case '3':
        return '🚫Đã hủy';
      default:
        return 'Unknown Status';
    }
  };

  const formatDateTimeVN = (dateInput) => {
    const date = new Date(dateInput);
    const options = {
      weekday: 'long',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'Asia/Ho_Chi_Minh'
    };
    return date.toLocaleString('vi-VN', options);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {alert && (
        <div
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-4 py-2 text-sm border rounded shadow transition-all duration-300 min-w-[320px] max-w-[90%] w-fit text-center
          ${alert.type === 'success' ? 'text-green-800 bg-green-100 border-green-300' : ''}
          ${alert.type === 'error' ? 'text-red-800 bg-red-100 border-red-300' : ''}`}
        >
          {alert.message}
        </div>
      )}
      <div className="mb-4">
        <Link
          to="/BookingManager"
          className="inline-flex items-center text-sm text-blue-600 hover:underline hover:text-blue-800 transition"
        >
          Chuyển sang trang quản lý booking
          <FaArrowRight className="ml-1" />
        </Link>
      </div>
      <div className="container mx-auto p-6">
        {/* Search Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Tìm kiếm Transports</h2>
            <button
              onClick={toggleSearch}
              className={`${!isSearchOpen ? 'bg-emerald-400 hover:brightness-110' : 'bg-orange-400 hover:brightness-110'} text-white px-4 py-2 rounded-md transition duration-200`}
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
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">Ngày vận chuyển</label>
                <input
                  type="date"
                  id="date"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Số điện thoại</label>
                <input
                  type="number"
                  id="phoneNumber"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="Nhập số điện thoại ..."
                />
              </div>
              <div>
                <label htmlFor="pickupFrom" className="block text-sm font-medium text-gray-700">Điểm đón</label>
                <input
                  type="text"
                  id="pickupFrom"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="Nhập điểm đón ..."
                />
              </div>
              <div>
                <label htmlFor="destination" className="block text-sm font-medium text-gray-700">Điểm trả</label>
                <input
                  type="text"
                  id="destination"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="Nhập điểm trả ..."
                />
              </div>
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">Trạng thái</label>
                <select
                  id="status"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                  <option value="">📦Tất cả</option>
                  <option value="0">📦Chưa lấy hàng</option>
                  <option value="1">🚚Đã lấy hàng</option>
                  <option value="2">✅Đã trả hàng</option>
                  <option value="3">🚫Đã hủy</option>
                </select>
              </div>
              <div className="md:col-span-3 flex justify-end space-x-4">
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

        {/* Transport List Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Transport List <span className="text-sm font-normal text-gray-600">({transports.length} items)</span></h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-xs sm:text-sm table-fixed w-[1100px]">
              <thead className="bg-gray-50">
                <tr>
                  <th className="w-[150px] px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button onClick={() => handleSort('pickupFrom')} className="text-indigo-600 hover:text-indigo-800 uppercase">
                      Điểm đón <span>{sortConfig.column === 'pickupFrom' ? (sortConfig.ascending ? '↑' : '↓') : ''}</span>
                    </button>
                  </th>
                  <th className="w-[150px] px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button onClick={() => handleSort('destination')} className="text-indigo-600 hover:text-indigo-800 uppercase">
                      Điểm trả <span>{sortConfig.column === 'destination' ? (sortConfig.ascending ? '↑' : '↓') : ''}</span>
                    </button>
                  </th>
                  <th className="w-[200px] px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button onClick={() => handleSort('date')} className="text-indigo-600 hover:text-indigo-800 uppercase">
                      Ngày vận chuyển <span>{sortConfig.column === 'date' ? (sortConfig.ascending ? '↑' : '↓') : ''}</span>
                    </button>
                  </th>
                  <th className="w-[100px] px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button onClick={() => handleSort('phoneNumber')} className="text-indigo-600 hover:text-indigo-800">
                      SĐT <span>{sortConfig.column === 'phoneNumber' ? (sortConfig.ascending ? '↑' : '↓') : ''}</span>
                    </button>
                  </th>
                  <th className="w-[50px] px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button onClick={() => handleSort('numberOfPeople')} className="text-indigo-600 hover:text-indigo-800 uppercase">
                      Số người <span>{sortConfig.column === 'numberOfPeople' ? (sortConfig.ascending ? '↑' : '↓') : ''}</span>
                    </button>
                  </th>
                  <th className="w-[150px] px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ghi chú</th>
                  <th className="w-[200px] px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button onClick={() => handleSort('status')} className="text-indigo-600 hover:text-indigo-800 uppercase">
                      Trạng thái <span>{sortConfig.column === 'status' ? (sortConfig.ascending ? '↑' : '↓') : ''}</span>
                    </button>
                  </th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {transports.map((transport) => (
                  <tr
                    key={transport._id}
                    className={`${
                      transport.status === '0' ? 'bg-blue-50 hover:bg-neutral-100' :
                      transport.status === '1' ? 'bg-yellow-50 hover:bg-yellow-100' :
                      transport.status === '2' ? 'bg-green-50 hover:bg-green-100' :
                      transport.status === '3' ? 'bg-red-50 hover:bg-red-100' :
                      ''
                    } transition duration-200 cursor-pointer`}
                    onClick={() => openModal(transport)}
                  >
                    <td className="px-2 py-2 whitespace-nowrap truncate overflow-hidden">{transport.pickupFrom}</td>
                    <td className="px-2 py-2 whitespace-nowrap truncate overflow-hidden">{transport.destination}</td>
                    <td className="px-2 py-2 whitespace-nowrap truncate">{formatDateTimeVN(transport.date)}</td>
                    <td className="px-2 py-2 whitespace-nowrap truncate">
                      <a href={`tel:${transport.phoneNumber}`} className="text-blue-600 hover:underline">
                        {transport.phoneNumber}
                      </a>
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap truncate">{transport.numberOfPeople}</td>
                    <td className="px-2 py-2 whitespace-nowrap truncate">{transport.note}</td>
                    <td className="px-2 py-2 whitespace-nowrap truncate">{convertStatus(transport.status)}</td>
                    <td className="px-2 py-2 whitespace-nowrap text-xs font-medium">
                      <button
                        className="text-blue-600 hover:text-blue-900 hover:bg-blue-100 px-2 py-1 rounded mr-2 transition duration-200"
                        onClick={(e) => { e.stopPropagation(); openModal(transport); }}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="text-green-600 hover:text-green-900 hover:bg-green-100 px-2 py-1 rounded transition duration-200"
                        onClick={(e) => { e.stopPropagation(); openModal(transport); }}
                      >
                        Status
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            onClick={() => openModal()}
            className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-200 flex items-center"
          >
            <FaPlus className="mr-2" /> Thêm mới đơn vận chuyển
          </button>
        </div>
      </div>

      {/* Modal Dialog */}
      {modalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-lg font-bold mb-3">
              {currentTransport ? 'Chỉnh sửa đơn vận chuyển' : 'Thêm mới đơn vận chuyển'}
            </h3>
            <table className="mb-4 min-w-full text-sm text-left text-gray-700 dark:text-gray-300 table-fixed">
              <tbody>
                <tr>
                  <th className="w-40 pr-4 py-1 font-medium text-gray-700 dark:text-gray-400 align-top">Điểm đón</th>
                  <td className="py-1 break-all whitespace-normal">
                    <input
                      type="text"
                      value={currentTransport?.pickupFrom || ''}
                      onChange={(e) => setCurrentTransport({ ...currentTransport, pickupFrom: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </td>
                </tr>
                <tr>
                  <th className="w-40 pr-4 py-1 font-medium text-gray-700 dark:text-gray-400 align-top">Điểm trả</th>
                  <td className="py-1 break-all whitespace-normal">
                    <input
                      type="text"
                      value={currentTransport?.destination || ''}
                      onChange={(e) => setCurrentTransport({ ...currentTransport, destination: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </td>
                </tr>
                <tr>
                  <th className="w-40 pr-4 py-1 font-medium text-gray-700 dark:text-gray-400 align-top">Ngày vận chuyển</th>
                  <td className="py-1 break-words whitespace-normal">
                    <input
                      type="date"
                      value={currentTransport?.date ? new Date(currentTransport.date).toISOString().split('T')[0] : ''}
                      onChange={(e) => setCurrentTransport({ ...currentTransport, date: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </td>
                </tr>
                <tr>
                  <th className="w-40 pr-4 py-1 font-medium text-gray-700 dark:text-gray-400 align-top">Số điện thoại</th>
                  <td className="py-1 break-words whitespace-normal">
                    <input
                      type="number"
                      value={currentTransport?.phoneNumber || ''}
                      onChange={(e) => setCurrentTransport({ ...currentTransport, phoneNumber: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </td>
                </tr>
                <tr>
                  <th className="w-40 pr-4 py-1 font-medium text-gray-700 dark:text-gray-400 align-top">Số người</th>
                  <td className="py-1 break-words whitespace-normal">
                    <input
                      type="number"
                      value={currentTransport?.numberOfPeople || 0}
                      onChange={(e) => setCurrentTransport({ ...currentTransport, numberOfPeople: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </td>
                </tr>
                <tr>
                  <th className="w-40 pr-4 py-1 font-medium text-gray-700 dark:text-gray-400 align-top">Ghi chú</th>
                  <td className="py-1 break-all whitespace-normal">
                    <textarea
                      value={modalNote}
                      onChange={(e) => setModalNote(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      rows="4"
                    />
                  </td>
                </tr>
                <tr>
                  <th className="w-40 pr-4 py-1 font-medium text-gray-700 dark:text-gray-400 align-top">Trạng thái</th>
                  <td className="py-1 break-words whitespace-normal">
                    <select
                      value={modalStatus}
                      onChange={(e) => setModalStatus(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    >
                      <option value="0">📦Chưa lấy hàng</option>
                      <option value="1">🚚Đã lấy hàng</option>
                      <option value="2">✅Đã trả hàng</option>
                      <option value="3">🚫Đã hủy</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={closeModal}
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

export default TransportsManager;