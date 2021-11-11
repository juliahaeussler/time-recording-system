import React from "react";
import axios from "axios";
import { Container, Row, Col, Button } from "reactstrap";
import Navbar from "../navbar/Navbar";

class ProjectEdit extends React.Component {
  state = {
    project: {},
    error: false,

    name: "",
    projectCode: "",
    comment: "",
    isArchived: ""
  };

  componentDidMount() {
    axios.get(`/projekte/${this.props.match.params.id}`).then((resp) => {
      console.log(resp.data);
      this.setState({
        name: resp.data.name,
        projectCode: resp.data.projectCode,
        comment: resp.data.comment,
        isArchived: resp.data.isArchived
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
    let currentName = e.target.name 
    this.setState({
      ...this.state,
      [currentName]: e.target.checked,
    })
  }

  handleEditSubmit = (event) => {
    event.preventDefault();
    axios
      .patch(`/projekte/${this.props.match.params.id}/bearbeiten`, {
        name: this.state.name,
        projectCode: this.state.projectCode,
        comment: this.state.comment,
        isArchived:this.state.isArchived
      })
      .then((resp) => {
        this.props.history.push(`/projekte/${this.props.match.params.id}`);
      })
      .catch((error) => {
        console.log("editing failed");
        this.setState({
          error: true,
        });
      });
  };

  render() {

    return (
      <div>
        <Navbar />
        <Container>
          <Row>
            <Col className="one-card">
              <div className="card edit-card">
                <h3>Projekt bearbeiten</h3>
                <form onSubmit={this.handleEditSubmit} className="form-card">
                  <label htmlFor="name">Titel:</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                  />
                  <label htmlFor="projectCode">Projektnummer:</label>
                  <input
                    type="text"
                    name="projectCode"
                    id="projectCode"
                    value={this.state.projectCode}
                    onChange={this.handleChange}
                  />
                  <label htmlFor="comment">Kommentar</label>
                  <input
                    type="text"
                    name="comment"
                    id="comment"
                    value={this.state.comment}
                    onChange={this.handleChange}
                  />

                  <label htmlFor="isArchived">Archivieren</label>
                  <input
                    type="checkbox"
                    name="isArchived"
                    id="isArchived"
                    checked={this.state.isArchived}
                    onChange={this.handleCheckboxChange}
                  />

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

export default ProjectEdit;
