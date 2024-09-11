import React, { useEffect } from 'react';
import '../../sass/FormRegister.scss';
import { TypeOfCar,PriceAllSeatHoliday, PriceAllSeatNormal, PricePerSeat } from '../../module/Constants';

const FormRegister = ({ UpdateTypeofCar, TypeChecked }) => {
    const [typeofCar, settypeofCar] = React.useState(TypeOfCar.NAM_CHO);
    const [allSeatCheck, setAllSeatCheck] = React.useState(false);
    const [numberOfGuest, setNumberOfGuest] = React.useState(1);
    const [holiday] = React.useState(true);

    const handleUpdateTypeofCar = (typeofCarInput) => {
        settypeofCar(typeofCarInput);
        UpdateTypeofCar(typeofCarInput);
    };

    const handleAllSeatCheck = () => {
        setAllSeatCheck(!allSeatCheck);
    }

    const handleUpdateNumberOfGuest = (numberOfGuestInput) => {
        setNumberOfGuest(numberOfGuestInput);
    }

    const getPrice = () => {
        let price = 0;
        if (allSeatCheck) {
            switch (typeofCar) {
                case TypeOfCar.NAM_CHO:
                    price = holiday ? PriceAllSeatHoliday.NAM_CHO : PriceAllSeatNormal.NAM_CHO;
                    break;
                case TypeOfCar.BAY_CHO:
                    price = holiday ? PriceAllSeatHoliday.BAY_CHO : PriceAllSeatNormal.BAY_CHO;
                    break;
                case TypeOfCar.XE_TAI:
                    return "!Liên hệ để biết giá!";
                default:
                    price = 0;
            }
        } else {
            if(typeofCar === TypeOfCar.XE_TAI){
                return "!Liên hệ để biết giá!";
            }
            price = numberOfGuest * (holiday ? PricePerSeat.HOLIDAY : PricePerSeat.NORMAL);
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
            if(typeofCar === TypeOfCar.XE_TAI){
                numberOfGuestElement.value = 0;
                numberOfGuestElement.disabled = true;
                numberOfGuestElement.style.backgroundColor = "lightgrey";
            }
            else{
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
    }, [numberOfGuest])// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        settypeofCar(TypeChecked);
    }, [TypeChecked])// eslint-disable-line react-hooks/exhaustive-deps
    return (
             <>
                <span className="price" id='price'></span>
                <form action="" className="hero-form">

                    <div className="input-wrapper">
                        <label htmlFor="input-1" className="input-label">Chọn loại xe</label>
                        <div className="container_radio">
                            <div className="radio_container">
                                <input type="radio" name="radio" id="one" checked={TypeChecked === TypeOfCar.NAM_CHO} onChange={() => handleUpdateTypeofCar(TypeOfCar.NAM_CHO)} />
                                <label htmlFor="one">5 chỗ</label>
                                <input type="radio" name="radio" id="two" checked={TypeChecked === TypeOfCar.BAY_CHO}  onChange={() => handleUpdateTypeofCar(TypeOfCar.BAY_CHO)} />
                                <label htmlFor="two">7 chỗ</label>
                                <input type="radio" name="radio" id="three" checked={TypeChecked === TypeOfCar.XE_TAI}  onChange={() => handleUpdateTypeofCar(TypeOfCar.XE_TAI)} />
                                <label htmlFor="three">Xe tải</label>
                            </div>
                        </div>
                        <div className="container-checkbox">
                            <div className="row">
                                <section>
                                Bao xe
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

                        <input type="datetime-local" name="monthly-pay" id="input-2" className="input-field" placeholder="Nhập tên tại đây..." />
                        <label  className="input-label">----------------------------</label>
                        <label htmlFor="input-3" className="input-label">Số lượng khách</label>

                        <input type="number" name="NumberOfGuest" id="input-3" className="input-field" min={1} max={typeofCar === TypeOfCar.NAM_CHO ? 4 : 6} value={numberOfGuest}
                            placeholder="Nhập số khách tại đây..." onChange={(e) => handleUpdateNumberOfGuest(e.target.value)} />
                    </div>

                    <div className="input-wrapper">
                        <label htmlFor="input-4" className="input-label">Điểm đón</label>

                        <input type="text" name="year" id="input-4" className="input-field" placeholder="Nhập điểm đón tại đây..." />
                        <label  className="input-label">----------------------------</label>
                        <label htmlFor="input-4" className="input-label">Điểm trả</label>

                        <input type="text" name="year" id="input-4" className="input-field" placeholder="Nhập điểm trả tại đây..." />
                    </div>

                    <div className="input-wrapper">
                        <label htmlFor="input-5" className="input-label" style={{ color: "brown" }}>Số điện thoại *(Bắt buộc)</label>

                        <input type="number" name="year" id="inputPhoneNumber" className="input-field" placeholder="Nhập SDT tại đây..." />
                        <label  className="input-label">----------------</label>
                        <input type="text" name="year" id="input-4" className="input-field" placeholder="Ghi chú thêm ..." />
                    </div>

                    <button id="show-message" className="btn">Thực hiện Đặt xe</button>

                </form>
            </>
    )
}

export default FormRegister;