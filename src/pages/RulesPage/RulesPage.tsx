import React, { useEffect, useState } from 'react';
import styles from './style.module.scss';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import { PATH_GAME, PATH_HOME } from '../../utils/consts';
import Button from '../../components/Button/Button';
import { Helmet } from "react-helmet-async";

const RulesPage = () => {
  const [token, setToken] = useState('');

  useEffect(() => {
    const auth_token = localStorage.getItem('auth_token');
    const readRules = localStorage.getItem('read_rules');
    if (!readRules || readRules === 'false') {
      localStorage.setItem('read_rules', 'true');
    }
    auth_token && setToken(auth_token);
  }, []);

  return (
    <MainLayout headerBtnTo={PATH_HOME} verticalAlign={'flex-start'} notContainerMt sx={{ paddingTop: '3.2rem' }}>
      <Helmet>
        <title>Rules - Dee Vee's Ramen Run</title>
      </Helmet>
      <div className={styles.pageWrapper}>
        <h1>Rules</h1>
        <div className={styles.description}>
          <p>Welcome to DeeVee City and Dee Vee’s great Ramen Run!</p>
          <p>Your mission is to make your way to each greyed out building and answer the question there. Answer as many
            questions as you can as quickly as you can to rocket to the top of the leader board! For each correct
            question you will get a bowl of Ramen 🍜. If you get stumped, head over to our booth as ask, or check out
            our docs!</p>
          <p>1st Prize: Apple AirPods Pro</p>
          <p>2nd Prize: $50 Amazon Gift Card</p>
          <p>3rd Prize: $25 Amazon Gift Card</p>
          <p>Game closes to new entries at 1 pm ET on June 10th. Players in the game can play up until 2 pm when we will
            award the prizes to the top three winners at the Iterative booth!</p>
          <p>Good Luck! 🍀</p>
        </div>
        {token && <Button variant={'primary'} sx={{ fontSize: '24px' }} href={PATH_GAME}>Next</Button>}
      </div>
    </MainLayout>
  );
};

export default RulesPage;
