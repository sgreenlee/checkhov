class Task < ActiveRecord::Base

  validates :title, :team, presence: true

  validates :completed, inclusion: { in: [true, false] }

  belongs_to :team

  belongs_to :project

  belongs_to :assignee, class_name: "User", foreign_key: :assignee_id

  has_many :comments, dependent: :destroy

end
