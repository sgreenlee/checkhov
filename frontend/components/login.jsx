var React = require("react");
var SessionActions = require("../actions/sessionActions");
var SessionStore = require("../stores/SessionStore");

var Login = React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return { email: "", password: "", errors: []};
  },

  componentDidMount: function () {
    this.listener = SessionStore.addListener(this.onResponse);
  },

  componentWillUnmount: function () {
    this.listener.remove();
  },

  onResponse: function () {
    this.setState({errors: SessionStore.errors() });
    if (this.state.errors.length === 0) {
      // login successful
      this.context.router.push("/app");
    }
  },

  closeModal: function() {
    this.context.router.push("/welcome");
  },

  onSubmit: function (e) {
    e.preventDefault();
    SessionActions.login({email: this.state.email, password: this.state.password});
    this.setState({errors: []});
  },

  emailChange: function (e) {
    this.setState({ email: e.target.value });
  },

  passwordChange: function (e) {
    this.setState({ password: e.target.value });
  },

  render: function() {
    return (
<div>
  <div id="modal-overlay" onClick={this.closeModal} className="modal-group modal-close"><a href="#/welcome"></a></div>

  <div className="modal modal-group" id="login-modal">
    <span className="modal-close x-icon" onClick={this.closeModal}></span>
    <h3>Log in</h3>
    <form onSubmit={this.onSubmit} className="clearfix" id="login-form">

      <ul className="error-messages">
        {
          (this.state.errors).map(function (error) {
            return <li>{error}</li>;
          })
        }
      </ul>

      <label for="email">Email address</label>
        <input id="email" value={this.state.email} onChange={this.emailChange}
          placeholder="name@company.com" type="text" />


      <label for="password">Password</label>
        <input id="password" value={this.state.password} onChange={this.passwordChange}
          placeholder="password" type="password" />

      <p className="input-help">Forgot your pasword?</p>

      <input type="submit" value="Log In" />
    </form>
  </div>
</div>);
  }

});

module.exports = Login;
