import React from 'react';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import styles from './style.module.scss';
import { PATH_GAME, PATH_LEADERBOARD } from '../../utils/consts';
import CascadeImg from '../../components/CascadeImg/CascadeImg';
import Button from '../../components/Button/Button';
import FooterSocials from '../../components/FooterSocials/FooterSocials';

const BowlsPage = () => {
  return (
    <MainLayout verticalAlign={'flex-start'} headerBtnTo={PATH_GAME}>
      <div className={styles.pageWrapper}>
        <h1>Bowls</h1>
        <CascadeImg/>
        <h2>16/16</h2>
        <p className={styles.time}>Time</p>
        <h3>2520 sec</h3>
        <p className={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla dignissim, sapien at iaculis tempor, mauris dui vehicula felis, vitae vulputate tortor nulla eu justo.</p>
        <Button variant={"secondary"} href={PATH_LEADERBOARD} sx={{fontSize: '24px', marginTop: '1rem'}}>Leaderboard</Button>
        <FooterSocials fixedBottom={false}/>
      </div>
    </MainLayout>
  );
};

export default BowlsPage;
