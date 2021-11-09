import React from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import Navbar from "../navbar/Navbar";
import "./Times.css";
import Pen from "./pen.png";
import Config from "../../configs";

class Times extends React.Component {
  state = {
    currentUser: this.props.user,
    entries: [],
    projects: [],
    
    projectName: "",
    //set default input value to current date: (in format yyyy-mm-dd)
    date: new Date().toISOString().split("T")[0],
    timespan: "",
    servicePhase: "",
    comment: "",
  };

  updateEntries = (data) => {
    this.setState({
      entries: data,
    });
  };

  updateProjects = (data) => {
    this.setState({
      projects: data,
    });
  };

  clearForm = () => {
    this.setState({
      projectName: "",
      date: "",
      timespan: "",
      servicePhase: "",
      comment: "",
    });
  };

  componentDidMount() {
    axios.get("/zeiten").then((resp) => {
      console.log(resp.data);
      this.updateEntries(resp.data);
    });
    axios.get("/projekte").then((resp) => {
      console.log(resp.data);
      this.updateProjects(resp.data);
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
    let project = this.state.projects.find(
      (project) => project.name === this.state.projectName
    );
    if (!project) {
      return;
    }
    axios
      .post("/zeiten", {
        // author: this.state.currentUser._id,
        project: project._id,
        date: this.state.date,
        timespan: this.state.timespan,
        servicePhase: this.state.servicePhase,
        comment: this.state.comment,
      })
      .then((resp) => {
        console.log(resp.data);
        this.updateEntries(this.state.entries.concat([resp.data]));
        this.clearForm();
      });
  };

  showDate(entry) {
    let d = new Date(entry.date);
    //let startD = `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;
    return d.toLocaleDateString();
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="times">
          <div className="time-entry time-box">
            <h2>Neue Zeit erfassen:</h2>
            <form onSubmit={this.handleFormSubmit}>
              <label htmlFor="projectName">Projektname</label>
              <input
                list="projects"
                type="text"
                name="projectName"
                value={this.state.projectName}
                onChange={this.handleChange}
              />
              <datalist id="projects">
                {this.state.projects.map((project) => {
                  return (
                    <option key={project._id} value={project.name}></option>
                  );
                })}
              </datalist>

              <br></br>
              <label htmlFor="date">Datum</label>
              <input
                type="date"
                name="date"
                value={this.state.date}
                onChange={this.handleChange}
              />
              <br></br>
              <label htmlFor="timespan">Dauer</label>
              <input
                type="number"
                name="timespan"
                value={this.state.timespan}
                onChange={this.handleChange}
              />
              <br></br>
              <label htmlFor="servicePhase">Leistungsphase</label>
              <input
                list="servicePhases"
                type="text"
                name="servicePhase"
                value={this.state.servicePhase}
                onChange={this.handleChange}
              />
              <datalist id="servicePhases">
                {Config.servicePhases.map((phase) => {
                  return <option key={phase} value={phase}></option>;
                })}
              </datalist>

              <br></br>
              <label htmlFor="comment">Kommentar</label>
              <input
                type="text"
                name="comment"
                value={this.state.comment}
                onChange={this.handleChange}
              />
              <br></br>

              <button className="project-btn" type="submit">
                Projekt anlegen
              </button>
            </form>
          </div>

          <div className="all-projects project-box">
            <h2>Erfasste Zeiten:</h2>

            <table className="project-table">
              <thead>
                <tr>
                  <th>Datum</th>
                  <th>Projekt</th>
                  <th>Dauer</th>
                  <th>Kommentar</th>
                  <th>Bearbeiten</th>
                </tr>
              </thead>
              <tbody>
                {this.state.entries.map((entry) => {
                  return (
                    <tr key={entry._id} className="one-project">
                      <td>{this.showDate(entry)}</td>
                      <td>{entry.project.name}</td>
                      <td>{entry.timespan}</td>
                      <td>{entry.comment ? entry.comment : "/"}</td>
                      <td>
                        <Link to={`/zeiten/${entry._id}`}>
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

export default Times;
