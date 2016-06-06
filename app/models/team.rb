class Team < ActiveRecord::Base
  include Permissions

  validates :name, presence: true

  has_many :memberships, class_name: "TeamMembership", foreign_key: :team_id

  has_many :members, through: :memberships, source: :user

  has_many :tasks

  has_many :projects

  def newAdmin(user)
    debugger
    self.memberships.create!(user_id: user.id, permissions: ADMIN)
  end

  def newGuest(user)
    self.memberships.create!(user_id: user.id, permissions: GUEST)
  end
end
