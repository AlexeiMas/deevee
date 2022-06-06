import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RestAPIProvider } from './pkg/tulula/auth/context';
import { setToken } from './actions/user/User.actions';
import { IRootState } from './store/store';
import Router from './routes';


const AUTH_API_URL = process.env.REACT_APP_AUTH_API_ENDPOINT;

interface IAppProps {
  setToken: (token: string) => void;
  userToken: string | null;
}

const App = ({ setToken, userToken }: IAppProps) => {
  // Take token from the local storage and initialize in redux.
  // XXX(slava): it's better to use token from redux storage everywhere.
  useEffect(() => {
    if (userToken) {
      return;
    }
    const authToken = localStorage.getItem('auth_token');
    if (authToken) {
      setToken(authToken);
    }
  }, [setToken, userToken]);

  return (
    <RestAPIProvider host={AUTH_API_URL ? AUTH_API_URL : "https://tulu.la"}>
        <Router />
    </RestAPIProvider>
  );
};

const mapStateToProps = ({ app, user }: IRootState) => ({
  getContestsInfoData: app.getContestsInfoData,
  userToken: user.token,
});

const mapDispatchToProps = {
  setToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
