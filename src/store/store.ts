import {
  applyMiddleware,
  compose,
  createStore,
  Middleware,
  Store,
} from 'redux';
import thunk from 'redux-thunk';
import createRootReducer from '../reducers';
import { IModalState } from '../reducers/Modal.reducer';
import { ILeaderboardPageState } from '../reducers/LeaderboardPage.reducer';
import { IUserState } from '../reducers/User.reducer';
import { IGamePageState } from '../reducers/GamePage.reducer';
import { IAppState } from '../reducers/App.reducer';
import { IFormPageState } from '../reducers/FormPage.reducer';

export interface IRootState {
  app: IAppState;
  modal: IModalState;
  leaderboardPage: ILeaderboardPageState;
  user: IUserState;
  gamePage: IGamePageState;
  formPage: IFormPageState;
}

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware: Middleware[] = [thunk];

const store: Store = createStore(createRootReducer(), composeEnhancers(applyMiddleware(...middleware)));

export default store;
