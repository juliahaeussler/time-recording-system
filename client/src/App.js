import React from 'react';
import { Route } from 'react-router-dom';

import './App.css';
import SignUp from './components/signUp/SignUp';
import LogIn from './components/logIn/LogIn';
import Times from './components/times/Times';
import Projects from './components/projects/Projects';
import Analysis from './components/analysis/Analysis';
import User from './components/user/User';
import LogOut from './components/logOut/LogOut';

class App extends React.Component {

  state = {
    currentUser: this.props.user
  }

  loginHandler = (userObj) => {
    this.setState({
      currentUser: userObj
    })
  }

  render() {
    return (
      <div className="App">
        {/* <SignUp />
        <LogIn logInTheUser={this.loginHandler}></LogIn> */}

        <Times />

        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component={LogIn} />
        <Route exact path="/zeiten" component={Times} />
        <Route exact path="/projekte" component={Projects} />
        <Route exact path="/auswertung" component={Analysis} />
        <Route exact path="/benutzer" component={User} />
        <Route exact path="/logout" component={LogOut} />
        
      </div>
    );

  }

}

export default App;
