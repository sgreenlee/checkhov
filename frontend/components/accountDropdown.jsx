var React = require("react");
var SessionActions = require("../actions/sessionActions");

var AccountDropdown = React.createClass({

  getInitialState: function() {
    return {expanded: false};
  },

  getNode: function (node) {
    this.DOMNode = node;
  },

  componentDidMount: function () {
    window.addEventListener("click", this.pageClick);
  },

  componentWillUnmount: function () {
    window.removeEventListener("click", this.pageClick);
  },

  pageClick: function (e) {
    if (this.DOMNode.contains(e.target)) {
      this.setState({expanded: true});
    } else {
      this.setState({expanded: false });
    }
  },

  logOut: function () {
    SessionActions.logout();
  },

  render: function() {
    var team = this.props.team || {};
    var dropdown = (
      <div className="dropdown">
        <ul>
          <li><a onClick={this.logOut}>Log Out</a></li>
        </ul>
      </div>
    );
   return  (
     <nav id="account-nav" ref={this.getNode}>
       <a className="account-dropdown" href="javascript:void(0)">{team.name}
         <span className="user-avatar"></span>
       </a>
       { this.state.expanded ? dropdown : "" }
     </nav>
   );

  }

});

module.exports = AccountDropdown ;
