import React from 'react'
import axios from 'axios'
import Navbar from '../navbar/Navbar'
import './User.css'

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
            <h2>
              Angemeldet als{" "}
              {this.state.currentUser
                ? this.state.currentUser.username
                : "unknown user"}
            </h2>
            <form onSubmit={this.handleFormSubmit}>
                <label>Name:</label>
                <input type="text" name="name" onChange={this.handleChange} value={this.state.name}></input>
                <br></br>
                <label>Rate:</label>
                <input type="number" name="rate" onChange={this.handleChange} value={this.state.rate}></input>
                <br></br>
                
            </form>
          </div>

          <div className="all-users user-box">
            <h2>Alle Benutzer:</h2>
            {this.state.users.map((user) => {
              return (
                <h4 key={user._id} className="one-user">
                  {user.name}
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