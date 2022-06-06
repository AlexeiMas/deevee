import { setToken, setUserData } from 'actions/user/User.actions';
import { RestAPI, Status } from 'pkg/tulula/auth/api';
import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import clientApi from '../../helpers/clientApi';
import { AUTH_TYPES, signInWithEmailFunc, signUpWithEmailFunc } from './auth.types';

export const signInWithEmail: signInWithEmailFunc =
  (rest: RestAPI, email: string, password: string, rememberMe: boolean): ThunkAction<void, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    try {
      dispatch({
        type: AUTH_TYPES.SIGN_IN_REQUEST,
      });
      const response = await rest.signIn({ email, password, rememberMe });
      if (response.status === Status.Success) {
        const tokenResponse = await clientApi.post(`auth/login-by-cookie`, {}, { withCredentials: true });
        if (tokenResponse.status === 200 && tokenResponse.data) {
          if (tokenResponse.data.token) {
            dispatch(setToken(tokenResponse.data.token));
          }
          if (tokenResponse.data.user) {
            dispatch(setUserData(tokenResponse.data.user));
          }
        }
        dispatch({
          type: AUTH_TYPES.SIGN_IN_SUCCESS,
          payload: { ...response },
        });
      } else {
        dispatch({
          type: AUTH_TYPES.SIGN_IN_FAILURE,
          payload: { ...response },
        });
      }
    } catch (e: any) {
      dispatch({
        type: AUTH_TYPES.SIGN_IN_FAILURE,
        error: 'Something went wrong',
      });
    }
  };

export const signUpWithEmail: signUpWithEmailFunc =
  (
    rest: RestAPI,
    email: string,
    password: string,
    name: string,
    teamID?: string
  ): ThunkAction<void, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    const subscribe = '0'; // don't subscribe users in games to our news
    try {
      dispatch({
        type: AUTH_TYPES.SIGN_UP_REQUEST,
      });
      const response = await rest.signUp({ email, password, name, subscribe, teamID });
      if (response.status === Status.Success) {
        const tokenResponse = await clientApi.post(`auth/login-by-cookie`, {}, { withCredentials: true });
        if (tokenResponse.status === 200 && tokenResponse.data) {
          if (tokenResponse.data.token) {
            dispatch(setToken(tokenResponse.data.token));
          }
          if (tokenResponse.data.user) {
            dispatch(setUserData(tokenResponse.data.user));
          }
        }
        dispatch({
          type: AUTH_TYPES.SIGN_UP_SUCCESS,
          payload: { ...response },
        });
      } else {
        dispatch({
          type: AUTH_TYPES.SIGN_UP_FAILURE,
          payload: { ...response },
        });
      }
    } catch (e: any) {
      dispatch({
        type: AUTH_TYPES.SIGN_UP_FAILURE,
        error: 'Something went wrong',
      });
    }
  };

export const signInWithEmailCleanUp = () => (dispatch: any) => {
  dispatch({
    type: AUTH_TYPES.SIGN_IN_CLEAN_UP,
  });
};

export const signUpWithEmailCleanUp = () => (dispatch: any) => {
  dispatch({
    type: AUTH_TYPES.SIGN_UP_CLEAN_UP,
  });
};
