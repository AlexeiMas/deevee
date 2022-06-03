import { AnyAction } from 'redux';

import { LEADERBOARD_PAGE_TYPES } from '../actions/leaderboardPage/leaderboardPage.types';

export interface ILeaderboardItem {
  id: number;
  name: string;
  team_id: number | null;
  score: number;
  state_card: string;
  link: string;
  place: number | null;
  time: string;
  updated_at: Date;
  page_comments: number;
}


export interface ILeaderboardPageState {
  getLeaderboardItemsData: ILeaderboardItem[] | null;
  getLeaderboardItemsError: string | null;
  getLeaderboardItemsLoading: boolean;
  search: string;
  pagesCount: number;
  currentPage: number;
}

const initialState: ILeaderboardPageState = {
  getLeaderboardItemsData: null,
  getLeaderboardItemsError: null,
  getLeaderboardItemsLoading: false,
  search: "",
  pagesCount: 1,
  currentPage: 1,
};

export const leaderboardPage = (
  state = initialState,
  action: AnyAction
): ILeaderboardPageState => {
  switch (action.type) {
    case LEADERBOARD_PAGE_TYPES.GET_LEADERBOARD_LIST_REQUEST: {
      return {
        ...state,
        getLeaderboardItemsLoading: true,
      };
    }
    case LEADERBOARD_PAGE_TYPES.GET_LEADERBOARD_LIST_SUCCESS: {
      return {
        ...state,
        getLeaderboardItemsData: action.payload.rating,
        pagesCount: action.payload.pages_count,
        currentPage: action.payload.currentPage,
        getLeaderboardItemsError: null,
        getLeaderboardItemsLoading: false,
      };
    }
    case LEADERBOARD_PAGE_TYPES.GET_LEADERBOARD_LIST_FAIL: {
      return {
        ...state,
        getLeaderboardItemsError: action.error,
        getLeaderboardItemsLoading: false,
      };
    }
    case LEADERBOARD_PAGE_TYPES.SET_SEARCH_SUCCESS: {
      return {
        ...state,
        search: action.payload,
      };
    }
    default:
      return state;
  }
};
