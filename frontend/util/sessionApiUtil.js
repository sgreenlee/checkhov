var SessionApiUtil = {

  login: function (email, password) {
    $.ajax({
      type: "POST",
      url: "/api/session",
      dataType: "json",
      data: { user: { email: email, password: password }},
      success: function (data) {
        console.log(data);
      }
    });
  },

  logout: function () {
    $.ajax({
      type: "DELETE",
      url: "/api/session",
      dataType: "json",
      success: function (data) {
        console.log(data);
      }
    });
  },

  fetchCurrentUser: function () {
    $.ajax({
      type: "GET",
      url: "/api/session",
      dataType: "json",
      success: function (data) {
        console.log(data);
      }
    });
  }

};

module.exports = SessionApiUtil;
