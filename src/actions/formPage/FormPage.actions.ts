import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { FORM_PAGE_TYPES } from './FormPage.types';
import clientApi from '../../helpers/clientApi';
import { IFormInfoData } from '../../reducers/FormPage.reducer';

const CONTEST_ID = process.env.REACT_APP_CONTEST_ID;

export const sendForm = (
  formData: { answers: { question_id: number, value: string | number }[] },
  onSuccess?: () => void,
): ThunkAction<void, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    try {
      dispatch({
        type: FORM_PAGE_TYPES.POST_FORM_REQUEST,
      });
      const response: any = await clientApi.post(`contests/${CONTEST_ID}/form`, formData);
      dispatch({
        type: FORM_PAGE_TYPES.POST_FORM_SUCCESS,
        payload: response.data,
      });
      if (onSuccess) onSuccess();
    } catch (e: any) {
      dispatch({
        type: FORM_PAGE_TYPES.POST_FORM_FAIL,
        error: 'Something went wrong',
      });
    }
  };

export const getForm = (
  onSuccess?: (data: IFormInfoData) => void,
): ThunkAction<void, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    try {
      dispatch({
        type: FORM_PAGE_TYPES.GET_FORM_INFO_REQUEST,
      });
      const response: any = await clientApi.get(`contests/${CONTEST_ID}/form`);
      dispatch({
        type: FORM_PAGE_TYPES.GET_FORM_INFO_SUCCESS,
        payload: response.data,
      });
      if (onSuccess) onSuccess(response.data as IFormInfoData);
    } catch (e: any) {
      dispatch({
        type: FORM_PAGE_TYPES.GET_FORM_INFO_FAIL,
        error: 'Something went wrong',
      });
    }
  };
