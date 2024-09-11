// v6
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet,
  NavLink,
  redirect,
  Navigate
} from 'react-router-dom';
import { default as Home } from './Home';
import { default as MyProfile } from './MyProfile';
import { default as OthersProfile } from './OthersProfile';
import React from 'react';


// // Cach #1
// function App() {
//   return (
//		 <BrowserRouter>
//		   <Routes>
//				 <Route path="/" element={<Home />} />
//				 <Route path="profile/*" element={<Profile/>} />
//		   </Routes>
//		 </BrowserRouter>
//   );
// }

// function Profile() {
//   return (
//		 <div>
//		   <nav>
//				 <Link to="me">My Profile</Link>
//		   </nav>

//		   <Routes>
//				 <Route path="me" element={<MyProfile />} />
//				 <Route path=":id" element={<OthersProfile />} />
//		   </Routes>
//		 </div>
//   );
// }

// Cach #2
const App = () => {
  return (
		<BrowserRouter>
		  <Routes>
				<Route path="/" element={<Home />} />
				<Route path="profile" element={<Profile />}>
				  <Route path=":id" element={<MyProfile />} />
				  <Route path="me" element={<OthersProfile />} />
				</Route>
		  </Routes>
		</BrowserRouter>
  );
}

const Profile = () => {
  return (
		<div>
		  <nav>
				<Link to="me">My Profile</Link>
		  </nav>
		  <nav>
				<NavLink to="me" style={({ isActive, isTransitioning, isPending }) => {
				  return {
						fontWeight: isActive? 'bold' : '',
						viewTransitionName: isTransitioning? 'slide' : ''
				  }
				}}>
				  {
						({ isActive }) => <span className={ isActive ? "active" : "" }>View My Profile</span>
				  }
				</NavLink>
		  </nav>

		  <Outlet />
		</div>
  )
}



const ProtectedRoute: React.FC<{isLogin: boolean, children: React.ReactNode}> = ({isLogin, children}) => {
  if (!isLogin) {
		return <Navigate to="/login" />;
  }
  return children;
}
