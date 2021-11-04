import React from "react";
import { Link } from "react-router-dom";
import "./Start.css";
import LogIn from '../logIn/LogIn'

const Start = () => {
  return (
    <div className="start">
      <div className="box login">
        <LogIn></LogIn>
      </div>
      <div className="box">
        <Link to={"/signup"}>Benutzer hinzufügen</Link>
      </div>
    </div>
  );
};

export default Start;
