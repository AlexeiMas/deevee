import React from 'react';
import styles from './style.module.scss';
import cn from 'classnames'

const Container = ({notMt, sx, children,wide=false}: React.PropsWithChildren<{notMt?: boolean, sx?: React.CSSProperties,wide?:boolean}>) => {
  return (
    <div className={cn(styles.container, {[styles.mt]: !notMt},{[styles.isWide]: wide})} style={sx}>
      {children}
    </div>
  );
};

export default Container;
