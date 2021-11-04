import React from 'react'
import axios from 'axios'
import './Times.css'
import Navbar from '../navbar/Navbar';


class Times extends React.Component {



  render() {

    return (
      <div>
        <Navbar />
        <div className="new-entry">ZEITERFASSUNG</div>
        <div className="today-entries"></div>
      </div>
    );
  }

}

export default Times;