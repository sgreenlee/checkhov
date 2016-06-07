json.id @comment.id
json.task_id @comment.task_id
json.author_id @comment.author_id
json.content @comment.content
json.email @author.email
json.first_name @author.first_name
json.last_name @author.last_name
json.avatar_url asset_path(@author.avatar.url(:thumb))
