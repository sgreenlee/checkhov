module.exports =  {
  "All Tasks": function (task) {
    return true;
  },
  "Incomplete Tasks": function (task) {
      return !task.completed;
  },
  "Completed Tasks": function (task) {
    return task.completed;
  }
};
