import React from "react";

export interface Route {
  label: string;
  path: Routes;
  icon?: string;
  screen: React.FunctionComponent;
}

export enum Routes {
  LANDING = "/",
  SIGNIN = "/signin",
  SIGNUP = "/signup",
  HOME = "/home",
  PAGENOTFOUND = "/*",
}
