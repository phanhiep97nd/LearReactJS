import React from 'react'
import '../../sass/Contact.scss';
import { ShowPhoneNumber } from '../../App';		

const Contact = ({DriverInfo}) => {
	return (
		<section className="section get-start" id="contact">
				<div className="container">

					<h2 className="h2 section-title">Thông tin liên hệ</h2>

					<ul className="get-start-list">

						<li>
							<div className="get-start-card">

								<div className="card-icon icon-2">
									<ion-icon name="logo-facebook"></ion-icon>
								</div>

								<h3 className="card-title">Facebook</h3>

								{/* eslint-disable-next-line react/jsx-no-target-blank */}
								<a className="card-link" href={DriverInfo.FacebookLink} target='_blank'>
								{DriverInfo.FacebookName}
								</a>

							</div>
						</li>

						<li>
							<div className="get-start-card">

								<div className="card-icon">
									{/* eslint-disable-next-line no-octal-escape */}
									<img src="assets\images\7044033_zalo_icon.png" alt='img'/>
								</div>

								<h3 className="card-title">Zalo</h3>
							{/* eslint-disable-next-line react/jsx-no-target-blank */}
							<a className="card-link" href={`https://zalo.me/${DriverInfo.ZaloName}`} target='_blank'>
									{DriverInfo.ZaloName}: {DriverInfo.PhoneNumber}
								</a>

							</div>
						</li>

						<li>
							<div className="get-start-card">

								<div className="card-icon icon-3">
									<ion-icon name="call-outline"></ion-icon>
								</div>

								<h3 className="card-title">Số điện thoại</h3>

													<a href={`tel:${DriverInfo.PhoneNumber}`} className="card-link">{ ShowPhoneNumber(DriverInfo.PhoneNumber) }</a>
							</div>
						</li>

						<li>
							<div className="get-start-card">

								<div className="card-icon icon-4">
									<ion-icon name="card-outline"></ion-icon>
								</div>

								<h3 className="card-title">Thông tin ngân hàng</h3>

								<p className="card-text">
									{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
															<a className="card-link" href='#'>{ DriverInfo.BankNumber }</a>
								 {DriverInfo.BankName}
								</p>

							</div>
						</li>

					</ul>

				</div>
			</section>
	);
};
export default Contact;
