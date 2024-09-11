import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Users from './components/Users';
import Departs from './components/Departs';
import Profile from './components/Profile';
import AddDepart from './components/AddDepart';
import AddUser from './components/AddUser';
import EditDepart from './components/EditDepart';
import EditUser from './components/EditUser';

/**
 * HOCs này kiểm tra authentication để điều hướng trang cho phù hợp (nếu chưa login thì cần điều hướng về đăng nhập)
 * @param param0 
 * @returns 
 */
const RequireAuth: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Login />;
  }
  return children;
};

/**
 * Đối tượng sau đây mô tả cách thức routing cho các Component. Khi người dùng request một URL sẽ ánh xạ tương ứng tới 1 trang tài nguyên cụ thể
 * VD: khi vào màn hình và chưa đnăg nhập thì điều hướng tới route /login. Sau khi login thành công sẽ điều hướng tới dashboard (route mặc định là /)
 * @returns Cấu trúc routing cho tất cả các đối tượng Component
 */
const Routing: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        /** Kết cấu Route bọc lấy các Route khác */
        <Route
          path="/"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          /** Quản lý các route liên quan đến users trong một Outlet */
          <Route path="users" element={<Outlet />}>
            <Route index element={<Users />} />
            <Route path="add" element={<AddUser />} />
            <Route path="edit/:id" element={<EditUser />} />
          </Route>
          /** Quản lý các route liên quan đến departs trong một Outlet */
          <Route path="departs" element={<Outlet />}>
            <Route index element={<Departs />} />
            <Route path="add" element={<AddDepart />} />
            <Route path="edit/:id" element={<EditDepart />} />
          </Route>
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default Routing;
