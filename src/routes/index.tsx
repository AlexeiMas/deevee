import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import {publicRoutes} from "./routes"
import HomePage from "../pages/HomePage"
import MainLayout from "../layouts/MainLayout"

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout/>}>
          {publicRoutes.map(({path, Component}) =>
            <Route key={path} path={path} element={<Component/>}/>
          )}
        </Route>
        <Route path={'*'} element={<HomePage/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
