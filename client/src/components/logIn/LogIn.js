import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "reactstrap";
import Loading from "../loading/Loading";

class Login extends React.Component {
  state = {
    username: "",
    password: "",
    error: false,
    laoding: true,
  };

  componentDidMount() {
    this.setState({
      loading: false,
      error: false,
    });
  }

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
      })
      .catch((error) => {
        console.log("login failed");
        this.setState({
          error: true,
        })
      })
  };

  render() {
    if (this.state.loading) {
      return <Loading></Loading>;
    }

    return (
      <div>
        <Container>
          <Row>
            <Col className="card one-card login details">
            
            <h3 className="h3Style">
                  <span>Anmelden</span>
                </h3>
              <br></br>
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
              <br></br>

              <Button onClick={this.submitHandler} className="button login-btn">
                LOG IN
              </Button>

              {this.state.error && (
                <div className="alert alert-danger" role="alert">
                  Login nicht möglich, bitte erneut versuchen.
                </div>
              )}

              <Link to={"/signup"}>Benutzer hinzufügen</Link>
          
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
