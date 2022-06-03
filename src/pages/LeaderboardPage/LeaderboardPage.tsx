import React from 'react';
import styles from './style.module.scss';
import SearchInput from '../../components/Inputs/SearchInput';
import Table from '../../components/Table/Table';
import { PATH_HOME } from '../../utils/consts';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import CascadeImg from '../../components/CascadeImg/CascadeImg';

const LeaderboardPage = () => {

  return (
    <MainLayout areRamens={false} headerBtnTo={PATH_HOME}>
      <div className={styles.pageWrapper}>
        <h1>Leaderboard</h1>
        <CascadeImg/>
        <SearchInput/>
        <Table/>
      </div>
    </MainLayout>
  );
};

export default LeaderboardPage;
