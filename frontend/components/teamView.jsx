var React = require("react");
var TaskStore = require("../stores/taskStore");
var TeamStore = require("../stores/teamStore")
var TaskActions = require("../actions/taskActions");
var TaskList = require("./taskList");

var TeamView = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

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
    if (TaskStore.getCurrentTeam() === parseInt(this.props.params.teamId)) {
      this.setState({tasks: TaskStore.all()});
    }
  },

  openDetail: function (id) {
    var projectId = this.props.params.projectId ?
      this.props.params.projectId + "/" : "";
    var teamId = this.props.params.teamId;
    var path = "teams/" + teamId + "/" + projectId + "list/" + id;
    this.context.router.push({ pathname: path});
  },

  render: function() {
    var team = this.props.team;
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
          <TaskList tasks={this.state.tasks} openDetail={this.openDetail} />
        </section>
        {this.props.children}
      </section>
    </div>
  )}

});

module.exports = TeamView;
