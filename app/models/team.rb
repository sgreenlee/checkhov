class Team < ActiveRecord::Base

  validates :name, presence: true

  has_many :memberships, class_name: "TeamMembership", foreign_key: :team_id

  has_many :members, through: :memberships, source: :user

  has_many :tasks

  has_many :projects
  
end
