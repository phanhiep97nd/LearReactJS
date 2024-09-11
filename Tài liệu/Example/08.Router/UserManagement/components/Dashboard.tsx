import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useQuery } from 'react-query';
import { fetchCountUsers } from '../backend';

const Dashboard: React.FC = () => {
	// Sử dụng navigate được cung cấp từ hook để điều hướng
	const navigate = useNavigate();
	const { user } = useAuth();
	const { startDate, endDate } = getStartAndEndDate();
	const {data: countUsers} = useQuery<number>(['user/counts'], () => fetchCountUsers());
	const {data: countUsersWithDate} = useQuery<number>(['user/counts', {startDate, endDate}], () => fetchCountUsers({startDate, endDate}));

	/**
	 * Chuyển hướng sang Component list user
	 */
	const handleUsersClick = () => {
	navigate('/users');
	};

	/**
	 * Chuyển hướng sang Component list user với tham số input
	 */
	const handleStatsClick = () => {
	const { startDate, endDate } = getStartAndEndDate();
	navigate(`/users?from=${startDate}&to=${endDate}`);
	};

	return (
	<div>
		<h2>Dashboard</h2>
		<p>Logged in as: {user?.role}</p>
		<p>
		Number of users: {user?.role !== 'member'? <span onClick={handleUsersClick}>{countUsers}</span> : <span>{countUsers}</span>}
		</p>
		<p>
		Users managed this month: {user?.role !== 'member'? <span onClick={handleStatsClick}>{countUsersWithDate}</span> : <span>{countUsersWithDate}</span>}
		</p>
	</div>
	);
};

export default Dashboard;
