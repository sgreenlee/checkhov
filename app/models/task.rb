class Task < ActiveRecord::Base

  validates :title, :team, presence: true

  validates :completed, inclusion: { in: [true, false] }

end
