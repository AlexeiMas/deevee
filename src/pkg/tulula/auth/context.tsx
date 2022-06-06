import React from 'react';

import { RestAPI } from './api';

const defaultAPI = new RestAPI();

// Rest API is used for authorization flow only.
const RestAPIContext = React.createContext<RestAPI>(defaultAPI);
RestAPIContext.displayName = 'RestAPIContext';

interface IProps {
  children: React.ReactNode;
  host?: string;
  prefix?: string;
  headers?: Record<string, string>;
}

const RestAPIProviderComponent = ({ children, host, prefix, headers }: IProps) => {
  const restAPI = new RestAPI(host, prefix, headers);
  return <RestAPIContext.Provider value={restAPI}>{children}</RestAPIContext.Provider>;
};

export const UseRestAPI = () => React.useContext(RestAPIContext);

export const RestAPIProvider = React.memo(RestAPIProviderComponent);
