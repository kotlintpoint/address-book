import { useLazyQuery, useMutation } from "@apollo/client";

import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../Components/WrapContext";

import { LOGIN } from "../Queries";
import { useHistory } from "react-router-dom";
import { getAuthToken, setAuthToken } from "../token";

function Login() {
  /*
    roni_cost@example.com
    roni_cost3@example.com
    */

  const [errorMessage, setErrorMessage] = useState("");
  const [generateCustomerToken, { error, loading }] = useMutation(LOGIN);

  //   if (loading) return 'Submitting...';
  //   if (error) return `Submission error! ${error.message}`;

  const [user, setUser] = useState({
    email: "roni_cost@example.com",
    password: "roni_cost3@example.com",
  });

  //const [token, setToken] = useState(null);
  const { setToken } = useGlobalContext();

  useEffect(() => {
    const token = getAuthToken();
    console.log(token);
    if (token) {
      setToken(token);
      history.push("/address-book");
    }
  }, []);

  const history = useHistory();

  const changeHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(user);
    //addTodo({ variables: { text: input.value } });
    try {
      const result = await generateCustomerToken({ variables: user });
      console.log(result);
      // Save to Context
      setToken(result.data.generateCustomerToken.token);
      // Save to Local Storage
      setAuthToken(result.data.generateCustomerToken.token);
      history.push("/address-book");
    } catch (error) {
      console.log(JSON.stringify(error));
      setErrorMessage(error.message);
      setTimeout(() => setErrorMessage(""), 2000);
    }
  };

  //   console.log(sessionStorage.getItem("token"));
  //   if (token) {
  //     navigate("/address-book");
  //   }
  //   console.log(data);

  return (
    <>
      {errorMessage && (
        <div id="error-snackbar" className="show">
          {errorMessage}
        </div>
      )}
      <h3 style={{ textAlign: "center" }}>Customer Login Page</h3>
      <div className="login-container">
        {loading && <div className="loader"></div>}
        <form onSubmit={submitHandler}>
          <div className="container">
            <label htmlFor="email">
              <b>Email</b>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              onChange={changeHandler}
              value={user.email}
              required
            />
            <label htmlFor="password">
              <b>Password</b>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              onChange={changeHandler}
              value={user.password}
              required
            />
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
