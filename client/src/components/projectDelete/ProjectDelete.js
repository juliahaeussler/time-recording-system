import React from "react";
import axios from "axios";
import "./ProjectDelete.css";
import Navbar from "../navbar/Navbar";

class ProjectDelete extends React.Component {
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

  handleDelete = () => {
    console.log("props", this.props.match.params.id);

    axios
      .delete(`/projekte/${this.props.match.params.id}/loeschen`)
      .then((resp) => {
        this.setState({
          error: false,
        });
        this.props.history.push("/projekte");
      })
      .catch((error) => {
        console.log("removing failed");
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
            <h4>
              Projekt{" "}
              <span className="project-name">{this.state.project.name}</span>{" "}
              endgültig löschen?
            </h4>
            <div className="btn-container">
              <button className="delete" onClick={this.handleDelete}>
                Löschen
              </button>
              {this.state.error && (
                <div class="alert alert-danger" role="alert">
                  remove button didnt work please try again later
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProjectDelete;
