import React from 'react';
import { AuthProvider } from './context/AuthContext';
import styles from './App.module.css';
import Routing from './Routing';

const App: React.FC = () => {
  return (
		<AuthProvider>
		  <div className={styles.container}>
				<Routing />
		  </div>
		</AuthProvider>
  );
};

export default App;
