import { FC } from 'react';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { MODAL_TYPES } from './Modal.types';

export const hideModal: Function = () => async (dispatch: any, getState: any) => {
  dispatch({
    type: MODAL_TYPES.MODAL_IS_HIDING,
  });
  setTimeout(() => {
    dispatch({
      type: MODAL_TYPES.HIDE_MODAL,
    });
  }, 300);
};

export const showModal =
  (ModalComponent: FC, componentProps = {}, name = ''): ThunkAction<void, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch({
      type: MODAL_TYPES.STORE_MODAL,
    });
    dispatch({
      type: MODAL_TYPES.SHOW_MODAL,
      ModalComponent,
      componentProps,
      name,
    });
  };

export const backModal: Function = () => (dispatch: any) => {
  dispatch({
    type: MODAL_TYPES.UNSTORE_MODAL,
  });
};
