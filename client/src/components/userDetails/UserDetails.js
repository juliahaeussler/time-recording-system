import React from "react";
import axios from "axios";
import Navbar from "../navbar/Navbar";
import "./UserDetails.css";

class UserDetails extends React.Component {
    state = {
        user: {},
      };
    
      componentDidMount() {
        axios.get(`/benutzer/${this.props.match.params.id}`).then((resp) => {
          console.log(resp.data);
          this.setState({
            user: resp.data,
          });
        });
      }
    
      render() {
        return (
          <div>
            <Navbar />
            <div>
              <h2>Bentzername: {this.state.user.username}</h2>
              <h4>Name: {this.state.user.name}</h4>
              <h4>Stundensatz: {this.state.user.rate}</h4>
            </div>
          </div>
        );
      }
}

export default UserDetails;
