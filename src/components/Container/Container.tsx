import React from 'react';
import styles from './style.module.scss'

const Container = ({children}: React.PropsWithChildren<any>) => {
  return (
    <div className={styles.container}>
      {children}
    </div>
  );
};

export default Container;
