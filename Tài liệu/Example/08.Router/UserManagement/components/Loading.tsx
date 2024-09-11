import React from 'react';
import { Spinner } from './basic/Spinner';
import styles from './styles/Loading.module.css'

export const Loading: React.FC = () => {
	return (
	<div className={styles.content}>
		<Spinner/>
	</div>
	);
};
