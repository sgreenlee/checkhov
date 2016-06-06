var React = require("react");
var TaskStore = require("../stores/taskStore");
var TeamStore = require("../stores/teamStore");
var TaskActions = require("../actions/taskActions");
var TaskList = require("./taskList");
var TASK_FILTERS = require("../util/taskFilters");

var TeamView = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    var tasks = TaskStore.getCurrentTeam() === this.props.params.teamId ?
      TaskStore.all() : [];
    return { tasks: tasks, filter: "All Tasks" };
  },

  componentDidMount: function () {
    this.listener = TaskStore.addListener(this.onUpdate);
    TaskActions.fetchTasksByTeam(this.props.params.teamId);
  },

  componentWillUnmount: function () {
    this.listener.remove();
  },

  onUpdate: function () {
    if (TaskStore.getCurrentTeam() === parseInt(this.props.params.teamId)) {
      this.setState({tasks: TaskStore.all()});
    }
  },

  setFilter: function (filter) {

    this.setState({ filter: filter });
  },

  openDetail: function (id) {
    if (!id) return;
    var teamId = this.props.params.teamId;
    var path = "teams/" + teamId + "/list/" + id;
    this.context.router.push({ pathname: path});
  },

  addTask: function () {
    var tasks = this.state.tasks.slice();
    var newTask = {
      team_id: this.props.params.teamId
    };
    tasks.push(newTask);
    this.setState({ tasks: tasks});
  },

  render: function() {
    console.log("team view rendering");
    var team = this.props.team;
    return (
    <div className="project-view">
      <header id="project-header">
        <h1>My tasks in {team.name}</h1>
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

module.exports = TeamView;
