json.task do
  json.id @task.id
  json.title @task.title
  json.description @task.description
  json.team_id @task.team_id
  json.project_id @task.project_id
  json.assignee_id @task.assignee_id
  json.due_date @task.due_date
  json.completed @task.completed
  json.created_at @task.created_at
  json.updated_at @task.updated_at

  json.comments @task.comments
end
