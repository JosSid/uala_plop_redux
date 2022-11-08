import { createContext } from "react";

const AuthContext = createContext();

export const AuthContextProvider = AuthContext.Provider;
export const AuthContextConsumer = AuthContext.Consumer;

AuthContext.displayName = 'App'

export default AuthContext;

