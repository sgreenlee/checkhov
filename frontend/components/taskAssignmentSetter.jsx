var React = require("react");

var TaskAssignmentSetter = React.createClass({

  getInitialState: function() {
    var assigneeId = this.props.task.assignee_id || undefined;
    var assignee = assignee && MemberStore.find(this.props.task.assignee_id);
    return {assignee: assignee};
  },

  render: function() {
    return <div></div>;
  }

});

module.exports = TaskAssignmentSetter;
