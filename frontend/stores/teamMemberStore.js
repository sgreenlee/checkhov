var Store = require("flux/utils").Store;
var AppDispatcher = require("../dispatcher/dispatcher");
var TeamMembershipConstants = require("../constants/teamMembershipConstants");

var _currentTeam = null;
var _members = {};

var _errors = [];

var TeamMemberStore = new Store(AppDispatcher);

function _receiveAllMembers(members) {
  _members = {};
  members.forEach(function (member) {
    _members[member.id] = member;
  });
  _errors = [];
}

function _receiveMember(member) {
  _members[member.id] = member;
}

_clear = function () {
  _currentTeam = null;
  _members = {};
  _errors = [];
};

TeamMemberStore.all = function () {
  return Object.keys(_members).map(function (memberId){ return _members[memberId]; });
};

TeamMemberStore.find = function (memberId) {
  return _members[memberId];
};

TeamMemberStore.getErrors = function () {
  return _errors.slice();
};

TeamMemberStore.__onDispatch = function (payload) {
  
};

module.exports = TeamMemberStore;
