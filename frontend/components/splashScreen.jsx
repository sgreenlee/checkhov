var React = require("react");
var SessionStore = require("../stores/sessionStore");
var SessionActions = require("../actions/sessionActions");

var SplashScreen = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return null;
  },

  redirectToApp: function () {
    this.context.router.push("/app");
  },

  redirectToLogin: function () {
    this.context.router.push("/welcome");
  },

  componentDidMount: function () {
    if (SessionStore.getCurrentUser()) {
      // user is authenticated
      this.redirectToApp();
    }
    else if (!SessionStore.currentUserIsFetched()){
      // authentication status unknown -- query server
      this.listener = SessionStore.addListener(this.onUpdate);
      SessionActions.fetchCurrentUser();
    } else {
      // user not authenticated
      this.redirectToLogin();
    }
  },

  onUpdate: function () {
    if (SessionStore.getCurrentUser()) {
      // user is logged in
      this.redirectToApp();
    } else {
      this.redirectToLogin();
    }
  },

  componentWillUnmount: function () {
    if (this.listener) {
      this.listener.remove();
    }
  },

  render: function() {
    return (
      <div className="splash">
        <h1>Checkhov</h1>
      </div>
    );
  }

});

module.exports = SplashScreen;
