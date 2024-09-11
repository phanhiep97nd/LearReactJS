import React from 'react'
import '../../sass/ExtraInfo.scss';
import { ExtraInfoData } from "../../module/Data";

const ExtraInfo = () => {
	return (
		<section className="section blog" id="blog">
			<div className="container">
				<h2 className="h2 section-title">Về chúng tôi</h2>
				<ul className="blog-list has-scrollbar">
					{ExtraInfoData.map((item, index) => (
						<li key={index}>
							<div className="blog-card">
							<figure className="card-banner">
								<a href="#home">
								<img src={`./assets/images/${item.ImageName}`} alt={item.Title} loading="lazy"
									className="w-100"/>
								</a>
								<a href="#home" className="btn card-badge">Đặt ngay</a>
							</figure>
							<div className="card-content">
								<h3 className="h3 card-title">
									<a href="#home">{item.Title}</a>
								</h3>
							</div>
							</div>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
};
export default ExtraInfo;
