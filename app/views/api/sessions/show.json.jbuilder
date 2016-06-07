json.id @user.id
json.email @user.email
json.first_name @user.first_name
json.last_name @user.last_name
json.avatar_url asset_path(@user.avatar.url)
