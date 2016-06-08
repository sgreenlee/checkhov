json.team do
  json.id @team.id
  json.member do
    json.id @new_member.id
    json.email @new_member.email
    json.first_name @new_member.first_name
    json.last_name @new_member.last_name
    json.avatar_url @new_member.avatar.url(:thumb)
  end
end
