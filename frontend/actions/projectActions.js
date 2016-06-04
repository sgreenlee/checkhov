var ProjectApiUtil = require("../util/projectApiUtil");

var ProjectActions = {

  createProject: ProjectApiUtil.createProject,
  fetchProjects: ProjectApiUtil.fetchProjects

};

module.exports = ProjectActions;
