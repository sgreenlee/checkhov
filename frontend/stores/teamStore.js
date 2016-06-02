var Store = require("flux/utils").Store;
var AppDispatcher = require("../dispatcher/dispatcher");
var TeamConstants = require("../constants/teamConstants");

var _teams = {};

var _errors = [];
var _lastReceivedTeam = null;

function _receiveAll(teams) {
  _teams = {};
  teams.forEach( function (team){
    _teams[team.id] = team;
  });
  _errors = [];
  _lastReceivedTeam = null;
}

function _receiveTeam(team) {
  _teams[team.id] = team;
  _errors = [];
  _lastReceivedTeam = team.id;
}

function _setErrors(errors) {
  _errors = errors;
  _lastReceivedTeam = null;
}

var TeamStore = new Store(AppDispatcher);

TeamStore.all = function () {
  return Object.keys(_teams).map( function (teamId){ return _teams[teamId] });
};

TeamStore.find = function (id) {
  return _teams[id];
};

TeamStore.getErrors = function () {
  return _errors.slice();
};

TeamStore.getLastReceivedTeam = function () {
  return _lastReceivedTeam;
};

TeamStore.__onDispatch = function (payload) {
  switch (payload.actionType) {

    case (TeamConstants.RECEIVE_ALL_TEAMS):
      _receiveAll(payload.teams);
      TeamStore.__emitChange();
      break;

    case (TeamConstants.RECEIVE_TEAM):
      _receiveTeam(payload.team);
      TeamStore.__emitChange();
      break;

    case (TeamConstants.ERROR):
      _setErrors(payload.errors);
      TeamStore.__emitChange();
      break;
  }
};

module.exports = TeamStore;
