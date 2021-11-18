import React from "react";
import { Switch, Route } from "react-router-dom";

import "./App.css";
import SignUp from "./components/signUp/SignUp";
import LogIn from "./components/logIn/LogIn";

import Times from "./components/times/Times";
import TimesDetails from "./components/timesDetails/TimesDetails";
import TimeDelete from "./components/timeDelete/TimeDelete";

import Projects from "./components/projects/Projects";
import ProjectDetails from "./components/projectDetails/ProjectDetails";
import ProjectEdit from "./components/projectEdit/ProjectEdit";
import ProjectDelete from "./components/projectDelete/ProjectDelete";

import Analysis from "./components/analysis/Analysis";

import User from "./components/user/User";
import UserDetails from "./components/userDetails/UserDetails";
import UserEdit from "./components/userEdit/UserEdit";

import LogOut from "./components/logOut/LogOut";

class App extends React.Component {
  state = {
    currentUser: this.props.user,
  };

  loginHandler = (userObj) => {
    console.log("===>", userObj);
    this.setState({
      currentUser: userObj,
    });
  };

  render() {
    return (
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            component={({ history }) => (
              <LogIn history={history} logInTheUser={this.loginHandler}></LogIn>
            )}
          />
          <Route exact path="/signup" component={SignUp} />

          <Route
            exact
            path="/zeiten"
            component={() => <Times user={this.state.currentUser}></Times>}
          />
          <Route exact path="/zeiten/:id" component={TimesDetails} />
          <Route exact path="/zeiten/:id/loeschen" component={TimeDelete} />

          <Route exact path="/projekte" component={Projects} />
          <Route exact path="/projekte/:id" component={ProjectDetails} />
          <Route
            exact
            path="/projekte/:id/bearbeiten"
            component={ProjectEdit}
          />
          <Route
            exact
            path="/projekte/:id/loeschen"
            component={ProjectDelete}
          />

          <Route exact path="/auswertung" component={() => <Analysis user={this.state.currentUser}></Analysis>} />

          <Route
            exact
            path="/benutzer"
            component={() => <User user={this.state.currentUser}></User>}
          />
          <Route exact path="/benutzer/:id" component={() => <UserDetails user={this.state.currentUser}></UserDetails>} />
          <Route exact path="/benutzer/:id/bearbeiten" component={UserEdit} />

          <Route exact path="/logout" component={LogOut} />
        </Switch>
      </div>
    );
  }
}

export default App;
