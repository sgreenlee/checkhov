var React = require("react");

var MemberListItem = React.createClass({

  render: function() {
    var member = this.props.member;
    return (
    <li className="member-list-item clearfix" onClick={this.props.clickHandler}>
      <img className="avatar" src={member.avatar_url} />
      <div className="member-info">
        <div className="name">{member.first_name + " " + member.last_name}</div>
        <div className="email">{member.email}</div>
      </div>
    </li>
    );
  }

});

module.exports = MemberListItem;
