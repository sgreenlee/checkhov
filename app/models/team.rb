class Team < ActiveRecord::Base
  include Permissions

  validates :name, presence: true

  has_many :memberships, class_name: "TeamMembership", foreign_key: :team_id, dependent: :destroy

  has_many :members, through: :memberships, source: :user

  has_many :tasks, dependent: :destroy

  has_many :projects, dependent: :destroy

  def newAdmin(user)
    self.memberships.create(user_id: user.id, permissions: ADMIN)
  end

  def newGuest(user)
    self.memberships.create(user_id: user.id, permissions: GUEST)
  end
end
