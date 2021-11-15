import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import axios from "axios";
import Navbar from "../navbar/Navbar";


import Pen from "./pen.png";
import Check from './check.png';
import noCheck from './no-check.png';

class User extends React.Component {
  state = {
    currentUser: this.props.user,
    users: [],
    updatedUser: null,
    loading: true,
    error: false,
  };

  componentDidMount() {
    axios.get("/benutzer").then((resp) => {
      console.log(resp.data);
      const updatedUser = resp.data.find((user) => {
        if (this.state.currentUser._id === user._id) {
          return user
        } return user
      });
      this.setState({
        users: resp.data,
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
      .patch(`/characters/${id}`, updatedUser)
      .catch((err) => "Benutzer nicht gefunden");
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
  };

 

  render() {
   
    if (this.state.loading) {
      return (
        <div>
          Inhalte werden geladen.
        </div>
      );
    }
    return (
      <div>
        <Navbar />
        <Container>
          <Row>
            <Col>
            <div className="card">
                <div className="card-head">
                  <h2>
                    Angemeldet als{" "}
                    {this.state.updatedUser
                      ? this.state.updatedUser.username
                      : "unknown user"}
                  </h2>
                  <Link to={`/benutzer/${this.state.updatedUser._id}`}>
                    <img className="pen-img" src={Pen} alt="Pen" />
                  </Link>
                </div>

                <h4>Name: {this.state.updatedUser.name}</h4>
                <h4>Stundensatz: {this.state.updatedUser.rate.toFixed(2)}€</h4>
                
                  {this.state.updatedUser.isAdmin ? <h4><img className="pen-img" src={Check} alt="Check" /> Administrator</h4>  : <h4><img className="pen-img" src={noCheck} alt="No-Check" /> Eingeschränkt</h4>}
                
                  {this.state.updatedUser.isActive ? <h4><img className="pen-img" src={Check} alt="Check" /> Aktiv</h4>  : <h4><img className="pen-img" src={noCheck} alt="No-Check" /> Deaktiviert</h4>}
               

                
              </div>
            </Col>
            <Col>
              <div className="card">
                <h2>Alle Benutzer:</h2>
                {this.state.users.map((user) => {
                  return (
                    <h4 key={user._id} className="one-user">
                      {user.name}

                      <Link to={`/benutzer/${user._id}`}>
                        <img className="pen-img" src={Pen} alt="Pen" />
                      </Link>
                    </h4>
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
