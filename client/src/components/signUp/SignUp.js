import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "reactstrap";
import "./SignUp.css";
import Loading from "../loading/Loading";

class SignUp extends React.Component {
  state = {
    username: "",
    password: "",
    name: "",
    rate: "",
    isAdmin: false,
    isActive: true,

    error: false,
    success: false,
    loading: true,
  };

  componentDidMount() {
    this.setState({
      loading: false,
    });
  }

  changeHandler = (e) => {
    let currentName = e.target.name;
    let newState = {};
    newState[currentName] = e.target.value;
    this.setState(newState);
  };

  checkboxChangeHandler = (e) => {
    let currentName = e.target.name;
    let newState = {};
    newState[currentName] = e.target.checked;
    this.setState(newState);
  };

  clearForm = () => {
    this.setState({
      username: "",
      password: "",
      name: "",
      rate: "",
      isAdmin: false,
      isActive: true,
    });
  };

  submitHandler = () => {
    axios
      .post("/api/v1/signup", {
        username: this.state.username,
        password: this.state.password,
        name: this.state.name,
        rate: this.state.rate,
        isAdmin: this.state.isAdmin,
        isActive: this.state.isActive,
      })
      .then((success) => {
        this.setState({
          success: true,
        });
        this.clearForm();
      })
      .catch((error) => {
        console.log("adding a user failed");
        this.setState({
          error: true,
        });
      });
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
                <span>Benutzer anlegen:</span>
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
              <input
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.changeHandler}
                placeholder="Nachname, Vorname"
                className="login-input"
              />
              <input
                type="number"
                name="rate"
                value={this.state.rate}
                onChange={this.changeHandler}
                placeholder="Stundensatz"
                className="login-input"
              />
              <div className="input-group">
                <input
                  type="checkbox"
                  name="isAdmin"
                  id="isAdmin"
                  checked={this.state.isAdmin}
                  onChange={this.checkboxChangeHandler}
                />
                <label htmlFor="isAdmin">Administrator</label>
              </div>
              <div className="input-group">
                <input
                  type="checkbox"
                  name="isActive"
                  id="isActive"
                  checked={this.state.isActive}
                  onChange={this.checkboxChangeHandler}
                />
                <label htmlFor="isActive">Aktiv</label>
              </div>
              <br></br>
              <Button onClick={this.submitHandler} className="button login-btn">
                Benutzer anlegen
              </Button>

              {this.state.error && (
                <div className="alert alert-danger" role="alert">
                  Benutzer wurde nicht gespeichert, bitte erneut versuchen.
                </div>
              )}

              {this.state.success && (
                <div>
                  <div className="alert alert-success" role="alert">
                    Benutzer erfolgreich hinzugef??gt.
                  </div>

                  <Link to={"/"}>Zur??ck zum Log In</Link>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default SignUp;
