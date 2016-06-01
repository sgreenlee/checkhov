var SessionApiUtil = require("../util/sessionApiUtil");

var SessionActions = {
  login: SessionApiUtil.login,

  logout: SessionApiUtil.logout,

  fetchCurrentUser: SessionApiUtil.fetchCurrentUser
};

module.exports = SessionActions;
