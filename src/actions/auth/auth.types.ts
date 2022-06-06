import { RestAPI } from 'pkg/tulula/auth/api';

export const AUTH_TYPES = {
  SIGN_IN_REQUEST: 'AUTH_TYPES.SIGN_IN_REQUEST',
  SIGN_IN_SUCCESS: 'AUTH_TYPES.SIGN_IN_SUCCESS',
  SIGN_IN_FAILURE: 'AUTH_TYPES.SIGN_IN_FAILURE',
  SIGN_IN_CLEAN_UP: 'AUTH_TYPES.SIGN_IN_CLEAN_UP', // remove errors and other data from the storage

  SIGN_UP_REQUEST: 'AUTH_TYPES.SIGN_UP_REQUEST',
  SIGN_UP_SUCCESS: 'AUTH_TYPES.SIGN_UP_SUCCESS',
  SIGN_UP_FAILURE: 'AUTH_TYPES.SIGN_UP_FAILURE',
  SIGN_UP_CLEAN_UP: 'AUTH_TYPES.SIGN_UP_CLEAN_UP', // remove errors and other data from the storage
};

export type signInWithEmailFunc = (rest: RestAPI, email: string, password: string, rememberMe: boolean) => void;

export type signUpWithEmailFunc = (
  rest: RestAPI,
  email: string,
  password: string,
  name: string,
  teamID?: string
) => void;
