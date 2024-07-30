import React, { forwardRef } from 'react';

interface MyInputProps {
  placeholder?: string;
}

/**
 * Component custom, dành cho trường hợp là function component nhưng không muốn control nó (Uncontrolled component)
 * Khi đó cần quản lý qua ref => sử dụng forward ref để reference sang control này
 */
const CustomInput: React.ForwardRefExoticComponent<MyInputProps & React.RefAttributes<HTMLInputElement>> = forwardRef<HTMLInputElement, MyInputProps>(({ placeholder }, ref) => {
  return <input ref={ref} placeholder={placeholder} />;
});

export default CustomInput;
