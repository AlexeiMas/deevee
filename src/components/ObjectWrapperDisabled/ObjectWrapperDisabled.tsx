import React from 'react';
import styles from './style.module.scss';
import { TObjectWrapper } from '../ObjectWrapperActive/ObjectWrapperActive';

export type TObjectWrapperDisabled = Omit<TObjectWrapper, "onClick">

const ObjectWrapperDisabled = ({src, alt, left, top, bottom, zIndex, width, height}: React.PropsWithChildren<TObjectWrapperDisabled>) => {
  return (
    <div className={styles.object} style={{top, left, bottom, zIndex, width, height}}>
      {src}
      {/*<img src={src} alt={alt} />*/}
    </div>
  );
};

export default ObjectWrapperDisabled;
