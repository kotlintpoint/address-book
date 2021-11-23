import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "./WrapContext";
import { useMutation } from "@apollo/client";
import { LOGOUT } from "../Queries";
import { deleteAuthToken } from "../token";

function Header() {
  const { token, logout, customerName } = useGlobalContext();
  //console.log("Header", value);
  //const token = "";

  //const [generateCustomerToken, { error, loading, data }] = useMutation(LOGIN);
  const [revokeCustomerToken, { error, loading, data }] = useMutation(LOGOUT);
  //console.log(data);

  const signInLink = token ? (
    <a onClick={(e) => e.preventDefault()}>Welcome {customerName}</a>
  ) : (
    <Link to="/login">Sign in</Link>
  );

  return (
    <div className="header">
      <a href="#default" className="logo">
        CompanyLogo
      </a>
      <div className="header-right">
        {signInLink}
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
