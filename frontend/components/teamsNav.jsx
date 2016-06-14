var React = require("react");
var TeamStore = require("../stores/teamStore");

var TeamsNav = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

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
    if (!this.DOMNode.contains(e.target)) {
      this.setState({expanded: false });
    }
  },

  openDropdown: function (e) {
    this.setState({expanded: true});
  },

  getDOMNode: function (node) {
    this.DOMNode = node;
  },

  switchTeam: function (id) {
    debugger
    this.setState({ expanded: false });
    this.context.router.push("/teams/" + id);
  },

  render: function() {
    var teams = this.state.teams || [];

    var visible = this.state.expanded ? "visible" : "";

    return (
      <div className="teams-nav" ref={this.getDOMNode}>
        <a href="javascrip:void(0)" onClick={this.openDropdown}>My Teams</a>
        <ul className={"dropdown " + visible}>
          { teams.map(function (team) {
            if (team.id !== parseInt(this.props.currentTeam)) {
              return <li key={team.id}><a onClick={this.switchTeam.bind(this, team.id)}>{team.name}</a></li>;
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
