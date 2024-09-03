//import logo from './logo.svg';
import React, { useState } from'react';
import './App.scss';
import Header from './components/base/Header';
import Footer from './components/base/Footer';
import Hero from './components/page/Hero';
import { TypeOfCar } from './module/Constants';

export const ShowPhoneNumber = (phoneNumber) => {
  if (phoneNumber && typeof phoneNumber === 'string' && phoneNumber.length === 10) {
    return phoneNumber.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
  } else {
    return phoneNumber;
  }
}
const DriverInfo = [
  {
    Type: TypeOfCar.NAM_CHO,
    DriverName: 'DriverA',
    PhoneNumber: '0948171499',
  },
  {
    Type: TypeOfCar.BAY_CHO,
    DriverName: 'DriverB',
    PhoneNumber: '01294697666',
  },
  {
    Type: TypeOfCar.XE_TAI,
    DriverName: 'DriverC',
    PhoneNumber: '0963690629',
  }
]

function App() {
  const [Driver, setUpdateDriver] = useState(DriverInfo[0]);
  const handleUpdateDriver = (Type) => {
    setUpdateDriver(DriverInfo.find(item => item.Type === Type));
  }

  return (
    <>
      <Header DriverName={Driver.DriverName} PhoneNumber={Driver.PhoneNumber} />
      <main>
        <article>
          <Hero UpdateDriver={handleUpdateDriver} />
        </article>
      </main>
      <div style={{ height: "1000px" }}></div>
      <Footer DriverName={Driver.DriverName} />
    </>
  );
}

export default App;
