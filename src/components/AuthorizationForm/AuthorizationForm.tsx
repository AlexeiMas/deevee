import React, { useMemo, useState } from 'react';
import styles from './style.module.scss';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookSquare } from 'react-icons/fa';
import { getToken, signIn, signUp } from '../../api/authAPI';
import Divider from '../Divider/Divider';
import { useNavigate } from 'react-router-dom';
import { PATH_GAME } from '../../utils/consts';
import Button from '../Button/Button';
import { validateEmail, validatePassword } from '../../utils/validators';

const REACT_APP_URL = process.env.REACT_APP_URL;

export type TAuthorizationForm = {
  setToken: (token: string) => void;
}

const AuthorizationForm: React.FC<TAuthorizationForm> = ({setToken}) => {
  const [typeAuth, setTypeAuth] = useState<'Log In' | 'Sign Up'>('Log In');
  const [manualAuth, setManualAuth] = useState<boolean>(false);
  const [email, setEmail] = useState<{value: string, isTouched: boolean}>({value: '', isTouched: false});
  const [password, setPassword] = useState<{value: string, isTouched: boolean}>({value: '', isTouched: false});
  const [name, setName] = useState<string>('');
  const navigate = useNavigate()
  const teamSlug = 'dee-vee-00002x';

  const onHandleGetToken = () => {
    getToken().then(res => setToken(res.data.token)).then(() => navigate(PATH_GAME));
  };

  const onHandleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    !isValid && signUp(email.value, password.value, name).then(res => (res.data.status === "success") && onHandleGetToken());

  };

  const onHandleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    !isValid && signIn(email.value, password.value).then(res => (res.data.status === "success") ? onHandleGetToken() : console.log(res.data));
  };

  useMemo(() => {
    setEmail({value: '', isTouched: false})
    setPassword({value: '', isTouched: false})
  }, [typeAuth])

  const isValidEmail = useMemo(() => {
    return validateEmail(email.value)
  }, [email])

  const isValidPassword = useMemo(() => {
    return validatePassword(password.value)
  }, [password])

  const isValid = useMemo(() => {
    return Boolean(isValidEmail) || Boolean(isValidPassword)
  }, [email, password])

  return (
    <div className={styles.authWrapper}>
      <img src='/assets/icons/key.svg' alt='Key' />
      <h3>Welcome</h3>
      <div className={styles.OAuth2}>
        <a
          className={styles.linkLikesBtn}
          href={`https://tulu.la/api/ab/oauth2/google?app=chat&amp;team=${teamSlug}&amp;redir=https://tulu.la/competitions/sso?redirect_to=${REACT_APP_URL}`}>
          <FcGoogle />
          {typeAuth} WITH GOOGLE
        </a>
        <a
          className={styles.linkLikesBtn}
          href={`https://tulu.la/api/ab/oauth2/facebook?app=chat&amp;team=${teamSlug}&amp;redir=https://tulu.la/competitions/sso?redirect_to=${REACT_APP_URL}`}>
          <FaFacebookSquare color={'#FFFFFF'} />
          {typeAuth} WITH FACEBOOK
        </a>
      </div>
      <Divider text={'or'} />

      {manualAuth
        ?
        <form onSubmit={(typeAuth === 'Log In') ? onHandleSignIn : onHandleSignUp}>
          <input type='email' name='email' placeholder='Your email' value={email.value}
                 onChange={(e) => setEmail({value: e.target.value, isTouched: true})} />
          {email.isTouched && !!isValidEmail && <p>{isValidEmail}</p>}
          {(typeAuth === 'Sign Up') && <input type='text' name='name' placeholder='Your name' value={name}
                                              onChange={(e) => setName(e.target.value)} />}
          <input type='password' name='password' placeholder='Your password' value={password.value}
                 onChange={(e) => setPassword({value: e.target.value, isTouched: true})} />
          {password.isTouched && !!isValidPassword && <p>{isValidPassword}</p>}
          <Button type={'submit'} variant={'primary'} disabled={isValid}>{typeAuth}</Button>
        </form>
        :
        <a className={styles.linkLikesBtn} onClick={() => setManualAuth(true)}>{typeAuth} with email</a>
      }
      {(typeAuth === 'Log In')
          ?
          <div className={styles.switcher}>
            Don't have an account?&nbsp;
            <a className={styles.linkColored} onClick={() => setTypeAuth('Sign Up')}>Sign Up</a>
          </div>
          :
          <div className={styles.switcher}>
            <a className={styles.linkColored} onClick={() => setTypeAuth('Log In')}>I already have an account</a>
          </div>
      }
    </div>
  );
};

export default AuthorizationForm;
