import React from 'react'
import { Link } from "react-router-dom";
import axios from 'axios'
import Navbar from '../navbar/Navbar'
import './User.css'

import Pen from './pen.png'

class User extends React.Component {
  state = {
    currentUser: this.props.user,
    users: [],
  };

  componentDidMount() {
    axios.get("/benutzer").then((resp) => {
      console.log(resp.data);
      this.setState({
        users: resp.data,
      });
    });
  }

  handleChange = (event) => {
    let currentName = event.target.name
    this.setState({ 
      ...this.state, [currentName]: event.target.value 
    });
  }

  updateUser (id, updatedUser) {
    return axios.patch(`/characters/${id}`, updatedUser)
      .catch((err) => 'Benutzer nicht gefunden')
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    
    
  };
  



  render() {
    return (
      <div>
        <Navbar />
        <div className="user">
          <div className="edit-user user-box">
          <div className="user-head">
          <h2>
              Angemeldet als{" "}
              {this.state.currentUser
                ? this.state.currentUser.username
                : "unknown user"}
            </h2>
            <Link to={`/benutzer/${this.state.currentUser._id}`}><img className="pen" src={Pen} alt="Pen" /></Link>
          </div>

            <h4>Name: {this.state.currentUser.name}</h4>
            <h4>Stundensatz: {this.state.currentUser.rate}</h4>
            <h4>Administrator: {this.state.currentUser.isAdmin ? 'Ja' : 'Nein'}</h4>
            <h4>Aktiv: {this.state.currentUser.isActive ? 'Ja' : 'Nein'}</h4>
                

            {/* <form onSubmit={this.handleFormSubmit}>
                <label>Name:</label>
                <input type="text" name="name" onChange={this.handleChange} value={this.state.name}></input>
                <br></br>
                <label>Rate:</label>
                <input type="number" name="rate" onChange={this.handleChange} value={this.state.rate}></input>
                <br></br> 
            </form> */}
          </div>

          <div className="all-users user-box">
            <h2>Alle Benutzer:</h2>
            {this.state.users.map((user) => {
              return (
                <h4 key={user._id} className="one-user">
                  {user.name}
                  
                  <Link to={`/benutzer/${user._id}`}><img className="pen" src={Pen} alt="Pen" /></Link>
                  
                </h4>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default User;

