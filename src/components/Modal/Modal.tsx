import React, { useMemo } from 'react';
import styles from './style.module.scss';

export type TModal = {
  show: boolean,
  setShow: React.Dispatch<boolean>
  overlayClick?: boolean
}

const Modal = ({ show, setShow, children, overlayClick = false }: React.PropsWithChildren<TModal>) => {

  useMemo(() => {
    show && (document.body.style.overflow = 'hidden');
    !show && (document.body.style.overflow = 'unset');
  }, [show]);

  return (
    show
      ?
      <div className={styles.modalWrapper} onClick={overlayClick ? () => setShow(false) : () => {}}>
        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
      :
      <React.Fragment />
  );
};

export default Modal;
