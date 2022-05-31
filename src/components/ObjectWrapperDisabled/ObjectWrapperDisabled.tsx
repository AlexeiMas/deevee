import React from 'react';
import styles from './style.module.scss';
import { TObjectWrapper } from '../ObjectWrapperActive/ObjectWrapperActive';

export type TObjectWrapperDisabled = Omit<TObjectWrapper, "onClick" | "bottom" | "right">

const ObjectWrapperDisabled = ({src, alt, left, top}: React.PropsWithChildren<TObjectWrapperDisabled>) => {
  return (
    <div className={styles.object} style={{top, left}}>
      <img src={src} alt={alt} />
    </div>
  );
};

export default ObjectWrapperDisabled;
