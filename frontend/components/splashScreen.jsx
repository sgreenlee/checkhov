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
    this.teamListener && this.teamListener.remove();
    var teams = TeamStore.all();
    if (teams.length === 0) {
      // redirect to setup
      this.context.router.push("/setup");
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
    this.context.router.push(next);
  },


  componentWillUnmount: function () {
    this.teamListener && this.teamListener.remove();
    this.authListener && this.authListener.remove();
  },

  render: function() {
    return (
      <div className="splash">
        <h1>Checkhov Splash Splash Screen</h1>
      </div>
    );
  }

});

module.exports = SplashScreen;
