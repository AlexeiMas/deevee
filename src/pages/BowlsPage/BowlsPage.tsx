import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import styles from './style.module.scss';
import { PATH_LEADERBOARD, PATH_HOME } from '../../utils/consts';
import CascadeImg from '../../components/CascadeImg/CascadeImg';
import Button from '../../components/Button/Button';
import FooterSocials from '../../components/FooterSocials/FooterSocials';
import { INomination } from '../../reducers/GamePage.reducer';
import { PATH_GAME } from '../../helpers/urlList';

interface IBowlsPage {
  representation: string;
  getNominationsData: INomination[] | null;
  close: React.Dispatch<boolean>;
}

const BowlsPage: React.FC<IBowlsPage> = ({
  getNominationsData,
  representation = 'PAGE',
}) => {

  const [score, setScore] = useState<number>(0);
  const navigate = useNavigate();

  const getScore = (nominationsData: INomination[] | null) => {
    return nominationsData ?
      nominationsData.reduce((score, nomination) => score + nomination.right_solutions_count, 0) : 0;
  }

  useEffect(() => {
    if (getNominationsData) {
      setScore(getScore(getNominationsData));
      localStorage.setItem('finished_game', 'true')
    } else {
      navigate(PATH_GAME)
    }
  }, [getNominationsData]);

  return (
    <MainLayout verticalAlign={"flex-start"} headerBtnTo={PATH_GAME} sx={representation === 'DIALOG' ? { position: 'fixed', top: 0, right: 0, bottom: 0, left: 0 } : false}>
      <div className={styles.pageWrapper}>
        <h1>Bowls</h1>
        <CascadeImg />
        <h2>{`${score}/16`}</h2>
        <img src='/assets/icons/owlGroup.png' alt='Owl group' />
        <p className={styles.description}>Congratulations!  You’ve helped feed DeeVee for the day and learned about Iterative tools in the process! Enjoy the rest of MLOps World and come by our booth to learn more!</p>
        <Button variant={"secondary"} href={PATH_LEADERBOARD} sx={{ fontSize: '24px', marginTop: '1rem' }}>Leaderboard</Button>
        <FooterSocials fixedBottom={false} />
      </div>
    </MainLayout>
  );
};

export default BowlsPage;
