import React from 'react';
import AddressRegistration from './AddressRegistration';
import styles from './UserRegistration.module.css';

const UserRegistration: React.FC = () => {
	return (
	<div>
		<h1 className={styles.header}>User Registration</h1>
		<AddressRegistration />
	</div>
	);
};

export default UserRegistration;
