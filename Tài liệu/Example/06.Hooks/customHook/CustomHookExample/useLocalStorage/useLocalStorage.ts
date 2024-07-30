import { useState, useEffect } from 'react';

// Định nghĩa kiểu cho hook useLocalStorage
// T ở đây là kiểu dữ liệu dành cho đối tượng được lưu trong local storage
type UseLocalStorageReturn<T> = [T, (value: T) => void, () => void];

function useLocalStorage<T>(key: string, initialValue: T): UseLocalStorageReturn<T> {
  // Sử dụng useState để quản lý state
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Lấy giá trị từ localStorage
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // useEffect để đồng bộ hóa state với localStorage
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);

  // Hàm để cập nhật giá trị trong localStorage
  const setValue = (value: T) => {
    try {
      // Lưu giá trị mới vào state
      setStoredValue(value);
      // Lưu giá trị mới vào localStorage
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  // Hàm để xóa giá trị khỏi localStorage
  const removeValue = () => {
    try {
      // Xóa giá trị khỏi state
      setStoredValue(initialValue);
      // Xóa giá trị khỏi localStorage
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue, removeValue];
}

export default useLocalStorage;
