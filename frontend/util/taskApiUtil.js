var ServerActions = require("../actions/serverActions");

var TaskApiUtil = {

  fetchTasksByTeam: function (teamId) {
    $.ajax({
      type: "GET",
      url: "/api/teams/" + teamId + "/tasks",
      dataType: "json",
      success: function (data) {
        ServerActions.receiveAllTasks(data.team);
      },
      error: function (data) {
        var errors = data.responseJSON.errors;
        if (errors) {
          ServerActions.receiveTaskErrors(errors);
        }
      }
    });
  }

};

module.exports = TaskApiUtil;
