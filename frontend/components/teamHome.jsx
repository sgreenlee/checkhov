var React = require("react");
var TeamStore = require("../stores/teamStore");
var TeamActions = require("../actions/teamActions");

var TeamHome = React.createClass({

  getInitialState: function() {
    return {team: TeamStore.find(this.props.params.teamId) || {}}
  },

  componentDidMount: function () {
    this.listener = TeamStore.addListener(this.teamUpdate)
    TeamActions.getTeam(this.props.params.teamId);
  },

  teamUpdate: function () {
    this.setState({team: TeamStore.find(this.props.params.teamId) || {} });
  },

  render: function() {

    var team = this.state.team

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
          <header id="project-header">
            <h1>My tasks in {team.name}</h1>
          </header>
            { this.props.children }
        </section>

      </div>
    );
  }

});

module.exports = TeamHome;