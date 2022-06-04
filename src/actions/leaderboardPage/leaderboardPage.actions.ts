import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { LEADERBOARD_PAGE_TYPES } from './leaderboardPage.types';
import clientApi from '../../helpers/clientApi';

const CONTEST_ID = process.env.REACT_APP_CONTEST_ID;

export const getRatingItems = (page: number, search?: string): ThunkAction<void, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    if (page < 1) return;
    try {
      dispatch({
        type: LEADERBOARD_PAGE_TYPES.GET_LEADERBOARD_LIST_REQUEST,
      });
      const response: any = await clientApi.get(`contests/${CONTEST_ID}/rating/summary`, {
        params: search ? {
          page,
          search,
        } : {
          page,
        }
      });
      dispatch({
        type: LEADERBOARD_PAGE_TYPES.GET_LEADERBOARD_LIST_SUCCESS,
        payload: { ...response.data, currentPage: page },
      });

      return response.data;
    } catch (e: any) {
      dispatch({
        type: LEADERBOARD_PAGE_TYPES.GET_LEADERBOARD_LIST_FAIL,
        error: 'Something went wrong',
      });
    }
  };

export const setSearch = (search: string): ThunkAction<void, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    try {
      dispatch({
        type: LEADERBOARD_PAGE_TYPES.SET_SEARCH_SUCCESS,
        payload: search,
      });
    } catch (e: any) {
    }
  };
