class Project < ActiveRecord::Base

  validates :team, :title, presence: true

  has_many :tasks, dependent: :destroy

  belongs_to :team

end
