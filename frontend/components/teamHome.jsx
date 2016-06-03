var React = require("react");
var TeamStore = require("../stores/teamStore");
var TeamActions = require("../actions/teamActions");
var TeamMemberActions = require("../actions/teamMemberActions");
var TeamMemberStore = require("../stores/teamMemberStore");

var TeamHome = React.createClass({

  getInitialState: function() {
    return {
      team: TeamStore.find(this.props.params.teamId) || {},
      members: TeamMemberStore.all()
    };
  },

  componentDidMount: function () {
    this.teamListener = TeamStore.addListener(this.teamUpdate);
    this.membersListener = TeamMemberStore.addListener(this.teamMembersUpdate);
    TeamActions.getTeam(this.props.params.teamId);
    TeamMemberActions.fetchMembers(this.props.params.teamId);
  },

  teamUpdate: function () {
    this.setState({team: TeamStore.find(this.props.params.teamId) || {} });
  },

  teamMembersUpdate: function () {
    this.setState({team: TeamMemberStore.all() });
  },

  render: function() {

    var team = this.state.team;

    return (
      <div id="team-home-component">
        <section id="teams-sidebar" className="clearfix">
          <h3>checkhov</h3>
        </section>
        <section id="teams-main" className="clearfix">
          <header id="top-bar">
            <nav id="team-nav">
              <a href="javascrip:void(0)">My Tasks</a>
              <a href="javascrip:void(0)">My Inbox</a>
              <a className="icon-dropdown" href="javascrip:void(0)"></a>
            </nav>
            <nav id="search"></nav>
            <nav id="account-nav">
              <a className="account-dropdown" href="javascript:void(0)">{this.state.team.name}
                <span className="user-avatar"></span>
              </a>
            </nav>
          </header>
          {this.props.children && React.cloneElement(this.props.children, {team: this.state.team })}
        </section>

      </div>
    );
  }

});

module.exports = TeamHome;
