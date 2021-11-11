import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "reactstrap";

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
      <div>
        <Container>
          <Row>
            <Col className="card one-card login details">
              <h3>Anmelden</h3>
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.changeHandler}
                placeholder="Benutzername"
                className="login-input"
              />
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.changeHandler}
                placeholder="Passwort"
                className="login-input"
              />

              <Button onClick={this.submitHandler} className="button login-btn">
                LOG IN
              </Button>

              <Link to={"/signup"}>Benutzer hinzufügen</Link>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
