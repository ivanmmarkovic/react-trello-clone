import React, { Component } from "react";
import './Home.css';

import Board from './Board';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state= {boardName: ""}
    this.handleAddBoard = this.handleAddBoard.bind(this);
    this.handleBoardNameChange = this.handleBoardNameChange.bind(this);
    this.handleAddTaskHome = this.handleAddTaskHome.bind(this);
    this.handleTaskStateChangeHome = this.handleTaskStateChangeHome.bind(this);
    this.deleteDoneHome = this.deleteDoneHome.bind(this);
    this.deleteBoardHome = this.deleteBoardHome.bind(this);
  }
  handleAddBoard(e){
    if(e.which == 13){
      if(e.target.value == "")
        return;
      else {
        this.props.addBoardMethod(e.target.value);
        this.setState({
          boardName: ""
        })
      }
    }
  }
  handleBoardNameChange(e){
    this.setState({
      boardName: e.target.value
    });
  }
  handleAddTaskHome(boardName, taskName){
    this.props.handleAddTaskIndex(boardName, taskName);
  }
  handleTaskStateChangeHome(boardName, taskName){
    this.props.handleTaskStateChangeIndex(boardName, taskName);
  }
  deleteDoneHome(boardName){
    this.props.deleteDoneIndex(boardName);
  }
  deleteBoardHome(boardName){
    this.props.deleteBoardIndex(boardName);
  }
  render() {
    let { authenticated, user } = this.props;
    if(!authenticated){
      return <div className={"boards-box"}><h1>Hello guest</h1></div>
    }
    let {boardName} = this.state;
    return (
      <div className={"boards-box"}>
        <input type="text" value={boardName} placeholder="Add board" onChange={this.handleBoardNameChange} onKeyUp={this.handleAddBoard} />

        <div className={"boards"}>
          {user.boards.map(board => <Board key={board.name} board={board} 
            handleAddTaskHome={this.handleAddTaskHome} handleTaskStateChangeHome={this.handleTaskStateChangeHome}
            deleteDoneHome={this.deleteDoneHome} deleteBoardHome={this.deleteBoardHome} 
            /> )}
        </div>
      </div>
    );
  }
}

export default Home;
