import { IErrors } from 'pkg/tulula/auth/api';
import React from 'react';
import styles from './style.module.scss';

const userAlreadyExistsError = 'user already exists';

interface IProps {
  errors: IErrors;
  onUseSignIn: () => void

}

export const SignUpErrors = ({ errors, onUseSignIn }: IProps) => {
  const globalErrors = errors[''];
  if (!globalErrors || globalErrors.length === 0) {
    return null;
  }
  return (
    <>
      {globalErrors.map((error, i) => (
        <SignUpError key={`error-${i}`} error={error} onUseSignIn={onUseSignIn} />
      ))}
    </>
  );
};

interface IErrorProps {
  error: string;
  onUseSignIn: () => void
}

const SignUpError = ({ error, onUseSignIn }: IErrorProps) => {
  if (error === userAlreadyExistsError) {
    return (
      <div className={styles.error}>
        You already have an account on tulula. Please{' '}
          <a className={styles.linkColored}
             onClick={event => {
               event.preventDefault();
               onUseSignIn();
             }}
          >log in</a>

      </div>
    );
  }
  return <div className={styles.error}>{error}</div>;
};
