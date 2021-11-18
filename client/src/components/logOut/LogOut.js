import React from "react";
import Loading from "../loading/Loading";

import "./LogOut.css";

class LogOut extends React.Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    this.setState({
      loading: false,
    });
  }

  render() {
    if (this.state.loading) {
      return <Loading></Loading>;
    }
    return (
      <div className="card loading">
        <h1>Benutzer abgemeldet.</h1>
      </div>
    );
  }
}

export default LogOut;
