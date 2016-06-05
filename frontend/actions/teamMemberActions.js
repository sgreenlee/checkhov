var TeamMemberApiUtil = require("../util/teamMemberApiUtil");

var TeamMemberActions = {
  fetchMembers: TeamMemberApiUtil.fetchMembers,

  addMember: TeamMemberApiUtil.addMember
};

module.exports = TeamMemberActions;
