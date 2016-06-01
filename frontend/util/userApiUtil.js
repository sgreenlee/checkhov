var ServerActions = require("../actions/ServerActions");

var UserApiUtil = {

  createUser: function(user) {
    $.ajax({
      type: "POST",
      url: "/api/users",
      data: {user: { email: user.email, password: user.password }},
      dataType: "json",
      success: function (user) {
        ServerActions.receiveCurrentUser(user);
      },
      error: function (response) {
        var errors = response.responseJSON.errors;
        if (errors) ServerActions.receiveUserErrors(errors);
      }
    });
  }

};

module.exports = UserApiUtil;
