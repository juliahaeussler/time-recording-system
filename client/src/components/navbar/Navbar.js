import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

class Navbar extends React.Component {
  state = {
    currentUser: this.props.user,
  };

  render() {
    return (
      <nav>
        <div>Angemeldet als {this.state.currentUser ? this.state.currentUser.name : 'unknown person'}</div>
        <ul className="nav-list">
          <div className="nav-left">
            <Link to={"/zeiten"} className="nav-link link-1">
              Zeiten
            </Link>
            <Link to={"/projekte"} className="nav-link link-2">
              Projekte
            </Link>
          </div>

          <div className="nav-right">
            <Link to={"/auswertung"} className="nav-link link-1">
              Auswertung
            </Link>
            <Link to={"/benutzer"} className="nav-link link-2">
              Benutzer
            </Link>
            <Link to={"/logout"} className="nav-link nav-logout link-1">
              Abmelden
            </Link>
          </div>
        </ul>

        <div className="mini-div"></div>
      </nav>
    );
  }
}

export default Navbar;
