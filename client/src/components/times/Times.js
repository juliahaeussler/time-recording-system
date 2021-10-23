import React from 'react'
import axios from 'axios'

import Navbar from '../navbar/Navbar';


class Times extends React.Component {



  render() {

    return (
      <div>
        <Navbar />
        <div className="new-entry"></div>
        <div className="today-entries"></div>
      </div>
    );
  }

}

export default Times;