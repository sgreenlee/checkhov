var React = require("react");
var UserActions = require("../actions/userActions");
var SessionStore = require("../stores/sessionStore");

var Signup = React.createClass({

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
      this.context.router.push("/setup");
    }
  },

  closeModal: function() {
    this.context.router.push("/welcome");
  },

  onSubmit: function (e) {
    e.preventDefault();
    UserActions.createUser({email: this.state.email, password: this.state.password});
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
  <div onClick={this.closeModal} className="modal-group modal-close modal-overlay open"></div>

  <div className="modal modal-group open" id="signup-modal">
    <span className="modal-close x-icon" onClick={this.closeModal}></span>
    <h3>Sign Up</h3>
    <form onSubmit={this.onSubmit} className="clearfix" id="signup-form">

      <ul className="error-messages">
        {
          (this.state.errors).map(function (error) {
            return <li>{error}</li>;
          })
        }
      </ul>

      <label for="signup-email">Email address</label>
        <input type="text" placeholder="name@company.com"
          value={this.state.email} onChange={this.emailChange} />

      <label>Password</label>
        <input type="password" placeholder="password"
          value={this.state.password} onChange={this.passwordChange} />

      <input type="submit" value="Sign Up"/>
    </form>
  </div>
</div>);
  }

});

module.exports = Signup;
