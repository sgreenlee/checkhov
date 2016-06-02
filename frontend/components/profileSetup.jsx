var React = require("react");
var SessionStore = require("../stores/sessionStore");
var UserActions = require("../actions/userActions");

var ProfileSetup = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    var user = SessionStore.getCurrentUser() || {};
    return {first: "", last: "", email: user.email};
  },

  componentDidMount: function () {
    this.listener = SessionStore.addListener(this.onResponse);
  },

  componentWillUnmount: function () {
    this.listener.remove();
  },

  onSubmit: function (e) {
    e.preventDefault();
    UserActions.updateUser({first: this.state.first, last: this.state.last });
    debugger
  },

  onResponse: function () {
    this.context.router.push("/setup/team");
    debugger
  },

  firstChange: function (e) {
    this.setState({first: e.target.value});
  },

  lastChange: function (e) {
    this.setState({last: e.target.value});
  },

  render: function() {
    return (
      <div>
        <h3>Please start by completing your profile.</h3>
        <form onSubmit={this.onSubmit}>

          <label htmlFor="first">First Name</label>
            <input id="first" type="text" onChange={this.firstChange} value={this.state.first} placeholder="First"/>

          <label htmlFor="last">Last Name</label>
          <input id="last" type="text" onChange={this.lastChange} value={this.state.last} placeholder="Last"/>

          <label htmlFor="email">Email</label>
            <input type="text" disabled="true" value={this.state.email} />

          <div className="avatar-frame">
            Add Photo
          </div>
          <input type="submit" value="Continue"/>
        </form>
      </div>
    );
  }

});

module.exports = ProfileSetup;
