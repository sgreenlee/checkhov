var React = require("react");
var TaskActions = require("../actions/taskActions");

var TaskListItem = React.createClass({

  getInitialState: function () {
    var task = this.props.task;
    return { title: task.title, completed: task.completed, changesPending: false };
  },

  handleClick: function () {
    this.props.openDetail(this.props.task.id);
  },

  onChange: function (e) {
    this.setState({ title: e.target.value });
  },

  onBlur: function (e) {
    var initial = this.props.task;
    if (this.state.title && this.state.title !== initial.title) {
      if (initial.id) {
        this.updateTask();
      } else {
        this.createNewTask();
      }
    }
  },

  updateTask: function () {
    TaskActions.updateTask({
      id: this.props.task.id,
      title: this.state.title,
    });
  },

  createNewTask: function () {
    var newTask = Object.assign({}, this.props.task);
    newTask.title = this.state.title;
    TaskActions.createTask(newTask);
  },

  render: function() {
    var task = this.props.task;
    return (
      <li onClick={this.handleClick} className="task-list-item">
        <div className="task-info-container">
          <span className="complete-task-button">✓</span>
          <textarea onChange={this.onChange} onBlur={this.onBlur} value={this.state.title}></textarea>
        </div>
      </li>
    );
  }

});

module.exports = TaskListItem;
