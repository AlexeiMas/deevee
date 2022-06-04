import { FC } from 'react';
import { AnyAction } from 'redux';

import { MODAL_TYPES } from '../actions/modal/Modal.types';

interface IStoredModals {
  componentProps: object;
  ModalComponent: FC | null;
  name: string;
}

export interface IModalState {
  componentProps: object;
  isVisible: boolean;
  modalIsHiding: boolean;
  ModalComponent: any;
  name: string;
  storedModals: IStoredModals[] | [];
}

export const initialState: IModalState = {
  componentProps: {},
  isVisible: false,
  modalIsHiding: false,
  ModalComponent: null,
  storedModals: [],
  name: '',
};

export const modal = (state = initialState, action: AnyAction): IModalState => {
  switch (action.type) {
    case MODAL_TYPES.SHOW_MODAL: {
      return {
        ...state,
        isVisible: true,
        ModalComponent: action.ModalComponent,
        componentProps: action.componentProps,
        modalIsHiding: false,
      };
    }
    case MODAL_TYPES.STORE_MODAL: {
      return {
        ...state,
        storedModals: [
          ...state.storedModals,
          {
            ModalComponent: state.ModalComponent,
            componentProps: state.componentProps,
            name: state.name,
          },
        ],
      };
    }
    case MODAL_TYPES.UNSTORE_MODAL: {
      const currentStoredModals = state.storedModals.slice(0, state.storedModals.length - 1);

      if (!currentStoredModals.length) {
        return initialState;
      }

      return {
        ...state,
        storedModals: currentStoredModals,
        ModalComponent: state.storedModals[currentStoredModals.length].ModalComponent,
        componentProps: state.storedModals[currentStoredModals.length].componentProps,
      };
    }
    case MODAL_TYPES.MODAL_IS_HIDING: {
      return {
        ...state,
        modalIsHiding: true,
      };
    }
    case MODAL_TYPES.HIDE_MODAL: {
      return initialState;
    }
    default:
      return state;
  }
};
