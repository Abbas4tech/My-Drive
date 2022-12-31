import React, { useCallback, useEffect, useReducer } from "react";
import AuthContext from "./AuthContext";
import { AuthActions, IAction, IAuthContext, IUserState } from "./AuthTypes";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  User,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

const initialState: IUserState = {
  user: null,
  isLoading: false,
  isError: false,
  message: "Intial Message.",
};

const userReducer = (state = initialState, action: IAction) => {
  const { type, payload, error } = action;
  switch (type) {
    case AuthActions.USER_SIGNUP_START:
      return {
        ...state,
        isLoading: true,
        message: "Hold On! We are onboarding you to the dashboad!",
      };
    case AuthActions.USER_SIGNUP_SUCCCESS:
      return {
        ...state,
        isLoading: false,
        message: "Yay! We've made it!",
        user: payload?.user as User,
      };
    case AuthActions.USER_SIGNUP_FAIL:
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: error.message,
      };
    case AuthActions.USER_LOGIN_START:
      return {
        ...state,
        isLoading: true,
        message: "Hold On! We are logging you in to the dashboad!",
      };
    case AuthActions.USER_LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        message: "Yay! You are logged in!",
        user: payload?.user as User,
      };
    case AuthActions.USER_LOGIN_FAIL:
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: error.message,
      };
    case AuthActions.USER_SIGNOUT_START:
      return {
        ...state,
        isLoading: true,
        message: "Hold On! We are signing you out!",
      };
    case AuthActions.USER_SIGNOUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        message: "Yay! You are signed out!",
        user: null,
      };
    case AuthActions.USER_SIGNOUT_FAIL:
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: error.message,
      };

    default:
      return state;
  }
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, dispatch] = useReducer(userReducer, initialState);

  const navigate = useNavigate();

  const signup = async (
    email: string,
    password: string,
    displayName: string
  ) => {
    try {
      dispatch({ type: AuthActions.USER_SIGNUP_START, payload: null });

      const userCreds = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(userCreds.user, { displayName });

      dispatch({
        type: AuthActions.USER_SIGNUP_SUCCCESS,
        payload: {
          user: userCreds.user,
        },
      });


    } catch (error: any) {
      console.error(error);
      dispatch({ type: AuthActions.USER_SIGNUP_FAIL, payload: null, error });
    }
  };

  const login = async (email: string, password: string) => {
    try {
      dispatch({ type: AuthActions.USER_LOGIN_START, payload: null });

      const userCreds = await signInWithEmailAndPassword(auth, email, password);

      dispatch({
        type: AuthActions.USER_LOGIN_SUCCESS,
        payload: {
          user: userCreds.user,
        },
      });
    } catch (error) {
      console.error(error);
      dispatch({ type: AuthActions.USER_LOGIN_FAIL, payload: null, error });
    }
  };

  const signout = async () => {
    try {
      dispatch({ type: AuthActions.USER_SIGNOUT_START, payload: null });

      await signOut(auth);

      dispatch({ type: AuthActions.USER_SIGNOUT_SUCCESS, payload: null });
    } catch (error) {
      console.error(error);
      dispatch({ type: AuthActions.USER_SIGNOUT_FAIL, payload: null, error });
    }
  };

  const loadUser = useCallback(() => {
    try {
      auth.onAuthStateChanged((user) => {
        dispatch({ type: AuthActions.USER_LOAD_START, payload: null });

        if (user) {
          dispatch({ type: AuthActions.USER_LOAD_SUCCESS, payload: { user } });
          
        }
      });
    } catch (error: any) {
      dispatch({ type: AuthActions.USER_LOAD_FAIL, payload: null, error });
    }
  }, []);

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const context: IAuthContext = {
    ...(user as IUserState),
    signup,
    login,
    signout,
  };
  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
