import * as routes from '../utils/consts'
import HomePage from "../pages/HomePage"
import OurStoryPage from '../pages/OurStoryPage';
import RulesPage from '../pages/RulesPage';
import LeaderboardPage from '../pages/LeaderboardPage';
import GamePage from '../pages/GamePage/GamePage';

export type TRoutes = {
  path: string
  Component: () => JSX.Element
}

export const publicRoutes: TRoutes[] = [
  {
    path: routes.PATH_HOME,
    Component: HomePage
  },
  {
    path: routes.PATH_OUR_STORY,
    Component: OurStoryPage
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
    path: routes.PATH_GAME,
    Component: GamePage
  }
]
