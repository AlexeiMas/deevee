import React from 'react';
import styles from './style.module.scss';
import { useNavigate } from 'react-router-dom';

const ClosePageHeader = ({backTo}: React.PropsWithChildren<{backTo: string}>) => {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <div className={styles.closeBtn} onClick={() => navigate(backTo)}>
        <img src='/assets/icons/x.svg' alt='Close' />
      </div>
    </div>
  );
};

export default ClosePageHeader;
