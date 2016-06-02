var Store = require("flux/utils").Store;
var AppDispatcher = require("../dispatcher/dispatcher");
var TeamMembershipConstants = require("../constants/teamMembershipConstants");

var TeamMemberStore = new Store(AppDispatcher);

TeamMemberStore.__onDispatch = function (payload) {
  
}

module.exports = TeamMemberStore;
