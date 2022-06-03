import React, { useState } from 'react';
import styles from './style.module.scss';
import Button from '../../components/Button/Button';
import * as routes from '../../utils/consts';
import Modal from '../../components/Modal/Modal';
import AuthorizationForm from '../../components/AuthorizationForm/AuthorizationForm';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import FooterSocials from '../../components/FooterSocials/FooterSocials';

const HomePage = () => {
  const [isModal, setIsModal] = useState<boolean>(false);

  return (
    <MainLayout notContainerMt>
      <div className={styles.logoBlockWrapper}>
        <div className={styles.mainLogoWrapper}>
          <img src='/assets/icons/owlHome.png' alt='Owl' />
          <img className={styles.subLogo} src='/assets/icons/RamenHome.png' alt='RamenLogo1' />
        </div>
        <div className={styles.subMainWrapper}>
          <img src='/assets/icons/RamenHome2.png' alt='RamenLogo2' />
          <h2>DeeVee’s</h2>
          <h3>Ramen Run</h3>
        </div>
      </div>
      <div className={styles.btnGroup}>
        <Button variant={'primary'} onClick={() => setIsModal(true)}>Play</Button>
        <Button variant={'secondary'} sx={{ fontSize: 24 }} href={routes.PATH_RULES}>Rules</Button>
        <Button variant={'secondary'} sx={{ fontSize: 24 }} href={routes.PATH_LEADERBOARD}>Leaderboard</Button>
      </div>
      <Modal show={isModal} setShow={setIsModal}>
        <AuthorizationForm />
      </Modal>
      <FooterSocials/>
    </MainLayout>
  );
};

export default HomePage;
