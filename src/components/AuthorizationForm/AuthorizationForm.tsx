import React, { useState } from 'react';
import styles from './style.module.scss'
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookSquare } from 'react-icons/fa';
import { getToken, signIn, signUp } from '../../api/authAPI';

const AuthorizationForm = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');

  const onHandleSignUp = (e: React.FormEvent) => {
    e.preventDefault()
    signUp(email, password, name).then(res => console.log(res))
  }

  const onHandleSignIn = (e: React.FormEvent) => {
    e.preventDefault()
    signIn(email, password).then(res => console.log(res))
  }

  const onHandleGetToken = () => {
    getToken().then(res => console.log(res))
  }

  return (
    <div className={styles.authWrapper}>
      <h3>Welcome</h3>
      <div className={styles.OAuth2}>
        <a href='https://tulu.la/api/ab/oauth2/google?app=chat&amp;team=swamp-up-2022-00002w&amp;redir=https://tulu.la/competitions/sso?redirect_to=https://capture-jfrog.dev-test.pro'>
          <FcGoogle />
          SIGN UP WITH GOOGLE
        </a>
        <a href='https://tulu.la/api/ab/oauth2/facebook?app=chat&amp;team=swamp-up-2022-00002w&amp;redir=https://tulu.la/competitions/sso?redirect_to=https://capture-jfrog.dev-test.pro'>
          <FaFacebookSquare color={"#FFFFFF"}/>
          SIGN UP WITH FACEBOOK
        </a>
      </div>
      <form onSubmit={onHandleSignIn}>
        <input type='email' name='email' placeholder='Your email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type='text' name='name' placeholder='Your name' value={name} onChange={(e) => setName(e.target.value)} />
        <input type='password' name='password' placeholder='Your password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type='submit' style={{display: 'block', margin: '0 auto'}}>Sign up</button>
        <button type='submit' style={{display: 'block', margin: '0 auto'}}>Sign in</button>
      </form>
      <button onClick={() => onHandleGetToken()}>Get Token</button>
    </div>
  );
};

export default AuthorizationForm;
