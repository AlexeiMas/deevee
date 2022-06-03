import * as routes from '../utils/consts'
import HomePage from "../pages/HomePage/HomePage"
import RulesPage from '../pages/RulesPage/RulesPage';
import LeaderboardPage from '../pages/LeaderboardPage/LeaderboardPage';
import GamePage from '../pages/GamePage/GamePage';
import React from 'react';
import BowlsPage from '../pages/BowlsPage/BowlsPage';
import FormPage from '../pages/FormPage/FormPage';

export type TRoutes = {
  path: string
  Component: ({children}: React.PropsWithChildren<any>) => JSX.Element
}

export const publicRoutes: TRoutes[] = [
  {
    path: routes.PATH_HOME,
    Component: HomePage
  },
  {
    path: routes.PATH_RULES,
    Component: RulesPage
  },
  {
    path: routes.PATH_LEADERBOARD,
    Component: LeaderboardPage
  }
]

export const registerRoutes: TRoutes[] = [
  {
    path: routes.PATH_GAME,
    Component: GamePage
  },
  {
    path: routes.PATH_BOWLS,
    Component: BowlsPage
  },
  {
    path: routes.PATH_FORM,
    Component: FormPage
  }
]
