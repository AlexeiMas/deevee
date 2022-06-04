import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { publicRoutes, registerRoutes } from './routes';
import HomePage from '../pages/HomePage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {publicRoutes.map(({ path, Component }) =>
          <Route key={path} path={path} element={<Component />} />,
        )}
        {registerRoutes.map(({ path, Component }) =>
          <Route key={path} path={path} element={<Component />} />,
        )}
        <Route path={'*'} element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
