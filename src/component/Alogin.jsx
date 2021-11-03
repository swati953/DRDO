import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "../App.css";
export default function Alogin(props) {
  let history = useHistory();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/loginA`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //redirect to notes or home screen
      localStorage.setItem("token", json.authtoken);
      console.log(json.authtoken);
      props.showAlert("Welcome Admin","primary");
      history.push("/ahome");
    }
    else
    {
        props.showAlert("Only Admin can login here","danger");
    }
    
  };
  const onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <div className="wrapper">
        <div className="title">
          <span>Login Form</span>
        </div>
        <form onSubmit={handleSubmit} novalidate>
          <div className="row">
            <i className="fas fa-user"></i>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              aria-describedby="emailHelp"
              value={credentials.email}
              onChange={onchange}
              required
            />
          </div>
          <div className="row">
            <i className="fas fa-lock"></i>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={credentials.password}
              onChange={onchange}
              required
            />
          </div>

          <div className="row button">
            <input type="submit" value="Login" />
          </div>
          <div className="signup-link">
            Not a member?
            {/* <Link to="/sign">Signup now</Link> */}
          </div>
        </form>
      </div>
    </div>
  );
}
