import Signin from "../pages/auth/Signin";
import Signup from "../pages/auth/Signup";
import PageNotFound from "../pages/not-found/PageNotFound";
import { Route, Routes } from "./routeTypes";

const routes: Array<Route> = [
  {
    label: "Landing",
    path: Routes.LANDING,
    screen: Signin,
  },
  {
    label: "Sign In",
    path: Routes.SIGNIN,
    screen: Signin,
  },
  {
    label: "Sign Up",
    path: Routes.SIGNUP,
    screen: Signup,
  },
  {
    label: "Page Not Found!",
    path: Routes.PAGENOTFOUND,
    screen: PageNotFound,
  },
];

export default routes;
