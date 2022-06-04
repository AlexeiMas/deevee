import React, { useMemo } from 'react';
import styles from './style.module.scss';

export type TModal = {
  show: boolean,
  setShow: React.Dispatch<boolean>
}

const Modal = ({ show, setShow, children }: React.PropsWithChildren<TModal>) => {

  useMemo(() => {
    show && (document.body.style.overflow = 'hidden');
    !show && (document.body.style.overflow = 'unset');
  }, [show]);

  return (
    show
      ?
      <div className={styles.modalWrapper} /*onClick={() => setShow(false)}*/>
        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
      :
      <React.Fragment />
  );
};

export default Modal;
