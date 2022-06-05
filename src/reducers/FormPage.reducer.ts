import { AnyAction } from 'redux';

import { FORM_PAGE_TYPES } from '../actions/formPage/FormPage.types';


export interface IFormPageState {
  postFormsData: string | null;
  postFormError: string | null;
  postFormLoading: boolean;
}

const initialState: IFormPageState = {
  postFormsData: null,
  postFormError: null,
  postFormLoading: false,
};

export const formPage = (
  state = initialState,
  action: AnyAction
): IFormPageState => {
  switch (action.type) {
    case FORM_PAGE_TYPES.POST_FORM_REQUEST: {
      return {
        ...state,
        postFormLoading: true,
      };
    }
    case FORM_PAGE_TYPES.POST_FORM_SUCCESS: {
      return {
        ...state,
        postFormsData: action.payload.status,
        postFormError: null,
        postFormLoading: false,
      };
    }
    case FORM_PAGE_TYPES.POST_FORM_FAIL: {
      return {
        ...state,
        postFormError: action.error,
        postFormLoading: false,
      };
    }
    default:
      return state;
  }
};
