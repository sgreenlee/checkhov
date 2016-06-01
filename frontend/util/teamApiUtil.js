var TeamApiUtil = {

  fetchTeams: function () {
    $.ajax({
      type: "GET",
      url: "/api/teams",
      dataType: "json",
      success: function (data) {
        console.log(data);
      }
    });
  },

  createTeam: function (team) {
    $.ajax({
      type: "POST",
      url: "/api/teams",
      dataType: "json",
      data: { team: team },
      success: function (data) {
        console.log(data);
      }
    });
  },

  getTeam: function (id) {
    $.ajax({
      type: "GET",
      url: "/api/teams/" + id,
      dataType: "json",
      success: function (data) {
        console.log(data);
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
        console.log(data);
      }
    });
  }




};

module.exports = TeamApiUtil;
