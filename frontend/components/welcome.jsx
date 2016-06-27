var React = require("react");
var SessionActions = require("../actions/sessionActions");

var Welcome = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {};
  },

  componentDidMount: function () {
    this.listener = SessionStore.addListener(this.onResponse);
  },

  componentWillUnmount: function () {
    this.listener.remove();
  },

  onResponse: function () {
    if (SessionStore.getCurrentUser()) {
      this.context.router.push("/");
    }
  },

  openLogin: function () {
    this.context.router.push("/welcome/login");
  },

  openSignup: function () {
    this.context.router.push("/welcome/signup");
  },

  guestLogin: function (e) {
    e.preventDefault();
    SessionActions.login({email: "marcher@fa.com", password: "guestpassword"});
  },

  render: function() {
    return (

<div>
  <header className="clearfix">
    <h2 className="logo-main">Checkhov</h2>

    <button onClick={this.openLogin} className="login">Log In</button>
    <button onClick={this.openSignup}>Get Started for FREE</button>
    <button onClick={this.guestLogin} className="login login-guest">Guest Login</button>

  </header>

  <section className="main">

    <h1>Get more done with Checkhov.</h1>
    <p>Plan. Collaborate. Checkhov.</p>

  </section>

  <footer>
    <small>Copyright (c) 2016 Sam Greenlee All Rights Reserved.</small>
  </footer>
  {this.props.children}
</div>

  );}

});

module.exports = Welcome;
