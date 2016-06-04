var React = require("react");
var TeamMemberStore = require("../stores/teamMemberStore");
var MemberListItem = require("./memberListItem");
var TaskActions = require("../actions/taskActions");

var TaskAssignmentSetter = React.createClass({

  getInitialState: function() {
    var assigneeId = this.props.task.assignee_id || undefined;
    var assignee = assigneeId && TeamMemberStore.find(assigneeId);
    return {assignee: assignee, expanded: false, members: []};
  },

  componentDidMount: function () {
    window.addEventListener("click", this.pageClick);
  },

  componentWillUnmount: function () {
    window.removeEventListener("click", this.pageClick);
  },

  componentWillReceiveProps: function (props) {
    var assigneeId = props.task.assignee_id || undefined;
    var assignee = assigneeId && TeamMemberStore.find(assigneeId);
    this.setState({assignee: assignee});
  },

  getNode: function(domNode) {
    this.domNode = domNode;
  },

  getUnassignNode: function (node) {
    this.unassignNode = node;
  },

  pageClick: function (e) {
    if (this.domNode.contains(e.target) && e.target !== this.unassignNode) {
      this.setState({expanded: true});
    } else {
      this.setState({expanded: false});
    }
  },

  unassign: function () {
    var task = Object.assign({}, this.props.task);
    task.assignee_id = null;
    TaskActions.updateTask(task);
  },

  onInput: function (e) {
    this.setState({ members: TeamMemberStore.search(e.target.value) });
  },

  setAssignee: function (memberId) {
    this.setState({expanded: false});
    var assignee = TeamMemberStore.find(memberId);
    var task = Object.assign({}, this.props.task);
    task.assignee_id = assignee.id;
    TaskActions.updateTask(task);
  },


  render: function() {
    console.log("rendering");
    var comp = this;
    var assignee = this.state.assignee;
    var name = "Unassigned";
    var className = "";
    if (assignee) {
      name = assignee.first_name + " " + assignee.last_name;
      className = " assigned";
    }

    var content;
    if (this.state.expanded) {
      content = (
        <div className={"assignment-setter expanded"} ref={this.getNode}>
          <div className="avatar" />
          <input onChange={this.onInput} placeholder="Enter name or email" />
          <div className="search-results">
            <ul>
              {this.state.members.map(function(member) {
                return <MemberListItem key={member.id} member={member}
                    clickHandler={comp.setAssignee.bind(comp, member.id)} />;
              })}
            </ul>
          </div>
        </div>
      );
    } else {
      content = (
        <div className={"assignment-setter" + className} ref={this.getNode}>
          <div className="avatar" />
          <div className="unassign-button" ref={this.getUnassignNode} onClick={this.unassign}>
            <div className="tooltip" content="Unassign" />
          </div>
          <h6>{name}</h6>
        </div>
      );

    }
    return content;
  }

});

module.exports = TaskAssignmentSetter;
