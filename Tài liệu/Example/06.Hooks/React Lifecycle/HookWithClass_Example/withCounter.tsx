import React from 'react';
import useCounter from './useCounter';

/**
 * HOCs này nhận một tham số là WrappedComponent, thực hiện lấy thông tin từ custom hook và trả về WrappedComponent với thông tin gá trị lấy trong hook ra
 * @param WrappedComponent 
 * @returns 
 */
const withCounter = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  return (props: P) => {
    const counter = useCounter(0);
    return <WrappedComponent {...props} counter={counter} />;
  };
};

export default withCounter;
