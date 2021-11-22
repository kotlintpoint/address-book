import logo from "./logo.svg";
import "./App.css";
import { Header, Footer, WrapContext, PrivateRoute } from "./Components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home, AddressBook, Login, NewAddress } from "./Screens";

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
