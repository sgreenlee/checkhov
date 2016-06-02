var React = require("react");
var TeamStore = require("../stores/teamStore");

var TeamHome = React.createClass({

  getInitialState: function() {
    return {team: TeamStore.find(this.props.params.teamId) || {}}
  },

  render: function() {
    return (
      <div>
        <h1>{this.state.team.name}</h1>
      </div>
    );
  }

});

module.exports = TeamHome;
