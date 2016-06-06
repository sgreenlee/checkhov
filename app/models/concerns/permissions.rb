
module Permissions

  PERMISSIONS = {
    create_task: 1 << 0,
    create_project: 1 << 1,
    create_comment: 1 << 2,

    assign_task: 1 << 3,
    set_due_date: 1 << 4,
    set_task_complete: 1 << 5,

    add_member: 1 << 8,

    delete_task: 1 << 16,
    delete_project: 1 << 17
  }

  GUEST = PERMISSIONS[:create_task] |
          PERMISSIONS[:create_project] |
          PERMISSIONS[:create_comment] |
          PERMISSIONS[:assign_task] |
          PERMISSIONS[:set_due_date] |
          PERMISSIONS[:set_due_date] |
          PERMISSIONS[:set_task_complete]

  ADMIN = GUEST |
          PERMISSIONS[:delete_task] |
          PERMISSIONS[:delete_project] |
          PERMISSIONS[:add_member]

end
