import * as routes from '../utils/consts';
import HomePage from '../pages/HomePage';
import RulesPage from '../pages/RulesPage/RulesPage';
import LeaderboardPage from '../pages/LeaderboardPage';
import GamePage from '../pages/GamePage';
import BowlsPage from '../pages/BowlsPage';
import FormPage from '../pages/FormPage';
import WideLeaderboardPage from "../pages/WideLeaderboardPage";

export type TRoutes = {
  path: string
  Component: any
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
  },
  {
    path: routes.PATH_WIDE_LEADERBOARD,
    Component: WideLeaderboardPage
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
