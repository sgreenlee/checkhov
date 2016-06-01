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
    <img src="" height="55" alt=""></img>

    <button onClick={this.openLogin} className="login">Log In</button>
    <button onClick={this.openSignup}>Get Started for FREE</button>

  </header>

  <section className="main">

    <h1>Lorem ipsum dolor sit amet.</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit quae dolore porro! Quidem, quo, sunt.</p>

  </section>

  <footer>
    <h4>I don't know what to put down here yet.</h4>
  </footer>
  {this.props.children}
</div>

  );}

});

module.exports = Welcome;
