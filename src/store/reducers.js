//  { ESQUEMA DE ESTADO
//      auth: true/false
//      ads: []
//      tags: []
//  }

import { ADS_LOADED, AUTH_LOGIN, AUTH_LOGOUT, TAGS_LOADED } from "./types";

const defaultState = {
    auth: false,
    ads: [],
    tags: []
};

export function auth(state = defaultState.auth, action) {
    if(action.type === AUTH_LOGIN){
        return true;
    };
    if(action.type === AUTH_LOGOUT){
        return false;
    };
    
    return state;
};

export function ads(state = defaultState.ads, action) {
    if(action.type === ADS_LOADED){
        return action.payload;
    };

    return state;
};

export function tags(state = defaultState.tags, action) {
    if(action.type === TAGS_LOADED){
        return action.payload
    };

    return state
};

// export default function reducer( state = defaultState, action) {
//     return {
//         auth: auth(state.auth, action),
//         ads: ads(state.ads, action)}
// };