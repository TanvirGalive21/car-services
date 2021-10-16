import React from "react";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const {signInUsingGoole} = useAuth();
  return (
    <div>
      <h2>Please Login</h2>
      <button onClick={signInUsingGoole} className="btn-warning">Google Sign In</button>
    </div>
  );
};

export default Login;
