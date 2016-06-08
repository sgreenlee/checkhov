class Task < ActiveRecord::Base

  validates :title, :team, presence: true

  validates :completed, inclusion: { in: [true, false] }

  belongs_to :team

  belongs_to :project

  has_many :comments, dependent: :destroy

end
