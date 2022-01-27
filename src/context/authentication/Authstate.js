import React from "react";
import { useHistory } from "react-router";
import { useState } from "react/cjs/react.development";

import Authcontext from "./Authcontext";

const Authstate = (props) => {
    let history = useHistory();
  const host = "http://localhost:5000";
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const login = async (email, password) => {
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //redirect to notes or home screen
      localStorage.setItem("token", json.authtoken);
      return json.success;
    }
    else
    {
        // props.showAlert("Please Login with the correct Email and Password","danger");
        history.push("/");
    }
    
  };
  return (
    <Authcontext.Provider value={{ credentials, login }}>
      {" "}
      {props.children}
    </Authcontext.Provider>
  );
};
export default Authstate;
