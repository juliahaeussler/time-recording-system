import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
//import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

axios.get("/api/v1/checkuser").then((res) => {
  ReactDOM.render(
    <Router>
      <App user={res.data.userDoc} />
    </Router>,
    document.getElementById("root")
  );
});

//serviceWorker.unregister();