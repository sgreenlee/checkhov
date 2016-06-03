var React = require("react");
var TaskStore = require("../stores/taskStore");
var TaskActions = require("../actions/taskActions");

var ProjectView = React.createClass({

  getInitialState: function() {
    var tasks = TaskStore.getCurrentTeam() === this.props.params.teamId ?
      TaskStore.all() : [];
    return { tasks: tasks, team: TeamStore };
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
    <div className="project-view">
      <header id="project-header">
        <h1>My tasks in {team.name}</h1>
      </header>
        <section id="content-pane">
        <section className="task-list-container">
      <div className="header">
        <button>Add Task</button>
      </div>
      </section>
        {this.props.children}
      </section>
    </div>
  )}

});

module.exports = ProjectView;
