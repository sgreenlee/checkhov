var React = require("react");
var TaskActions = require("../actions/taskActions");
var TeamMemberStore = require("../stores/teamMemberStore");

var TaskLine = React.createClass({

  getInitialState: function () {
    var task = this.props.task;
    return { title: task.title, completed: task.completed, changesPending: false };
  },

  componentWillReceiveProps: function (props) {
    var task = props.task || {};
    this.setState({ title: task.title, completed: task.completed, changesPending: false });
  },

  handleClick: function () {
    this.props.openDetail(this.props.task.id);
  },

  getDOMNode: function (node) {
    this.DOMNode = node;
  },

  onKeyPress: function (e) {
    if (e.key === 'Enter') {
      this.DOMNode.blur();
    }
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

  onChange: function (e) {
    this.setState({ title: e.target.value });
  },

  toggleComplete: function () {
    var completed = !this.props.task.completed;
    TaskActions.updateTask({
      id: this.props.task.id,
      completed: completed
    });
  },

  updateTask: function () {
    TaskActions.updateTask({
      id: this.props.task.id,
      title: this.state.title
    });
  },

  createNewTask: function () {
    var newTask = Object.assign({}, this.props.task);
    newTask.title = this.state.title;
    TaskActions.createTask(newTask);
  },

  render: function() {
    var task = this.props.task;
    var assignee = task.assignee_id && TeamMemberStore.find(task.assignee_id);
    var completed = task.completed ? " completed" : "";

    var avatar;
    if (assignee) {
      avatar = <img className="avatar" alt={assignee.first_name} src={assignee.avatar_url} />;
    }
    return (
        <div className="task-line">
          <a onClick={this.toggleComplete} className={"complete-task-button" + completed }></a>
          <input ref={this.getDOMNode} type="text" onChange={this.onChange }
            onKeyPress={this.onKeyPress} onBlur={this.onBlur} value={this.state.title} />
            { avatar }
        </div>
    );
  }

});

module.exports = TaskLine;
