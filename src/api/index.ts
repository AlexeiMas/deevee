import axios from 'axios'

export const $clientApi = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_API_ENDPOINT
})

$clientApi.interceptors.request.use((config: any) => {
  try {
    // xxx(slava): it's better to initialize clientAPI in APP with token from the redux store.
    // config.headers['Access-Control-Allow-Origin'] = `*`;
  } catch (e) {
    //do nothing
  }
  return config;
});

$clientApi.interceptors.response.use(
  config => {
    return config;
  },
  async error => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
    }
    throw error;
  }
);

export const $authApi = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_AUTH_API_ENDPOINT
})

$authApi.interceptors.request.use((config: any) => {
  try {
    // xxx(slava): it's better to initialize clientAPI in APP with token from the redux store.
    config.headers.Authorization = `Bearer ${localStorage.getItem('auth_token')}`;
    // config.headers['Access-Control-Allow-Origin'] = `*`;
  } catch (e) {
    //do nothing
  }
  return config;
});

$authApi.interceptors.response.use(
  config => {
    return config;
  },
  async error => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
    }
    throw error;
  }
);

export default $authApi;
