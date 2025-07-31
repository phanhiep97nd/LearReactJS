import React, { useState, useEffect } from 'react';
import FormRegister from '../page/FormRegister';
import '../../sass/hero.scss';
import { TypeOfCar, HeroBackgroundImage } from '../../module/Constants';

const Hero = ({UpdateDriver, Type, CheckHoliday, UpdateDate}) => {
	const [typeofCar, settypeofCar] = useState(TypeOfCar.NAM_CHO);

	useEffect(() => {
		var bannerImg = document.getElementById("BannerImg");
		if(typeofCar === TypeOfCar.NAM_CHO){
			bannerImg.style.background = `url('assets/images/${HeroBackgroundImage.NAM_CHO}') no-repeat`;
		}
		else if(typeofCar === TypeOfCar.BAY_CHO){
			bannerImg.style.background = `url('assets/images/${HeroBackgroundImage.BAY_CHO}') no-repeat`;
		}
		else{
			bannerImg.style.background = `url('assets/images/${HeroBackgroundImage.XE_TAI}') no-repeat`;
		}
		bannerImg.style.backgroundSize = 'contain';
		bannerImg.style.backgroundPosition = 'center';
	}, [typeofCar]);
	
	const handleUpdateTypeofCar = (typeofCarInput) => {
		UpdateDriver(typeofCarInput);
		settypeofCar(typeofCarInput);
	};

	useEffect(() => {
		settypeofCar(Type);
	}, [Type]);

	return (
		<section className="section hero" id="home">
			<div className="container">
			<div className="hero-content">
				<h2 className="h1 hero-title">🚙🚛Dịch vụ xe ghép, xe du lịch, gửi hàng</h2>
				<p className="hero-text">
				Xuân Trường - Giao Thủy - Hài Hậu - Nam Đinh 🔁 Hà Nội, Nội Bài - Liên Tỉnh!
				</p>
			</div>
			<div className="hero-banner" id="BannerImg"></div>
				<FormRegister UpdateTypeofCar={handleUpdateTypeofCar} TypeChecked={Type} CheckHoliday={CheckHoliday} UpdateDate={UpdateDate}/>
			</div>
		</section>
	)
}

export default Hero;