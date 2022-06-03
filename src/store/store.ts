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
import { IRubricPageState } from '../reducers/RubricPage.reducer';
import { IAppState } from '../reducers/App.reducer';

export interface IRootState {
  app: IAppState;
  modal: IModalState;
  leaderboardPage: ILeaderboardPageState;
  user: IUserState;
  rubricPage: IRubricPageState;
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
