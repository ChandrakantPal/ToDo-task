import React, { Component } from "react";
import "./App.css";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: "",
      taskList: [],
    };
  }
  changeHandler = (e) => {
    this.setState({ task: e.target.value });
  };
  submitHandler = (e) => {
    e.preventDefault();
    const { task, taskList } = this.state;
    this.setState({ taskList: [...taskList, {name:task,done:false}] });
  };
  deleteHandler(task,i) {
    const { taskList } = this.state
    let newList = [...taskList]
    newList.splice(i,1, {name:task,done:true})
    this.setState({taskList: newList})
  }
  render() {
    console.log(this.state);
    const { taskList } = this.state;
    const filtered = taskList.filter(a => (a.done === true))
    return (
      <div className="container">
        <div className="title">
          <h1>Task</h1>
        </div>
        <form onSubmit={this.submitHandler} className="addSection">
          <input
            type="text"
            className="taskInput"
            placeholder="What are you Planning?"
            onChange={this.changeHandler}
          />
          <button type="submit" className="add">
            ADD
          </button>
        </form>
        {taskList.length > 0 ?<p class="taskcount">{taskList.length - filtered.length} remaining  out of {taskList.length}</p>:null}
        <div className="list">
          {taskList.length > 0 ? taskList.map((task, i) => (
            <div key={i} className="taskContainer">
              <p className="task" style={task.done? {textDecoration: 'line-through'}: null}>{task.name}</p>
              <i className="fas fa-check" onClick={() => this.deleteHandler(task.name,i)}/>
            </div>
          )) : null}
        </div>
      </div>
    );
  }
}

export default App;
