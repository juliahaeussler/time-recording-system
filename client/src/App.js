import React from "react";
import { Switch, Route } from "react-router-dom";

import "./App.css";
//import Start from "./components/start/Start";
import SignUp from "./components/signUp/SignUp";
import LogIn from "./components/logIn/LogIn";
import Times from "./components/times/Times";
import Projects from "./components/projects/Projects";
import ProjectDetails from './components/projectDetails/ProjectDetails';
import ProjectEdit from './components/projectEdit/ProjectEdit';
import ProjectDelete from './components/projectDelete/ProjectDelete'
import Analysis from "./components/analysis/Analysis";
import User from "./components/user/User";
import UserDetails from './components/userDetails/UserDetails'
import LogOut from "./components/logOut/LogOut";


class App extends React.Component {
  state = {
    currentUser: this.props.user,
  };

  loginHandler = (userObj) => {
    console.log("===>",userObj)
    this.setState({
      currentUser: userObj,
    });
  };

  render() {
    return (
      <div className="App">
        <Switch>

        <Route exact path="/" component={({ history }) => (<LogIn history={history} logInTheUser={this.loginHandler}></LogIn>)} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/zeiten" component={Times} />
        <Route exact path="/projekte" component={Projects} />
        <Route exact path="/projekte/:id" component={ProjectDetails} />
        <Route exact path="/projekte/:id/bearbeiten" component={ProjectEdit} />
        <Route exact path="/projekte/:id/loeschen" component={ProjectDelete} />
        <Route exact path="/auswertung" component={Analysis} />
        <Route exact path="/benutzer" component={() => <User user={this.state.currentUser}></User>} />
        <Route exact path="/user/:id" component={UserDetails} />
        <Route exact path="/logout" component={LogOut} />

        </Switch>
      </div>
    );
  }
}

export default App;