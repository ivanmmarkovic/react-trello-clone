import React, { Component } from "react";
import {Redirect} from 'react-router-dom';

import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      error: "",
      redirect: false
    };
    this.handleUsernameInput = this.handleUsernameInput.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }
  handleUsernameInput(e) {
    this.setState({ username: e.target.value });
  }
  handlePasswordInput(e) {
    this.setState({ password: e.target.value });
  }
  handleLogin(){
    let {username, password} = this.state;
    if(username == "" || password == ""){
      if(username == "" && password == ""){
        this.setState({error: "Username and password fields are empty"})
      }
      else if(username == ""){
        this.setState({error: "Username field is empty"})
      }
      else {
        this.setState({error: "Password field is empty"})
      }
    }
    else{
      this.setState({
        error: "",
        redirect: true
      });
      this.props.handleLoginMethod(username, password);
    }
  }
  render() {
    let {authenticated} = this.props;
    let {username, password, error, redirect} = this.state;
    if(redirect || authenticated){
      return <Redirect to={"/"} />;
    }
    return (
      <div className={"form"}>
        <h1>Login</h1>
        <p>Random username and password</p>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={this.handleUsernameInput}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={this.handlePasswordInput}
        />
        <p>{error}</p>
        <input type="button" value="Login" onClick={this.handleLogin}/>
      </div>
    );
  }
}

export default Login;
