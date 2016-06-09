var Store = require("flux/utils").Store;
var AppDispatcher = require("../dispatcher/dispatcher");
var CommentConstants = require("../constants/commentConstants");
var SessionConstants = require("../constants/sessionConstants");

var _comments = {};
var _currentTeam = null;
var _errors = [];

var CommentStore = new Store(AppDispatcher);

function _receiveAllComments(comments) {
  comments.forEach( function (comment){
    if (!_comments[comment.task_id]) {
      _comments[comment.task_id] = {};
    }
    _comments[comment.task_id][comment.id] = comment;
  });
  _errors = [];
}

function _receiveComment(comment) {
  if (!_comments[comment.task_id]) {
    _comments[comment.task_id] = {};
  }
  _comments[comment.task_id][comment.id] = comment;
  _errors = [];
}

function _clear() {
  _comments = {};
  _currentTeam = null;
  _errors = [];
}

function _setErrors(errors) {
  _errors = errors;
}

function _removeComment(comment) {
  if (_comments[comment.task_id]) {
    delete _comments[comment.task_id][comment.id];
  }
}

CommentStore.findByTask = function (taskId) {
  var comments = (_comments[taskId] || {});
  return Object.keys(comments).map( function (commentId) { return comments[commentId]; });
};

CommentStore.__onDispatch = function (payload) {
  switch (payload.actionType) {

    case (SessionConstants.LOGOUT):
      _clear();
      break;

    case CommentConstants.RECEIVE_ALL_COMMENTS:
      _receiveAllComments(payload.comments);
      CommentStore.__emitChange();
      break;

    case CommentConstants.REMOVE_COMMENT:
      _removeComment(payload.comment);
      CommentStore.__emitChange();
      break;

    case CommentConstants.RECEIVE_COMMENT:
      _receiveComment(payload.comment);
      CommentStore.__emitChange();
      break;
  }
};

module.exports = CommentStore;
