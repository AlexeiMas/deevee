import { signUpWithEmail, signUpWithEmailCleanUp } from '../../actions/auth/auth.actions';
import { signUpWithEmailFunc } from '../../actions/auth/auth.types';
import { SignUpForm } from './SignUpForm';
import { validateEmail, validatePassword } from './validators';
import { PATH_GAME } from '../../utils/consts';
import { IErrors } from '../../pkg/tulula/auth/api';
import { UseRestAPI } from '../../pkg/tulula/auth/context';
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IRootState } from '../../store/store';

// XXX(slava): this is a quick hack to prevent from sending emails from tulula to the new users.
const teamID = '105';

interface IProps {
  signUpWithEmailLoading: boolean;
  errors: IErrors;
  signUpWithEmail: signUpWithEmailFunc;
  signUpWithEmailCleanUp: () => void;
  userToken: string | null;
  showEmailForm?: boolean;
  showSignInForm: () => void;
  onUseEmail: (useEmail: boolean) => void;
}

const validate = (submitted: boolean, email: string, password: string, name: string) => {
  const errors: IErrors = {};

  if ((email !== '' || submitted) && !validateEmail(email)) {
    errors.email = ['Must be a valid e-mail address'];
  }

  if (password !== '' || submitted) {
    const validationErrors = validatePassword(password);
    if (validationErrors.length > 0) {
      errors.password = validationErrors;
    }
  }

  if (name === '' && submitted) {
    errors.name = ['Name is required'];
  }

  return errors;
};

export const SignUpComponent = ({
  signUpWithEmail,
  signUpWithEmailLoading,
  signUpWithEmailCleanUp,
  showSignInForm,
  errors,
  userToken,
  showEmailForm = false,
  onUseEmail,
}: IProps) => {
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState('');

  // errors are set if fields are invalid
  const [validationErrors, setValidationErrors] = React.useState<IErrors>({});
  // submitted is a marker that user clicked submit button
  // some errors (required fields) are shown only when user clicked submit
  const [submitted, setSubmitted] = React.useState<boolean>(false);

  const authAPI = UseRestAPI();
  const navigate = useNavigate();

  // clean errors when unmount
  React.useEffect(() => {
    return () => {
      signUpWithEmailCleanUp();
    };
  }, [signUpWithEmailCleanUp]);

  React.useEffect(() => {
    // update validation errors with errors from the response
    setValidationErrors(errors);
  }, [errors]);

  const submitCallback = React.useCallback(() => {
    setSubmitted(true);
    const errors = validate(true, email, password, name);
    setValidationErrors(errors);
    // don't send request if form has any error
    if (Object.keys(errors).length > 0) {
      return;
    }
    signUpWithEmail(authAPI, email, password, name, teamID);
  }, [email, password, name, signUpWithEmail, authAPI]);

  const blurCallback = React.useCallback(() => {
    const errors = validate(submitted, email, password, name);
    setValidationErrors(errors);
  }, [email, name, password, submitted]);


  React.useEffect(() => {
    // if we get user token -> close the modal and redirect to rubric
    if (userToken) {
      navigate(PATH_GAME);
    }
  }, [navigate, userToken]);

  return (
    <SignUpForm
      useEmail={showEmailForm}
      onUseEmail={() => onUseEmail(true)}
      email={email}
      name={name}
      password={password}
      onChangeEmail={setEmail}
      onChangeName={setName}
      onChangePassword={setPassword}
      onSubmit={submitCallback}
      onBlur={blurCallback}
      loading={signUpWithEmailLoading}
      errors={validationErrors}
      onUseSignIn={showSignInForm}
    />
  );
};

const mapStateToProps = ({ auth, user }: IRootState) => ({
  signUpWithEmailLoading: auth.signUpWithEmailLoading,
  errors: auth.errors,
  userToken: user.token,
});

const mapDispatchToProps = {
  signUpWithEmail,
  signUpWithEmailCleanUp,
};

export const SignUp = connect(mapStateToProps, mapDispatchToProps)(SignUpComponent);
