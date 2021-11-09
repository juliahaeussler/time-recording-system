import React from "react";
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
    projectId: ""
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
        console.log("resp.data ==>", resp.data);
        this.setState({
          projects: resp.data,
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
    let currentName = e.target.name 
    let newState = {}
    newState[currentName] = e.target.checked
    this.setState(newState)
  }

  searchProjects = (name) => {
    const filteredProjects = this.state.projects.filter((project) => {
      const lowerCaseProject = project.name.toLowerCase();
      const lowerCaseNameInput = name.toLowerCase();
      return lowerCaseProject.includes(lowerCaseNameInput);
    });
    this.setState({ filteredProjects: filteredProjects });
  };

  handleNameChange = (e) => {
  
    //this.searchProjects(e.target.value);
    let currentName = e.target.name;
    let newState = {};
    newState[currentName] = e.target.value;
    this.setState(newState,()=>{
      let project = this.state.projects.find(
        (project) => project.name === this.state.projectName
      );
      this.setState({projectId:project._id})
    })

  };

  handleChange = (e) => {
    let currentName = e.target.name;
    let newState = {};
    newState[currentName] = e.target.value;

  
    this.setState(newState);
  };

  render() {
    console.log(this.state)
    return (
      <div>
        <Navbar />

        <div>
          <form onSubmit={this.handleFormSubmit}>
            <label htmlFor="projectName">Projektname</label>
            <input
            list="projects"
              type="text"
              name="projectName"
        
              value={this.state.projectName}
              onChange={this.handleNameChange}
              
            />
            <datalist id="projects">
                {this.state.projects.map((project) => {
                  
                  return (
                    <option key={project._id} value={project.name}></option>
                  );
                })}
              </datalist>
            <br></br>

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
