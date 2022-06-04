import React from 'react';
import styles from './style.module.scss'
import { useNavigate } from 'react-router-dom';

export type TButton = {
  variant: 'primary' | 'secondary',
  type?: 'submit' | 'button' | undefined,
  disabled?: boolean
  href?: string,
  onClick?: () => void,
  sx?: React.CSSProperties
}

const Button = ({variant, type, disabled, href, onClick, sx, children}: React.PropsWithChildren<TButton>) => {
  const navigate = useNavigate();

  return (
    <button className={styles[variant]} style={sx} type={type ? type : undefined} disabled={disabled} onClick={() => {
      href && navigate(href);
      onClick && onClick()
    }}>
      {children}
    </button>
  );
};

export default Button;
