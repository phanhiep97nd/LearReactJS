import { useState } from "react";
import { UserInfo, useAppContext } from "./UserContext";

/**
 * Component khởi tạo thông tin User trước khi lưu vào context
 * @returns 
 */
const WrappedUserComponent = () => {
  // Customize hook gọi tới hook useContext
  const userContext = useAppContext();

  const [username, setUsername] = useState(userContext.userAccount ?? '');
  const [password, setPassword] = useState(userContext.password ?? '');
  const [email, setEmail] = useState(userContext.email ?? '');
  const [firstName, setFirstName] = useState(userContext.firstName ?? '');
  const [lastName, setLastName] = useState(userContext.lastName ?? '');

  const handleClickSave = () => {
    const newUserInfo: UserInfo = {
      userAccount: username,
      password: password,
      email: email,
      firstName: firstName,
      lastName: lastName,
    }
    // Sử dụng function để cập nhật thông tin user mới
    // Sử dụng tính chất spread operator ở đây để tạo đối tượng user mới trước khi gọi setUser
    // Nguyên nhân: Thông tin user có thể gồm nhiều hạng mục khác trên các màn hình khác nữa. Cách tạo này giúp rút gọn source code
    if (userContext.setUser)
      userContext.setUser({...userContext, ...newUserInfo});

    alert('Update thành công!')
  }


  return (
    <div className="init">
      <div className="row-item">
        <input id="username" type="text" value={username} onChange={(e) => setUsername(e.currentTarget.value)} placeholder="abc..."/>
        <label htmlFor="username">Username: </label>
      </div>
      <div className="row-item">
        <input id="password" type="password" value={password} onChange={(e) => setPassword(e.currentTarget.value)} placeholder="********"/>
        <label htmlFor="password">Password: </label>
      </div>
      <div className="row-item">
        <input id="email" type="email" value={email} onChange={(e) => setEmail(e.currentTarget.value)} placeholder="abc@123"/>
        <label htmlFor="email">Email: </label>
      </div>
      <div className="row-item">
        <input id="firstname" type="text" value={firstName} onChange={(e) => setFirstName(e.currentTarget.value)} placeholder="abc..."/>
        <label htmlFor="firstname">Tên: </label>
      </div>
      <div className="row-item">
        <input id="lastname" type="text" value={lastName} onChange={(e) => setLastName(e.currentTarget.value)} placeholder="abc..."/>
        <label htmlFor="lastname">Họ: </label>
      </div>
      <button className="save-button" onClick={() => handleClickSave()}>Lưu thông tin</button>
    </div>
  )
}

export default WrappedUserComponent;