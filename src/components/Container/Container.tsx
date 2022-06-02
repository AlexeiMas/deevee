import React from 'react';
import styles from './style.module.scss';
import cn from 'classnames'

const Container = ({notMt, children}: React.PropsWithChildren<{notMt?: boolean}>) => {
  return (
    <div className={cn(styles.container, {[styles.mt]: !notMt})}>
      {children}
    </div>
  );
};

export default Container;
