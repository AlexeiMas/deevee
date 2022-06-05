import React from 'react';
import styles from './style.module.scss';
import { TObjectWrapper } from '../ObjectWrapperActive/ObjectWrapperActive';
import cn from 'classnames'
import Plane from '../Plane/Plane';

export type TObjectWrapperDisabled = Omit<TObjectWrapper, "onClick">

const ObjectWrapperDisabled = ({src, alt, left, top, bottom, zIndex}: React.PropsWithChildren<TObjectWrapperDisabled>) => {
  return (
    <div className={cn(styles.object, {[styles.plane]: alt.includes('Plane')})} style={{top, left, bottom, zIndex}}>
      {alt.includes('Plane') ? <Plane/> : <img src={src} alt={alt} />}
    </div>
  );
};

export default ObjectWrapperDisabled;
