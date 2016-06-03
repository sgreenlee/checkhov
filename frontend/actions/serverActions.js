var AppDispatcher = require("../dispatcher/dispatcher");
var SessionConstants = require("../constants/sessionConstants");
var TeamConstants = require("../constants/teamConstants");
var TaskConstants = require("../constants/taskConstants");

var ServerActions = {

  logout: function () {
    AppDispatcher.dispatch({
      actionType: SessionConstants.LOGOUT
    });
  },

  receiveCurrentUser: function (user) {
    if (!user.id) user = null;
    AppDispatcher.dispatch({
      actionType: SessionConstants.RECEIVE_CURRENT_USER,
      user: user
    });
  },

  receiveUserErrors: function(errors) {
    AppDispatcher.dispatch({
      actionType: SessionConstants.ERROR,
      errors: errors
    });
  },

  receiveTeam: function (team) {
    AppDispatcher.dispatch({
      actionType: TeamConstants.RECEIVE_TEAM,
      team: team
    });
  },

  receiveAllTeams: function (teams) {
    AppDispatcher.dispatch({
      actionType: TeamConstants.RECEIVE_ALL_TEAMS,
      teams: teams
    });
  },

  receiveAllTasks: function (team) {
    AppDispatcher.dispatch({
      actionType: TaskConstants.RECEIVE_ALL_TASKS,
      teamId: team.id,
      tasks: team.tasks
    });
  },

  receiveTask: function (task) {
    AppDispatcher.dispatch({
      actionType: TaskConstants.RECEIVE_TASK,
      task: task
    });
  },

  receiveTaskErrors: function (errors) {
    AppDispatcher.dispatch({
      actionType: TaskConstants.ERROR,
      errors: errors
    });
  },

  receiveTeamMembers: function (team) {
    AppDispatcher.dispatch({
      actionType: TeamMemberConstants.RECEIVE_ALL_MEMBERS,
      teamId: team.id,
      tasks: team.tasks
    });
  }

};

module.exports = ServerActions;
