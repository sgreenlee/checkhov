var React = require("react");
var TaskStore = require("../stores/taskStore");
var TaskLine = require("./taskLine");
var TaskActions = require("../actions/taskActions");
var TaskDescription = require("./taskDescription");
var TaskAssignmentSetter = require("./taskAssignmentSetter");
var TaskDueDateSetter = require("./taskDueDateSetter");
var TaskDeleteButton = require("./taskDeleteButton");

var TaskDetail = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return { task: TaskStore.find(this.props.params.taskId)};
  },

  componentDidMount: function () {
    this.listener = TaskStore.addListener(this.onUpdate);
  },

  componentWillUnmount: function () {
    this.listener.remove();
  },

  componentWillReceiveProps: function (props) {
    // this.setState({ task: TaskStore.find(props.params.taskId)});
    TaskActions.getTask(props.params.taskId);
  },

  onUpdate: function () {
    var task = TaskStore.find(this.props.params.taskId);
    if (!task) {
      this.closeDetail();
      return;
    }

    this.setState({ task: TaskStore.find(this.props.params.taskId)});
  },

  closeDetail: function () {
    var projectId = this.props.params.projectId;
    projectId = projectId ? projectId + "/" : "";
    var teamId = this.props.params.teamId;
    var path = "/teams/" + teamId + "/" + projectId + "list";
    this.context.router.push(path);
  },

  render: function() {
    var task = this.state.task || {};
    return (
      <section className="task-detail-container">
        <div className="header clearfix">
          <a onClick={this.closeDetail} className="x-icon"></a>
          <TaskAssignmentSetter task={task} />
          <TaskDueDateSetter task={task}/>
          <TaskDeleteButton task={task} />
        </div>
        <div className="project-info"></div>
        <TaskLine task={task} />
        <TaskDescription task={task} />
      </section>
    );
  }

});

module.exports = TaskDetail;
