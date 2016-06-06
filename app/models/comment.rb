class Comment < ActiveRecord::Base


  validates :content, :author, :task, presence: true

  belongs_to :author, class_name: "User", foreign_key: :author_id

  belongs_to :task

end
