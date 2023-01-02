//  { ESQUEMA DE ESTADO
//      auth: true/false
//      ads: []
//  }

import { ADS_LOADED, AUTH_LOGIN, AUTH_LOGOUT } from "./types";


const defaultState = {
    auth: false,
    ads: [],
};

export default function reducer(state = defaultState, action) {
    if(action.type === AUTH_LOGIN) {
        return {...state, auth: true}
    };
    if(action.type === AUTH_LOGOUT) {
        return {...state, auth: false}  
    };
    if(action.type === ADS_LOADED) {
        return {...state, ads: action.payload}
    };

    return state;
};