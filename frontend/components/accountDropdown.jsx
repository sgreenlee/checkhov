var React = require("react");
var SessionActions = require("../actions/sessionActions");
var SessionStore = require("../stores/sessionStore");

var AccountDropdown = React.createClass({

  getInitialState: function() {
    return {user: SessionStore.getCurrentUser(), expanded: false};
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
    var avatar;
    if (this.state.user) {
      avatar = <img className="user-avatar" src={this.state.user.avatar_url} />;
    } else {
      avatar = <span className="user-avatar"></span>;
    }
    var team = this.props.team || {};
    var dropdown = (
      <div className="dropdown">
        <ul>
          <li><button onClick={this.logOut}>Log Out</button></li>
        </ul>
      </div>
    );
   return  (
     <nav id="account-nav" ref={this.getNode}>
       <a className="account-dropdown" href="javascript:void(0)">{this.state.user.email}
        {avatar}
       </a>
       { this.state.expanded ? dropdown : "" }
     </nav>
   );

  }

});

module.exports = AccountDropdown ;
