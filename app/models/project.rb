class Project < ActiveRecord::Base

  validates :team, :title, presence: true

  has_many :tasks

  belongs_to :team

end
