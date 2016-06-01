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

  componentDidMount: function () {
    if (SessionStore.getCurrentUser()) {
      this.context.router.push("/app");
    }
    else {
      this.listener = SessionStore.addListener(this.onUpdate);
      SessionActions.fetchCurrentUser();
    }
  },

  onUpdate: function () {
    if (SessionStore.getCurrentUser()) {
      this.context.router.push("/app");
    } else {
      this.context.router.push("/welcome");
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
