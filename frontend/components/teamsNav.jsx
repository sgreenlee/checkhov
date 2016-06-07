var React = require("react");
var TeamStore = require("../stores/teamStore");

var TeamsNav = React.createClass({

  getInitialState: function() {
    return {teams: TeamStore.all(), expanded: false};
  },

  componentDidMount: function () {
    this.teamsListener = TeamStore.addListener(this.teamsUpdate);
    window.addEventListener("click", this.pageClick);
  },

  componentWillUnmount: function () {
    this.teamsListener.remove();
    window.removeEventListener("click", this.pageClick);
  },

  teamsUpdate: function () {
    this.setState({ teams: TeamStore.all() });
  },

  pageClick: function (e) {
    if (this.DOMNode.contains(e.target)) {
      this.setState({expanded: true});
    } else {
      this.setState({expanded: false });
    }
  },

  getDOMNode: function (node) {
    this.DOMNode = node;
  },

  render: function() {
    var teams = this.state.teams || [];

    var visible = this.state.expanded ? "visible" : "";

    return (
      <div className="teams-nav" ref={this.getDOMNode}>
        <a href="javascrip:void(0)">My Teams</a>
        <ul className={"dropdown " + visible}>
          { teams.map(function (team) {
            if (team.id !== parseInt(this.props.currentTeam)) {
              return <li key={team.id}><a href={"#/teams/" + team.id}>{team.name}</a></li>;
            } else {
              return <li key={team.id} className="active">{team.name}</li>;
            }
          }.bind(this))}
        </ul>
      </div>
    );
  }

});

module.exports = TeamsNav;
