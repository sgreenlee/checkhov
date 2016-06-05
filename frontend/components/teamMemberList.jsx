var React = require("react");
var MemberListItem = require("./memberListItem");

var TeamMemberList = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return {newMemberEmail: ""};
  },

  openModal: function () {
    $(".new-member-modal-group").addClass("open");
  },

  closeModal: function (e) {
    $(".new-member-modal-group").removeClass("open");
  },

  onFormInput: function (e) {
    this.setState({newMemberEmail: e.target.value });
  },

  onSubmit: function () {
    ProjectActions.createProject({email: this.state.newMemberEmail, team_id: this.props.teamId });
  },

  render: function() {
    var teamId = this.props.teamId;
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
        <div className="new-member-modal-group modal-overlay" onClick={this.closeModal} />
        <div className="new-member-modal-group modal">
          <h4>New Team Member</h4>
          <p>Invite somebody to join your team.</p>
          <a className="x-icon close-modal" onClick={this.closeModal} />
          <form onSubmit={this.onSubmit} className="clearfix">
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
