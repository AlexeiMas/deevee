import { AnyAction } from 'redux';

import { FORM_PAGE_TYPES } from '../actions/formPage/FormPage.types';

export interface IFormInfoData {
  status: string;
  questions: {
    id: number;
    type: string;
    contest_id: number;
    attributes: null;
    order: number;
    options: null;
    created_at: Date;
    updated_at: Date;
    deleted_at: null;
    label: string;
    label_about: string | null;
    label_specializations: string | null;
    label_city: string | null;
    required: number;
    editable: boolean;
  }[],
  user_info: null;
  bot: null;
  base_question_types: string[];
  is_completed: boolean;
}


export interface IFormPageState {
  postFormsData: string | null;
  postFormError: string | null;
  postFormLoading: boolean;
  getFormInfoData: IFormInfoData | null;
  getFormInfoError: string | null;
  getFormInfoLoading: boolean;
}

const initialState: IFormPageState = {
  postFormsData: null,
  postFormError: null,
  postFormLoading: false,
  getFormInfoData: null,
  getFormInfoError: null,
  getFormInfoLoading: false,
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


    case FORM_PAGE_TYPES.GET_FORM_INFO_REQUEST: {
      return {
        ...state,
        getFormInfoLoading: true,
      };
    }
    case FORM_PAGE_TYPES.GET_FORM_INFO_SUCCESS: {
      return {
        ...state,
        getFormInfoData: action.payload.status,
        getFormInfoError: null,
        getFormInfoLoading: false,
      };
    }
    case FORM_PAGE_TYPES.GET_FORM_INFO_FAIL: {
      return {
        ...state,
        getFormInfoError: action.error,
        getFormInfoLoading: false,
      };
    }
    default:
      return state;
  }
};
