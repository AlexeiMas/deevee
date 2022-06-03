import React, { useId } from 'react';
import styles from './style.module.scss'

export type TPlaceholder = {
  type?: 'text' | 'email' | 'number' | 'password',
  placeholder?: string,
  name: string,
  required?: boolean,
  value: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  label?: string
}

const Placeholder: React.FC<TPlaceholder> = ({name, type= 'text', placeholder, required = false, value, onChange, label}) => {
  const id = useId();
  return (
    <div className={styles.placeholderWrapper}>
      {label && <label htmlFor={id}>{label}</label>}
      <input type={type} placeholder={placeholder} name={name} required={required} value={value} onChange={onChange} id={id} style={value.length ? {fontWeight: 400, color: '#FFFFFF'} : {color: '#B8B8B8'}} />
    </div>
  );
};

export default Placeholder;
