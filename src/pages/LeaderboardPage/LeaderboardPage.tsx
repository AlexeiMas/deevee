import React from 'react';
import styles from './style.module.scss';
import SearchInput from '../../components/Inputs/SearchInput';
import Container from '../../components/Container/Container';
import Table from '../../components/Table/Table';

const LeaderboardPage = () => {
  return (
    <div className={styles.pageWrapper}>
      <Container>
        <h1>Leaderboard</h1>
        <SearchInput/>
        <Table/>
      </Container>
    </div>
  );
};

export default LeaderboardPage;
