import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../navbar/Navbar";
import "./Projects.css";
import Pen from "./pen.png";


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
    newState[currentName] = e.target.value; 

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

  // handleOnClick = (projectId) => {
  //   axios.delete("/projekte/" + projectId).then((resp) => {
  //     console.log(resp.data);
  //     this.setState({
  //       projects: this.state.projects.filter((p) => p._id !== projectId),
  //     });
  //   });
  // }

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

              <button className="project-btn" type="submit">
                Projekt anlegen
              </button>
            </form>
          </div>

          
          <div className="all-projects project-box">
            <h2>Alle Projekte:</h2>

            <table className="project-table">
              <thead>
                <tr>
                  <th>Titel</th>
                  <th>Projektnummer</th>
                  {/* <th>Beginn</th> */}
                  <th>Kommentar</th>
                  <th>Details/Bearbeiten</th>
                </tr>
              </thead>
              <tbody>
                {this.state.projects.map((project) => {
                  return (
                    <tr key={project._id} className="one-project">
                      <td>{project.name}</td>
                      <td>{project.projectCode}</td>
                      {/* <th>{project.startDate}</th> */}
                      <td>{project.comment}</td>
                      <td>
                        <Link to={`/projekte/${project._id}`}>
                          <img className="project-img" src={Pen} alt="Pen" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Projects;
