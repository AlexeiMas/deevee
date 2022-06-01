import React from 'react';
import styles from './style.module.scss';
import { TObjectWrapper } from '../ObjectWrapperActive/ObjectWrapperActive';
import cn from 'classnames'

export type TObjectWrapperDisabled = Omit<TObjectWrapper, "onClick">

const ObjectWrapperDisabled = ({src, alt, left, top, bottom}: React.PropsWithChildren<TObjectWrapperDisabled>) => {
  return (
    <div className={cn(styles.object, {[styles.plane]: alt.includes('Plane')})} style={{top, left, bottom}}>
      <img src={src} alt={alt} />
    </div>
  );
};

export default ObjectWrapperDisabled;
