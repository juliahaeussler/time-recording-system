import React from "react";
import axios from "axios";
import "./LogIn.css";
import { Link } from "react-router-dom";

class Login extends React.Component {
  state = {
    username: "",
    password: "",
  };

  changeHandler = (e) => {
    let currentName = e.target.name;
    let newState = {};
    newState[currentName] = e.target.value;
    this.setState(newState);
  };

  submitHandler = () => {
    axios
      .post("/login", {
        username: this.state.username,
        password: this.state.password,
      })
      .then((resp) => {
        let data = resp.data;

        let user = data.user;

        this.props.logInTheUser(user);

        this.props.history.push("/zeiten");
      });
  };

  render() {
    console.log("props", this.props);

    return (
      <div className="login-form">
        <h3>Anmelden</h3>
        <input
          type="text"
          name="username"
          value={this.state.username}
          onChange={this.changeHandler}
          placeholder="Benutzername"
        />
        <input
          type="password"
          name="password"
          value={this.state.password}
          onChange={this.changeHandler}
          placeholder="Passwort"
        />
        <button onClick={this.submitHandler}>LOG IN</button>

        <div className="link-box">
          <Link to={"/signup"}>Benutzer hinzufügen</Link>
        </div>
      </div>
    );
  }
}

export default Login;
