import { combineReducers } from 'redux';
import { modal } from './Modal.reducer';
import { auth } from './Auth.reducer';
import { leaderboardPage } from './LeaderboardPage.reducer';
import { user } from './User.reducer';
import { gamePage } from './GamePage.reducer';
import { app } from './App.reducer';
import { formPage } from './FormPage.reducer';

const createRootReducer = (): any =>
  combineReducers({
    app,
    modal,
    leaderboardPage,
    user,
    gamePage,
    formPage,
    auth,
  });

export default createRootReducer;
