var UserApiUtil = {

  createUser: function(email, password) {
    $.ajax({
      type: "POST",
      url: "/api/users",
      data: { user: { email: email, password: password }},
      dataType: "json",
      success: function (data) {
        console.log(data);
      }
    });
  }

};

module.exports = UserApiUtil;
