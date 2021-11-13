import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
import Select from "react-select";
import axios from "axios";
import Navbar from "../navbar/Navbar";

class Analysis extends React.Component {
  state = {
    currentUser: this.props.user,
    projects: [],
    users: [],
    loading: true,
    error: false,

    projectName: "",
    projectCode: "",
    startDate: "",
    isArchived: false,
    projectId: "",
    projectComment: "",
  };

  componentDidMount() {
    axios.get("/benutzer").then((resp) => {
      this.updateEntries(resp.data);
    });
    axios
      .get("/projekte")
      .then((resp) => {
        let newData = resp.data.map((e) => {
          return {
            value: e.name,
            id: e._id,
            label: e.name,
            isArchived: e.isArchived,
            projectCode: e.projectCode,
            startDate: e.startDate,
            name: e.name,
          };
        });
        this.setState({
          projects: newData,
          loading: false,
          error: false,
        });
      })
      .catch((error) => {
        console.log("loading projects failed");
        this.setState({
          error: true,
        });
      });
  }

  updateEntries = (data) => {
    this.setState({
      users: data,
    });
  };

  handleCheckboxChange = (e) => {
    let currentName = e.target.name;
    let newState = {};
    newState[currentName] = e.target.checked;
    this.setState(newState);
  };

  handleNameChange = (selectedItem) => {
    this.setState({
      projectName: selectedItem.name,
      projectId: selectedItem.id,
      projectCode: selectedItem.projectCode,
      projectComment: selectedItem.comment,
      startDate: selectedItem.startDate,
    });
  };

  handleChange = (e) => {
    let currentName = e.target.name;
    let newState = {};
    newState[currentName] = e.target.value;
    this.setState(newState);
  };

  //show entries of certain project:
  // 1. chronologically
  // 2. by employees
  //show entries of a certain employee:
  //(default: all projects, option: select 1 or more project)
  //(option: sort by servicePhase)
  // 1. of one week (past week? clarify)
  // 2. of one month

  showDate(date) {
    let d = new Date(date);
    //let startD = `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;
    return d.toLocaleDateString();
  }

  render() {
    
    return (
      <div>
        <Navbar />
        <Container>
          <Row className="one-card">
            <Col>
              <div className="card">
                <div>
                  <form onSubmit={this.handleFormSubmit} className="form-card">
                    <label htmlFor="projectName">Projektname</label>
                    <Select
                      options={this.state.projects}
                      onChange={this.handleNameChange}
                      className="project-input"
                    />

                    <label htmlFor="projectCode">Projektnummer</label>
                    <input
                      type="text"
                      name="projectCode"
                      value={this.state.projectCode}
                      onChange={this.handleChange}
                    />

                    <div>
                      <input
                        type="checkbox"
                        name="isArchived"
                        id="isArchived"
                        checked={this.state.isArchived}
                        onChange={this.handleCheckboxChange}
                      />
                      <label htmlFor="isActive">
                        Archivierte Projekte einschließen
                      </label>
                    </div>
                    <div className="btn-container">
                      <Button className="button login-btn" type="submit">
                        Auswertung
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="card">
                <h3>{this.state.projectName}</h3>
                <h2>{this.showDate(this.state.startDate)}</h2>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Analysis;
