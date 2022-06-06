import Button from '../Button/Button';
import {OAuthFacebook, OAuthGoogle} from "./constants";
import { SignUpErrors } from './SignUpErrors';
import { IErrors } from 'pkg/tulula/auth/api';
import React, { useCallback } from 'react';
import { FaFacebookSquare } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import styles from './style.module.scss';
import Divider from '../Divider/Divider';

const AUTH_API_URL = process.env.REACT_APP_AUTH_API_ENDPOINT;
const APP_URL = process.env.REACT_APP_URL;
const LOGIN_URL = process.env.REACT_APP_LOGIN_URL;

interface IProps {
  useEmail: boolean;
  onUseEmail: () => void;
  onUseSignIn: () => void;
  email: string;
  onChangeEmail: (email: string) => void;
  password: string;
  onChangePassword: (password: string) => void;
  name: string;
  onChangeName: (name: string) => void;
  onSubmit: () => void;
  loading: boolean;
  errors: IErrors;
  onBlur: () => void;
}

export const SignUpForm = ({
  useEmail,
  onUseEmail,
  onUseSignIn,
  email,
  name,
  password,
  onChangePassword,
  onChangeEmail,
  onChangeName,
  onSubmit,
  onBlur,
  loading = false,
  errors,
}: IProps) => {
  const isLoginActive = !loading && email !== '' && password !== '' && name !== '';

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
          SIGN UP WITH GOOGLE
        </a>
        <a
          className={styles.linkLikesBtn}
          href={facebookAddr}>
          <FaFacebookSquare color={'#FFFFFF'} />
          SIGN UP WITH FACEBOOK
        </a>
      </div>
      <Divider text={'or'} />

      {useEmail ? (
        <form onSubmit={submitCallback}>
          <SignUpErrors errors={errors} onUseSignIn={onUseSignIn} />

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
            type='text'
            name='name'
            autoComplete="name"
            placeholder='Your name'
            onBlur={onBlur}
            value={name}
            onChange={event => onChangeName(event.target.value)}

          />
          {errors['name'] ? (
            <>
              {errors['name'].map((error, i) => (
                <div className={styles.error} key={`error-${i}`}>{error}</div>
              ))}
            </>
          ) : null}
          <input
            type='password'
            name='password'
            autoComplete="new-password"
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
          <Button type={'submit'} variant={'primary'} disabled={!isLoginActive}>Sign Up</Button>
          <input type="submit"  hidden={true} />

        </form>
      ) : (
        <>
          <a className={styles.linkLikesBtn} onClick={onUseEmail}>Sign Up with email</a>
        </>
      )}
      <div className={styles.switcher}>
        <a className={styles.linkColored} onClick={(event) => {
          event.preventDefault()
          onUseSignIn()
        }}>I already have an account</a>
      </div>
    </div>
  );
};
