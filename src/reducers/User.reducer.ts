import { AnyAction } from 'redux';
import { USER_TYPES } from '../actions/user/User.types';

export interface IUserData {
  email: string;
  name: string;
}

export interface IContest {
  id: number;
  slug: string | null;
  name: string;
  image_url: string;
  available_task_types: any;
  pivot: any;
}

export interface IUserState {
  token: string | null;
  data: IUserData | null;
  getContestsError: string | null;
  getContestsData: IContest[] | null;
  getContestsLoading: boolean;
}

export const userState: IUserState = {
  token: null,
  data: null,
  getContestsLoading: false,
  getContestsData: null,
  getContestsError: null,
};

const user = (state = userState, action: AnyAction): IUserState => {
  switch (action.type) {
    case USER_TYPES.SET_USER_DATA:
      return {
        ...state,
        data: action.payload,
      };
    case USER_TYPES.SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case USER_TYPES.GET_CONTESTS_REQUEST:
      return {
        ...state,
        getContestsLoading: true,
        getContestsError: null,
      };
    case USER_TYPES.GET_CONTESTS_SUCCESS:
      return {
        ...state,
        getContestsLoading: false,
        getContestsData: action.payload,
        getContestsError: null,
      };
    case USER_TYPES.GET_CONTESTS_FAIL:
      return {
        ...state,
        getContestsLoading: false,
        getContestsError: action.error,
      };
    default:
      return state;
  }
};

export { user };
