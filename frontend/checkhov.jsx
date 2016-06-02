var React = require("react");
var ReactDOM = require("react-dom");
var ReactRouter = require("react-router");

// React Router
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var IndexRedirect = ReactRouter.IndexRedirect;
var hashHistory = ReactRouter.hashHistory;


// Components
var SplashScreen = require("./components/splashScreen");
var App = require("./components/app");
var Welcome = require("./components/welcome");
var Login = require("./components/login");
var Signup = require("./components/signup");
var AccountSetup = require("./components/accountSetup");
var ProfileSetup = require("./components/profileSetup");
var TeamSetup = require("./components/teamSetup");
var TeamHome = require("./components/teamHome");
var TeamTaskList = require("./components/teamTaskList");
var ProjectTaskList = require("./components/projectTaskList");
var TaskDetail = require("./components/TaskDetail");

// Stores
var SessionStore = require("./stores/sessionStore");
var TeamStore = require("./stores/teamStore");
var ProjectStore = require("./stores/projectStore");
var TaskStore = require("./stores/taskStore");

var App = React.createClass({
  render: function() {
    return <div id="app-component">{ this.props.children }</div>;
  }
});

function _ensureLoggedIn(nextState, replace, asyncCallback) {
  if (!SessionStore.getCurrentUser()) {
    replace("/");
    asyncCallback();
  }
}

var routes = (
  <Route path="/" component={App}>
    <IndexRoute component={SplashScreen} />
    <Route path="welcome" component={Welcome}>
      <Route path="login" component={Login} />
      <Route path="signup" component={Signup} />
    </Route>
    <Route path="setup" component={AccountSetup}>
      <IndexRedirect to="profile" />
      <Route path="profile" component={ProfileSetup} />
      <Route path="team" component={TeamSetup} />
    </Route>

    <Route path="teams/:teamId" component={TeamHome}>
      <IndexRedirect to="all" />
      <Route path="all" component={TeamTaskList}>
        <Route path="t/:taskId" component={TaskDetail} />
      </Route>
      <Route path="p/:projectId" component={ProjectTaskList}>
        <Route path="t/:taskId" component={TaskDetail} />
      </Route>
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
