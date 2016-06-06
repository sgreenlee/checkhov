class AddPermissionsToMembers < ActiveRecord::Migration

  def change
    add_column :team_memberships, :permissions, :integer, default: 0
  end

end
