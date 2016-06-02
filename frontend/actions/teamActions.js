var TeamApiUtil = require("../util/teamApiUtil");

var TeamActions = {

  fetchTeams: TeamApiUtil.fetchTeams,
  createTeam: TeamApiUtil.createTeam,
  getTeam: TeamApiUtil.getTeam

};


module.exports = TeamActions;
