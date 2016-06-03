var ServerActions = require("../actions/serverActions");

var TeamMembershipApiUtil = {

  fetchMembers: function(teamId) {
     $.ajax({
       type: "GET",
       url: "/api/teams/" + teamId + "/members",
       dataType: "json",
       success: function(team) {
         ServerActions.receiveTeamMembers(team);
       }
     });
  },



};

module.exports = TeamMembershipApiUtil;
