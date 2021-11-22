import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "./WrapContext";
import { useMutation } from "@apollo/client";
import { LOGOUT } from "../Queries";
import { deleteAuthToken } from "../token";

function Header() {
  const { token, logout } = useGlobalContext();
  //console.log("Header", value);
  //const token = "";

  //const [generateCustomerToken, { error, loading, data }] = useMutation(LOGIN);
  const [revokeCustomerToken, { error, loading, data }] = useMutation(LOGOUT);
  console.log(data);

  return (
    <div className="header">
      <a href="#default" className="logo">
        CompanyLogo
      </a>
      <div className="header-right">
        <Link to="/login">{token ? "Welcome Jack Sparrow" : "Sign in"}</Link>
        <Link
          onClick={() => {
            //revokeCustomerToken();
            deleteAuthToken();
            logout();
          }}
          to="/"
        >
          {token ? "Logout" : "Sign up"}
        </Link>
      </div>
    </div>
  );
}

export default Header;
