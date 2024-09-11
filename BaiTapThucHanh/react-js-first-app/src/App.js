//import logo from './logo.svg';
import React, { useState } from'react';
import './App.scss';
import Header from './components/base/Header';
import Footer from './components/base/Footer';
import Hero from './components/page/Hero';
import { DriverInfo, CheckHoliday } from './module/Data';
import ListCar from './components/page/ListCar';
import Contact from "./components/page/Contact";

export const ShowPhoneNumber = (phoneNumber) => {
  if (phoneNumber && typeof phoneNumber === 'string' && phoneNumber.length === 10) {
	return phoneNumber.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
  } else {
	return phoneNumber;
  }
}

function App() {
  const [Driver, setUpdateDriver] = useState(DriverInfo[0]);
  const [checkHoliday] = useState(CheckHoliday('03/02/2025'));

  const handleUpdateDriver = (Type) => {
	setUpdateDriver(DriverInfo.find(item => item.Type === Type));
  }

  return (
	<>
	  <Header DriverName={Driver.DriverName} PhoneNumber={Driver.PhoneNumber} />
	  <main>
		<article>
		  <Hero UpdateDriver={handleUpdateDriver} Type={Driver.Type} />
		  <ListCar
			UpdateDriver={handleUpdateDriver}
			DriverInfo={DriverInfo}
			CheckHoliday={checkHoliday}
		  />
		  <Contact DriverInfo={Driver}/>
		</article>
	  </main>
	  <div style={{ height: "1000px" }}></div>
	  <Footer DriverName={Driver.DriverName} />
	</>
  );
}

export default App;
