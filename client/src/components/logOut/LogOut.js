import React from "react";
import { Link } from "react-router-dom";
import "./LogOut.css";

class LogOut extends React.Component {
  render() {
    return (
      <div className="logout-container">
        <div className="logout-div">
          <h1>Benutzer abgemeldet.</h1>
          <Link to={"/"} className="logout-btn">Zurück zum Log In</Link>
        </div>
      </div>
    );
  }
}

export default LogOut;
