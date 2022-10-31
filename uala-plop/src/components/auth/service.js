import client, { setAuthorizationHeader } from '../../api/client.js';
import storage from '../../utils/storage.js';

export const login = credentials => {
   
    return client.post('/api/auth/login', credentials).then(({accessToken}) => {setAuthorizationHeader(accessToken);
        storage.set('auth', accessToken)})
    
};


