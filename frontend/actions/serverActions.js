var AppDispatcher = require("../dispatcher/dispatcher");
var SessionConstants = require("../constants/SessionConstants");

var ServerActions = {

  receiveCurrentUser: function (user) {
    AppDispatcher.dispatch({
      actionType: SessionConstants.RECEIVE_CURRENT_USER,
      user: user
    });
  },

  receiveUserErrors: function(errors) {
    AppDispatcher.dispatch({
      actionType: SessionConstants.ERROR,
      errors: errors
    });
  }

};

module.exports = ServerActions;
