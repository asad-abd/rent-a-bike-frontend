import { createContext, useContext } from "react";

const AuthContext = createContext();
export const AuthContextProvider = AuthContext.Provider;
export const useAuth = () => useContext(AuthContext);
