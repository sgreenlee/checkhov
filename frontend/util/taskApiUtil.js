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
  },

  updateTask: function (task) {
    console.log("making Api call to update task");
    $.ajax({
      type: "PATCH",
      url: "/api/tasks/" + task.id,
      dataType: "json",
      data: { task: task },
      success: function (task) {
        console.log("task updated successfully");
        ServerActions.receiveTask(task);
      },
      error: function (resp) {
        var errors = resp.responseJSON.errors;
        if (errors) {
          ServerActions.receiveTaskErrors(errors);
        }
      }
    });
  },

  createTask: function (task) {
    console.log("sending ajax request");
    $.ajax({
      type: "POST",
      url: "/api/teams/" + task.team_id + "/tasks",
      dataType: "json",
      data: {task: task},
      success: function (task) {
        console.log("task created");
        ServerActions.receiveTask(task);
      },
      error: function (data) {
        var errors = data.responseJSON.errors;
        if (errors) {
          ServerActions.receiveTaskErrors(errors);
        }
      }
    });
  },

  getTask: function (taskId) {
    $.ajax({
      type: "GET",
      url: "/api/tasks/" + taskId,
      dataType: "json",
      success: function (task) {
        ServerActions.receiveTask(task);
      }
    });
  }

};

module.exports = TaskApiUtil;
