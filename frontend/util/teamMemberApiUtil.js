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



};

module.exports = TeamMemberApiUtil;
