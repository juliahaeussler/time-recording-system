import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Table } from "reactstrap";
import axios from "axios";
import Navbar from "../navbar/Navbar";
import Pen from "./pen.png";
import Loading from "../loading/Loading";

class Projects extends React.Component {
  state = {
    currentUser: this.props.user,
    projects: [],
    filteredProjects: [],
    loading: true,
    error: false,

    name: "",
    startDate: new Date().toISOString().split("T")[0],
    comment: "",
    projectCode: "",
  };

  clearForm = () => {
    this.setState({
      name: "",
      startDate: "",
      comment: "",
      projectCode: "",
    });
  };

  componentDidMount() {
    axios.get("/api/v1/projekte").then((resp) => {
      this.updateProjects(resp.data);
      this.setState({
        loading: false,
      });
    });
  }

  updateProjects = (data) => {
    this.setState({
      projects: data,
      filteredProjects: data,
    });
  };

  searchProjects = (name) => {
    const filteredProjects = this.state.projects.filter((project) => {
      const lowerCaseProject = project.name.toLowerCase();
      const lowerCaseNameInput = name.toLowerCase();
      return lowerCaseProject.includes(lowerCaseNameInput);
    });
    this.setState({ filteredProjects: filteredProjects });
  };

  handleNameChange = (e) => {
    this.searchProjects(e.target.value);
    let currentName = e.target.name;
    let newState = {};
    newState[currentName] = e.target.value;
    this.setState(newState);
  };

  handleChange = (e) => {
    let currentName = e.target.name;
    let newState = {};
    newState[currentName] = e.target.value;
    this.setState(newState);
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/api/v1/projekte", this.state)
      .then((resp) => {
        console.log(resp.data);
        this.updateProjects(this.state.projects.concat([resp.data]));
        this.clearForm();
      })
      .catch((error) => {
        console.log("adding project failed");
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
      <div className="background">
        <Navbar />
        <Container>
          <Row>
            <Col>
              <div className="card">
                <h3 className="h3Style">
                  <span>Neues Projekt:</span>
                </h3>
                <form onSubmit={this.handleFormSubmit} className="form-card">
                  <label htmlFor="name">Titel</label>
                  <input
                    type="text"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleNameChange}
                  />

                  <label htmlFor="startDate">Beginn</label>
                  <input
                    type="date"
                    name="startDate"
                    value={this.state.startDate}
                    onChange={this.handleChange}
                    className="date-input"
                  />

                  <label htmlFor="projectCode">Projektnummer</label>
                  <input
                    type="text"
                    name="projectCode"
                    value={this.state.projectCode}
                    onChange={this.handleChange}
                  />

                  <label htmlFor="comment">Kommentar</label>
                  <textarea
                    type="text"
                    name="comment"
                    rows="5"
                    value={this.state.comment}
                    onChange={this.handleChange}
                  />

                  <div className="btn-container">
                    <Button type="submit" className="button">
                      Projekt anlegen
                    </Button>
                  </div>

                  {this.state.error && (
                    <div className="alert alert-danger" role="alert">
                      Projekt wurde nicht gespeichert, bitte erneut versuchen.
                    </div>
                  )}
                </form>
              </div>
            </Col>
            <Col>
              <div className="card">
              <h3 className="h3Style">
                  <span>Alle Projekte:</span>
                </h3>
                <Table striped bordered hover>
                  <thead className="thead">
                    <tr>
                      <th>Titel</th>
                      <th>Details/Bearbeiten</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.filteredProjects.map((project) => {
                      return (
                        <tr key={project._id} className="one-project">
                          <td>
                            {project.name}
                            {project.isArchived ? "✓" : ""}
                          </td>
                          <td>
                            <Link to={`/projekte/${project._id}`}>
                              <img className="pen-img" src={Pen} alt="Pen" />
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Projects;
