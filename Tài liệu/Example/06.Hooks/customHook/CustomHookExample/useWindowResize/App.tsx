import React from 'react';
import useWindowResize from './useWindowResize';
import styles from './App.module.css';

const App: React.FC = () => {
  const { width, height } = useWindowResize();

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Window Resize Hook Example</h1>
      <p className={styles.info}>
        Width: {width}px, Height: {height}px
      </p>
    </div>
  );
};

export default App;
