export const getIsLogged = (state) => state.auth;

export const getListAds = (state) => state.ads;

export const areChargedAds = (state) => !!getListAds(state).length

export const getListTags = (state) => state.tags;

export const areChargedTags = (state) => !!getListTags(state).length

export const getAdById = (adId) => (state) =>
  getListAds(state).find((ad) => ad.id === adId);

export const getUi = (state) => state.ui

export const getUiError = (state) => state.ui.error
