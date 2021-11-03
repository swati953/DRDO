import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

export default function Sign(props) {
  let history = useHistory();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
      //   body: JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password})
    });
    const json = await response.json();
    if (json.success) {
      //redirect to notes or home screen
      localStorage.setItem("token", json.authtoken);
      props.showAlert("Thank you for being a part of us..", "primary");
      history.push("/fetch");
    } else {
      props.showAlert(
        "User with the given details is already exist, kindly please login",
        "danger"
      );
    }
  };
  const onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="container">
      <div className="wrapper">
        <div className="title">
          <span>Sign up</span>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <i className="fas fa-user"></i>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              aria-describedby="emailHelp"
              onChange={onchange}
            />
          </div>
          <div className="row">
            <i className="fas fa-user"></i>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              aria-describedby="emailHelp"
              onChange={onchange}
            />
          </div>
          <div className="row">
            <i className="fas fa-lock"></i>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              minLength={5}
              required
              onChange={onchange}
            />
          </div>
          <div className="row button">
            <input type="submit" value="sign" />
          </div>
          <div className="signup-link">
            Already a member?
            {/* <Link to="/">Login now</Link> */}
          </div>
        </form>
      </div>
    </div>
  );
}
