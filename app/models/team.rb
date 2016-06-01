class Team < ActiveRecord::Base

  validates :name, presence: true

  has_many :memberships, class_name: "TeamMemberships", foreign_key: :team_id

  has_many :members, through: :memberships, source: :user
end
