import React from "react";
import axios from "axios";
//import "./ProjectEdit.css";
import Navbar from "../navbar/Navbar";

class ProjectEdit extends React.Component {
  state = {
    project: {},
    error: false,
  };

  componentDidMount() {
    axios.get(`/projekte/${this.props.match.params.id}`).then((resp) => {
      console.log(resp.data);
      this.setState({
        project: resp.data,
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

  handleEditSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`/projekte/${this.props.match.params.id}/bearbeiten`)
      .then((resp) => {
        this.setState({
          project: resp.data,
          error: false,
        });
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
        <div className="delete-container">
          <div className="delete-box">
            <form onSubmit={this.handleEditSubmit}>
              <label htmlFor="name">Titel:</label>
              <input
                type="text"
                name="name"
                id="name"
                value={this.state.project.name}
                onChange={this.handleChange}
              />
              <label htmlFor="projectCode">Projektnummer:</label>
              <input
                type="text"
                name="projectCode"
                id="projectCode"
                value={this.state.project.projectCode}
                onChange={this.handleChange}
              />
              <label htmlFor="comment">Titel</label>
              <input
                type="text"
                name="comment"
                id="comment"
                value={this.state.project.comment}
                onChange={this.handleChange}
              />

              {/* <div>
                <input
                  type="checkbox"
                  name="isArchived"
                  id="isArchived"
                  checked={this.state.isArchived}
                  onChange={this.checkboxChangeHandler}
                />
                <label htmlFor="isArchived">Archivieren</label>
              </div> */}
              <button type="submit">Änderungen speichern</button>
            </form>

            {this.state.error && (
              <div className="alert alert-danger" role="alert">
                edit button didnt work please try again later
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ProjectEdit;
