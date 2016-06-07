var ServerActions = require("../actions/serverActions");

var CommentApiUtil = {

  fetchComments: function (taskId) {
    $.ajax({
      type: "GET",
      url: "/api/tasks/" + taskId + "/comments",
      success: function (comments) {
        ServerActions.receiveAllComments(comments);
      }
    });
  },

  createComment: function (comment) {
    $.ajax({
      type: "POST",
      url: "/api/tasks/" + comment.task_id + "/comments",
      data: { comment: { content: comment.content } },
      success: function (comment) {
        ServerActions.receiveComment(comment);
      }
    });
  },

  deleteComment: function (commentId) {
    $.ajax({
      type: "DELETE",
      url: "/api/comments/" + commentId,
      success: function (data) {
        ServerActions.removeComment(data.comment);
      }
    });
  }
};

module.exports = CommentApiUtil;
