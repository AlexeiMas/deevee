import React, { useState } from 'react';
import styles from './style.module.scss';
import Button from '../../components/Button/Button';
import Container from '../../components/Container/Container';
import * as routes from '../../utils/consts';
import Modal from '../../components/Modal/Modal';
import AuthorizationForm from '../../components/AuthorizationForm/AuthorizationForm';

const HomePage = () => {
  const [isModal, setIsModal] = useState<boolean>(false)

  return (
    <div className={styles.homeWrapper}>
      <Container notMt>
        <div className={styles.owlWrapper}>
          <img src='/assets/icons/owlNeutral1.png' alt='Owl' />
        </div>
        <img src='/assets/icons/balloonLg.svg' alt='Balloon Lg' className={styles.balloonLg} />
        <img src='/assets/icons/balloonMd.svg' alt='Balloon Md' className={styles.balloonMd} />
        <div className={styles.btnGroup}>
          <Button variant={"primary"} onClick={() => setIsModal(true)}>Play</Button>
          <Button variant={"secondary"}>Description</Button>
          <Button variant={"secondary"} href={routes.PATH_LEADERBOARD}>Leaderboard</Button>
        </div>
        <Modal show={isModal} setShow={setIsModal}>
          <AuthorizationForm/>
        </Modal>
      </Container>
    </div>
  );
};

export default HomePage;
