import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams, useLocation, useMatch, useOutlet, To } from 'react-router-dom';

// Component Login sử dụng useNavigate để điều hướng
const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
		navigate('/dashboard');
  };

  return <button onClick={handleLogin}>Login</button>;
}

// Component UserProfile sử dụng useParams để lấy tham số từ URL
const UserProfile = () => {
  const { userId } = useParams();

  return <div>User ID: {userId}</div>;
}

// Component LocationDisplay sử dụng useLocation để hiển thị URL hiện tại
const LocationDisplay = () => {
  const location = useLocation();

  return <div>Current URL: {location.pathname}</div>;
}

// Component HighlightLink sử dụng useMatch để làm nổi bật liên kết hiện tại
const HighlightLink: React.FC<{to: string, children: React.ReactNode}> = ({ to, children }) => {
  const match = useMatch(to);

  return (
		<Link to={to} style={{ fontWeight: match ? 'bold' : 'normal' }}>
		  {children}
		</Link>
  );
}

// Component DashboardLayout sử dụng useOutlet để render các route con
const DashboardLayout = () => {
  const outlet = useOutlet();

  return (
		<div>
		  <h1>Dashboard</h1>
		  <nav>
				<HighlightLink to="/dashboard/profile">Profile</HighlightLink>
				<HighlightLink to="/dashboard/settings">Settings</HighlightLink>
		  </nav>
		  <div>{outlet}</div>
		</div>
  );
}

const Profile = () => {
  return <div>Profile Page</div>;
}

const Settings = () => {
  return <div>Settings Page</div>;
}

// Component App chứa cấu hình Router và các Route
const App = () => {
  return (
		<Router>
		  <div>
				<nav>
				  <Link to="/login">Login</Link>
				  <Link to="/dashboard">Dashboard</Link>
				  <LocationDisplay />
				</nav>
				<Routes>
				  <Route path="/login" element={<Login />} />
				  <Route path="/dashboard" element={<DashboardLayout />}>
						<Route path="profile" element={<Profile />} />
						<Route path="settings" element={<Settings />} />
				  </Route>
				  <Route path="/users/:userId" element={<UserProfile />} />
				</Routes>
		  </div>
		</Router>
  );
}

export default App;
