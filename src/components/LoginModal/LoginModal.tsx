import React from 'react';
import { SignIn } from './SignIn';
import { SignUp } from './SignUp';

type AuthState = 'sign-in' | 'sign-up';

export interface ILoginModal {
  state: AuthState;
  showEmailForm?: boolean;
}

export const LoginModal: React.FC<ILoginModal> = ({ state = 'sign-in', showEmailForm = false }: ILoginModal) => {
  const [authState, setAuthState] = React.useState<AuthState>(state);
  const [useEmail, setUseEmail] = React.useState(showEmailForm);

  const useSignInCallback = React.useCallback(() => {
    setAuthState('sign-in');
  }, [setAuthState]);

  const useSignUpCallback = React.useCallback(() => {
    setAuthState('sign-up');
  }, [setAuthState]);

  return (
    <>
      {authState === 'sign-in' && (
        <SignIn key={'sign-in'} showSignUpForm={useSignUpCallback} showEmailForm={useEmail} onUseEmail={setUseEmail} />
      )}
      {authState === 'sign-up' && (
        <SignUp key={'sign-up'} showSignInForm={useSignInCallback} showEmailForm={useEmail} onUseEmail={setUseEmail} />
      )}
    </>
  );
};
