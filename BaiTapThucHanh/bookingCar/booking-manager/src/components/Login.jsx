import React, { useState, useEffect } from "react";
import axios from 'axios';
import {useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import SHA256 from 'crypto-js/sha256';

const Login = () => {
	const [form, setForm] = useState({ userName: "", password: "" });
	const [errorMsg, setErrorMsg] = useState('');
	const navigate = useNavigate();

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	useEffect(() => {
		localStorage.removeItem('token'); // Xóa token cũ khi component mount
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		// Xử lý đăng nhập ở đây
		// Tạo hash SHA-256
		const API_URL = process.env.REACT_APP_API_URL;
		const passHashcode = SHA256(form.password).toString();
		console.log('Hashcode:', passHashcode, 'Type:', typeof passHashcode);
		try {
			const response = await axios.post(`${API_URL}/api/auth/login`, {
				username: form.userName,
				password: passHashcode
			});

			// Lưu token
			localStorage.setItem('token', response.data.token);
			
			console.log('Login success!');
			navigate('/BookingManager');
		} catch (error) {
			const msg = error.response?.data?.message || 'Đăng nhập thất bại!';
			setErrorMsg(msg); // ✅ cập nhật thông báo lỗi
			console.error('Login failed:', error.response?.data || error.message);
		}
	};

	return (
		<div className="container d-flex align-items-center justify-content-center min-vh-100 bg-light">
			<div className="card shadow p-4" style={{ maxWidth: 400, width: "100%" }}>
				<h2 className="mb-4 text-center">Đăng nhập</h2>
				{errorMsg && <div style={{ color: 'red', marginTop: '10px' }}>{errorMsg}</div>}
				<form onSubmit={handleSubmit}>
					<div className="mb-3">
						<label htmlFor="userName" className="form-label">
							Tên đăng nhập
						</label>
						<input
							type="userName"
							className="form-control"
							id="userName"
							name="userName"
							value={form.userName}
							onChange={handleChange}
							required
							placeholder="Nhập userName"
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="password" className="form-label">
							Mật khẩu
						</label>
						<input
							type="password"
							className="form-control"
							id="password"
							name="password"
							value={form.password}
							onChange={handleChange}
							required
							placeholder="Nhập mật khẩu"
						/>
					</div>
					<button type="submit" className="btn btn-primary w-100">
						Đăng nhập
					</button>
				</form>
			</div>
		</div>
	);
};

export default Login;