import client, { removeAuthorizationHeader, setAuthorizationHeader } from '../../api/client.js';
import storage from '../../utils/storage.js';

export const login = credentials => {
   
    return client.post('/api/auth/login', credentials).then(({accessToken}) => {setAuthorizationHeader(accessToken);
        storage.set('auth', accessToken)})
    
};

/* export const login = async (credentials) => {

    const data = await client.post('/api/auth/login', credentials);
   
   const accessToken = data.accessToken
    
        storage.set('auth', accessToken)

        return accessToken => {setAuthorizationHeader(accessToken)};
    
}; */

export const logout = () => {
    removeAuthorizationHeader();
    storage.remove('auth');
};
