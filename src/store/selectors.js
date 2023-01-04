export const getIsLogged = (state) => state.auth;

export const getListAds = (state) => state.ads;

export const getListTags = (state) => state.tags;

export const getAdById = (state, adId) =>
  getListAds(state).find((ad) => ad.id === adId);
