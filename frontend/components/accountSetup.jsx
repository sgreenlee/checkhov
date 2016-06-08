var React = require("react");

var AccountSetup = React.createClass({

  getInitialState: function() {
    return null;
  },

  render: function() {
    return (

<div className="account-setup-bg">
  <div className="modal account-setup-modal open">
    {this.props.children}
  </div>

</div>);
  }

});

module.exports = AccountSetup;
