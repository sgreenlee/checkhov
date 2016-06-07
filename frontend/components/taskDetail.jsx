var React = require("react");
var TaskStore = require("../stores/taskStore");
var TaskLine = require("./taskLine");
var TaskActions = require("../actions/taskActions");
var TaskDescription = require("./taskDescription");
var TaskAssignmentSetter = require("./taskAssignmentSetter");
var TaskDueDateSetter = require("./taskDueDateSetter");
var TaskDeleteButton = require("./taskDeleteButton");
var CommentIndex = require("./commentIndex");
var CommentStore = require("../stores/commentStore");
var CommentActions = require("../actions/commentActions");
var CommentForm = require("./commentForm");
var TeamStore = require("../stores/teamStore");

var TaskDetail = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      task: TaskStore.find(this.props.params.taskId),
      comments: CommentStore.findByTask(this.props.params.taskId)
    };
  },

  checkPermission: function (action) {
    if (!this.state.task) return false;
    return TeamStore.hasPermission(this.state.task.team_id, action)
  },

  componentDidMount: function () {
    this.taskListener = TaskStore.addListener(this.onTaskUpdate);
    this.commentListener = CommentStore.addListener(this.onCommentUpdate);
    TaskActions.getTask(this.props.params.taskId);
    CommentActions.fetchComments(this.props.params.taskId);
  },

  componentWillUnmount: function () {
    this.taskListener.remove();
    this.commentListener.remove();
  },

  onTaskUpdate: function () {
    var task = TaskStore.find(this.props.params.taskId);
    if (!task) {
      this.closeDetail();
      return;
    }

    this.setState({task: task});
  },

  onCommentUpdate: function () {
    this.setState({comments: CommentStore.findByTask(this.props.params.taskId) });
  },

  componentWillReceiveProps: function (props) {
    console.log("receiving props");
    var task = TaskStore.find(props.params.taskId);
    var comments = CommentStore.findByTask(props.params.taskId);
    this.setState({ task: task, comments: comments});
    if (this.props.params.taskId !== props.params.taskId) {
      TaskActions.getTask(props.params.taskId);
      CommentActions.fetchComments(props.params.taskId);
    }
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

    var canDelete = this.checkPermission("delete_task");
    return (
      <section className="task-detail-container">
        <div className="header clearfix">
          <a onClick={this.closeDetail} className="x-icon"></a>
          <TaskAssignmentSetter task={task} />
          <TaskDueDateSetter task={task}/>
          { canDelete ? <TaskDeleteButton task={task} /> : "" }
        </div>
        <div className="project-info"></div>
        <TaskLine task={task} />
        <TaskDescription task={task} />
        <CommentIndex task={task} comments={this.state.comments} />
        <CommentForm  task={task}/>
      </section>
    );
  }

});

module.exports = TaskDetail;
