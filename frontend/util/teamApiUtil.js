var ServerActions = require("../actions/serverActions");

var TeamApiUtil = {

  fetchTeams: function () {
    $.ajax({
      type: "GET",
      url: "/api/teams",
      dataType: "json",
      success: function (teams) {
        ServerActions.receiveAllTeams(teams);
      }
    });
  },

  createTeam: function (team) {
    $.ajax({
      type: "POST",
      url: "/api/teams",
      dataType: "json",
      data: { team: team },
      success: function (team) {
        ServerActions.receiveCreatedTeam(team);
      },
      error: function (data) {

        var errors = data.responseJSON.errors;
        if (errors) {
          ServerActions.receiveTeamErrors(errors);
        }
      }
    });
  },

  getTeam: function (id) {
    $.ajax({
      type: "GET",
      url: "/api/teams/" + id,
      dataType: "json",
      success: function (team) {
        ServerActions.receiveTeam(team);
      }
    });
  },

  updateTeam: function (team) {
    $.ajax({
      type: "PATCH",
      url: "/api/teams/" + team.id,
      dataType: "json",
      data: { team: { name: team.name }},
      success: function (data) {
        ServerActions.receiveTeam(team);
      }
    });
  }




};

module.exports = TeamApiUtil;
