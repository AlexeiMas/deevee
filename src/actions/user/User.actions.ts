import { IUserData } from '../../reducers/User.reducer';
import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import clientApi from '../../helpers/clientApi';
import { USER_TYPES } from './User.types';

export const setToken =
  (token: string): ThunkAction<void, {}, {}, AnyAction> =>
  (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    try {
      localStorage.setItem('auth_token', token);
      dispatch({
        type: USER_TYPES.SET_TOKEN,
        payload: { token },
      });
    } catch (e) {
      dispatch({
        type: USER_TYPES.SET_TOKEN_FAIL,
        error: 'Something went wrong',
      });
    }
  };

export const setUserData = (data: IUserData) => (dispatch: any) => {
  dispatch({
    type: USER_TYPES.SET_USER_DATA,
    payload: data,
  });
};

export const getСontests =
  (): ThunkAction<void, {}, {}, AnyAction> => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    try {
      dispatch({
        type: USER_TYPES.GET_CONTESTS_REQUEST,
      });
      const response: any = await clientApi.get(`my-contests`);
      dispatch({
        type: USER_TYPES.GET_CONTESTS_SUCCESS,
        payload: response.data.contests,
      });

      return response.data;
    } catch (e: any) {
      dispatch({
        type: USER_TYPES.GET_CONTESTS_FAIL,
        error: 'Something went wrong',
      });
    }
  };
