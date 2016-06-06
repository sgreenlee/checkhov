var TaskApiUtil = require("../util/taskApiUtil");

var TaskActions = {
  fetchTasksByTeam: TaskApiUtil.fetchTasksByTeam,
  updateTask: TaskApiUtil.updateTask,
  createTask: TaskApiUtil.createTask,
  getTask: TaskApiUtil.getTask,
  deleteTask: TaskApiUtil.deleteTask
};

module.exports = TaskActions;
