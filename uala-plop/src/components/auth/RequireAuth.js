import { useContext } from 'react';
import {Navigate} from 'react-router-dom';
import AuthContext from './Context.js';

const RequireAuth = ({children}) => {
    const {isLogged} = useContext(AuthContext)
    if(!isLogged) {
        return <Navigate to='/login' /> 
    }

    return children;
};

export default RequireAuth;