import React, { Component } from "react";
import "./Board.css";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskName: ""
    };
    this.handleAddTask = this.handleAddTask.bind(this);
    this.handleTaskNameChange = this.handleTaskNameChange.bind(this);
    this.handleTaskStateChange = this.handleTaskStateChange.bind(this);
    this.deleteDone = this.deleteDone.bind(this);
    this.deleteBoard = this.deleteBoard.bind(this);
  }
  handleAddTask(boardName, e) {
    if (e.which == 13) {
      if (e.target.value == "") return;
      else {
        this.props.handleAddTaskHome(boardName, e.target.value);
        this.setState({
          taskName: ""
        });
      }
    }
  }
  handleTaskNameChange(e) {
    this.setState({
      taskName: e.target.value
    });
  }
  handleTaskStateChange(boardName, taskName){
    console.log(taskName);
    this.props.handleTaskStateChangeHome(boardName, taskName);
  }
  deleteDone(boardName){
    this.props.deleteDoneHome(boardName);
  }
  deleteBoard(boardName){
    this.props.deleteBoardHome(boardName);
  }
  render() {
    let { board } = this.props;
    let { taskName } = this.state;
    return (
      <div className={"board"}>
        <h3 onClick={() => this.deleteBoard(board.name)}>
          {board.name}
          <i className="material-icons">delete_forever</i>
        </h3>
        {board.tasks.map(task => (
          <div key={task.name} className={"tasks"}>
            <p onClick={e =>this.handleTaskStateChange(board.name, task.name)}>
              {task.name}
              {task.done ? (
                <i
                  className={"material-icons"}
                  style={{ color: "green" }}>
                  done
                </i>
              ) : (
                <i
                  className={"material-icons"}
                  style={{ color: "crimson" }}>
                  done
                </i>
              )}
            </p>
          </div>
        ))}
        <input
          type="text"
          value={taskName}
          onChange={this.handleTaskNameChange}
          onKeyUp={e => this.handleAddTask(board.name, e)}
        />
        <span onClick={() => this.deleteDone(board.name)}>
          <i className="material-icons">delete_forever</i>
        </span>
      </div>
    );
  }
}

export default Board;
