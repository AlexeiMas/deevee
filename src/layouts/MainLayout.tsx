import React from 'react';
import {Outlet, useLocation} from 'react-router-dom';
import Header from '../components/Header/Header';

const MainLayout = () => {
  return (
    <>
      <Header/>
      <Outlet/>
    </>
  );
};

export default MainLayout;
