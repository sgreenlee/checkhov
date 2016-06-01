var Store = require("flux/utils").Store;
var AppDispatcher = require("../dispatcher/dispatcher");
var SessionConstants = require("../constants/SessionConstants");

var _currentUser = null;
var _errors = [];
var _currentUserIsFetched = false;

function loginUser(user) {
  _currentUser = user;
  _currentUserIsFetched = true;
  _errors = [];
}

function logoutUser() {
  _currentUser = null;
  _currentUserIsFetched = false;
  _errors = [];
}

function resetErrors(errors) {
  _errors = errors;
}

var SessionStore = new Store(AppDispatcher);

SessionStore.getCurrentUser = function () {
  return _currentUser;
};

SessionStore.currentUserIsFetched = function () {
  return _currentUserIsFetched;
};

SessionStore.errors = function () {
  return _errors.slice();
};

SessionStore.__onDispatch = function (payload) {
  switch (payload.actionType) {

    case (SessionConstants.RECEIVE_CURRENT_USER):
      loginUser(payload.user);
      SessionStore.__emitChange();
      break;

    case (SessionConstants.LOGOUT):
      logoutUser();
      SessionStore.__emitChange();
      break;

    case (SessionConstants.ERROR):
      resetErrors(payload.errors);
      SessionStore.__emitChange();
      break;
  }
};

module.exports = SessionStore;
