import React, { useContext } from "react";
import AuthContext from "../../contexts/Auth/AuthContext";

const Signin = () => {
  const authContext = useContext(AuthContext);

  return <div>Signin</div>;
};

export default Signin;
