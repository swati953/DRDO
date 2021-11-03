import logo from "./logo.svg";
import "./App.css";
import Login from "./component/Login";
import Sign from "./component/Sign";
import Additem from "./adminWork/Additem";
import Fetchitems from "./userwork/Fetchitems";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Itemstate from "./context/items/Itemstate";
import Navbar from "./component/Navbar";
import Alogin from "./component/Alogin";
import Alert from "./component/Alert";
import { useState } from "react";
import Sidebar from "./adminWork/Sidebar";
import Ahome from "./adminWork/Ahome";
import Iedit from "./adminWork/Iedit";

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
    <Itemstate>
      <Router>
        <Navbar />
        <Alert alert={alert} />
        <Switch>
          <Route exact path="/">
            <Fetchitems />
          </Route>
          <Route exact path="/fetch">
            <Fetchitems />
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
        </Switch>
      </Router>
    </Itemstate>
  );
}

export default App;
