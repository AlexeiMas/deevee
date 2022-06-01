import React from 'react';
import styles from './style.module.scss'
import { useNavigate } from 'react-router-dom';

export type TButton = {
  variant: 'primary' | 'secondary',
  href?: string
}

const Button = ({variant, href, children}: React.PropsWithChildren<TButton>) => {
  const navigate = useNavigate();

  return (
    <div className={styles[variant]} onClick={() => href && navigate(href)}>
      {children}
    </div>
  );
};

export default Button;
