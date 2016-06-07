var React = require("react");
var SessionStore = require("../stores/sessionStore");
var CommentActions = require("../actions/commentActions");

var CommentForm = React.createClass({

  getInitialState: function() {
    return {user: SessionStore.getCurrentUser(), content: ""};
  },

  onChange: function (e) {
    this.setState({ content: e.target.value });
  },

  onSubmit: function () {
    CommentActions.createComment({
      content: this.state.content,
      task_id: this.props.task.id
    });
    this.setState({content: ""});
  },

  getFormNode: function (node) {
    this.formNode = node;
  },

  render: function() {
    return (
      <form className="comment-form" ref={this.getFormNode}>
        <textarea value={this.state.content} onChange={this.onChange} placeholder="Write a comment">
        </textarea>
        <button onClick={this.onSubmit}>Comment</button>
      </form>);
  }

});

module.exports = CommentForm;
