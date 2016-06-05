var ServerActions = require("../actions/serverActions");

var TeamMemberApiUtil = {

  fetchMembers: function(teamId) {
     $.ajax({
       type: "GET",
       url: "/api/teams/" + teamId + "/members",
       dataType: "json",
       success: function(data) {
         var team = data.team;
         ServerActions.receiveTeamMembers(team);
       }
     });
  },

  addMember: function (options) {
    $.ajax({
      type: "POST",
      url: "/api/teams/" + options.teamId + "/members",
      dataType: "json",
      data: { member: { email: options.email }},
      success: function(data) {
        ServerActions.receiveTeamMember(data.team);
      }
    });
  }



};

module.exports = TeamMemberApiUtil;
