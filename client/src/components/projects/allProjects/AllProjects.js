import React from "react";
import axios from "axios";

class AllProjects extends React.Component {
  state = {
    currentUser: this.props.user,
    projects: [],
  };

  componentDidMount() {
    axios.get("/projekte").then((resp) => {
      console.log(resp.data);
      this.setState({
        projects: resp.data,
      });
    });
  }


  render() {
    return (
      <div>
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
    );
  }
}

export default AllProjects;
