import { areChargedAds, areChargedTags } from './selectors';
import {
  ADS_LOADED_FAILURE,
  ADS_LOADED_REQUEST,
  ADS_LOADED_SUCCES,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCES,
  AUTH_LOGOUT,
  CREATED_AD_FAILURE,
  CREATED_AD_REQUEST,
  CREATED_AD_SUCCES,
  TAGS_LOADED_FAILURE,
  TAGS_LOADED_REQUEST,
  TAGS_LOADED_SUCCES,
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

export const adsLoadedSucces = (ads) => ({
  type: ADS_LOADED_SUCCES,
  payload: ads,
});

export const adsLoadedRequest = () => ({
  type: ADS_LOADED_REQUEST
});

export const adsLoadedFailure = (error) => ({
  type: ADS_LOADED_FAILURE,
  payload: error,
  error: true
});

export const adsLoad = () => {
  return async function(dispatch, getState, {api}) {
    const chargedAds = areChargedAds(getState());
    if(chargedAds) return;
    try {
      dispatch(adsLoadedRequest());
      const ads = await api.ads.getAds();
      dispatch(adsLoadedSucces(ads));
    } catch (error) {
      dispatch(adsLoadedFailure(error));
      throw error;
    };
  };
};

export const tagsLoadedSucces = (tags) => ({
  type: TAGS_LOADED_SUCCES,
  payload: tags,
});

export const tagsLoadedRequest = () => ({
  type: TAGS_LOADED_REQUEST
});

export const tagsLoadedFailure = (error) => ({
  type: TAGS_LOADED_FAILURE,
  payload: error,
  error: true
});

export const tagsLoad = () => {
  return async function (dispatch, getState, {api}) {
    const chargedTags = areChargedTags(getState());
    if(chargedTags) return;
    try {
      dispatch(tagsLoadedRequest());
      const tags = await api.ads.getTags();
      dispatch(tagsLoadedSucces(tags));
    } catch (error) {
      dispatch(tagsLoadedFailure(error))
    };
  };
};

export const createAdRequest = () => ({
  type: CREATED_AD_REQUEST
});

export const createAdSucces = () => ({
  type: CREATED_AD_SUCCES
});

export const createAdFailure = (error) => ({
  type: CREATED_AD_FAILURE,
  payload: error,
  error: true
});

export const createAd = (formData) => {
  return async function (dispatch, getState, {api}) {
    try {
      dispatch(createAdRequest());
      const createNewAd = await api.ads.createAd(formData);
      const newAd = createNewAd.id;
      dispatch(createAdSucces());
      return newAd
    } catch (error) {
      dispatch(createAdFailure(error));
      throw error;
    }
  }
}


export const uiResetError = () => ({
  type: UI_RESET_ERROR,
});
