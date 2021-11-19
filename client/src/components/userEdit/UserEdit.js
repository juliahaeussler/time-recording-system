import React from "react";
import axios from "axios";
import { Container, Row, Col, Button } from "reactstrap";
import Navbar from "../navbar/Navbar";
import Loading from "../loading/Loading";

class UserEdit extends React.Component {
  state = {
    user: {},
    error: false,
    loading: true,

    username: "",
    name: "",
    rate: "",
    isActive: false,
    isAdmin: false,
  };

  componentDidMount() {
    axios.get(`/api/v1/benutzer/${this.props.match.params.id}`).then((resp) => {
      console.log(resp.data);
      this.setState({
        username: resp.data.username,
        name: resp.data.name,
        rate: resp.data.rate,
        isActive: resp.data.isActive,
        isAdmin: resp.data.isAdmin,
        loading: false,
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

  handleCheckboxChange = (e) => {
    let currentName = e.target.name;
    this.setState({
      ...this.state,
      [currentName]: e.target.checked,
    });
  };

  handleEditSubmit = (event) => {
    event.preventDefault();
    axios
      .patch(`/api/v1/benutzer/${this.props.match.params.id}/bearbeiten`, {
        username: this.state.username,
        name: this.state.name,
        rate: this.state.rate,
        isActive: this.state.isActive,
        isAdmin: this.state.isAdmin,
      })
      .then((resp) => {
        this.props.history.push(`/benutzer`);
      })
      .catch((error) => {
        console.log("editing failed");
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
        <Navbar />
        <Container>
          <Row>
            <Col className="one-card">
              <div className="card edit-card">
                <h3>Benutzer bearbeiten</h3>
                <form onSubmit={this.handleEditSubmit} className="form-card">
                  <label htmlFor="username">Benutzername:</label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={this.state.username}
                    onChange={this.handleChange}
                  />
                  <label htmlFor="projectCode">Name:</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                  />
                  <label htmlFor="rate">Stundensatz</label>
                  <input
                    type="number"
                    name="rate"
                    id="rate"
                    value={this.state.rate}
                    onChange={this.handleChange}
                  />

                  <div className="input-group">
                    <input
                      type="checkbox"
                      name="isAdmin"
                      id="isAdmin"
                      checked={this.state.isAdmin}
                      onChange={this.handleCheckboxChange}
                    />
                    <label htmlFor="isAdmin">Administrator</label>
                  </div>
                  <div className="input-group">
                    <input
                      type="checkbox"
                      name="isActive"
                      id="isActive"
                      checked={this.state.isActive}
                      onChange={this.handleCheckboxChange}
                    />
                    <label htmlFor="isActive">Aktiv</label>
                  </div>

                  <div className="btn-container">
                    <Button type="submit" className="button">
                      Änderungen speichern
                    </Button>
                  </div>
                </form>

                {this.state.error && (
                  <div className="alert alert-danger" role="alert">
                    Änderungen wurden nicht gespeichert, bitte erneut versuchen.
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default UserEdit;
