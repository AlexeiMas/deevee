import React, { useState, useEffect } from 'react';
import styles from './style.module.scss';
import { SearchInput } from '../../components/Inputs';
import Table from '../../components/Table/Table';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import CascadeImg from '../../components/CascadeImg/CascadeImg';
import { ILeaderboardItem } from '../../reducers/LeaderboardPage.reducer';
import { Paginator } from '../../components/Paginator';
import { Helmet } from "react-helmet-async";

interface LeaderboardPageProps {
  getRatingItems: (page: number, search?: string, take?:number) => any;
  getLeaderboardItemsData: ILeaderboardItem[] | null;
  getLeaderboardItemsLoading: boolean;
  currentPage: number;
  pagesCount: number;
}

export const WideLeaderboardPage: React.FC<LeaderboardPageProps> = ({
  getRatingItems,
  getLeaderboardItemsData,
  getLeaderboardItemsLoading,
  currentPage,
  pagesCount,
}: LeaderboardPageProps) => {

  const [search, setSearch] = useState("");

  useEffect(() => {
    getRatingItems(1, search,15);
  }, [getRatingItems]);

  return (
    <MainLayout areRamens={false} wide={true} verticalAlign={'flex-start'}>
      <Helmet>
        <title>Leaderboard - Dee Vee's Ramen Run</title>
      </Helmet>
      <div className={styles.pageWrapper}>
        <h1>Leaderboard</h1>
        <CascadeImg />
        <SearchInput setSearch={setSearch} search={search} />
        {!getLeaderboardItemsLoading && getLeaderboardItemsData ?
          <Table wide={true} items={getLeaderboardItemsData} /> : ""}
        <Paginator pagesCount={pagesCount} currentPage={currentPage} search={search} />
      </div>
    </MainLayout>
  );
};
