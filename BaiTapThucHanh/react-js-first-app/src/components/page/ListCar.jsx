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
/t};
/t
/tconst GetPriceInfo = (Type, isAllSeat, isHoliday) => {
		let price = 0;
		if (isAllSeat) {
		/tswitch (Type) {
				/tcase TypeOfCar.NAM_CHO:
						/tprice = isHoliday ? PriceAllSeatHoliday.NAM_CHO : PriceAllSeatNormal.NAM_CHO;
						/tbreak;
				/tcase TypeOfCar.BAY_CHO:
						/tprice = isHoliday ? PriceAllSeatHoliday.BAY_CHO : PriceAllSeatNormal.BAY_CHO;
						/tbreak;
				/tdefault:
						/tprice = 0;
		/t}
		} else {
				price = isHoliday ? PricePerSeat.HOLIDAY : PricePerSeat.NORMAL;
		}
		if (price >= 1_000_000) { // Kiểm tra nếu số lớn hơn hoặc bằng 1 triệu
		/tconst million = (price / 1_000_000).toFixed(1); // Chia số cho 1 triệu và làm tròn đến 1 chữ số thập phân
		/treturn `${million}tr `;
		} else {
				return price.toLocaleString('vi-VN'); // Định dạng số bình thường nếu nhỏ hơn 1 triệu
		}
/t}
/treturn (
		/t<section className="section featured-car" id="featured-car">
				/t{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
				/t<a id='scroll' href='#hero'> </a>
				<div className="container">

				/t<div className="title-wrapper">
						<h2 className="h2 section-title">Các Loại Xe</h2>
				/t</div>

				/t<ul className="featured-car-list">

				/t{DriverInfo.map(
						(item, index) => (
						/t<li key={index}>
								<div className="featured-car-card">
						/t
								<figure className="card-banner">
										<img src={`./assets/images/${item.ImageName}`} alt="Vios-Accent" loading="lazy" width="440" height="300"
								/tclassName="w-100"/>
								</figure>
						/t
								<div className="card-content">
						/t
								/t<div className="card-title-wrapper">
								/t<h3 className="h3 card-title">
										{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
												<a href='#hero' onClick={() => handleUpdateTypeofCar(item.Type)}>{ item.Name }</a>
								/t</h3>
						/t
								/t<data className="year" value="2021">Mới</data>
								/t</div>
						/t
								/t<ul className="card-list">
						/t
										<li className="card-list-item">
										/t<ion-icon name="people-outline"></ion-icon>
								
										/t<span className="card-item-text">{ item.SeatInfo }</span>
										</li>
								
										<li className="card-list-item">
										/t<ion-icon name="bus-outline"></ion-icon>
								
										/t<span className="card-item-text">{ item.Info2 }</span>
										</li>
								
										<li className="card-list-item">
										/t<ion-icon name="leaf-outline"></ion-icon>
								
										/t<span className="card-item-text">{ item.Info1 }</span>
										</li>
								
										<li className="card-list-item">
										/t<ion-icon name="heart-half-outline"></ion-icon>
								
										/t<span className="card-item-text">{ item.Info3 }</span>
										</li>
						/t
								/t</ul>
								/t{CheckHoliday &&
								/t<ul>
										<li className="card-list-item">
										/t<ion-icon name="trending-up-outline"></ion-icon>
										/t{/* <span style={{ color: "red" }} className="card-item-text"></span> */}
										/t<span style={{color: "red"}} className="card-item-text">Giá thay đổi với ngày lễ { CheckHoliday.tenLe }</span>
										</li>
								/t</ul>}
								/t<div className="card-price-wrapper">
								/t<div className="card-price">
										/t{item.Type === TypeOfCar.XE_TAI
												? <strong>$ Liên hệ</strong>
												: (<div><strong>{GetPriceInfo(item.Type, false, CheckHoliday)}</strong> / khách <br/> Bao xe: <strong>{GetPriceInfo(item.Type, true, CheckHoliday)}đ</strong></div>)}
								/t</div>
								/t<button type="button" className="btn fav-btn" title="Thông tin về giá" data-toggle="collapse" data-target={`#collapseExample${index}`} aria-expanded="false" aria-controls={`collapseExample${index}`}>
										<ion-icon name="information-outline"></ion-icon>
								/t</button>
								/t<div className="collapse" id={`collapseExample${index}`}> 
										{item.Type === TypeOfCar.XE_TAI ? <strong>$ Liên hệ trực tiếp để biết giá</strong> :
										/t(<p className="" style={{ fontSize: "13px", color: "gray" }}>
												{`Ngày thường: ${GetPriceInfo(item.Type, false)}đ / ghế | Bao xe ${GetPriceInfo(item.Type, true)}đ`} <br></br>
												{`Ngày lễ: ${GetPriceInfo(item.Type, false, true)}đ / ghế | Bao xe ${GetPriceInfo(item.Type, true, true)}đ`}
										</p>)}
								/t</div>
								/t<button className="btn" onClick={() => handleUpdateTypeofCar(item.Type)}>Đặt ngay</button>
						/t
								/t</div>
						/t
								</div>
						/t
								</div>
						/t</li>
						))}

				/t</ul>

				</div>
		/t</section>
/t)
}

export default ListCar;