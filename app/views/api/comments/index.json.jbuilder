json.array! @comments do |comment|
  json.id comment.id
  json.task_id comment.task_id
  json.author_id comment.author_id
  json.content comment.content
  json.email comment.author.email
  json.first_name comment.author.first_name
  json.last_name comment.author.last_name
  json.avatar_url asset_path(comment.author.avatar.url(:thumb))
end
