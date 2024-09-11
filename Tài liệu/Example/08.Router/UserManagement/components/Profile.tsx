import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from '../styles/Profile.module.css';

const Profile: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
		return <div>Loading profile...</div>;
  }

  return (
		<div className={styles.container}>
		  <h2 className={styles.header}>Profile</h2>
		  <p className={styles.info}>Role: {user.role}</p>
		  {user.role === 'admin' && (
				<div className={styles.links}>
				  <Link to="/users" className={styles.link}>Manage Users</Link>
				  <Link to="/departs" className={styles.link}>Manage Departments</Link>
				</div>
		  )}
		  {user.role === 'manager' && (
				<div className={styles.links}>
				  <Link to={`/users?depart=${1}`} className={styles.link}>Manage Department Users</Link>
				</div>
		  )}
		</div>
  );
};

export default Profile;
