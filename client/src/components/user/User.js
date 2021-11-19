import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import axios from "axios";
import Navbar from "../navbar/Navbar";
import Loading from "../loading/Loading";

import Pen from "./pen.png";
import Check from "./check.png";
import noCheck from "./no-check.png";

class User extends React.Component {
  state = {
    currentUser: this.props.user,
    users: [],
    updatedUser: null,
    loading: true,
    error: false,
  };

  componentDidMount() {
    axios.get("/api/v1/benutzer").then((resp) => {
      console.log(resp.data);
      const updatedUser = resp.data.find((user) => {
        if (this.state.currentUser._id === user._id) {
          return user;
        }
        return user;
      });
      let sorted = resp.data.sort(function compare(user) {
        if (user.isAdmin === true && user.isActive === true) return -1;
        if (user.isAdmin === false && user.isActive === false) return 1;
      });
      this.setState({
        users: sorted,
        updatedUser: updatedUser,
        loading: false,
        error: false,
      });
    });
  }

  handleChange = (event) => {
    let currentName = event.target.name;
    this.setState({
      ...this.state,
      [currentName]: event.target.value,
    });
  };

  updateUser(id, updatedUser) {
    return axios
      .patch(`/api/v1/characters/${id}`, updatedUser)
      .catch((err) => "Benutzer nicht gefunden");
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
  };

  render() {
    if (this.state.loading) {
      return <Loading></Loading>;
    }

    return (
      <div>
        <Navbar />
        <Container>
          <Row>
            <Col>
              <div className="card">
                <div className="card-head">
                  <h3 className="h3Style">
                    <span>
                      Angemeldet als{" "}
                      {this.state.updatedUser
                        ? this.state.updatedUser.username
                        : "unknown user"}
                    </span>
                  </h3>

                  <Link to={`/benutzer/${this.state.updatedUser._id}/bearbeiten`}>
                    <img className="pen-img" src={Pen} alt="Pen" />
                  </Link>
                </div>

                <h4>Name: {this.state.updatedUser.name}</h4>
                <h4>Stundensatz: {this.state.updatedUser.rate.toFixed(2)}€</h4>

                {this.state.updatedUser.isAdmin ? (
                  <h4>
                    <img className="pen-img" src={Check} alt="Check" />{" "}
                    Administrator
                  </h4>
                ) : (
                  <h4>
                    <img className="pen-img" src={noCheck} alt="No-Check" />{" "}
                    Eingeschränkt
                  </h4>
                )}

                {this.state.updatedUser.isActive ? (
                  <h4>
                    <img className="pen-img" src={Check} alt="Check" /> Aktiv
                  </h4>
                ) : (
                  <h4>
                    <img className="pen-img" src={noCheck} alt="No-Check" />{" "}
                    Deaktiviert
                  </h4>
                )}
              </div>
            </Col>
            <Col>
              <div className="card">
                <h3 className="h3Style">
                  <span>Alle Benutzer:</span>
                </h3>
                {this.state.users.map((user) => {
                  return (
                    <div key={user._id} className="user-card">
                      <div>
                        <h4 className="one-user">
                          {user.name}
                        </h4>
                        <h4>({user.username})</h4>
                        <h4>{user.rate.toFixed(2)}€</h4>
                      </div>
                      <div>
                        {this.state.currentUser.isAdmin ? (
                          <Link to={`/benutzer/${user._id}/bearbeiten`}>
                            <img className="pen-img" src={Pen} alt="Pen" />
                          </Link>
                        ) : (
                          ""
                        )}
                        

                        {user.isActive ? (
                          <h4>
                            <img className="pen-img" src={Check} alt="Check" />{" "}
                            Aktiv
                          </h4>
                        ) : (
                          <h4>
                            <img
                              className="pen-img"
                              src={noCheck}
                              alt="No-Check"
                            />{" "}
                            Deaktiviert
                          </h4>
                        )}

                        {user.isAdmin ? (
                          <h4>
                            <img className="pen-img" src={Check} alt="Check" />{" "}
                            Administrator
                          </h4>
                        ) : (
                          <h4>
                            <img
                              className="pen-img"
                              src={noCheck}
                              alt="No-Check"
                            />{" "}
                            Eingeschränkt
                          </h4>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default User;
