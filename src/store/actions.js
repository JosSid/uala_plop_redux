import {
  ADS_LOADED,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCES,
  AUTH_LOGOUT,
  TAGS_LOADED,
  UI_RESET_ERROR,
} from './types';

export const authLoginSucces = () => ({
  type: AUTH_LOGIN_SUCCES,
});

export const authLoginRequest = () => ({
  type: AUTH_LOGIN_REQUEST,
});

export const authLoginFailure = (error) => ({
  type: AUTH_LOGIN_FAILURE,
  payload: error,
  error: true,
});

export const authLogin = (credentials) => {
  return async function (dispatch, getState, {api}) {
    try {
      dispatch(authLoginRequest());
      const accessToken = await api.auth.login(credentials);

      dispatch(authLoginSucces());
      return accessToken;
    } catch (err) {
      dispatch(authLoginFailure(err));
      throw err;
    }
  };
};

export const authLogout = () => ({
  type: AUTH_LOGOUT,
});

export const adsLoaded = (ads) => ({
  type: ADS_LOADED,
  payload: ads,
});

export const tagsLoaded = (tags) => ({
  type: TAGS_LOADED,
  payload: tags,
});

export const uiResetError = () => ({
  type: UI_RESET_ERROR,
});
