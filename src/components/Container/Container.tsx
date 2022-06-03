import React from 'react';
import styles from './style.module.scss';
import cn from 'classnames'

const Container = ({notMt, sx, children}: React.PropsWithChildren<{notMt?: boolean, sx?: React.CSSProperties}>) => {
  return (
    <div className={cn(styles.container, {[styles.mt]: !notMt})} style={sx}>
      {children}
    </div>
  );
};

export default Container;
