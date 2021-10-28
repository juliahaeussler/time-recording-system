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
      isOpen: false
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
        <Navbar light expand="sm" >
          <div>
          <img className="logo" src={Logo} alt="Next" />
          <Link className="zeiten" to="/zeiten">Zeiten</Link>
          
          </div>
          <div>
          <NavbarToggler onClick={this.toggle} className="navbar-toggler" />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link to="/projekte">Projekte</Link>
              </NavItem>
              <NavItem>
                <Link to="/auswertung">Auswertung</Link>
              </NavItem>
              <NavItem>
                <Link to="/Benutzer">Benutzer</Link>
              </NavItem>
              <NavItem>
                <Link to="/logout">Abmelden</Link>
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
// import React from "react";
// import { Link } from "react-router-dom";
// import "./Navbar.css";

// class Navbar extends React.Component {
//   state = {
//     currentUser: this.props.user,
//   };

//   render() {
//     return (
//       <nav>
//         <div>Angemeldet als {this.state.currentUser ? this.state.currentUser.name : 'unknown person'}</div>
//         <ul className="nav-list">
//           <div className="nav-left">
//           <div><Link to={"/zeiten"} className="nav-link link-1">
//               Zeiten
//             </Link></div>
//           <div><Link to={"/projekte"} className="nav-link link-2">
//               Projekte
//             </Link></div>
//           </div>

//           <div className="nav-right">
//             <Link to={"/auswertung"} className="nav-link link-1">
//               Auswertung
//             </Link>
//             <Link to={"/benutzer"} className="nav-link link-2">
//               Benutzer
//             </Link>
//             <Link to={"/logout"} className="nav-link nav-logout link-1">
//               Abmelden
//             </Link>
//           </div>
//         </ul>

//         <div className="mini-div"></div>
//       </nav>
//     );
//   }
// }

// export default Navbar;
