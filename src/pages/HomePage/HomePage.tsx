import React from 'react';
import styles from './style.module.scss'
import Button from '../../components/Button/Button';
import Container from '../../components/Container/Container';
import * as routes from '../../utils/consts'

const HomePage = () => {

  return (
    <div className={styles.homeWrapper}>
      <Container>
        <div className={styles.owlWrapper}>
          <img src='/assets/icons/owlNeutral1.png' alt='Owl' />
        </div>
        <img src='/assets/icons/balloonLg.svg' alt='Balloon Lg' className={styles.balloonLg} />
        <img src='/assets/icons/balloonMd.svg' alt='Balloon Md' className={styles.balloonMd} />
        <div className={styles.btnGroup}>
          <Button variant={"primary"} href={routes.PATH_GAME}>Play</Button>
          <Button variant={"secondary"}>Description</Button>
          <Button variant={"secondary"} href={routes.PATH_LEADERBOARD}>Leaderboard</Button>
        </div>
      </Container>
    </div>
  );
};

export default HomePage;
