var React = require("react");

var CommentIndexItem = React.createClass({

  render: function() {
    var comment = this.props.comment;
    return (
      <li className="comment-index-item" key={comment.id}>
        <img className="avatar"  src={comment.avatar_url} />
        <h6>{comment.first_name} {comment.last_name} <span className="email">({comment.email})</span> says:</h6>
        <p>{comment.content}</p>
      </li>
    );
  }

});

module.exports = CommentIndexItem;
