//import logo from './logo.svg';
import React, { useState, useEffect } from'react';
import './App.scss';
import Header from './components/base/Header';
import Footer from './components/base/Footer';
import Hero from './components/page/Hero';
import {CheckHoliday } from './module/Data';
import ListCar from './components/page/ListCar';
import Contact from "./components/page/Contact";
import ExtraInfo from "./components/page/ExtraInfo";
import axios from 'axios';

export const ShowPhoneNumber = (phoneNumber) => {
	if (phoneNumber && typeof phoneNumber === 'string' && phoneNumber.length === 10) {
		return phoneNumber.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
	} else {
		return phoneNumber;
	}
}

export const fetchCarInfo = async () => {
	try {
	  const response = await axios.get('https://learreactjs.onrender.com/car_info/getCarInfo');
	  return response.data;
	} catch (err) {
	  console.error(err);
	  return [];
	}
  };

function App() {
	const [DriverInfo, setDriverInfo] = useState([]);
	const [Driver, setUpdateDriver] = useState(DriverInfo[0]);
	const [checkHoliday, setCheckHoliday] = useState(CheckHoliday());

	const handleUpdateDriver = (Type) => {
		setUpdateDriver(DriverInfo.find(item => item.Type === Type));
	}

	const handleUpdateCheckHoliday = (dayCheck) => {
		setCheckHoliday(CheckHoliday(dayCheck));
	};

	useEffect(() => {
		const fetchData = async () => {
		const data = await fetchCarInfo();
		setDriverInfo(data);
		setUpdateDriver(data[2]); // Set the first driver as default
		};
	
		fetchData();
	  }, []);
	
	  if (!Driver) {
		return (
			<div style={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100vh',
				width: '100vw',
				position: 'fixed',
				top: 0,
				left: 0,
				background: '#fff',
				zIndex: 9999
			}}>
				<img src="assets/images/Truck loading.gif" alt="Loading..." style={{ width: '120px', height: '120px' }} />
				<div>Loading...</div>
			</div>
		);
	  }

	return (
	<>
		<Header DriverName={Driver.DriverName} PhoneNumber={Driver.PhoneNumber} />
		<main>
			<article>
				<Hero UpdateDriver={handleUpdateDriver} Type={Driver.Type} UpdateDate={handleUpdateCheckHoliday} CheckHoliday={checkHoliday}/>
				<ListCar
				UpdateDriver={handleUpdateDriver}
				DriverInfo={DriverInfo}
				CheckHoliday={checkHoliday}
				/>
				<Contact DriverInfo={Driver}/>
				<ExtraInfo DriverInfo={Driver} />
			</article>
		</main>
		<Footer DriverName={Driver.DriverName} />
	</>
	);
}

export default App;
