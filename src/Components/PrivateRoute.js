import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useGlobalContext } from "../Components/WrapContext";

function PrivateRoute({ children, ...rest }) {
  //let auth = rest.auth
  const { token } = useGlobalContext();

  //console.log(rest)
  return (
    <Route
      {...rest}
      render={({ location }) =>
        token ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
