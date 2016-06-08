var React = require("react");
var MemberListItem = require("./memberListItem");
var TeamMemberActions = require("../actions/teamMemberActions");
var TeamMemberStore = require("../stores/teamMemberStore");

var TeamMemberList = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  componentDidMount: function() {
    this.listener = TeamMemberStore.addListener(this.onResponse);
  },

  componentWillUnmount: function () {
    this.listener.remove();
  },

  getInitialState: function () {
    return {newMemberEmail: "", errors: [], open: false};
  },

  onResponse: function () {
    var errors = TeamMemberStore.getErrors();
    if (errors.length != 0) {
      this.setState({ errors: errors });
    } else {
      this.setState({ newMemberEmail: "", open: false });
    }
  },

  openModal: function () {
    this.setState({ open: true });
  },

  closeModal: function (e) {
    this.setState({ open: false });
  },

  onFormInput: function (e) {
    this.setState({newMemberEmail: e.target.value });
  },

  onSubmit: function (e) {
    e.preventDefault();
    TeamMemberActions.addMember({email: this.state.newMemberEmail, teamId: this.props.teamId });
  },

  render: function() {
    var teamId = this.props.teamId;
    var open = this.state.open ? " open" : "";
    return (
      <div className="member-list-component">
        <div className="member-list">
          <div className="header">
            <h6>Team Members</h6>
            <a onClick={this.openModal} className="plus-icon" />
          </div>
          <ul>
            { this.props.members && this.props.members.map(function (member) {
              return (<MemberListItem key={member.id} member={member} />);
            })}
          </ul>
        </div>
        <div className={"new-member-modal-group modal-overlay" + open} onClick={this.closeModal} />
        <div className={"new-member-modal-group modal" + open}>
          <h4>New Team Member</h4>
          <p>Invite somebody to join your team.</p>
          <a className="x-icon close-modal" onClick={this.closeModal} />
          <form onSubmit={this.onSubmit} className="clearfix">
            <ul className="error-messages">
              {
                (this.state.errors).map(function (error) {
                  return <li>{error}</li>;
                })
              }
            </ul>
            <label htmlFor="new-member-email">Email Address</label>
            <input value={this.state.newTeamName} onChange={this.onFormInput} type="text" id="new-member-email" />
            <input type="submit" value="Add Member" />
          </form>
        </div>
      </div>

    );
  }
});

module.exports = TeamMemberList;
