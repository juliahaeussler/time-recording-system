import React from 'react'
//import axios from 'axios'
import Navbar from '../navbar/Navbar'


class User extends React.Component {



  render() {

    return (
      <div>
        <Navbar />
        <div className="edit-user"></div>
        <div className="all-users"></div>
        
      </div>
    );
  }

}

export default User;