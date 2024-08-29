import React from 'react';
import '../../sass/header.scss';

const Header = () => {
	return (
		<header class="header" data-header>
			<div class="container">

				<div class="overlay" data-overlay></div>

				<a href="#home" class="logo" id="home">
					<h2 style={{ color: "gray" }}>Mr.Phóng</h2>

				</a>

				<nav class="navbar" data-navbar>
					<ul class="navbar-list">

					<li>
						<a href="#home" class="navbar-link" data-nav-link>Home</a>
					</li>

					<li>
						<a href="#featured-car" class="navbar-link" data-nav-link>Đặt xe</a>
					</li>

					<li>
						<a href="#contact" class="navbar-link" data-nav-link>Liên hệ</a>
					</li>

					<li>
						<a href="#blog" class="navbar-link" data-nav-link>Về chúng tôi</a>
					</li>

					</ul>
				</nav>

				<div class="header-actions">

					<div class="header-contact">
					<a href="tel:0868266815" class="contact-link">0868 266 815</a>

					<span class="contact-time">Phục vụ 24/7</span>
					</div>

					<a href="#featured-car" class="btn" aria-labelledby="aria-label-txt">
					<ion-icon name="car-outline"></ion-icon>

					<span id="aria-label-txt">Đặt xe</span>
					</a>

					<a href="#contact" class="btn user-btn" aria-label="Profile">
					<ion-icon name="person-outline"></ion-icon>
					</a>

					<button class="nav-toggle-btn" data-nav-toggle-btn aria-label="Toggle Menu">
					<span class="one"></span>
					<span class="two"></span>
					<span class="three"></span>
					</button>

				</div>

			</div>
		</header>
	)
}

export default Header