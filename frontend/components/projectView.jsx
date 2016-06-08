var React = require("react");
var TaskStore = require("../stores/taskStore");
var TaskActions = require("../actions/taskActions");
var ProjectStore = require("../stores/projectStore");
var ProjectActions = require("../actions/projectActions");
var TaskList = require("./taskList");
var TASK_FILTERS = require("../util/taskFilters");

var ProjectView = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    var projectId = parseInt(this.props.params.projectId);
    var teamId = parseInt(this.props.params.teamId);
    var tasks = TaskStore.getCurrentTeam() === teamId ?
      TaskStore.findByProject(projectId) : [];
    return { tasks: tasks, project: ProjectStore.find(projectId), filter: "All Tasks" };
  },

  componentDidMount: function () {
    this.taskListener = TaskStore.addListener(this.onTaskUpdate);
    this.projectListener = ProjectStore.addListener(this.onProjectUpdate);
    TaskActions.fetchTasksByTeam(this.props.params.teamId);
    ProjectActions.fetchProjects(this.props.params.teamId);
  },

  componentWillUnmount: function () {
    this.taskListener.remove();
    this.projectListener.remove();
  },

  componentWillReceiveProps: function (props) {
    if (this.props.params.projectId !== props.params.projectId) {
      TaskActions.fetchTasksByTeam(props.params.teamId);
      ProjectActions.fetchProjects(props.params.teamId);
    }

    var projectId = parseInt(props.params.projectId);
    var teamId = parseInt(props.params.teamId);
    var tasks = TaskStore.getCurrentTeam() === teamId ?
      TaskStore.findByProject(projectId) : [];

    return { tasks: tasks, project: ProjectStore.find(projectId), filter: "All Tasks" };

  },

  onTaskUpdate: function () {
    var teamId = this.props.params.teamId;
    var projectId = parseInt(this.props.params.projectId);
    if (TaskStore.getCurrentTeam() === parseInt(teamId)) {
      this.setState({tasks: TaskStore.findByProject(projectId)});
      if (TaskStore.getCreatedTaskId()) {
        var newPath = "/teams/" + teamId + "/" +  projectId + "/list/" + TaskStore.getCreatedTaskId();
        this.context.router.push(newPath);
      }
    }
  },

  onProjectUpdate: function () {
    this.setState({project: ProjectStore.find(this.props.params.projectId)});
  },

  setFilter: function (filter) {
    this.setState({ filter: filter });
  },

  openDetail: function (id) {
    if (!id) return;
    var projectId = this.props.params.projectId;
    var teamId = this.props.params.teamId;
    var path = "teams/" + teamId + "/" + projectId + "/list/" + id;
    this.context.router.push({ pathname: path});
  },

  addTask: function () {
    var tasks = this.state.tasks.slice();
    var newTask = {
      team_id: this.props.params.teamId,
      project_id: this.props.params.projectId
    };
    tasks.push(newTask);
    this.setState({ tasks: tasks});
  },

  render: function() {
    var project = this.state.project || {};
    return (
    <div className="project-view">
      <header id="project-header">
        <h1>My tasks in {project.title}</h1>
      </header>
      <section id="content-pane">
        <section className="task-list-container">
          <div className="header">
            <button onClick={this.addTask}>Add Task</button>
            <div className="task-filter">
              <div className="dropdown-link">
                View: {this.state.filter}
              </div>
              <div className="dropdown">
                <h6>Recommended Views</h6>
                <ul>
                  <li><a onClick={this.setFilter.bind(this, "Incomplete Tasks")}>Incomplete Tasks</a></li>
                  <li><a onClick={this.setFilter.bind(this, "Completed Tasks")}>Completed Tasks</a></li>
                  <li><a onClick={this.setFilter.bind(this, "All Tasks")}>All Tasks</a></li>
                </ul>
              </div>
            </div>
          </div>
        <TaskList
          filter={TASK_FILTERS[this.state.filter]}
          tasks={this.state.tasks}
          openDetail={this.openDetail}
          addTask={this.addTask}/>
        </section>
        {this.props.children}
      </section>
    </div>
  );}

});

module.exports = ProjectView;
