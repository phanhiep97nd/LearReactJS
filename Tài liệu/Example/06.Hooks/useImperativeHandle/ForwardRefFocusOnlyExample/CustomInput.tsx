import React, { forwardRef, useImperativeHandle, useRef } from 'react';

interface MyInputProps {
  placeholder?: string;
}

// Định nghĩa các custom method sẽ handle hoạt động của CustomInput
export interface MyInputHandle {
  focus: () => void;
  clear: () => void;
}

const CustomInput = forwardRef<MyInputHandle, MyInputProps>(({ placeholder }, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Sử dụng hook để public các method handle mà Component này cho phép truy cập qua fowardref
  // clear và focus là method custom do người dùng tự định nghĩa, trong đó, focus có mapping đến method tương ứng của DOM API
  // Còn clear thì không có method tương ứng nên người dùng tự định nghĩa hoạt động
  useImperativeHandle(ref, () => {
    return {
      focus: () => {
        if (inputRef.current) {
          inputRef.current.focus()
        }
      },
      clear: () => {
        if (inputRef.current) {
          inputRef.current.value = '';
        }
      }
    } as MyInputHandle
  })

  return <input ref={inputRef} placeholder={placeholder} />;
});

export default CustomInput;
