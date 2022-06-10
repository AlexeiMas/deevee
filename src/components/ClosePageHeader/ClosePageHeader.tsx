import React from 'react';
import styles from './style.module.scss';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames'

const ClosePageHeader = ({backTo, close, wide = false}: React.PropsWithChildren<{backTo: string, close?: () => void, wide?: boolean}>) => {
  const navigate = useNavigate();

  return (
    <div className={cn(styles.wrapper, {[styles.isWide]: wide})}>
      <div className={styles.closeBtn} onClick={() => close ? close() : navigate(backTo)}>
        <img src='/assets/icons/x.svg' alt='Close' />
      </div>
    </div>
  );
};

export default ClosePageHeader;
