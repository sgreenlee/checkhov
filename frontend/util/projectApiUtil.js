var ServerActions = require("../actions/serverActions");

var ProjectApiUtil = {

  createProject: function(project) {
    $.ajax({
      type: "POST",
      url: "/api/teams/" + project.team_id + "/projects",
      data: { project: project },
      success: function (data) {
        ServerActions.receiveProject(data.project);
      },
      error: function (data) {
        var errors = data.responseJSON.errors;
        if (errors) {
          ServerActions.receiveProjectErrors(errors);
        }
      }
    });
  },

  fetchProjects: function (teamId) {
    $.ajax({
      type: "GET",
      url: "/api/teams/" + teamId + "/projects",
      success: function (data) {
        ServerActions.receiveAllProjects(data.team);
      }
    });
  }

};

module.exports = ProjectApiUtil;
