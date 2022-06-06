import { FaFacebookSquare } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import Button from '../Button/Button';
import Divider from '../Divider/Divider';
import styles from './style.module.scss';
import {OAuthFacebook, OAuthGoogle} from "./constants";
import { IErrors } from 'pkg/tulula/auth/api';
import React, { useCallback } from 'react';

const AUTH_API_URL = process.env.REACT_APP_AUTH_API_ENDPOINT;
const APP_URL = process.env.REACT_APP_URL;
const LOGIN_URL = process.env.REACT_APP_LOGIN_URL;

interface IProps {
  useEmail: boolean;
  onUseEmail: () => void;
  onUseSignUp: () => void;
  email: string;
  onChangeEmail: (email: string) => void;
  password: string;
  onChangePassword: (password: string) => void;
  onSubmit: () => void;
  loading: boolean;
  errors: IErrors;
  onBlur: () => void;
}

export const SignInForm = ({
  useEmail,
  onUseEmail,
  onUseSignUp,
  email,
  password,
  onChangePassword,
  onChangeEmail,
  onSubmit,
  onBlur,
  loading = false,
  errors,
}: IProps) => {
  const isLoginActive = !loading && email !== '' && password !== '';

  const submitCallback = useCallback<React.FormEventHandler<HTMLAnchorElement | HTMLFormElement>>(
    e => {
      e.preventDefault();
      onSubmit();
    },
    [onSubmit]
  );
  // quick hack for swamp up.
  const teamSlug = 'dee-vee-00002x';
  const back = `${LOGIN_URL}${APP_URL}`

  const oauthParams: string = [
    "app=chat",
    `team=${teamSlug}`,
    `redir=${back}`,
  ]
  .filter(Boolean)
  .join("&");

  const googleAddr = `${AUTH_API_URL}${OAuthGoogle}?${oauthParams}`
  const facebookAddr = `${AUTH_API_URL}${OAuthFacebook}?${oauthParams}`

  return (
    <div className={styles.authWrapper}>
      <img src='/assets/icons/key.svg' alt='Key' />
      <h3>Welcome</h3>

      <div className={styles.OAuth2}>
        <a
          className={styles.linkLikesBtn}
          href={googleAddr}>
          <FcGoogle />
          LOG IN WITH GOOGLE
        </a>
        <a
          className={styles.linkLikesBtn}
          href={facebookAddr}>
          <FaFacebookSquare color={'#FFFFFF'} />
          LOG IN WITH FACEBOOK
        </a>
      </div>
      <Divider text={'or'} />
      {useEmail ? (
        <form onSubmit={submitCallback}>
          {errors[''] ? (
            <>
              {errors[''].map((error, i) => (
                <div className={styles.error} key={`error-${i}`}>{error}</div>
              ))}
            </>
          ) : null}

          <input
            type='email'
            name='email'
            autoComplete="email"
            placeholder='Your email'
            onBlur={onBlur}
            autoFocus={true}
            value={email}
            onChange={event => onChangeEmail(event.target.value)}
          />
          {errors['email'] ? (
            <>
              {errors['email'].map((error, i) => (
                <div className={styles.error} key={`error-${i}`}>{error}</div>
              ))}
            </>
          ) : null}
          <input
            type='password'
            name='password'
            autoComplete="current-password"
            placeholder='Your Password'
            onBlur={onBlur}
            value={password}
            onChange={event => onChangePassword(event.target.value)}

          />
          {errors['password'] ? (
            <>
              {errors['password'].map((error, i) => (
                <div className={styles.error} key={`error-${i}`}>{error}</div>
              ))}
            </>
          ) : null}
          <Button type={'submit'} variant={'primary'} disabled={!isLoginActive}>Log In</Button>
          <input type="submit"  hidden={true} />
        </form>
      ) : (
        <>
          <a className={styles.linkLikesBtn} onClick={onUseEmail}>Log In with email</a>
        </>
      )}

      <div className={styles.switcher}>
        Don’t have an account?&nbsp;
        <a className={styles.linkColored} onClick={(event) => {
          event.preventDefault()
          onUseSignUp()
        }}>Sign Up</a>
      </div>

    </div>
  );
};
