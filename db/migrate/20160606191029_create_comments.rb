class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.integer :task_id, null: false
      t.integer :author_id, null: false
      t.text :content, null: false

      t.timestamps null: false
    end

    add_index :comments, :task_id
  end
end
