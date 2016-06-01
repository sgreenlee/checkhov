var React = require("react");
var ReactDOM = require("react-dom");
var ReactRouter = require("react-router");

var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var hashHistory = ReactRouter.hashHistory;

var SplashScreen = require("./components/splashScreen");
var App = require("./components/app");
var Welcome = require("./components/welcome");
var Login = require("./components/login");
var Signup = require("./components/signup");

var SessionStore = require("./stores/sessionStore");

var Root = React.createClass({
  render: function() {
    return <div>{ this.props.children }</div>;
  }
});

function _ensureLoggedIn(nextState, replace, asyncCallback) {
  if (!SessionStore.getCurrentUser()) {
    replace("/");
    asyncCallback();
  }
}

var routes = (
  <Route path="/" component={Root}>
    <IndexRoute component={SplashScreen} />
    <Route path="welcome" component={Welcome}>
      <Route path="login" component={Login} />
      <Route path="signup" component={Signup} />
    </Route>
    <Route path="app" onEnter={_ensureLoggedIn} component={App}>
    </Route>
  </Route>
);

document.addEventListener("DOMContentLoaded", function() {
  ReactDOM.render(
    <Router history={hashHistory}>{ routes }</Router>,
    document.getElementById("app-root"));
});

window.SessionApiUtil = require("./util/sessionApiUtil");
window.UserApiUtil = require("./util/userApiUtil");
window.TeamApiUtil = require("./util/teamApiUtil");
