json.team do

  json.id @team.id

  json.members @members do |member|
    json.id member.id
    json.email member.email
    json.first_name member.first_name
    json.last_name member.last_name
    json.avatar_url asset_path(member.avatar.url(:thumb))
  end

end
