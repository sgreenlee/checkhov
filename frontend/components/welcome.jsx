var React = require("react");

var Welcome = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {};
  },

  openLogin: function () {
    this.context.router.push("/welcome/login");
  },

  openSignup: function () {
    this.context.router.push("/welcome/signup");
  },

  render: function() {
    return (

<div>
  <header className="clearfix">
    <h2 className="logo-main">Checkhov</h2>

    <button onClick={this.openLogin} className="login">Log In</button>
    <button onClick={this.openSignup}>Get Started for FREE</button>

  </header>

  <section className="main">

    <h1>Get more done with Checkhov.</h1>
    <p>Plan. Collaborate. Checkhov.</p>

  </section>

  <footer>
    <small>Copyright (c) 2016 Sam Greenle All Rights Reserved.</small>
  </footer>
  {this.props.children}
</div>

  );}

});

module.exports = Welcome;
