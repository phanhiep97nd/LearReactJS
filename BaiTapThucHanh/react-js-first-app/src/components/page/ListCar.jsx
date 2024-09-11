import React from 'react'
import '../../sass/ListCar.scss';
import { TypeOfCar, PriceAllSeatHoliday, PriceAllSeatNormal, PricePerSeat } from '../../module/Constants';

const ListCar = ({ UpdateDriver, DriverInfo, CheckHoliday}) => {
	function scrollToElement() {
		// const element = document.getElementById("home");
		// element.scrollIntoView({ behavior: "smooth" });
		// console.log(element);
		document.getElementById("scroll").click();
	}

	const handleUpdateTypeofCar = (typeofCarInput) => {
		UpdateDriver(typeofCarInput);
		scrollToElement();
	};

	const GetPriceInfo = (Type, isAllSeat, isHoliday) => {
		let price = 0;
		if (isAllSeat) {
			switch (Type) {
				case TypeOfCar.NAM_CHO:
					price = isHoliday ? PriceAllSeatHoliday.NAM_CHO : PriceAllSeatNormal.NAM_CHO;
					break;
				case TypeOfCar.BAY_CHO:
					price = isHoliday ? PriceAllSeatHoliday.BAY_CHO : PriceAllSeatNormal.BAY_CHO;
					break;
				default:
					price = 0;
			}
		} else {
			price = isHoliday ? PricePerSeat.HOLIDAY : PricePerSeat.NORMAL;
		}
		if (price >= 1_000_000) { // Kiểm tra nếu số lớn hơn hoặc bằng 1 triệu
			const million = (price / 1_000_000).toFixed(1); // Chia số cho 1 triệu và làm tròn đến 1 chữ số thập phân
			return `${million}tr `;
		} else {
			return price.toLocaleString('vi-VN'); // Định dạng số bình thường nếu nhỏ hơn 1 triệu
		}
	}

	return (
		<section className="section featured-car" id="featured-car">
			{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
			<a id='scroll' href='#hero'> </a>
			<div className="container">
				<div className="title-wrapper">
					<h2 className="h2 section-title">Các Loại Xe</h2>
				</div>
				<ul className="featured-car-list">
				{DriverInfo.map(
				(item, index) => (
					<li key={index}>
						<div className="featured-car-card">
							<figure className="card-banner">
								<img src={`./assets/images/${item.ImageName}`} alt="Vios-Accent" loading="lazy" width="440" height="300"
								className="w-100"/>
							</figure>
							<div className="card-content">
								<div className="card-title-wrapper">
								<h3 className="h3 card-title">
								{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
									<a href='#hero' onClick={() => handleUpdateTypeofCar(item.Type)}>{ item.Name }</a>
								</h3>
								<data className="year" value="2021">Mới</data>
								</div>
								<ul className="card-list">
									<li className="card-list-item">
										<ion-icon name="people-outline"></ion-icon>
										<span className="card-item-text">{ item.SeatInfo }</span>
									</li>
									<li className="card-list-item">
										<ion-icon name="bus-outline"></ion-icon>
										<span className="card-item-text">{ item.Info2 }</span>
									</li>
									<li className="card-list-item">
										<ion-icon name="leaf-outline"></ion-icon>
										<span className="card-item-text">{ item.Info1 }</span>
									</li>
									<li className="card-list-item">
										<ion-icon name="heart-half-outline"></ion-icon>
										<span className="card-item-text">{ item.Info3 }</span>
									</li>
								</ul>
								{CheckHoliday &&
								<ul>
									<li className="card-list-item">
										<ion-icon name="trending-up-outline"></ion-icon>
										{/* <span style={{ color: "red" }} className="card-item-text"></span> */}
										<span style={{color: "red"}} className="card-item-text">Giá thay đổi với ngày lễ { CheckHoliday.tenLe }</span>
									</li>
								</ul>}
								<div className="card-price-wrapper">
								<div className="card-price">
									{item.Type === TypeOfCar.XE_TAI
									? <strong>$ Liên hệ</strong>
									: (<div><strong>{GetPriceInfo(item.Type, false, CheckHoliday)}</strong> / khách <br/> Bao xe: <strong>{GetPriceInfo(item.Type, true, CheckHoliday)}đ</strong></div>)}
								</div>
								<button type="button" className="btn fav-btn" title="Thông tin về giá" data-toggle="collapse" data-target={`#collapseExample${index}`} aria-expanded="false" aria-controls={`collapseExample${index}`}>
									<ion-icon name="information-outline"></ion-icon>
								</button>
								<div className="collapse" id={`collapseExample${index}`}> 
								{item.Type === TypeOfCar.XE_TAI ? <strong>$ Liên hệ trực tiếp để biết giá</strong> :
									(<p className="" style={{ fontSize: "13px", color: "gray" }}>
									{`Ngày thường: ${GetPriceInfo(item.Type, false)}đ / ghế | Bao xe ${GetPriceInfo(item.Type, true)}đ`} <br></br>
									{`Ngày lễ: ${GetPriceInfo(item.Type, false, true)}đ / ghế | Bao xe ${GetPriceInfo(item.Type, true, true)}đ`}
								</p>)}
								</div>
								<button className="btn" onClick={() => handleUpdateTypeofCar(item.Type)}>Đặt ngay</button>
								</div>
							</div>
						</div>
					</li>
				))}
				</ul>
			</div>
		</section>
	)
}
export default ListCar;