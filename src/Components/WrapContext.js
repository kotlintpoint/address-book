import React, { useContext, useEffect, useReducer } from "react";
import reducer from "../Components/WrapReducer";

const AppContext = React.createContext();

const initialState = {
  token: "",
  customerName: "",
};

export const WrapContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setToken = (token) => {
    dispatch({ type: "LOGIN", token });
  };

  const setCustomerName = (customerName) => {
    dispatch({ type: "SET_NAME", customerName });
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AppContext.Provider
      value={{ ...state, setToken, setCustomerName, logout }}
    >
      {" "}
      {children}{" "}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
