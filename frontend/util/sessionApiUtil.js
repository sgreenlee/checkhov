var ServerActions = require("../actions/ServerActions");

var SessionApiUtil = {

  login: function (user) {
    $.ajax({
      type: "POST",
      url: "/api/session",
      dataType: "json",
      data: { "user": { "email": user.email, "password": user.password }},
      success: function (user) {
        ServerActions.receiveCurrentUser(user);
      },
      error: function (response) {
        var errors = response.responseJSON.errors;
        if (errors) ServerActions.receiveUserErrors(errors);
      }
    });
  },

  logout: function () {
    $.ajax({
      type: "DELETE",
      url: "/api/session",
      dataType: "json",
      success: function (data) {
        ServerActions.logout();
      }
    });
  },

  fetchCurrentUser: function () {
    $.ajax({
      type: "GET",
      url: "/api/session",
      dataType: "json",
      success: function (user) {
        ServerActions.receiveCurrentUser(user);
      }
    });
  }

};

module.exports = SessionApiUtil;
