import React from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
 
} from "reactstrap";
import { Link } from "react-router-dom";
import './Navbar.css';

import Logo from './favicon.jpg'



class NavbarMain extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      currentUser: this.props.user,
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }



  render() {
    return (
      <div>
        <Navbar light expand="sm">
          <div>
          <img className="logo" src={Logo} alt="Next" />
          <Link className="zeiten" to="/zeiten">Zeiten</Link>
          </div>
          <div>
          <NavbarToggler onClick={this.toggle} className="navbar-toggler" />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link to="/projekte" className="nav-right">Projekte</Link>
              </NavItem>
              <NavItem>
                <Link to="/auswertung" className="nav-right">Auswertung</Link>
              </NavItem>
              <NavItem>
                <Link to="/benutzer" className="nav-right">Benutzer</Link>
              </NavItem>
              <NavItem>
                <Link to="/logout" className="nav-right logout">Abmelden</Link>
              </NavItem>
            </Nav>
          </Collapse>
          </div>
        </Navbar>
      </div>
    );
  }
}
export default NavbarMain




