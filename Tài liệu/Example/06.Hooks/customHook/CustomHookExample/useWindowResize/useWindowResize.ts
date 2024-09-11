import { useState, useEffect } from 'react';

interface WindowSize {
  width: number;
  height: number;
}

const useWindowResize = () => {
  // State để lưu trữ kích thước cửa sổ
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    // Hàm xử lý khi cửa sổ thay đổi kích thước
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Đăng ký sự kiện resize
    window.addEventListener('resize', handleResize);

    // Cleanup để gỡ bỏ sự kiện khi component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return windowSize;
};

export default useWindowResize;
