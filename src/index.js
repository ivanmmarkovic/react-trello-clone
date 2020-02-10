import React, { Component } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import Logout from "./Logout";

import "./style.css";

import Navigation from "./Navigation";

class App extends Component {
  constructor() {
    super();
    this.state = {
      authenticated: false,
      user: { username: "", password: "", boards: [] }
    };
    this.handleLoginMethod = this.handleLoginMethod.bind(this);
    this.handleLogoutMethod = this.handleLogoutMethod.bind(this);
    this.addBoardMethod = this.addBoardMethod.bind(this);
    this.handleAddTaskIndex = this.handleAddTaskIndex.bind(this);
    this.handleTaskStateChangeIndex = this.handleTaskStateChangeIndex.bind(this);
    this.deleteDoneIndex = this.deleteDoneIndex.bind(this);
    this.deleteBoardIndex = this.deleteBoardIndex.bind(this);
  }
  handleLoginMethod(username, password) {
    this.setState({
      user: { username, password, boards: [] },
      authenticated: true
    });
  }
  handleLogoutMethod() {
    this.setState({
      authenticated: false
    });
  }
  addBoardMethod(boardName) {
    let { user } = this.state;
    user.boards = [...user.boards, { name: boardName, tasks: [] }];
    this.setState({
      user: user
    });
  }
  handleAddTaskIndex(boardName, taskName){
    let {user} = this.state;
    user.boards = user.boards.map(board => {
      if(board.name != boardName){
        return board;
      }
      else {
        board.tasks.push({name: taskName, done: false})
        return board;
      }
    });
    user.boards = [...user.boards];
    this.setState({
      user: user
    });
  }
  handleTaskStateChangeIndex(boardName, taskName){
    let {user} = this.state;
    user.boards = user.boards.map(board => {
      if(board.name != boardName){
        return board;
      }
      else {
        let tasks = board.tasks;
        tasks = board.tasks.map(task => {
          if(task.name != taskName)
            return task;
          else
            return {name: taskName, done: !task.done}
        });
        return {name: boardName, tasks: [...tasks]};
      }
    });
    user.boards = [...user.boards];
    this.setState({
      user: user
    });
  }
  deleteDoneIndex(boardName){
    let {user} = this.state;
    user.boards = user.boards.map(board => {
      if(board.name != boardName){
        return board;
      }
      else {
        let tasks = board.tasks;
        tasks = board.tasks.filter(task => !task.done);
        return {name: boardName, tasks: [...tasks]};
      }
    });
    user.boards = [...user.boards];
    this.setState({
      user: user
    });
  }
  deleteBoardIndex(boardName){
    let {user} = this.state;
    user.boards = user.boards.filter(board => board.name != boardName);
    user.boards = [...user.boards];
    this.setState({
      user: user
    });
  }
  render() {
    let { authenticated, user } = this.state;
    return (
      <div className={"container"}>
        <Navigation
          authenticated={authenticated}
          handleLogoutMethod={this.handleLogoutMethod}
        />

        <Route
          path="/"
          exact={true}
          render={() => (
            <Home
              authenticated={authenticated}
              user={user}
              addBoardMethod={this.addBoardMethod}
              handleAddTaskIndex={this.handleAddTaskIndex}
              handleTaskStateChangeIndex={this.handleTaskStateChangeIndex}
              deleteDoneIndex={this.deleteDoneIndex}
              deleteBoardIndex={this.deleteBoardIndex}
            />
          )}
        />
        {/*<Route path="/register" exact={true} component={Register} />*/}
        <Route
          path="/login"
          exact={true}
          render={() => (
            <Login
              handleLoginMethod={this.handleLoginMethod}
              authenticated={authenticated}
            />
          )}
        />
        <Route path="/logout" exact={true} render={() => <Logout />} />
      </div>
    );
  }
}

render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
