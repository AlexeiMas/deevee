import React from 'react';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import styles from './style.module.scss';
import { PATH_LEADERBOARD, PATH_HOME } from '../../utils/consts';
import CascadeImg from '../../components/CascadeImg/CascadeImg';
import Button from '../../components/Button/Button';
import FooterSocials from '../../components/FooterSocials/FooterSocials';

const BowlsPage: React.FC<{ representation?: 'PAGE' | 'DIALOG', close: React.Dispatch<boolean> }> = ({ representation = 'DIALOG', close }) => {

  return (
    <MainLayout verticalAlign={"flex-start"} headerBtnTo={PATH_HOME} sx={representation === 'DIALOG' ? { position: 'fixed', top: 0, right: 0, bottom: 0, left: 0 } : false}>
      <div className={styles.pageWrapper}>
        <h1>Bowls</h1>
        <CascadeImg />
        <h2>16/16</h2>
        <img src='/assets/icons/owlGroup.png' alt='Owl group' />
        <p className={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla dignissim, sapien at iaculis tempor, mauris dui vehicula felis, vitae vulputate tortor nulla eu justo.</p>
        <Button variant={"secondary"} href={PATH_LEADERBOARD} sx={{ fontSize: '24px', marginTop: '1rem' }}>Leaderboard</Button>
        <FooterSocials fixedBottom={false} />
      </div>
    </MainLayout>
  );
};

export default BowlsPage;
