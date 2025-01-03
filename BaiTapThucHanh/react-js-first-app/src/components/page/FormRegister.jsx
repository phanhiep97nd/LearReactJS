import React, { useEffect } from 'react';
import '../../sass/FormRegister.scss';
import { TypeOfCar,PriceAllSeatHoliday, PriceAllSeatNormal, PricePerSeat } from '../../module/Constants';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';

// Modal.setAppElement('#root');

const FormRegister = ({ UpdateTypeofCar, TypeChecked, CheckHoliday , UpdateDate}) => {
	const [typeofCar, settypeofCar] = React.useState(TypeOfCar.NAM_CHO);
	const [allSeatCheck, setAllSeatCheck] = React.useState(false);
	const [numberOfGuest, setNumberOfGuest] = React.useState(1);
	const [isModalOpen, setIsModalOpen] = React.useState(false);
	const [formData, setFormData] = React.useState({
        type: TypeOfCar.NAM_CHO,
        date: '',
        numberOfGuest: 1,
        pickupFrom: '',
        destination: '',
        phoneNumber: '',
        note: ''
    });

	const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
		if(name === "date"){
			UpdateDate(value);
		}
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.phoneNumber) {
            alert('Số điện thoại không được để trống!');
            return;
        }
        setIsModalOpen(true);
    };

    const handleConfirm = async () => {
        const data = {
            ...formData,
            numberOfGuest: parseInt(formData.numberOfGuest, 10) // Ensure numberOfGuest is a number
        };
        try {
            await axios.post('https://learreactjs.onrender.com/booking/RegisterBooking', data);
            setIsModalOpen(false);
			alert('Đăng ký thành công! Chúng tôi sẽ liên hệ lại với bạn sớm nhất.');
        } catch (error) {
            alert('Đăng ký thất bại. Vui lòng thử lại.');
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

	const handleUpdateTypeofCar = (typeofCarInput) => {
		settypeofCar(typeofCarInput);
		UpdateTypeofCar(typeofCarInput);
		setFormData({
            ...formData,
            type: typeofCarInput
        });
	};

	const handleAllSeatCheck = () => {
		setAllSeatCheck(!allSeatCheck);
	}

	const handleUpdateNumberOfGuest = (e) => {
		setNumberOfGuest(e.target.value);
		handleChange(e);
	}

	const getPrice = () => {
		let price = 0;
		if (allSeatCheck) {
			switch (typeofCar) {
				case TypeOfCar.NAM_CHO:
					price = CheckHoliday ? PriceAllSeatHoliday.NAM_CHO : PriceAllSeatNormal.NAM_CHO;
					break;
				case TypeOfCar.BAY_CHO:
					price = CheckHoliday ? PriceAllSeatHoliday.BAY_CHO : PriceAllSeatNormal.BAY_CHO;
					break;
				case TypeOfCar.XE_TAI:
					return "!Liên hệ để biết giá!";
				default:
					price = 0;
			}
		} else {
			if(typeofCar === TypeOfCar.XE_TAI) {
				return "!Liên hệ để biết giá!";
			}
			price = numberOfGuest * (CheckHoliday ? PricePerSeat.HOLIDAY : PricePerSeat.NORMAL);
		}
		return `Giá tiền(Tham khảo) ước tính là: ${price.toLocaleString()} VND`;
	};

	useEffect(() => {
		var numberOfGuestElement = document.getElementById("input-3");
		const priceElement = document.getElementById("price");
		if (allSeatCheck) {
			switch (typeofCar) {
				case TypeOfCar.NAM_CHO:
					numberOfGuestElement.value = 4;
					break;
				case TypeOfCar.BAY_CHO:
					numberOfGuestElement.value = 6;
					break;
				case TypeOfCar.XE_TAI:
					numberOfGuestElement.value = 0;
					break;
				default:
					numberOfGuestElement.value = "";
			}
			numberOfGuestElement.disabled = true;
			numberOfGuestElement.style.backgroundColor = "lightgrey";
		} else {
			if(typeofCar === TypeOfCar.XE_TAI) {
				numberOfGuestElement.value = 0;
				numberOfGuestElement.disabled = true;
				numberOfGuestElement.style.backgroundColor = "lightgrey";
			} else {
				numberOfGuestElement.value = numberOfGuest;
				numberOfGuestElement.disabled = false;
				numberOfGuestElement.style.backgroundColor = "";
			}
		}
		priceElement.innerHTML = getPrice();
	}, [allSeatCheck, typeofCar]) // eslint-disable-line react-hooks/exhaustive-deps
	useEffect(() => {
		const priceElement = document.getElementById("price");
		priceElement.innerHTML = getPrice();
	}, [numberOfGuest, CheckHoliday])// eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		settypeofCar(TypeChecked);
	}, [TypeChecked])// eslint-disable-line react-hooks/exhaustive-deps
	return (
			 <>
				<span className="price" id='price'></span>
				<form action="" className="hero-form" onSubmit={handleSubmit}>
					<div className="input-wrapper">
						<label htmlFor="input-1" className="input-label">Chọn loại xe</label>
						<div className="container_radio">
							<div className="radio_container">
								<input type="radio" name="radio" id="one" checked={TypeChecked === TypeOfCar.NAM_CHO} onChange={() => handleUpdateTypeofCar(TypeOfCar.NAM_CHO)} />
								<label htmlFor="one">5 chỗ</label>
								<input type="radio" name="radio" id="two" checked={TypeChecked === TypeOfCar.BAY_CHO}	onChange={() => handleUpdateTypeofCar(TypeOfCar.BAY_CHO)} />
								<label htmlFor="two">7 chỗ</label>
								<input type="radio" name="radio" id="three" checked={TypeChecked === TypeOfCar.XE_TAI}	onChange={() => handleUpdateTypeofCar(TypeOfCar.XE_TAI)} />
								<label htmlFor="three">Xe tải</label>
							</div>
						</div>
						<div className="container-checkbox">
							<div className="row">
								<section>
									Bao xe:
									</section>
									<section>
									<div className="btn-wrap">
										<input type="checkbox" name="checkbox" onChange={handleAllSeatCheck}/>
									</div>
								</section>
							</div>
						</div>
					</div>
					<div className="input-wrapper">
						<label htmlFor="input-2" className="input-label">Ngày giờ đón</label>
						<input type="datetime-local" name="date" id="input-2" className="input-field" value={formData.date} onChange={handleChange}/>
						<label	className="input-label">----------------------------</label>
						<label htmlFor="input-3" className="input-label">Số lượng khách</label>
						<input type="number" name="numberOfGuest" id="input-3" className="input-field" min={1} max={typeofCar === TypeOfCar.NAM_CHO ? 4 : 6} value={numberOfGuest}
							placeholder="Nhập số khách tại đây..." onChange={(e) => handleUpdateNumberOfGuest(e)} />
					</div>
					<div className="input-wrapper">
						<label htmlFor="input-4" className="input-label">Điểm đón</label>
						<input type="text" name="pickupFrom" id="PickupFrom" className="input-field" placeholder="Nhập điểm đón tại đây..." onChange={handleChange}/>
						<label	className="input-label">----------------------------</label>
						<label htmlFor="input-4" className="input-label">Điểm trả</label>
						<input type="text" name="destination" id="Destination" className="input-field" placeholder="Nhập điểm trả tại đây..." value={formData.destination} onChange={handleChange}/>
					</div>
					<div className="input-wrapper">
						<label htmlFor="input-5" className="input-label" style={{ color: "brown" }}>Số điện thoại *(Bắt buộc)</label>
						<input type="number" name="phoneNumber" id="inputPhoneNumber" className="input-field" placeholder="Nhập SDT tại đây..." value={formData.phoneNumber} onChange={handleChange}/>
						<label	className="input-label">----------------</label>
						<input type="text" multiple name="note" id="input-4" className="input-field" placeholder="Ghi chú thêm ..." value={formData.note} onChange={handleChange}/>
					</div>
					<button id="submit" className="btn">Đặt xe</button>
				</form>
				{/* <Modal
                isOpen={isModalOpen}
                onRequestClose={handleCancel}
                contentLabel="Confirm Modal"
                className="Modal"
                overlayClassName="Overlay"
            >
                <h2>Xác nhận thông tin đăng ký</h2>
                <p>Tên: {formData.name}</p>
                <p>Email: {formData.email}</p>
                <p>Số điện thoại: {formData.phoneNumber}</p>
                <p>Địa chỉ: {formData.address}</p>
                <p>Ngày giờ đón: {formData.date}</p>
                <p>Số lượng khách: {formData.numberOfGuest}</p>
                <p>Điểm đón: {formData.pickupFrom}</p>
                <p>Loại xe: {formData.typeofCar}</p>
                <p>Giá dự kiến: {getPrice()} VND</p>
                <button onClick={handleConfirm}>Xác nhận</button>
                <button onClick={handleCancel}>Hủy</button>
            </Modal> */}
				<Modal show={isModalOpen} onHide={handleCancel}>
				<Modal.Header closeButton>
				<Modal.Title>Xác nhận thông tin</Modal.Title>
				</Modal.Header>
				<Modal.Body>
				<Table>
                    <tbody>
						<tr>
                            <td>Loại xe:</td>
                            <td>{
									formData.type === TypeOfCar.NAM_CHO ? "5 chỗ" :
									formData.type === TypeOfCar.BAY_CHO ? "7 chỗ" :
									formData.type === TypeOfCar.XE_TAI ? "Xe tải" : ""
								}
							</td>
                        </tr>
                        <tr>
                            <td>Số điện thoại:</td>
							<td style={{ color: 'red' }}>{formData.phoneNumber}</td>
                        </tr>
                        <tr>
                            <td>Ngày giờ đón:</td>
                            <td>{formData.date}</td>
                        </tr>
                        <tr>
                            <td>Số lượng khách:</td>
                            <td>{formData.numberOfGuest}</td>
                        </tr>
                        <tr>
                            <td>Điểm đón:</td>
                            <td>{formData.pickupFrom}</td>
                        </tr>
						<tr>
                            <td>Điểm trả:</td>
                            <td>{formData.destination}</td>
                        </tr>
						<tr>
                            <td>Ghi chú:</td>
                            <td>{formData.note}</td>
                        </tr>
                        <tr className="price">
							<td>{getPrice()}</td>
                        </tr>
                    </tbody>
				</Table>
				</Modal.Body>
				<Modal.Footer>
				<Button variant="primary" onClick={handleConfirm}>
					Xác nhận
				</Button>
				<Button variant="secondary" onClick={handleCancel}>
					Hủy
				</Button>
				</Modal.Footer>
				</Modal>
			</>
	)
}

export default FormRegister;