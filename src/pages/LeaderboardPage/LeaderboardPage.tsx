import React, { useState, useEffect } from 'react';
import styles from './style.module.scss';
import SearchInput from '../../components/Inputs/SearchInput';
import Table from '../../components/Table/Table';
import { PATH_HOME } from '../../utils/consts';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import CascadeImg from '../../components/CascadeImg/CascadeImg';
import { ILeaderboardItem } from '../../reducers/LeaderboardPage.reducer';

interface LeaderboardPageProps {
  getRatingItems: (page: number, search?: string) => any;
  getLeaderboardItemsData: ILeaderboardItem[] | null;
  getLeaderboardItemsLoading: boolean;
  currentPage: number;
  pagesCount: number;
}

export const LeaderboardPage: React.FC<LeaderboardPageProps> = ({
  getRatingItems,
  getLeaderboardItemsData,
  getLeaderboardItemsLoading,
  currentPage,
  pagesCount,
}: LeaderboardPageProps) => {

  const [search, setSearch] = useState("");

  useEffect(() => {
    getRatingItems(1, search);
  }, [getRatingItems]);

  return (
    <MainLayout areRamens={false} headerBtnTo={PATH_HOME} verticalAlign={'flex-start'}>
      <div className={styles.pageWrapper}>
        <h1>Leaderboard</h1>
        <CascadeImg />
        <SearchInput />
        {!getLeaderboardItemsLoading && getLeaderboardItemsData ?
          <Table items={getLeaderboardItemsData} /> : ""}
      </div>
    </MainLayout>
  );
};
