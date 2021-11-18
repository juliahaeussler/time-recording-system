import React from "react";
import { Spinner } from "reactstrap";

class Loading extends React.Component {
  render() {
    return (
      <div className="card">
        <div className="loading">
          <Spinner color="info" type="grow">
            Loading...
          </Spinner>
          <h1>Inhalte werden geladen.</h1>
        </div>
        ;
      </div>
    );
  }
}

export default Loading;
