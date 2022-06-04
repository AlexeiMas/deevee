import React, { useState } from 'react';
import styles from './style.module.scss';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookSquare } from 'react-icons/fa';
import { getToken, signIn, signUp } from '../../api/authAPI';
import Divider from '../Divider/Divider';

const REACT_APP_URL = process.env.REACT_APP_URL;

const AuthorizationForm = () => {
  const [typeAuth, setTypeAuth] = useState<'Log In' | 'Sign Up'>('Log In');
  const [manualAuth, setManualAuth] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const teamSlug = 'dee-vee-00002x';

  const onHandleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    signUp(email, password, name).then(res => console.log(res));
  };

  const onHandleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    signIn(email, password).then(res => console.log(res));
  };

  const onHandleGetToken = () => {
    getToken().then(res => console.log(res.data.token));
  };

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

      {/*<button onClick={() => onHandleGetToken()}>Get Token</button>*/}
      {manualAuth
        ?
        <form onSubmit={(typeAuth === 'Log In') ? onHandleSignIn : onHandleSignUp}>
          <input type='email' name='email' placeholder='Your email' value={email}
                 onChange={(e) => setEmail(e.target.value)} />
          {(typeAuth === 'Sign Up') && <input type='text' name='name' placeholder='Your name' value={name}
                                              onChange={(e) => setName(e.target.value)} />}
          <input type='password' name='password' placeholder='Your password' value={password}
                 onChange={(e) => setPassword(e.target.value)} />
          <button type='submit' disabled={!email || !password}>{typeAuth}</button>
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
