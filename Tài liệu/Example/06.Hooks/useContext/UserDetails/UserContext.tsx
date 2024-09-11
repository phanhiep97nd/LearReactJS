import { createContext, useContext } from "react";

// Định nghĩa state và action
export interface UserInfo {
	userAccount: string
	password: string,
	email: string,
	firstName: string,
	lastName: string,
	setUser?: (newUser: UserInfo) => void,	// function này được sử dụng để cập nhật giá trị cho context
}

export const initialUser: UserInfo = {
	userAccount: '',
	password: '',
	email: '',
	firstName: '',
	lastName: '',
}

const UserContext = createContext<UserInfo>(initialUser);

// Custom hook để sử dụng context dễ dàng hơn
export const useAppContext = () => useContext(UserContext);

export default UserContext;