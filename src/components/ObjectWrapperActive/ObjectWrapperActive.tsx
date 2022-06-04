import React from 'react';
import styles from './style.module.scss'
import { TObjectProps } from '../../types/objects';
import cn from 'classnames'

export type TObjectWrapper = {
  key: number
  src: string,
  alt: string,
  left?: string,
  top?:  string,
  right?: string,
  bottom?: string,
  task_id?: number,
  nomination_id?: number;
} & TObjectProps

const ObjectWrapperActive = ({src, alt, left, top, onClick, right, bottom}: React.PropsWithChildren<TObjectWrapper>) => {
  return (
    <div className={cn(styles.object, {[styles.dvc]: alt === 'DVC'})} onClick={onClick} style={{top, left, right, bottom}}>
      <img src={src} alt={alt} />
    </div>
  );
};

export default ObjectWrapperActive;
