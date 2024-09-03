import React, { useState, useEffect } from 'react';
import FormRegister from '../page/FormRegister';
import '../../sass/hero.scss';
import { TypeOfCar, HeroBackgroundImage } from '../../module/Constants';

const Hero = ({UpdateDriver}) => {
    const [typeofCar, settypeofCar] = useState('5cho');

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
    }, [typeofCar])
    
    const handleUpdateTypeofCar = (typeofCarInput) => {
        UpdateDriver(typeofCarInput);
        settypeofCar(typeofCarInput);
    };

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
            <FormRegister UpdateTypeofCar={handleUpdateTypeofCar} TypeChecked={typeofCar} />
            </div>
        </section>
    )
}

export default Hero;