import React, { useEffect} from 'react';
import '../../sass/header.scss';
import { ShowPhoneNumber } from '../../App';	

const Header = (props) => {
	useEffect(() => {
		const overlay = document.querySelector("[data-overlay]");
		const navbar = document.querySelector("[data-navbar]");
		const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
		const navbarLinks = document.querySelectorAll("[data-nav-link]");

		const navToggleFunc = function () {
			navToggleBtn.classList.toggle("active");
			navbar.classList.toggle("active");
			overlay.classList.toggle("active");
		}

		navToggleBtn.addEventListener("click", navToggleFunc);
		overlay.addEventListener("click", navToggleFunc);

		for (let i = 0; i < navbarLinks.length; i++) {
			navbarLinks[i].addEventListener("click", navToggleFunc);
		}

		const header = document.querySelector("[data-header]");

		window.addEventListener("scroll", function () {
			window.scrollY >= 10 ? header.classList.add("active")
				: header.classList.remove("active");
		});

		return () => {
			navToggleBtn.removeEventListener("click", navToggleFunc);
		};
	}, []);

	return (
		<header className="header" data-header>
			<div className="container">

				<div className="overlay" data-overlay></div>

				<a href="#home" className="logo" id="home">
					<h2 style={{ color: "gray" }}>Mr.{ props.DriverName}</h2>

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
						<a href={`tel:${props.PhoneNumber}`} className="contact-link">{ ShowPhoneNumber(props.PhoneNumber)}</a>

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