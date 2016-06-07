var CommentApiUtil = require("../util/commentApiUtil");

var CommentActions = {
  fetchComments: CommentApiUtil.fetchComments,
  createComment: CommentApiUtil.createComment,
  deleteComment: CommentApiUtil.deleteComment
};

module.exports = CommentActions;
