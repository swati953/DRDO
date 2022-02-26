import logo from "./logo.svg";
import "./App.css";
import Login from "./component/Login";
import Sign from "./component/Sign";
import Additem from "./adminWork/Additem";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import Itemstate from "./context/items/Itemstate";
import Authstate from "./context/authentication/Authstate";
import Navbar from "./component/Navbar";
import Alogin from "./component/Alogin";
import Alert from "./component/Alert";
import { useState } from "react";
import Ahome from "./adminWork/Ahome";
import Iedit from "./adminWork/Iedit";
import Uhome from "./userwork/Uhome";
import Addtocart from "./userwork/Addtocart";

import Userstate from "./context/usercart/Userstate";
import CustomerOrderState from "./context/customerOrders/CustomerOrdersState";

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 15000);
  };

  return (
    <Authstate>
      <Userstate>
        <Itemstate>
          <CustomerOrderState>
            <Router>
              <Navbar />
              <Alert alert={alert} />
              <Switch>
                <Route exact path="/">
                  <Login showAlert={showAlert} />
                </Route>

                <Route exact path="/alogin">
                  <Alogin showAlert={showAlert} />
                </Route>
                <Route exact path="/sign">
                  <Sign showAlert={showAlert} />
                </Route>
                <Route exact path="/login">
                  <Login showAlert={showAlert} />
                </Route>
                <Route exact path="/additem">
                  <Additem />
                </Route>
                <Route exact path="/edit">
                  <Iedit />
                </Route>
                <Route exact path="/ahome">
                  <Ahome />
                </Route>
                <Route exact path="/uhome">
                  <Uhome />
                </Route>
                <Route exact path="/addtocart">
                  <Addtocart />
                </Route>
              </Switch>
            </Router>
          </CustomerOrderState>
        </Itemstate>
      </Userstate>
    </Authstate>
  );
}

export default App;
