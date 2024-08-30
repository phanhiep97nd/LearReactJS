import React from 'react';
import '../../sass/header.scss';

const Header = () => {
	return (
		<header className="header" data-header>
			<div className="container">

				<div className="overlay" data-overlay></div>

				<a href="#home" className="logo" id="home">
					<h2 style={{ color: "gray" }}>Mr.Phóng</h2>

				</a>

				<nav className="navbar" data-navbar>
					<ul className="navbar-list">

					<li>
						<a href="#home" className="navbar-link" data-nav-link>Home</a>
					</li>

					<li>
						<a href="#featured-car" className="navbar-link" data-nav-link>Đặt xe</a>
					</li>

					<li>
						<a href="#contact" className="navbar-link" data-nav-link>Liên hệ</a>
					</li>

					<li>
						<a href="#blog" className="navbar-link" data-nav-link>Về chúng tôi</a>
					</li>

					</ul>
				</nav>

				<div className="header-actions">

					<div className="header-contact">
                        <a href="tel:0868266815" className="contact-link">0868 266 815</a>

                        <span className="contact-time">Phục vụ 24/7</span>
					</div>

					<a href="#featured-car" className="btn" aria-labelledby="aria-label-txt">
                        <ion-icon name="car-outline"></ion-icon>

                        <span id="aria-label-txt">Đặt xe</span>
					</a>

					<a href="#contact" className="btn user-btn" aria-label="Profile">
					<ion-icon name="person-outline"></ion-icon>
					</a>

					<button className="nav-toggle-btn" data-nav-toggle-btn aria-label="Toggle Menu">
                        <span className="one"></span>
                        <span className="two"></span>
                        <span className="three"></span>
					</button>

				</div>

			</div>
		</header>
	)
}

export default Header