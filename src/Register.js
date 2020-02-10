import React, { Component } from 'react';
import { render } from 'react-dom';


let Register = (props) => {

  return (
    <div className={"form"}>
      <input type="text" name="username" placeholder="Username" />
      <input type="password" name="password" placeholder="Password"/>
      <input type="button" value="Register" />
    </div>
  );
};

export default Register;

