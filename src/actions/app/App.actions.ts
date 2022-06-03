import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { APP_TYPES } from './App.types';
import clientApi from '../../helpers/clientApi';


export const getContestInfo = (contest_id: number): ThunkAction<void, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    try {
      dispatch({
        type: APP_TYPES.GET_CONTEST_INFO_REQUEST,
      });
      const response: any = await clientApi.get(`contests/${contest_id}`);
      dispatch({
        type: APP_TYPES.GET_CONTEST_INFO_SUCCESS,
        payload: response.data.contest,
      });

      return response.data.contest;
    } catch (e: any) {
      dispatch({
        type: APP_TYPES.GET_CONTEST_INFO_FAIL,
        error: 'Something went wrong',
      });
    }
  };