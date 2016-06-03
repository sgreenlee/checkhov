var TaskApiUtil = require("../util/taskApiUtil");

var TaskActions = {
  fetchTasksByTeam: TaskApiUtil.fetchTasksByTeam,
  updateTask: TaskApiUtil.updateTask,
  createTask: TaskApiUtil.createTask
};

module.exports = TaskActions;
