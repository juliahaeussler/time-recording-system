import React from "react";
import Select from "react-select";
import axios from "axios";
import Navbar from "../navbar/Navbar";

class Analysis extends React.Component {
  state = {
    currentUser: this.props.user,
    projects: [],
    filteredProjects: [],
    loading: true,
    error: false,

    projectName: "",
    projectCode: "",
    isArchived: false,
    projectId: "",
  };

  updateProjects = (data) => {
    this.setState({
      projects: data,
      filteredProjects: data,
    });
  };

  clearForm = () => {
    this.setState({
      name: "",
      projectCode: "",
    });
  };

  componentDidMount() {
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
            name:e.name
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

  handleCheckboxChange = (e) => {
    let currentName = e.target.name;
    let newState = {};
    newState[currentName] = e.target.checked;
    this.setState(newState);
  };

  handleNameChange = (selectedItem) => {
    this.setState({
      projectName: selectedItem.name,
      projectId: selectedItem.id
    })
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

  render() {
   
    return (
      <div>
        <Navbar />

        <div>
          <form onSubmit={this.handleFormSubmit}>
            <label htmlFor="projectName">Projektname</label>
            <Select
              options={this.state.projects}
              onChange={this.handleNameChange}
            />

            <label htmlFor="projectCode">Projektnummer</label>
            <input
              type="text"
              name="projectCode"
              value={this.state.projectCode}
              onChange={this.handleChange}
            />
            <br></br>

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

            <button className="project-btn" type="submit">
              Auswertung
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Analysis;
