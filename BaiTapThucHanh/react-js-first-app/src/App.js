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
/tif (phoneNumber && typeof phoneNumber === 'string' && phoneNumber.length === 10) {
	return phoneNumber.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
/t} else {
	return phoneNumber;
/t}
}

function App() {
/tconst [Driver, setUpdateDriver] = useState(DriverInfo[0]);
/tconst [checkHoliday] = useState(CheckHoliday('03/02/2025'));

/tconst handleUpdateDriver = (Type) => {
	setUpdateDriver(DriverInfo.find(item => item.Type === Type));
/t}

/treturn (
	<>
	/t<Header DriverName={Driver.DriverName} PhoneNumber={Driver.PhoneNumber} />
	/t<main>
		<article>
		/t<Hero UpdateDriver={handleUpdateDriver} Type={Driver.Type} />
		/t<ListCar
			UpdateDriver={handleUpdateDriver}
			DriverInfo={DriverInfo}
			CheckHoliday={checkHoliday}
		/t/>
		/t<Contact DriverInfo={Driver}/>
		</article>
	/t</main>
	/t<div style={{ height: "1000px" }}></div>
	/t<Footer DriverName={Driver.DriverName} />
	</>
/t);
}

export default App;
