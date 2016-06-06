class TeamMembership < ActiveRecord::Base
  include Permissions

  validates :user, :team, presence: true

  belongs_to :user

  belongs_to :team

  def self.newAdmin(options)
    m = TeamMembership.new(options)
    m.permissions = ADMIN
  end

  def self.newGuest(options)
    m = TeamMembership.new(options)
    m.permissions = GUEST
  end

end
