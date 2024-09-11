import React from 'react';
import { AppProvider, useAppContext } from './UserContextProvider'
import './App.css';
import WrappedUserComponent from './WrappedUserComponent';

const App: React.FC = () => {
	return (
	<AppProvider>
		<WrappedUserComponent />
	</AppProvider>
	);
};

export default App;
