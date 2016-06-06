module.exports = {
  create_task: 1 << 0,
  create_project: 1 << 1,
  create_comment: 1 << 2,

  assign_task: 1 << 3,
  set_due_date: 1 << 4,
  set_task_complete: 1 << 5,

  add_member: 1 << 8,

  delete_task: 1 << 16,
  delete_project: 1 << 17
};
