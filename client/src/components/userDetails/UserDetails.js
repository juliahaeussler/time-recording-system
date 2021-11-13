import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import Navbar from "../navbar/Navbar";

class UserDetails extends React.Component {
  state = {
    user: {},
    loading: true,
    error: false,
  };

  componentDidMount() {
    axios.get(`/benutzer/${this.props.match.params.id}`).then((resp) => {
      console.log(resp.data);
      this.setState({
        user: resp.data,
        loading: false,
        error: false,
      });
    });
  }

  showTwoDigits(entry) {
    let r = entry.rate
    return r.toFixed(2);
  }

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
            <Col className="card details">
              <h2>Benutzername: {this.state.user.username}</h2>
              <h4>Name: {this.state.user.name}</h4>
              <h4>Stundensatz: {this.state.user.rate.toFixed(2)}€</h4>
              
              <div className="btn-container">
                <Link
                  to={`/benutzer/${this.state.user._id}/bearbeiten`}
                  className="edit"
                >
                  Bearbeiten
                </Link>
                
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default UserDetails;
