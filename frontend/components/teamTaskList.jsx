var React = require("react");
var TaskStore = require("../stores/taskStore");
var TaskActions = require("../actions/taskActions");

var TeamTaskList = React.createClass({

  getInitialState: function() {
    var tasks = TaskStore.getCurrentTeam() === this.props.params.teamId ?
      TaskStore.all() : [];
    return { tasks: tasks };
  },

  componentDidMount: function () {
    this.listener = TaskStore.addListener(this.onUpdate);
    TaskActions.fetchTasksByTeam(this.props.params.teamId);
  },

  onUpdate: function () {
    if (TaskStore.getCurrentTeam() === this.props.params.teamId) {
      this.setState({tasks: TaskStore.getTasksByTeam(this.props.params.teamId)});
    }
  },

  render: function() {
    return (

    <section id="content-pane">
      <section className="task-list-container">
        <div className="header">
          <button>Add Task</button>
        </div>
      </section>
      {this.props.children}
    </section>
  )}

});

module.exports = TeamTaskList;
