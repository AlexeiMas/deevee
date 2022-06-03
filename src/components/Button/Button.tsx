import React from 'react';
import styles from './style.module.scss'
import { useNavigate } from 'react-router-dom';

export type TButton = {
  variant: 'primary' | 'secondary',
  href?: string,
  onClick?: () => void,
  sx?: React.CSSProperties
}

const Button = ({variant, href, onClick, sx, children}: React.PropsWithChildren<TButton>) => {
  const navigate = useNavigate();

  return (
    <div className={styles[variant]} style={sx} onClick={() => {
      href && navigate(href);
      onClick && onClick()
    }}>
      {children}
    </div>
  );
};

export default Button;
