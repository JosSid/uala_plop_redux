import { createContext, useContext } from "react";

const AuthContext = createContext();

export const AuthContextProvider = AuthContext.Provider;
export const AuthContextConsumer = AuthContext.Consumer;

AuthContext.displayName = 'App';

export const useAuthContext = () =>{
    const value = useContext(AuthContext);
    return value;
};

export default AuthContext;

