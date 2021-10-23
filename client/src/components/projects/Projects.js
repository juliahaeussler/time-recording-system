import React from 'react'
import axios from 'axios'
import Navbar from '../navbar/Navbar'


class Projects extends React.Component {



  render() {

    return (
      <div>
        <Navbar />
        <div className="project-entry"></div>


        {/* Dropdown menu? */}
        <div className="all-projects"></div>
      </div>
    );
  }

}

export default Projects;