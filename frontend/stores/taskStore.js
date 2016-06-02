var Store = require("flux/utils").Store;
var AppDispatcher = require("../dispatcher/dispatcher");
var TaskConstants = require("../constants/taskConstants");

var _tasks = {};
var _currentTeam = null;
var _errors = [];

var TaskStore = new Store(AppDispatcher);

function _receiveAllTasks(team_id, tasks) {
  _currentTeam =  team_id;
  _tasks = {};
  tasks.forEach( function (task){
    _tasks[task.id] = task;
  });
  _errors = [];
}

function _receiveTask(task) {
  _task[task.id] = task;
  _errors = [];
}

function _setErrors(errors) {
  _errors = errors;
}

TaskStore.all = function() {
  return Object.keys(_tasks).map( function (taskId){ return _tasks[taskId]; });
}

TaskStore.find = function(id) {
  return _tasks[id];
}

TaskStore.findByProject = function (projectId) {
  return TaskStore.all.filter( function (task) { return task.project_id === projectId });
},

TaskStore.getCurrentTeam = function () {
  return _currentTeam;
},

TaskStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case TaskConstants.RECEIVE_ALL_TASKS:
      _receiveAllTasks(payload.teamId, payload.tasks);
      TaskStore.__emitChange();
      break;
  }
}

module.exports = TaskStore;
