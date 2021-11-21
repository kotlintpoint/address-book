import logo from "./logo.svg";
import "./App.css";
import { Header, Footer, WrapContext } from "./Components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddressBook from "./Screens/AddressBook";
import Login from "./Screens/Login";
import NewAddress from "./Screens/NewAddress";
import Home from "./Screens/Home";
import PrivateRoute from "./Components/PrivateRoute";

function App() {
  return (
    <WrapContext>
      <Router>
        <Header></Header>
        <Switch>
          <PrivateRoute path="/address-book">
            <AddressBook></AddressBook>
          </PrivateRoute>
          <Route path="/login">
            <Login></Login>
          </Route>
          <PrivateRoute path="/new-address">
            <NewAddress></NewAddress>
          </PrivateRoute>
          <Route path="/">
            <Home></Home>
          </Route>
        </Switch>
        <Footer></Footer>
      </Router>
    </WrapContext>
  );
}

export default App;
