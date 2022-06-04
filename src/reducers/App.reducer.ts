import { AnyAction } from 'redux';
import { APP_TYPES } from '../actions/app/App.types';


export interface IContestInfo {
  intervals_count: number;
  nominations: any[];
  slug: string;
  id: number;
  company_id: number;
  description: string | null;
  rules: string | null;
  is_open_to_attach: boolean;
  nomination_limit: number;
  team_moderation: 0;
  team_select_type_participate: number;
  team_limit: number;
  type: string | null;
  redirect_after_form: string | null;
  redirect_after_form_custom_url: string | null;
  team_gathering: number;
  min_team_limit: number;
  start_date: string;
  end_date: string;
  questions_count: number;
  users_count: number;
  sort_rating_by_time: number;
}


export interface IAppState {
  getContestsInfoError: string | null;
  getContestsInfoData: IContestInfo | null;
  getContestsInfoLoading: boolean;
}

export const appState: IAppState = {
  getContestsInfoLoading: false,
  getContestsInfoData: null,
  getContestsInfoError: null
};

const app = (state = appState, action: AnyAction): IAppState => {
  switch (action.type) {
    case APP_TYPES.GET_CONTEST_INFO_REQUEST:
      return {
        ...state,
        getContestsInfoLoading: true,
        getContestsInfoError: null,
      };
    case APP_TYPES.GET_CONTEST_INFO_SUCCESS:
      return {
        ...state,
        getContestsInfoLoading: false,
        getContestsInfoData: action.payload,
        getContestsInfoError: null,
      };
    case APP_TYPES.GET_CONTEST_INFO_FAIL:
      return {
        ...state,
        getContestsInfoLoading: false,
        getContestsInfoError: action.error,
      };
    default:
      return state;
  }
};

export { app };
