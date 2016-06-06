var React = require("react");
var TaskActions = require("../actions/taskActions");

var TaskDeleteButton = React.createClass({

  getInitialState: function() {
    return {expanded: false};
  },

  componentDidMount: function () {
    window.addEventListener("click", this.pageClick);
  },

  componentWillUnmount: function () {
    window.removeEventListener("click", this.pageClick);
  },

  pageClick: function (e) {
    if (this.domNode.contains(e.target) && e.target !== this.unassignNode) {
      this.setState({expanded: true});
    } else if (this.state.expanded === true) {
      this.setState({expanded: false});
    }
  },

  getDomNode: function (node) {
    this.domNode = node;
  },

  deleteTask: function () {
    TaskActions.deleteTask(this.props.task.id);
  },

  render: function() {

    var dropdown = (
      <div className="dropdown">
        <p>Are you sure you want to delete this task?</p>
        <button onClick={this.deleteTask}>Delete</button>
      </div>
    );

    return (
      <div className="task-delete-button" ref={this.getDomNode}>
        <i className="fa fa-trash-o" aria-hidden="true"></i>
        { this.state.expanded ? dropdown : "" }
      </div>
    );
  }

});

module.exports = TaskDeleteButton;
