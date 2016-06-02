var React = require("react");
var TeamActions = require("../actions/teamActions");
var TeamStore = require("../stores/teamStore");

var TeamSetup = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {name: ""};
  },

  componentDidMount: function () {
    this.listener = TeamStore.addListener(this.onResponse);
  },

  componentWillUnmount: function () {
    this.listener.remove();
  },

  onSubmit: function (e) {
    e.preventDefault();
    TeamActions.createTeam({ name: this.state.name });
  },

  onResponse: function () {
    var errors = TeamStore.getErrors();
    debugger
    if (errors.length === 0) {
      // redirect to app on success
      var teamId = TeamStore.getLastReceivedTeam();
      this.context.router.push("/teams/" + teamId);
    }
  },

  nameChange: function (e) {
    this.setState({name: e.target.value});
  },

  render: function() {
    return (
      <div>
        <h3>What should we call your team?</h3>
        <form className="team-form" onSubmit={this.onSubmit}>

          <input id="name" type="text" onChange={this.nameChange} value={this.state.name} placeholder="Your Team's Name"/>

          <input type="submit" value="Continue"/>
        </form>
      </div>
    );
  }

});

module.exports = TeamSetup;
