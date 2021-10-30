import React from "react";
import axios from "axios";
import Navbar from "../navbar/Navbar";
import "./Projects.css";

class Projects extends React.Component {
  state = {
    currentUser: this.props.user,
    projects: [],

    name: "",
    startDate: "",
    comment: "",
    projectCode: "",
  };

  componentDidMount() {
    axios.get("/projekte").then((resp) => {
      console.log(resp.data);
      this.setState({
        projects: resp.data,
      });
    });
  }

  handleChange = (e) => {
    let currentName = e.target.name;

    let newState = {};
    newState[currentName] = e.target.value; // newState['title'] / newState['description']

    this.setState(newState);
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    axios.post("/projekte", this.state).then((resp) => {
      console.log(resp.data);     
      this.setState({
        projects: this.state.projects.concat([resp.data]),
      });
    });
  };

  render() {
    return (
      <div>
        <Navbar />
        <div className="projects">
          <div className="project-entry project-box">
            <h2>Neues Projekt:</h2>
            <form onSubmit={this.handleFormSubmit}>
              <label htmlFor="name">Titel</label>
              <input
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
              />
              <br></br>
              <label htmlFor="startDate">Beginn</label>
              <input
                type="date"
                name="startDate"
                value={this.state.startDate}
                onChange={this.handleChange}
              />
              <br></br>
              <label htmlFor="comment">Kommentar</label>
              <input
                type="text"
                name="comment"
                value={this.state.comment}
                onChange={this.handleChange}
              />
              <br></br>
              <label htmlFor="projectCode">Projektnummer</label>
              <input
                type="text"
                name="projectCode"
                value={this.state.projectCode}
                onChange={this.handleChange}
              />
              <br></br>
              {/* <label htmlFor="isActive">aktiv</label>
            <input type="checkbox" name="isActive" id="isActive" checked={this.state.isActive} onChange={this.checkboxHandleChange} /> */}

              <button type="submit">Projekt anlegen</button>
            </form>
          </div>

          {/* Dropdown menu? */}
          <div className="all-projects project-box">
            <h2>Alle Projekte:</h2>
            {this.state.projects.map((project) => {
              return (
                <h4 key={project._id} className="one-project">
                  {project.name}
                </h4>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Projects;
