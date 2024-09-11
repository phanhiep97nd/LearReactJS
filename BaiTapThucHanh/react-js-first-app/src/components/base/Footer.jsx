import React from 'react';
import '../../sass/footer.scss';

const Footer = (props) => {
	return (
			<footer className="footer">
				<div className="container">
			
				<div className="footer-top">
			
					<div className="footer-brand">
					<a href="www.google.com" className="logo">
							<h2 style={{ color: "gray" }}>Mr.{ props.DriverName}</h2>
					</a>
			
					<p className="footer-text">
						Đáp ứng mọi nhu cầu di chuyển, gửi hàng 24/7.
						Chất lượng tạo niềm tin!
					</p>
					</div>
			
					<ul className="footer-list">
			
					<li>
						<p className="footer-list-title">Truy cập nhanh</p>
					</li>
			
					<li>
						<a href="#contact" className="footer-link">Contacts</a>
					</li>
			
					<li>
						<a href="#blog" className="footer-link">About us</a>
					</li>
			
					<li>
						<a href="www.google.com" className="footer-link">Đặt xe</a>
					</li>
			
					<li>
						<a href="#featured-car" className="footer-link">Danh sách xe</a>
					</li>
			
					</ul>
			
				</div>
			
				<div className="footer-bottom">
			
					<ul className="social-list">
			
					<li>
						<a href="www.google.com" className="social-link">
						<ion-icon name="logo-facebook"></ion-icon>
						</a>
					</li>
			
					<li>
						<a href="www.google.com" className="social-link">
						<ion-icon name="logo-instagram"></ion-icon>
						</a>
					</li>
			
					<li>
						<a href="www.google.com" className="social-link">
						<ion-icon name="logo-twitter"></ion-icon>
						</a>
					</li>
			
					<li>
						<a href="www.google.com" className="social-link">
						<ion-icon name="logo-linkedin"></ion-icon>
						</a>
					</li>
			
					<li>
						<a href="www.google.com" className="social-link">
						<ion-icon name="logo-skype"></ion-icon>
						</a>
					</li>
			
					<li>
						<a href="www.google.com" className="social-link">
						<ion-icon name="mail-outline"></ion-icon>
						</a>
					</li>
			
					</ul>
			
					<p className="copyright">
					&copy; 2024 <a href="www.google.com">hiepphann</a>. All Rights Reserved
					</p>
			
				</div>
			
				</div>
			</footer>
				)
}
		
export default Footer;