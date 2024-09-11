import React, { ReactNode, useState, useEffect } from 'react';
import UserContext, { UserInfo, useAppContext, initialUser }  from './UserContext';


// Provider component để cung cấp state cho toàn bộ ứng dụng
const UserProvider: React.FC<{ children: ReactNode, userInfo?: UserInfo }> = ({ children, userInfo }) => {
  const userContext = useAppContext();
  // Khi khởi tạo: lưu trữ giá trị hiện tại được truyền từ Component cha vào tham số userInitial - user khởi tạo
  const [userInitial, setUserInitial] = useState(userInfo ?? initialUser);

  // Thay đổi userInitial theo giá trị context được thiết lập (xử lý side effect)
  useEffect(() => {
		if (userContext) {
		  setUserInitial(userContext);
		}
  }, [userContext])

  /**
   * Function này cập nhật dữ liệu mới dành cho context, dựa theo thông tin user mới cần cập nhật
   * Sử dụng function này để cập nhật context thay vì cập nhật giá trị một cách trực tiếp
   * @param newUserInfo thông tin user mới với các thông tin user cần update vào context
   */
  const saveContext = (newUserInfo: UserInfo) => {
		setUserInitial(newUserInfo);
  }

  return (
		<UserContext.Provider value={{...userInitial, setUser: saveContext}}>
		  {children}
		</UserContext.Provider>
  );
};

export { UserProvider as AppProvider, useAppContext };
