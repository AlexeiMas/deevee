import React from 'react';
import styles from './style.module.scss'

const Divider: React.FC<{text: string}> = ({text}) => {
  return (
    <div className={styles.dividerWrapper}>
      <div/>
      <div className={styles.text}>{text}</div>
      <div/>
    </div>
  );
};

export default Divider;
