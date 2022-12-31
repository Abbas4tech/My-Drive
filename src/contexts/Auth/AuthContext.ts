import { createContext } from "react";
import { IAuthContext } from "./AuthTypes";

const initialContext: IAuthContext = {
  user: null,
  isLoading: false,
  isError: false,
  message: "Intial Message.",
  signup: (email: string, password: string, displayName: string) => {},
  login: (email: string, password: string) => {},
  signout: () => {},
};

const AuthContext = createContext(initialContext);

export default AuthContext;
