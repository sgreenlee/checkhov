var React = require("react");
var SessionStore = require("../stores/sessionStore");
var SessionActions = require("../actions/sessionActions");
var TeamActions = require("../actions/teamActions");
var TeamStore = require("../stores/teamStore");

var SplashScreen = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return null;
  },


  componentDidMount: function () {
    if (SessionStore.getCurrentUser()) {
      // user is authenticated
      this.loadTeamInfo();
    }
    else if (!SessionStore.currentUserIsFetched()){
      // authentication status unknown -- query server
      this.authListener = SessionStore.addListener(this.onAuthUpdate);
      SessionActions.fetchCurrentUser();
    } else {
      // user not authenticated
      this.redirectToLogin();
    }
  },

  onAuthUpdate: function () {
    this.authListener && this.authListener.remove();
    if (SessionStore.getCurrentUser()) {
      // user is logged in
      this.loadTeamInfo();
    } else {
      this.redirectToLogin();
    }
  },

  redirectToLogin: function () {
    this.context.router.push("/welcome");
  },

  loadTeamInfo: function () {
    this.teamListener = TeamStore.addListener(this.onTeamLoad);
    TeamActions.fetchTeams();
  },

  onTeamLoad: function () {
    var user = SessionStore.getCurrentUser();
    this.teamListener && this.teamListener.remove();
    var teams = TeamStore.all();
    if (!user.first_name || !user.last_name) {
      // redirect to profile setup
      this.context.router.push("/setup/profile");
      return;
    }
    if (teams.length === 0) {
      // redirect to team setup
      this.context.router.push("/setup/team");
      return;
    }
    else {
      this.redirectToApp();
    }
  },

  redirectToApp: function () {
    var next;
    if (this.props.location.query.next) {
      next = decodeURIComponent(this.props.location.query.next);
    } else {
      var teamId = TeamStore.all()[0].id;
      next = "/teams/" + teamId;
    }
    setTimeout(function() {
      this.context.router.push(next);
    }.bind(this), 500);
  },


  componentWillUnmount: function () {
    this.teamListener && this.teamListener.remove();
    this.authListener && this.authListener.remove();
  },

  render: function() {
    return (
      <div id="splash">
        <div className="logo">
          <h1><span className="spinner" />Checkhov</h1>
          <h3>...loading...</h3>
        </div>
      </div>
    );
  }

});

module.exports = SplashScreen;
