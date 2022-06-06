import { AUTH_TYPES } from 'actions/auth/auth.types';
import { IErrors } from 'pkg/tulula/auth/api';
import { AnyAction } from 'redux';

export interface IAuthState {
  signUpWithEmailLoading: boolean;
  signInWithEmailLoading: boolean;
  errors: IErrors;
  error?: string;
}

const initialState: IAuthState = {
  signInWithEmailLoading: false,
  signUpWithEmailLoading: false,
  errors: {},
  error: undefined,
};

export const auth = (state = initialState, action: AnyAction): IAuthState => {
  switch (action.type) {
    case AUTH_TYPES.SIGN_IN_REQUEST:
      return {
        ...state,
        signInWithEmailLoading: true,
        errors: {},
        error: undefined,
      };
    case AUTH_TYPES.SIGN_IN_SUCCESS:
      return {
        ...state,
        signInWithEmailLoading: false,
      };
    case AUTH_TYPES.SIGN_IN_FAILURE:
      return {
        ...state,
        signInWithEmailLoading: false,
        ...action.payload,
      };
    case AUTH_TYPES.SIGN_IN_CLEAN_UP:
      return {
        ...state,
        signInWithEmailLoading: false,
        errors: {},
        error: undefined,
      };
    case AUTH_TYPES.SIGN_UP_REQUEST:
      return {
        ...state,
        signUpWithEmailLoading: true,
        errors: {},
        error: undefined,
      };
    case AUTH_TYPES.SIGN_UP_SUCCESS:
      return {
        ...state,
        signUpWithEmailLoading: false,
      };
    case AUTH_TYPES.SIGN_UP_FAILURE:
      return {
        ...state,
        signUpWithEmailLoading: false,
        ...action.payload,
      };
    case AUTH_TYPES.SIGN_UP_CLEAN_UP:
      return {
        ...state,
        signUpWithEmailLoading: false,
        errors: {},
        error: undefined,
      };
    default:
      return state;
  }
};
