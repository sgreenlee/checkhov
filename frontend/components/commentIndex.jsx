var React = require("react");
var CommentIndexItem = require("./commentIndexItem");

var CommentIndex = React.createClass({

  render: function() {
    return (
      <div className="comment-index" >
        <ul>
          {this.props.comments && this.props.comments.map( function (comment) {
            return <CommentIndexItem key={comment.id} comment={comment} />;
          })}
        </ul>
      </div>
    );
  }

});

module.exports = CommentIndex;
