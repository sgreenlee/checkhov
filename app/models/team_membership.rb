class TeamMembership < ActiveRecord::Base

  validates :user, :team, presence: true

  belongs_to :user

  belongs_to :team

  
end
