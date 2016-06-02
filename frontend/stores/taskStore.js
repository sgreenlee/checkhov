var Store = require("flux/utils").Store;
var AppDispatcher = require("../dispatcher/dispatcher");
var TaskConstants = require("../constants/taskConstants");

var TaskStore = new Store(AppDispatcher);

TaskStore.__onDispatch = function (payload) {
  
}

module.exports = TaskStore;
