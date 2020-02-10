import React, { Component } from "react";
import { render } from "react-dom";
import { Link } from "react-router-dom";

import './Navigation.css';

let Navigation = props => {
  let { authenticated, handleLogoutMethod } = props;
  let handleLogout = () => {
    handleLogoutMethod();
  };
  return (
    <nav>
      <Link to={"/"}>Home</Link>
      {authenticated ? (
        <Link to={"/logout"} onClick={handleLogout}>
          Logout
        </Link>
      ) : (
        <Link to={"/login"}>Login</Link>
      )}
    </nav>
  );
};

export default Navigation;
