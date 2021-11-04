import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./ProjectDetail.css";
import Navbar from "../navbar/Navbar";

class ProjectDetails extends React.Component {
  state = {
    project: {},
  };

  componentDidMount() {
    axios.get(`/projekte/${this.props.match.params.id}`).then((resp) => {
      console.log(resp.data);
      this.setState({
        project: resp.data,
      });
    });
  }

  showDate() {
    let d = new Date(this.state.project.startDate);
    let startD = `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;
    return startD;
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="project-container">
          <div className="project-details">
            <h2>Titel: {this.state.project.name}</h2>
            <h4>
              Projektnummer:{" "}
              {this.state.project.projectCode
                ? this.state.project.projectCode
                : "/"}
            </h4>
            <h4>Startdatum: {this.showDate()} </h4>
            <h4>
              Kommentar:
              {this.state.project.comment ? this.state.project.comment : "/"}
            </h4>
            <div className="btn-container">
              <button className="edit" onClick={this.editHandler}>Bearbeiten</button>
              <Link to={`/projekte/${this.state.project._id}/loeschen`} className="delete">Löschen</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProjectDetails;
