import React from "react";
import axios from "axios";
import Navbar from '../navbar/Navbar'

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

  render() {
    return (
      <div>
        <Navbar />
        <div>
          <h2>Titel: {this.state.project.name}</h2>
          <h4>Projektnummer: {this.state.project.projectCode}</h4>
          <h4>Kommentar: {this.state.project.comment}</h4>
        </div>
      </div>
    );
  }
}

export default ProjectDetails;
