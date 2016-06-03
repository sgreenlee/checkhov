var React = require("react");

var TaskListItem = React.createClass({

  handleClick: function () {
    this.props.openDetail(this.props.task.id);
  },

  render: function() {
    var task = this.props.task;
    return (
      <li onClick={this.handleClick} className="task-list-item">
        <span className="complete-task-button">✓</span>
        {task.title}
      </li>
    );
  }

});

module.exports = TaskListItem;
