var AppDispatcher = require("../dispatcher/dispatcher");
var SessionApiUtil = require("../util/sessionApiUtil");

var SessionActions = {
  login: SessionApiUtil.login,

  logout: function () {
    SessionApiUtil.logout();
  },

  fetchCurrentUser: SessionApiUtil.fetchCurrentUser
};

module.exports = SessionActions;
