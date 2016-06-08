var Store = require("flux/utils").Store;
var AppDispatcher = require("../dispatcher/dispatcher");
var TaskConstants = require("../constants/taskConstants");
var CommentConstants = require("../constants/commentConstants");

var _tasks = {};
var _currentTeam = null;
var _errors = [];
var _createdTaskId = null;

var TaskStore = new Store(AppDispatcher);

function _receiveAllTasks(team_id, tasks) {
  _currentTeam = team_id;
  _tasks = {};
  tasks.forEach( function (task){
    _tasks[task.id] = task;
  });
  _errors = [];
}

function _receiveTask(task) {
  _tasks[task.id] = task;
  _errors = [];
}

function _setErrors(errors) {
  _errors = errors;
}

function _removeTask(task) {
  delete _tasks[task.id];
}

TaskStore.all = function() {
  return Object.keys(_tasks).map( function (taskId){ return _tasks[taskId]; });
};

TaskStore.find = function(id) {
  return _tasks[id];
};

TaskStore.findByProject = function (projectId) {
  return TaskStore.all().filter( function (task) { return task.project_id === projectId; });
};

TaskStore.getCurrentTeam = function () {
  return _currentTeam;
};

TaskStore.getCreatedTaskId = function () {
  return _createdTaskId;
};

TaskStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case TaskConstants.RECEIVE_ALL_TASKS:
      _receiveAllTasks(payload.teamId, payload.tasks);
      _createdTaskId = null;
      TaskStore.__emitChange();
      break;

    case TaskConstants.RECEIVE_TASK:
      // ignore tasks that belong to currently loaded team
      if (payload.task.team_id === _currentTeam) {
        _receiveTask(payload.task);
        _createdTaskId = null;
        TaskStore.__emitChange();
      }
      break;

    case TaskConstants.RECEIVE_CREATED_TASK:
      // ignore tasks that belong to currently loaded team
      if (payload.task.team_id === _currentTeam) {
        _receiveTask(payload.task);
        _createdTaskId = payload.task.id;
        TaskStore.__emitChange();
      }
      break;

    case TaskConstants.REMOVE_TASK:
      // ignore tasks that belong to currently loaded team
      if (payload.task.team_id === _currentTeam) {
        _removeTask(payload.task);
        _createdTaskId = null;
        TaskStore.__emitChange();
      }
      break;
  }
};

module.exports = TaskStore;
