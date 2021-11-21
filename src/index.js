import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ApolloProvider } from "@apollo/react-hooks";
//import ApolloClient from "apollo-boost";
import { WrapContext } from "./Components";
import { useGlobalContext } from "./Components/WrapContext";
import { getAuthToken } from "./token";
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "https://rjstest.seepossible.link/graphql",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = getAuthToken();
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

/*const client = new ApolloClient({
  uri: "https://rjstest.seepossible.link/graphql",
  fetchOptions: () => {
    const token = getAuthToken();
    console.log(token);
    alert(token);
    return {
      headers: { authorization: token ? `Bearer ${token}` : "" },
    };
  },
  exchanges: [dedupExchange, fetchExchange],
});*/

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
