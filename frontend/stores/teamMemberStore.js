var Store = require("flux/utils").Store;
var AppDispatcher = require("../dispatcher/dispatcher");
var TeamMemberConstants = require("../constants/teamMemberConstants");

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

TeamMemberStore.getCurrentTeam = function () {
  return _currentTeam;
};

TeamMemberStore.search = function (text) {
  return TeamMemberStore.all().filter( function (member) {
    return (member.first_name.startsWith(text) ||
              member.last_name.startsWith(text) ||
              member.email.startsWith(text));
  });
};

TeamMemberStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case (TeamMemberConstants.RECEIVE_ALL_MEMBERS):
      _currentTeam = payload.id;
      _receiveAllMembers(payload.members);
      TeamMemberStore.__emitChange();
      break;

    case (TeamMemberConstants.RECEIVE_MEMBER):
      if (payload.id === _currentTeam) {
        _receiveMember(payload.member);
        TeamMemberStore.__emitChange();
      }
      break;
  }
};

module.exports = TeamMemberStore;
