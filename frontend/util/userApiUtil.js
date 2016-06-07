var ServerActions = require("../actions/serverActions");

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
  },

  updateUser: function(user) {
    $.ajax({
      type: "PATCH",
      url: "/api/users",
      data: {user: { first_name: user.first, last_name: user.last }},
      dataType: "json",
      success: function (user) {
        ServerActions.receiveCurrentUser(user);
      },
      error: function (response) {
        var errors = response.responseJSON.errors;
        if (errors) ServerActions.receiveUserErrors(errors);
      }
    });
  },

  updateProfile: function(formData) {
    $.ajax({
      type: "PATCH",
      url: "/api/users",
      data: formData,
      dataType: "json",
      contentType: false,
      processData: false,
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
