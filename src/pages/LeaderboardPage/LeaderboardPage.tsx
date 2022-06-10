import React, { useState, useEffect } from 'react';
import styles from './style.module.scss';
import { SearchInput } from '../../components/Inputs';
import Table from '../../components/Table/Table';
import { PATH_HOME } from '../../utils/consts';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import CascadeImg from '../../components/CascadeImg/CascadeImg';
import { ILeaderboardItem } from '../../reducers/LeaderboardPage.reducer';
import { Paginator } from '../../components/Paginator';
import { Helmet } from "react-helmet-async";
import { useDimensions } from '../../hooks/useDimensions';
import MainLogoBlock from '../../components/MainLogoBlock/MainLogoBlock';

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
  const {width} = useDimensions()

  useEffect(() => {
    getRatingItems(1, search);
  }, [getRatingItems]);

  return (
    <MainLayout areRamens={false} headerBtnTo={PATH_HOME} verticalAlign={'flex-start'} wide={(width > 968)}>
      <Helmet>
        <title>Leaderboard - Dee Vee's Ramen Run</title>
      </Helmet>
      <div className={styles.pageWrapper}>
        {(width > 968) && <MainLogoBlock size={'large'} sx={{maxWidth: '50%'}} />}
        <div className={styles.tableWrapper}>
          <h1>Leaderboard</h1>
          <CascadeImg />
          <SearchInput setSearch={setSearch} search={search} />
          {!getLeaderboardItemsLoading && getLeaderboardItemsData ?
            <Table items={getLeaderboardItemsData} wide={width > 968} /> : ""}
          <Paginator pagesCount={pagesCount} currentPage={currentPage} search={search} />
        </div>
      </div>
    </MainLayout>
  );
};
